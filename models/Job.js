const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_level: {
    type: String,
    enum: [
      "internship",
      "entry-level",
      "associate",
      "mid-senior-level",
      "director",
    ],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    enum: ["part-time", "full-time", "freelance", "contractual"],
    required: true,
  },
  salary: {
    type: Number,
    default: null,
  },
  education: {
    type: String,
    enum: ["sma", "smk", "d3", "s1", "s2", "s3"],
  },
  job_desc: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    default: 1,
  },
  job_function: {
    type: String,
    enum: [
      "accounting-and-finance",
      "writing-and-content",
      "human-resources",
      "it-and-software",
      "sales-and-marketing",
      "engineering",
      "hospitality-and-tourism",
      "management",
      "customer-service",
      "science"
    ],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
