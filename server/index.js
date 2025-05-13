const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const secure = require("./secure");
const app = express();
const PORT = process.env.PORT || 5000; // Διαφορετικό port από το 3000 της React

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Add this line to parse cookies

// API Playground
app.get("/play/genhash", async (req, res) => {
	var generatedHash = secure.generateRandomHash();
	res.json({ hash: generatedHash });
});

// Routes
app.get("/api/data", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM your_table");
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// User APIs
// ----------------------------------
// Register
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

// Login
app.post("/api/user/login", async (req, res) => {
	const { username, password } = req.body;

	// Validate input
	if (!username || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		// Query the database for the user
		const [rows] = await db.query(
			"SELECT * FROM users WHERE username = ? AND password = ?",
			[username, password]
		);

		if (rows.length > 0) {
			// Generate session ID and expiration time
			var sessionId = secure.generateRandomHash();
			var lifetime = secure.getUnixSessionLifetime(3600);

			// Insert the session into the database
			await db.query(
				"INSERT INTO sessions (identifier, until, userID) VALUES (?, ?, ?)",
				[sessionId, lifetime, rows[0].userid] // Ensure the correct column name for user ID
			);

			// Set the session cookie
			res.cookie("session", sessionId, { httpOnly: true, secure: true });
			res.status(200).json({ message: "Login successful" });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Check session
app.get("/api/user/checksession", async (req, res) => {
	const sessionId = req.cookies.session;

	if (!sessionId) {
		return res.status(401).json({ message: "No session found" });
	}

	try {
		const [rows] = await db.query("SELECT * FROM sessions WHERE identifier = ?", [
			sessionId,
		]);

		// if session doesnt exist
		if (rows.length === 0) {
			// Session does not exist
			return res.status(401).json({ message: "Session does not exist" });
		} else if (rows.length > 0) {
			// Session exists

			// Time check
			const currentTime = Math.floor(Date.now() / 1000);
			const session = rows[0];
			if (session.until < currentTime) {
				// Session has expired
				await db.query("DELETE FROM sessions WHERE identifier = ?", [sessionId]);
				return res.status(401).json({ message: "Session has expired" });
			}

			// Else, session is valid
			return res.status(200).json({ message: "Session is valid" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});




// Έναρξη του server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});