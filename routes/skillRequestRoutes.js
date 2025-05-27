const express = require("express");
const router = express.Router();
const skillRequestModel = require("../models/skillRequestModel");
const verifyJwt = require("../middlewares/authMiddleware");
const {createRequest, updateRequestStatus, getIncommingRequests, getOutgoingRequests} = require("../controllers/skillRequestController");


router.post("/", verifyJwt, createRequest);
router.put("/:id", verifyJwt, updateRequestStatus);
router.get("/incoming", verifyJwt, getIncommingRequests);
router.get("/outgoing", verifyJwt, getOutgoingRequests);

module.exports = router;