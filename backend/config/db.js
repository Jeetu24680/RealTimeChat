const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_app"
});

// Connect
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;