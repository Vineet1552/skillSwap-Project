const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const postReview = async (req, res) => {
  try {
    const { reviewee, rating, comment } = req.body;
    const reviewer = req.user.userId;

    if (reviewee == reviewer) {
      return res.status(400).json({
        message: "you can not review your self",
      });
    }

    const newReview = new Review({
      reviewer,
      reviewee,
      rating,
      comment,
    });

    await newReview.save();
    return res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({
      message: "failed to post the review",
      error: error.message,
    });
  }
};


// GET /api/reviews/user/:userId
const getUserReviews = async (req, res) => {
  try {
    console.log("hello");
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate("reviewer", "name email");
    console.log(reviews, "aaaaaaaaaaaaaaaaa");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user reviews", error: err.message });
  }
};

module.exports = {
  postReview,
  getUserReviews,
};
