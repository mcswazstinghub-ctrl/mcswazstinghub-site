// =============================
// Mcswazsting Hub - Professional Server
// =============================

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// =============================
// MIDDLEWARE
// =============================
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend if needed

// =============================
// HEALTH CHECK (FOR HOSTING)
// =============================
app.get("/", (req, res) => {
    res.send("🚀 Mcswazsting Hub API is running...");
});

// =============================
// AUTH SYSTEM (BASIC)
// =============================
const users = [];

app.post("/register", (req, res) => {
    const { email, password } = req.body;

    const userExists = users.find(u => u.email === email);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ email, password });

    res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }

    res.json({
        message: "Login successful",
        user: { email }
    });
});

// =============================
// AI SERVICE (BUSINESS CORE)
// =============================
app.post("/ai-service", (req, res) => {
    const { request } = req.body;

    if (!request) {
        return res.status(400).json({ message: "Request is required" });
    }

    console.log("Client request:", request);

    // Simulated AI response (replace with real API later)
    res.json({
        success: true,
        response: `🤖 AI processed: ${request}`
    });
});

// =============================
// ERROR HANDLING
// =============================
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// =============================
// SERVER START
// =============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Mcswazsting Hub Server running on port ${PORT}`);
});
