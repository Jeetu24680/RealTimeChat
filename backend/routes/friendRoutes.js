const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");

const {
    sendRequest,
    getRequests,
    acceptRequest,
    rejectRequest,
    getFriends
} = require("../controllers/friendController");

router.post("/send-request", verifyToken, sendRequest);

router.get("/requests", verifyToken, getRequests);

router.post("/accept-request", verifyToken, acceptRequest);

router.post("/reject-request", verifyToken, rejectRequest);

router.get("/list", verifyToken, getFriends);

module.exports = router;