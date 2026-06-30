const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");

const {
    getProfile,
    searchUsers
} = require("../controllers/userController");

router.get("/profile", verifyToken, getProfile);

router.get("/search", verifyToken, searchUsers);

module.exports = router;