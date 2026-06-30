const express = require("express");
const limiter = require("./middleware/rateLimiter");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const chatRoutes = require("./routes/chatRoutes");

require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");

const socketHandler = require("./sockets/socket");

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});