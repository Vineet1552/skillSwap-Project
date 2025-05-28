const reviewModel = require("../models/reviewModel");
const User = require("../models/userModel");

const postReview = (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({
            message: "failed to post the review",
            error: error.message
        })
    }
}


const getUserReview = (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({
            message: "failed to get the user reviews",
            error: error.message
        })
    }
}


module.exports = {
    postReview,
    getUserReview
}