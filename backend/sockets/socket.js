const jwt = require("jsonwebtoken");
const db = require("../config/db");

const onlineUsers = new Map();

module.exports = (io) => {

    io.use((socket, next) => {

        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication Error"));
        }

        try {

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            socket.userId = decoded.id;

            next();

        } catch (err) {

            next(new Error("Invalid Token"));

        }

    });

    io.on("connection", (socket) => {

        onlineUsers.set(socket.userId, socket.id);

        console.log(`User ${socket.userId} Connected`);

        io.emit("onlineUsers", [...onlineUsers.keys()]);

        socket.on("sendMessage", (data) => {

            db.query(
                "INSERT INTO messages(sender_id,receiver_id,message) VALUES(?,?,?)",
                [
                    socket.userId,
                    data.receiver_id,
                    data.message
                ],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    const messageData = {
                        id: result.insertId,
                        sender_id: socket.userId,
                        receiver_id: data.receiver_id,
                        message: data.message,
                        created_at: new Date()
                    };

                    socket.emit("receiveMessage", messageData);

                    const receiverSocket = onlineUsers.get(data.receiver_id);

                    if (receiverSocket) {
                        io.to(receiverSocket).emit("receiveMessage", messageData);
                    }

                }
            );

        });

        socket.on("typing", (receiverId) => {

            const receiverSocket = onlineUsers.get(receiverId);

            if (receiverSocket) {

                io.to(receiverSocket).emit("typing", {
                    username: socket.userId
                });

            }

        });

        socket.on("stopTyping", (receiverId) => {

            const receiverSocket = onlineUsers.get(receiverId);

            if (receiverSocket) {

                io.to(receiverSocket).emit("stopTyping");

            }

        });

        socket.on("disconnect", () => {

            onlineUsers.delete(socket.userId);

            console.log(`User ${socket.userId} Disconnected`);

            io.emit("onlineUsers", [...onlineUsers.keys()]);

        });

    });

};

module.exports.onlineUsers = onlineUsers;