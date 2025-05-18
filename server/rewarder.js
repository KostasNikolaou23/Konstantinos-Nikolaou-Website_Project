const db = require("./db"); // Assuming you have a database module to handle DB operations

const jamesbond_movies = [
	646,
	657,
	658, //dr. no
	660, //thunderball
	667,
	668,
	681,
	253,
	682,
	691,
	698,
	699,
	700,
	36670,
	707,
	708,
	709,
	710,
	714,
	36643,
	36669,
	36557,
	10764,
	37724,
	206647,
	370172,
];

// Achievement Functions
// Watch 10 James Bond movies
async function jamesbondRewarder(userId) {

	// Query for ratings
	const placeholders = jamesbond_movies.map(() => "?").join(",");
	const sql = `
        SELECT COUNT(*) AS count
        FROM ratings
        WHERE user_id = ?
          AND type = 'movie'
          AND mvdb_id IN (${placeholders})
    `;
	const params = [userId, ...jamesbond_movies];

	try {
		const [rows] = await db.query(sql, params);
		const count = rows[0].count;

		if (count >= 10) {
			// Check if achievement already exists
			const [achRows] = await db.query(
				"SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 2",
				[userId]
			);

			if (achRows.length === 0) {
				// Insert achievement
				await db.query(
					"INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
					[userId, 2]
				);
				console.log(`Achievement 2 awarded to user ${userId}`);
			}
		}
		else {
			console.log(`User ${userId} has watched ${count} James Bond movies.`);
		}
	} catch (error) {
		console.error("Error in jamesbondRewarder:", error);
	}
}


// General function to check user achievement progress
async function checkUserAchievementProgress(userId, mvdbID) {
    console.log(`Checking user ${userId} for movie ID ${mvdbID}`);

    const numericMvdbID = Number(mvdbID);
    if (jamesbond_movies.includes(numericMvdbID)) {
        await jamesbondRewarder(userId);
        console.log(`User ${userId} has watched a James Bond movie: ${mvdbID}`);
    }
}

module.exports = {
	checkUserAchievementProgress,
};
