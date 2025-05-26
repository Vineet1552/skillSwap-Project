const mongoose = require("mongoose");

const skillRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillsOffered: {
        type: String,
        required: true
    },
    skillsWanted: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },

}, {
    timestamps: true
});

module.exports = mongoose.model("SkillRequest", skillRequestSchema);