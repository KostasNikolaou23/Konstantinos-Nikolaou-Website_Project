const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const secure = require("./secure");
const rewarder = require("./rewarder");
const analytica = require("./analytica");
const app = express();
const PORT = process.env.PORT || 5000; // Διαφορετικό port από το 3000 της React

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Add this line to parse cookies

// API Playground
app.get("/play/hash/gensession", async (req, res) => {
	var generatedHash = secure.generateRandomSessionHash();
	res.json({ hash: generatedHash });
});

// api/hash/gendata where it takes a string and returns the hash from secure's generateDataHash
app.get("/play/hash/gendata", async (req, res) => {
	const data = req.query.data;
	if (!data || typeof data !== "string") {
		return res
			.status(400)
			.json({ message: "Data is required and must be a string" });
	}
	var generatedHash = secure.generateDataHash(data);
	res.json({ hash: generatedHash });
});

// Routes
// --------------------------------
// --------------------------------
// General Data
app.get("/api/data", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM your_table");
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Analytics/Statistics
// --------------------------------
app.get("/api/analytics/top5movies", async (req, res) => {
	try {
		const [rows] = await analytica.getTop5Movies();
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get("/api/analytics/top5tvseries", async (req, res) => {
	try {
		const [rows] = await analytica.getTop5TvSeries();
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get("/api/analytics/user/:userId", async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		const [movieClicks] = await analytica.getUserMovieClicks(userId);
		const [tvSeriesClicks] = await analytica.getUserTvSeriesClicks(userId);
		const [kidsClicks] = await analytica.getUserKidsClicks(userId);
		const [documentaryClicks] = await analytica.getUserDocumentaryClicks(userId);

		res.json({
			movie_clicks: movieClicks[0].movie_clicks,
			tv_series_clicks: tvSeriesClicks[0].tv_series_clicks,
			kids_clicks: kidsClicks[0].kids_clicks,
			documentary_clicks: documentaryClicks[0].documentary_clicks,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/analytics/movies/:userId", async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		await analytica.setUserMovieClicks(userId);
		res.json({ message: "Movie clicks incremented" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/analytics/tvseries/:userId", async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		await analytica.setUserTvSeriesClicks(userId);
		res.json({ message: "TV Series clicks incremented" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/analytics/kids/:userId", async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		await analytica.setUserKidsClicks(userId);
		res.json({ message: "Kids clicks incremented" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/analytics/documentary/:userId", async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		return res.status(400).json({ message: "User ID is required" });
	}

	try {
		await analytica.setUserDocumentaryClicks(userId);
		res.json({ message: "Documentary clicks incremented" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// MyList APIs
// ----------------------------------
// Get movies JSON for userID
app.get("/api/mylist/movies/:userID", async (req, res) => {
	const userID = req.params.userID;
	if (!userID) {
		return res.status(400).json({ message: "User ID is required" });
	}
	try {
		const [rows] = await db.query("SELECT movies FROM mylist WHERE userID = ?", [
			userID,
		]);
		if (rows.length === 0) {
			// Instead of 404, return empty array
			return res.json({ movies: [] });
		}
		res.json({ movies: JSON.parse(rows[0].movies) });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get tvseries JSON for userID
app.get("/api/mylist/tvseries/:userID", async (req, res) => {
	const userID = req.params.userID;
	if (!userID) {
		return res.status(400).json({ message: "User ID is required" });
	}
	try {
		const [rows] = await db.query(
			"SELECT tvseries FROM mylist WHERE userID = ?",
			[userID]
		);
		if (rows.length === 0) {
			// Instead of 404, return empty array
			return res.json({ tvseries: [] });
		}
		res.json({ tvseries: JSON.parse(rows[0].tvseries) });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/mylist/remove", async (req, res) => {
	const { userID, mvdbID, type } = req.body;
	if (!userID || !mvdbID || !type) {
		return res
			.status(400)
			.json({ message: "userID, mvdbID, and type are required" });
	}
	try {
		const [rows] = await db.query(
			`SELECT ${
				type === "movie" ? "movies" : "tvseries"
			} FROM mylist WHERE userID = ?`,
			[userID]
		);
		if (rows.length === 0) return res.status(404).json({ message: "Not found" });
		let arr = [];
		try {
			arr = JSON.parse(rows[0][type === "movie" ? "movies" : "tvseries"]);
		} catch {
			arr = [];
		}
		const newArr = arr.filter((item) => String(item.mvdbID) !== String(mvdbID));
		await db.query(
			`UPDATE mylist SET ${
				type === "movie" ? "movies" : "tvseries"
			} = ? WHERE userID = ?`,
			[JSON.stringify(newArr), userID]
		);
		res.status(200).json({ message: "Removed from MyList" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/mylist/add", async (req, res) => {
	const { userID, mvdbID, type } = req.body;
	if (!userID || !mvdbID || !type) {
		return res
			.status(400)
			.json({ message: "userID, mvdbID, and type are required" });
	}
	try {
		// Get current list
		const [rows] = await db.query(
			`SELECT movies, tvseries FROM mylist WHERE userID = ?`,
			[userID]
		);

		let arr = [];
		let isMovie = type === "movie";
		if (rows.length > 0) {
			try {
				arr = JSON.parse(rows[0][isMovie ? "movies" : "tvseries"]);
			} catch {
				arr = [];
			}
		}

		// Prevent duplicates
		if (arr.some((item) => String(item.mvdbID) === String(mvdbID))) {
			return res.status(409).json({ message: "Already in MyList" });
		}

		// Add new item
		const addedDate = secure.getCurrentDate();
		arr.push({
			mvdbID,
			status: "to_watch",
			added: addedDate,
			watched_status: 0,
		});

		if (rows.length > 0) {
			// Update existing row
			await db.query(
				`UPDATE mylist SET ${isMovie ? "movies" : "tvseries"} = ? WHERE userID = ?`,
				[JSON.stringify(arr), userID]
			);
		} else {
			// Insert new row
			const moviesArr = isMovie ? JSON.stringify(arr) : "[]";
			const tvArr = !isMovie ? JSON.stringify(arr) : "[]";
			await db.query(
				"INSERT INTO mylist (userID, movies, tvseries) VALUES (?, ?, ?)",
				[userID, moviesArr, tvArr]
			);
		}

		res.status(201).json({ message: "Added to MyList" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/mylist/check", async (req, res) => {
	const { userID, mvdbID, type } = req.body;
	if (!userID || !mvdbID || !type) {
		return res
			.status(400)
			.json({ message: "userID, mvdbID, and type are required" });
	}
	try {
		const [rows] = await db.query(
			`SELECT ${
				type === "movie" ? "movies" : "tvseries"
			} FROM mylist WHERE userID = ?`,
			[userID]
		);
		if (rows.length === 0) return res.json({ exists: false });
		let arr = [];
		try {
			arr = JSON.parse(rows[0][type === "movie" ? "movies" : "tvseries"]);
		} catch {
			arr = [];
		}
		const exists = arr.some((item) => String(item.mvdbID) === String(mvdbID));
		res.json({ exists });
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
		// Check if username already exists (case-insensitive)
		const [existing] = await db.query(
			"SELECT userid FROM users WHERE LOWER(username) = ?",
			[username.toLowerCase()]
		);
		if (existing.length > 0) {
			return res.status(409).json({ message: "Username already exists" });
		}

		// Hash the password before storing
		const hashedPassword = secure.generateDataHash(password);

		const [result] = await db.query(
			"INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
			[email, username, hashedPassword]
		);
		console.log("New user registered:", result.insertId);
		res.status(201).json({ message: "Register successful!", id: result.insertId });
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
		// Hash the password before comparing
		const hashedPassword = secure.generateDataHash(password);

		// Query the database for the user, case-insensitive username
		const [rows] = await db.query(
			"SELECT * FROM users WHERE LOWER(username) = ? AND password = ?",
			[username.toLowerCase(), hashedPassword]
		);

		if (rows.length > 0) {
			// Generate session ID and expiration time
			var sessionId = secure.generateRandomSessionHash();
			var lifetime = secure.getUnixSessionLifetime(3600);

			// Insert the session into the database
			await db.query(
				"INSERT INTO sessions (identifier, until, userID) VALUES (?, ?, ?)",
				[sessionId, lifetime, rows[0].userid]
			);

			// Set the session cookie
			res.cookie("session", sessionId, { httpOnly: true, secure: false });
			res.status(200).json({ message: "Login successful", sessionId: sessionId });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
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

// Get current logged-in user's profile
app.get("/api/user/me", async (req, res) => {
	const sessionId = req.cookies.session;
	if (!sessionId) {
		return res.status(401).json({ message: "api/user/me: No session found" });
	}

	try {
		const [sessionRows] = await db.query(
			"SELECT u.userid, u.username FROM sessions s JOIN users u ON s.userID = u.userid WHERE s.identifier = ?",
			[sessionId]
		);
		if (sessionRows.length === 0) {
			return res.status(401).json({ message: "Session does not exist" });
		}
		const user = sessionRows[0];

		const [badgesRows] = await db.query(
			`SELECT b.name 
             FROM user_badges ub 
             JOIN badges b ON ub.badge_id = b.id 
             WHERE ub.user_id = ?`,
			[user.userid]
		);

		const [achievementsRows] = await db.query(
			`SELECT a.name
             FROM user_achievements ua
             JOIN achievements a ON ua.achievement_id = a.id
             WHERE ua.user_id = ?`,
			[user.userid]
		);

		// --- Get statistics using analytica.js ---
		const stats = {
			movie_clicks: await analytica.getUserMovieClicks(user.userid),
			tv_series_clicks: await analytica.getUserTvSeriesClicks(user.userid),
			kids_clicks: await analytica.getUserKidsClicks(user.userid),
			documentary_clicks: await analytica.getUserDocumentaryClicks(user.userid),
		};

		res.json({
			username: user.username,
			badges: badgesRows.map((b) => b.name),
			achievements: achievementsRows.map((a) => a.name),
			stats, // <-- send stats to frontend
		});
	} catch (error) {
		console.error("Error in /api/user/me:", error);
		res.status(500).json({ error: error.message });
	}
});

app.get("/api/user/profile/:username", async (req, res) => {
	const username = req.params.username;
	if (!username) {
		return res.status(400).json({ message: "Username is required" });
	}

	try {
		// Get user info
		const [userRows] = await db.query(
			"SELECT userid, username FROM users WHERE username = ?",
			[username]
		);
		if (userRows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}
		const user = userRows[0];

		// Get badges
		const [badgesRows] = await db.query(
			`SELECT b.name 
             FROM user_badges ub 
             JOIN badges b ON ub.badge_id = b.id 
             WHERE ub.user_id = ?`,
			[user.userid]
		);

		// Get achievements
		const [achievementsRows] = await db.query(
			`SELECT a.name
             FROM user_achievements ua
             JOIN achievements a ON ua.achievement_id = a.id
             WHERE ua.user_id = ?`,
			[user.userid]
		);

		// Get statistics
		const movieClicksArr = await analytica.getUserMovieClicks(user.userid);
		const tvSeriesClicksArr = await analytica.getUserTvSeriesClicks(user.userid);
		const kidsClicksArr = await analytica.getUserKidsClicks(user.userid);
		const documentaryClicksArr = await analytica.getUserDocumentaryClicks(
			user.userid
		);

		const stats = {
			movie_clicks:
				Array.isArray(movieClicksArr) && movieClicksArr[0]?.movie_clicks != null
					? movieClicksArr[0].movie_clicks
					: 0,
			tv_series_clicks:
				Array.isArray(tvSeriesClicksArr) &&
				tvSeriesClicksArr[0]?.tv_series_clicks != null
					? tvSeriesClicksArr[0].tv_series_clicks
					: 0,
			kids_clicks:
				Array.isArray(kidsClicksArr) && kidsClicksArr[0]?.kids_clicks != null
					? kidsClicksArr[0].kids_clicks
					: 0,
			documentary_clicks:
				Array.isArray(documentaryClicksArr) &&
				documentaryClicksArr[0]?.documentary_clicks != null
					? documentaryClicksArr[0].documentary_clicks
					: 0,
		};

		res.json({
			username: user.username,
			badges: badgesRows.map((b) => b.name),
			achievements: achievementsRows.map((a) => a.name),
			stats,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Achievements API
// ----------------------------------
// Get top 50 users with most achievements
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

// Get all achievements within the site
app.get("/api/achievements/all", async (req, res) => {
	try {
		const [rows] = await db.query(
			"SELECT id, name, description FROM achievements"
		);
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

// Rating
// ----------------------------------

app.post("/api/setRating", async (req, res) => {
	const { userID, mvdbID, type, genre, rating } = req.body;
	if (!userID || !mvdbID || !type || !rating) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	// Validate session (optional: you can also check req.cookies.session)
	// Save or update the rating in your database
	try {
		await db.query(
			`INSERT INTO ratings (user_id, mvdb_id, type, rating)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE rating = ?`,
			[userID, mvdbID, type, rating, rating]
		);
		rewarder.checkUserAchievementProgress(userID, mvdbID, type); // Check for possible rewards
		res.status(200).json({ message: "Rating saved" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get rating
app.get("/api/getRating/:userID/:mvdbID/:type", async (req, res) => {
	const { userID, mvdbID, type } = req.params;
	if (!userID || !mvdbID || !type) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const [rows] = await db.query(
			`SELECT rating FROM ratings WHERE user_id = ? AND mvdb_id = ? AND type = ?`,
			[userID, mvdbID, type]
		);
		if (rows.length > 0) {
			res.status(200).json({ rating: rows[0].rating });
		} else {
			res.status(404).json({ message: "Rating not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Έναρξη του server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
