const mongoose = require("mongoose");
const responseSchema = require("./response.models");

const discussionSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Number,
    required: true,
  },
  favourite: {
    type: Number,
    default: 0,
  },
  responses: [responseSchema],
});

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
