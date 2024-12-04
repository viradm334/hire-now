const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true 
    },
    applied_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "reviewed"],
        default: "pending"
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;