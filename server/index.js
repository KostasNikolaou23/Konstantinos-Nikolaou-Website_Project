const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const secure = require("./secure");
const app = express();
const PORT = process.env.PORT || 5000; // Διαφορετικό port από το 3000 της React

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

// MyList APIs
// ----------------------------------
// Get movies JSON for userID
app.get("/api/mylist/movies/:userID", async (req, res) => {
    const userID = req.params.userID;

    // Validate input
    if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Select only the 'movies' column for the given userID
        const [rows] = await db.query("SELECT movies FROM mylist WHERE userID = ?", [
            userID,
        ]);

        // If no rows are found, return a 404 response
        if (rows.length === 0) {
            return res.status(404).json({ message: "No movies found for this user" });
        }

        // Return the 'movies' column
        res.json({ movies: rows[0].movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get tvseries JSON for userID
app.get("/api/mylist/tvseries/:userID", async (req, res) => {
    const userID = req.params.userID;

    // Validate input
    if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Select only the 'tvseries' column for the given userID
        const [rows] = await db.query("SELECT tvseries FROM mylist WHERE userID = ?", [
            userID,
        ]);

        // If no rows are found, return a 404 response
        if (rows.length === 0) {
            return res.status(404).json({ message: "No tvseries found for this user" });
        }

        // Return the 'tvseries' column
        res.json({ tvseries: rows[0].tvseries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add movie to mylist
app.post("/api/mylist/movies", async (req, res) => {
    const { userID, movieID } = req.body;

    // Validate input
    if (!userID || !movieID) {
        return res.status(400).json({ message: "User ID and Movie ID are required" });
    }

    try {
        const addedDate = secure.getCurrentDate(); // Get the current date in YYYY-MM-DD format
        const newMovie = JSON.stringify({ mvdbID: movieID, added: addedDate }); // Create the new movie object to append

        // Update the 'movies' column by appending the new movie object
        await db.query(
            "UPDATE mylist SET movies = JSON_ARRAY_APPEND(movies, '$', CAST(? AS JSON)) WHERE userID = ?",
            [newMovie, userID]
        );

        res.status(201).json({ message: "Movie added to mylist" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add tvseries to mylist
app.post("/api/mylist/tvseries", async (req, res) => {
	const { userID, tvseriesID } = req.body;

	// Validate input
	if (!userID || !tvseriesID) {
		return res.status(400).json({ message: "User ID and TV Series ID are required" });
	}

	try {
		await db.query(
			"UPDATE mylist SET tvseries = JSON_ARRAY_APPEND(tvseries, '$', ?) WHERE userID = ?",
			[tvseriesID, userID]
		);
		res.status(201).json({ message: "TV Series added to mylist" });
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
			res.cookie("session", sessionId, { httpOnly: true, secure: false });
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
			const currentTime = secure.getCurrentUnixTime();
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

// Get UserID and Username from session
app.get("/api/user/getsession", async (req, res) => {
    const sessionId = req.cookies.session;

    if (!sessionId) {
        return res.status(401).json({ message: "No session found" });
    }

    try {
        const [rows] = await db.query(
            "SELECT u.userid, u.username FROM sessions s JOIN users u ON s.userID = u.userid WHERE s.identifier = ?",
            [sessionId]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Session does not exist" });
        }

        res.json(rows[0]); // Return userid and username
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user data
app.get("/api/user/get/:username", async (req, res) => {
	const username = req.params.username;

	// Validate input
	if (!username) {
		return res.status(400).json({ message: "Username is required" });
	}

	try {
		const [rows] = await db.query("SELECT joined, userid FROM users WHERE username = ?", [username]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Achievements API
// ----------------------------------
// Get achievements of user
app.get("/api/achievements/get/:userID", async (req, res) => {
	const userID = req.params.userID;

	// Validate input
	if (!userID) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		const [rows] = await db.query("SELECT achievement_id FROM user_achievements WHERE user_id = ?", [
			userID,
		]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "No achievements found for this user" });
		}

		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Give achievement to user
app.post("/api/achievements/set", async (req, res) => {
	const { userID, achievementID } = req.body;

	// Validate input
	if (!userID || !achievementID) {
		return res.status(400).json({ message: "User ID and Achievement ID are required" });
	}

	try {
		await db.query(
			"INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
			[userID, achievementID]
		);
		res.status(201).json({ message: "Achievement given to user" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get top 50 users with most achievements
// SELECT u.userid, u.username, COUNT(ua.achievement_id) AS achievement_count
// FROM users u
// LEFT JOIN user_achievements ua ON u.userid = ua.user_id
// GROUP BY u.userid, u.username
// ORDER BY achievement_count DESC
// LIMIT 50;
app.post("/api/user/achievements/top", async (req, res) => {
	// Validate input
	if (!req.body) {
		return res.status(400).json({ message: "Request body is required" });
	}

	try {
		const [rows] = await db.query(
			"SELECT u.userid, u.username, COUNT(ua.achievement_id) AS achievement_count FROM users u LEFT JOIN user_achievements ua ON u.userid = ua.user_id GROUP BY u.userid, u.username ORDER BY achievement_count DESC LIMIT 50"
		);

		if (rows.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}

		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Logout route
app.post("/api/user/logout", async (req, res) => {
    const sessionId = req.cookies.session;

    if (!sessionId) {
        return res.status(400).json({ message: "No session found" });
    }

    try {
        // Delete the session from the database
        await db.query("DELETE FROM sessions WHERE identifier = ?", [sessionId]);

        // Clear the session cookie
        res.clearCookie("session", { httpOnly: true, secure: false });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Έναρξη του server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
