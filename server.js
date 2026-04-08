const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML files

// TEMP DATABASE (we will upgrade later)
let users = [];

// HOME ROUTE
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// DASHBOARD ROUTE
app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/dashboard.html");
});

// REGISTER USER
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "All fields required" });
    }

    users.push({ email, password });
    console.log("New user:", email);

    res.json({ message: "Account created successfully" });
});

// LOGIN USER
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.json({ message: "Invalid login" });
    }

    res.json({ message: "Login successful" });
});

// AI SERVICE ROUTE (YOUR BUSINESS CORE)
app.post("/ai-service", (req, res) => {
    const { request } = req.body;

    console.log("Client request:", request);

    res.json({
        response: "AI processed: " + request
    });
});

app.listen(3000, () => {
    console.log("🚀 Mcswazsting Hub Server running on port 3000");
});
