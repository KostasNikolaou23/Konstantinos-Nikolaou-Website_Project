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

// Returns the actual value, not the MySQL result
async function getUserMovieClicks(userId) {
    const [rows] = await db.query("SELECT movie_clicks FROM statistics WHERE user_id = ?", [userId]);
    return rows.length > 0 ? rows[0].movie_clicks : 0;
}

async function getUserTvSeriesClicks(userId) {
    const [rows] = await db.query("SELECT tv_series_clicks FROM statistics WHERE user_id = ?", [userId]);
    return rows.length > 0 ? rows[0].tv_series_clicks : 0;
}

async function getUserKidsClicks(userId) {
    const [rows] = await db.query("SELECT kids_clicks FROM statistics WHERE user_id = ?", [userId]);
    return rows.length > 0 ? rows[0].kids_clicks : 0;
}

async function getUserDocumentaryClicks(userId) {
    const [rows] = await db.query("SELECT documentary_clicks FROM statistics WHERE user_id = ?", [userId]);
    return rows.length > 0 ? rows[0].documentary_clicks : 0;
}

async function setUserMovieClicks(userId) {
    const [user] = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);
    if (user.length === 0) {
        return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 1, 0, 0, 0)", [userId]);
    } else {
        return db.query("UPDATE statistics SET movie_clicks = movie_clicks + 1 WHERE user_id = ?", [userId]);
    }
}

async function setUserTvSeriesClicks(userId) {
    const [user] = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);
    if (user.length === 0) {
        return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 1, 0, 0)", [userId]);
    } else {
        return db.query("UPDATE statistics SET tv_series_clicks = tv_series_clicks + 1 WHERE user_id = ?", [userId]);
    }
}

async function setUserKidsClicks(userId) {
    const [user] = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);
    if (user.length === 0) {
        return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 0, 1, 0)", [userId]);
    } else {
        return db.query("UPDATE statistics SET kids_clicks = kids_clicks + 1 WHERE user_id = ?", [userId]);
    }
}

async function setUserDocumentaryClicks(userId) {
    const [user] = await db.query("SELECT * FROM statistics WHERE user_id = ?", [userId]);
    if (user.length === 0) {
        return db.query("INSERT INTO statistics (user_id, movie_clicks, tv_series_clicks, kids_clicks, documentary_clicks) VALUES (?, 0, 0, 0, 1)", [userId]);
    } else {
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
	getUserMovieClicks,
	getUserTvSeriesClicks,
	getUserKidsClicks,
	getUserDocumentaryClicks,
};