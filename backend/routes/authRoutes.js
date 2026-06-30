const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
    signup,
    login
} = require("../controllers/authController");

router.post(
    "/signup",

    [
        body("username")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters"),

        body("email")
            .isEmail()
            .withMessage("Invalid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],

    signup
);

router.post(
    "/login",

    [
        body("email")
            .isEmail()
            .withMessage("Invalid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],

    login
);

module.exports = router;