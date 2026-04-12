const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        return res.json({ success: true, message: "Login successful" });
    }
    res.status(401).json({ success: false, message: "Invalid login" });
});

app.post("/ai-service", (req, res) => {
    const { request } = req.body;
    res.json({ response: "AI processed: " + request });
});

// Dynamic Port (IMPORTANT FOR DEPLOYMENT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// TEMP DATABASE (we upgrade later)
const users = [];

// REGISTER
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });

    res.json({ message: "User registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) return res.json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ email }, "SECRET_KEY");

    res.json({ message: "Login successful", token });
});
