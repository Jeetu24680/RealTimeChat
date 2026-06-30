const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
    const errors = validationResult(req);

if (!errors.isEmpty()) {

    return res.status(400).json({
        errors: errors.array()
    });

}
    try {
        const { username, email, password } = req.body;

        db.query(
            "SELECT * FROM users WHERE email=? OR username=?",
            [email, username],
            async (err, result) => {
                if (err) return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(username,email,password) VALUES(?,?,?)",
                    [username, email, hashedPassword],
                    (err) => {
                        if (err) return res.status(500).json(err);

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });
                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.login = (req, res) => {
    const errors = validationResult(req);

if (!errors.isEmpty()) {

    return res.status(400).json({
        errors: errors.array()
    });

}

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });

        }
    );
};