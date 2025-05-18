const db = require("./db");

// General Stuff
// ------------------------------------------------------
function getTop5Movies() {
	return db.query("SELECT mvdb_id FROM ratings WHERE type = 'movie' ORDER BY rating DESC LIMIT 5");
}

function getTop5TvSeries() {
	return db.query("SELECT mvdb_id FROM ratings WHERE type = 'tvseries' ORDER BY rating DESC LIMIT 5");
}

// User stuff
// ------------------------------------------------------

function getUserMovieClicks(userId) {
	return db.query("SELECT movie_clicks FROM statistics WHERE user_id = ?", [userId]);
}

function getUserTvSeriesClicks(userId) {
	return db.query("SELECT tv_series_clicks FROM statistics WHERE user_id = ?", [userId]);
}

function getUserKidsClicks(userId) {
	return db.query("SELECT kids_clicks FROM statistics WHERE user_id = ?", [userId]);
}

function getUserDocumentaryClicks(userId) {
	return db.query("SELECT documentary_clicks FROM statistics WHERE user_id = ?", [userId]);
}

async function setUserMovieClicks(userId) {
	// Check if the user exists
	const user = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);

	if (user.length === 0) {
		// User doesn't exist, create a new entry with 1 movie click
		return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 1, 0, 0, 0)", [userId]);
	} else {
		// User exists, increment the movie_clicks by 1
		return db.query("UPDATE statistics SET movie_clicks = movie_clicks + 1 WHERE user_id = ?", [userId]);
	}
}

async function setUserTvSeriesClicks(userId) {
	// Check if the user exists
	const user = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);

	if (user.length === 0) {
		// User doesn't exist, create a new entry with 1 tv_series click
		return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 1, 0, 0)", [userId]);
	} else {
		// User exists, increment the tv_series_clicks by 1
		return db.query("UPDATE statistics SET tv_series_clicks = tv_series_clicks + 1 WHERE user_id = ?", [userId]);
	}
}

async function setUserKidsClicks(userId) {
	// Check if the user exists
	const user = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);

	if (user.length === 0) {
		// User doesn't exist, create a new entry with 1 kids click
		return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 0, 1, 0)", [userId]);
	} else {
		// User exists, increment the kids_clicks by 1
		return db.query("UPDATE statistics SET kids_clicks = kids_clicks + 1 WHERE user_id = ?", [userId]);
	}
}

async function setUserDocumentaryClicks(userId) {
	// Check if the user exists
	const user = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);

	if (user.length === 0) {
		// User doesn't exist, create a new entry with 1 documentary click
		return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 0, 0, 1)", [userId]);
	} else {
		// User exists, increment the documentary_clicks by 1
		return db.query("UPDATE statistics SET documentary_clicks = documentary_clicks + 1 WHERE user_id = ?", [userId]);
	}
}

async function getUserGeneralClicks(userId) {
	const movieClicks = await getUserMovieClicks(userId);
	const tvSeriesClicks = await getUserTvSeriesClicks(userId);
	const kidsClicks = await getUserKidsClicks(userId);
	const documentaryClicks = await getUserDocumentaryClicks(userId);

	const userGeneralClicks = {
		movie_clicks: movieClicks,
		tv_series_clicks: tvSeriesClicks,
		kids_clicks: kidsClicks,
		documentary_clicks: documentaryClicks,
	};

	return userGeneralClicks;
}

module.exports = {
	getTop5Movies,
	getTop5TvSeries,
	getUserGeneralClicks,
	setUserMovieClicks,
	setUserTvSeriesClicks,
	setUserDocumentaryClicks,
	setUserKidsClicks,
};