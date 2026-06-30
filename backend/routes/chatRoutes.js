const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
    sendMessage,
    getMessages,
    sendImage
} = require("../controllers/chatController");

// Send Text Message
router.post(
    "/send",
    verifyToken,
    sendMessage
);

// Get Chat History
router.get(
    "/history/:id",
    verifyToken,
    getMessages
);

// Upload Image
router.post(
    "/upload",
    verifyToken,
    upload.single("image"),
    sendImage
);

module.exports = router;