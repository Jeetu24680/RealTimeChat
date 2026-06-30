const db = require("../config/db");

exports.getProfile = (req, res) => {

    db.query(
        "SELECT id, username, email, profile_pic, created_at FROM users WHERE id=?",
        [req.user.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json(result[0]);
        }
    );

};

exports.searchUsers = (req, res) => {

    const search = req.query.username;

    db.query(
        "SELECT id, username, email FROM users WHERE username LIKE ? AND id != ?",
        [`%${search}%`, req.user.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};