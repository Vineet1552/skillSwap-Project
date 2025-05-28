const express = require("express");
const router = express.Router();

const {sendMessage, getMessages} = require("../controllers/messageController");
const verifyJwt = require("../middlewares/authMiddleware");

router.post("/", verifyJwt, sendMessage);
router.get("/:userId", verifyJwt, getMessages);

module.exports = router;