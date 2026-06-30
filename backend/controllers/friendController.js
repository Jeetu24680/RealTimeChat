const db = require("../config/db");

exports.sendRequest = (req, res) => {

    const sender = req.user.id;
    const receiver = req.body.receiver_id;

    if (sender === receiver) {
        return res.status(400).json({
            message: "You cannot send a friend request to yourself."
        });
    }

    db.query(
        "SELECT * FROM friend_requests WHERE sender_id=? AND receiver_id=?",
        [sender, receiver],
        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Friend request already sent."
                });
            }

            db.query(
                "INSERT INTO friend_requests(sender_id,receiver_id) VALUES(?,?)",
                [sender, receiver],
                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        message: "Friend request sent successfully."
                    });

                }
            );

        }
    );

};

exports.getRequests = (req, res) => {

    db.query(
        `SELECT
            friend_requests.id,
            users.id AS sender_id,
            users.username,
            users.email
        FROM friend_requests
        JOIN users
        ON users.id = friend_requests.sender_id
        WHERE receiver_id=? AND status='pending'`,
        [req.user.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

exports.acceptRequest = (req, res) => {

    const requestId = req.body.request_id;

    db.query(
        "SELECT * FROM friend_requests WHERE id=?",
        [requestId],
        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }

            const request = result[0];

            db.query(
                "UPDATE friend_requests SET status='accepted' WHERE id=?",
                [requestId]
            );

            db.query(
                "INSERT INTO friends(user1,user2) VALUES(?,?)",
                [request.sender_id, request.receiver_id]
            );

            res.json({
                message: "Friend request accepted."
            });

        }
    );

};

exports.rejectRequest = (req, res) => {

    const requestId = req.body.request_id;

    db.query(
        "UPDATE friend_requests SET status='rejected' WHERE id=?",
        [requestId],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Friend request rejected."
            });

        }
    );

};

exports.getFriends = (req, res) => {

    const userId = req.user.id;

    db.query(
        `
        SELECT
            users.id,
            users.username,
            users.email
        FROM friends
        JOIN users
        ON (
            users.id = friends.user1
            OR
            users.id = friends.user2
        )
        WHERE
        (friends.user1=? OR friends.user2=?)
        AND users.id != ?
        `,
        [userId, userId, userId],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};