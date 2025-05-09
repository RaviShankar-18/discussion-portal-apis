const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { initializeDatabase } = require("./db/db.connect");
const Discussion = require("./models/discussion.models");

const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

// Read and seed the discussions.json
const jsonData = fs.readFileSync("discussions.json", "utf-8");
const discussionsData = Object.values(JSON.parse(jsonData)); // Convert object to array

async function seedData() {
  try {
    const existing = await Discussion.countDocuments();
    if (existing === 0) {
      for (const discussion of discussionsData) {
        const newDiscussion = new Discussion({
          ID: discussion.ID,
          subject: discussion.subject,
          question: discussion.question,
          creationTime: discussion.creationTime,
          favourite: discussion.favourite,
          responses: Object.values(discussion.responses),
        });

        await newDiscussion.save();
      }
      console.log("Seeding complete.");
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
// seedData();

// ✅ GET route to fetch all discussions
app.get("/questions", async (req, res) => {
  try {
    const allDiscussions = await Discussion.find({});
    res.json({ discussions: allDiscussions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
});

// ✅ POST route to find specific subject + question match
app.post("/questions/search", async (req, res) => {
  const { subject, question } = req.body;

  try {
    const foundDiscussion = await Discussion.findOne({
      subject: { $regex: new RegExp(subject, "i") },
      question: { $regex: new RegExp(question, "i") },
    });

    if (foundDiscussion) {
      res.json({ discussion: foundDiscussion });
    } else {
      res.status(404).json({ message: "No such question found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching for question", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
