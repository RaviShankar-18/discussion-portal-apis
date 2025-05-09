const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    upwardCount: {
      type: Number,
      required: true,
    },
    downwardCount: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // Don't add _id to each response
);

module.exports = responseSchema;
