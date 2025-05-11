const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 5000; // Διαφορετικό port από το 3000 της React

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/data", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM your_table");
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// /api/user/register
app.post("/api/user/register", async (req, res) => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Corrected SQL query
        const [result] = await db.query(
            "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
            [email, username, password]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Έναρξη του server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Reload the server when changes are made
if (module.hot) {
	module.hot.accept("./db", () => {
		console.log("Reloading db module...");
	});
	module.hot.accept("./index", () => {
		
		console.log("Reloading index module...");
	});
}