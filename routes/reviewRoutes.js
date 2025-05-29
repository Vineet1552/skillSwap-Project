const express = require("express");
const router = express.Router();

const verifyJwt = require("../middlewares/authMiddleware");

const {postReview, getUserReviews} = require("../controllers/reviewController");


router.post("/", verifyJwt, postReview);

router.get("/user/:userId", getUserReviews);



module.exports = router;