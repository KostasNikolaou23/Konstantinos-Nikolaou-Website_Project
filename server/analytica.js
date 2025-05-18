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

function setUserMovieClicks(userId, clicks) {
	return db.query("UPDATE statistics SET movie_clicks = ? WHERE user_id = ?", [clicks, userId]);
}

function setUserTvSeriesClicks(userId, clicks) {
	return db.query("UPDATE statistics SET tv_series_clicks = ? WHERE user_id = ?", [clicks, userId]);
}

function setUserKidsClicks(userId, clicks) {
	return db.query("UPDATE statistics SET kids_clicks = ? WHERE user_id = ?", [clicks, userId]);
}

function setUserDocumentaryClicks(userId, clicks) {
	return db.query("UPDATE statistics SET documentary_clicks = ? WHERE user_id = ?", [clicks, userId]);
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