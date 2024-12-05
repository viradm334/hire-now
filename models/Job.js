const mongoose = require("mongoose");

const EmploymentTypeEnum = {
  PART_TIME: 'part-time',
  FULL_TIME: 'full-time',
  FREELANCE: 'freelance',
  CONTRACTUAL: 'contractual'
};

const jobFunctionEnum = {
  ACCOUNTING_AND_FINANCE: "accounting-and-finance",
  WRITING_AND_CONTENT: "writing-and-content",
  HUMAN_RESOURCES: "human-resources",
  IT_AND_SOFTWARE: "it-and-software",
  SALES_AND_MARKETING: "sales-and-marketing",
  ENGINEERING: "engineering",
  HOSPITALITY_AND_TOURISM: "hospitality-and-tourism",
  MANAGEMENT: "management",
  CUSTOMER_SERVICE: "customer-service",
  SCIENCE: "science"
};

const jobLevelEnum = {
  INTERNSHIP: "internship",
  ENTRY_LEVEL: "entry-level",
  ASSOCIATE: "associate",
  MID_SENIOR_LEVEL: "mid-senior-level",
  DIRECTOR: "director"
};

const educationEnum = {
  SMK: 'smk',
  SMA: 'sma',
  D3: 'd3',
  D4: 'd4',
  S1: 's1',
  S2: 's2',
  S3: 's3'
};

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
    enum: Object.values(jobLevelEnum),
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    enum: Object.values(EmploymentTypeEnum),
    required: true,
  },
  salary: {
    type: Number,
    default: null,
  },
  education: {
    type: String,
    enum: Object.values(educationEnum),
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
    enum: Object.values(jobFunctionEnum),
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

module.exports = {Job, EmploymentTypeEnum, jobFunctionEnum, jobLevelEnum, educationEnum};
