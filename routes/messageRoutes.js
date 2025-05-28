const express = require("express");
const router = express.Router();

const {sendMessage} = require("../controllers/messageController");
const verifyJwt = require("../middlewares/authMiddleware");

router.post('/', verifyJwt, sendMessage);

module.exports = router;