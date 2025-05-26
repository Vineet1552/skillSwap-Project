const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const verifyJwt = require("../middlewares/authMiddleware");

// getting the logged-in user profile
router.get("/me", verifyJwt , async(req, res) => {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({user});
});


// updating the user profile
router.put("/me", verifyJwt, async(req, res) => {
    const updatedProfile = req.body;

    const user = await User.findByIdAndUpdate(req.user.userId, updatedProfile, {
        new: true
    }).select("-password");

    res.json({user});
});


module.exports = router;