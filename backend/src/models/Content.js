const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["rss", "article", "youtube", "file"],
      required: true
    },

    sourceUrl: {
      type: String,
      trim: true
    },

    fileName: {
      type: String,
      trim: true
    },

    title: {
      type: String,
      trim: true
    },

    extractedText: {
      type: String
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;