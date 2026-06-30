const db = require("../config/db");

// Send Text Message
exports.sendMessage = (req, res) => {

    const sender = req.user.id;
    const receiver = req.body.receiver_id;
    const message = req.body.message;

    db.query(
        `INSERT INTO messages
        (sender_id,receiver_id,message,status)
        VALUES(?,?,?,'sent')`,
        [sender, receiver, message],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Message Sent"
            });

        }
    );

};

// Send Image
exports.sendImage = (req, res) => {

    const sender = req.user.id;
    const receiver = req.body.receiver_id;

    if (!req.file) {

        return res.status(400).json({
            message: "No image selected"
        });

    }

    const image = req.file.filename;

    db.query(
        `INSERT INTO messages
        (sender_id,receiver_id,image,status)
        VALUES(?,?,?,'sent')`,
        [sender, receiver, image],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Image Sent"
            });

        }
    );

};

// Get Chat History
exports.getMessages = (req, res) => {

    const sender = req.user.id;
    const receiver = req.params.id;

    db.query(
        `SELECT *
         FROM messages
         WHERE
         (sender_id=? AND receiver_id=?)
         OR
         (sender_id=? AND receiver_id=?)
         ORDER BY created_at`,
        [sender, receiver, receiver, sender],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};