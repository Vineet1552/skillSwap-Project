const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authController");

// for register
router.post('/register', registerUser);

// for login 
router.post('/login', loginUser);

module.exports = router;