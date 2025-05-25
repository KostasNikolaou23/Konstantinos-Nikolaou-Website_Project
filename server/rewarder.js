const db = require("./db"); // Assuming you have a database module to handle DB operations

const jamesbond_movies = [
	646,
	657,
	658,
	660,
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

// Get Content details
async function getContentDetails(mvdbID, type) {
	const url = `https://api.themoviedb.org/3/${type}/${mvdbID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching content details:", error);
		throw error;
	}
}

// Get content keywords
async function getContentKeywords(mvdbID, type) {
	const url = `https://api.themoviedb.org/3/${type}/${mvdbID}/keywords?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching content keywords:", error);
		throw error;
	}
}

// Achievement Functions
// ------------------------------------------
// Watch 100 movies
async function thisistheendRewarder(userId) {
    // Check if achievement already exists
    const [achRows] = await db.query(
        "SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 1",
        [userId]
    );
    if (achRows.length > 0) {
        console.log(`User ${userId} already has achievement 1.`);
        return;
    }

    // Only if not, do the calculation
    const sql = `
        SELECT COUNT(*) AS count
        FROM ratings
        WHERE user_id = ?
          AND type = 'movie'
    `;
    const params = [userId];
    try {
        const [rows] = await db.query(sql, params);
        const count = rows[0].count;

        // Fetch the goal from the achievements table
        const [achievementRows] = await db.query(
            "SELECT goal FROM achievements WHERE id = 1"
        );

        if (achievementRows.length > 0) {
            const requiredCount = achievementRows[0].goal;

            if (count >= requiredCount) {
                await db.query(
                    "INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
                    [userId, 1]
                );
                console.log(`Achievement 1 awarded to user ${userId}`);
            } else {
                console.log(`User ${userId} has watched ${count} movies.`);
            }
        }
    } catch (error) {
        console.error("Error in thisistheendRewarder:", error);
    }
}

async function jamesbondRewarder(userId) {
    // Check if achievement already exists
    const [achRows] = await db.query(
        "SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 2",
        [userId]
    );
    if (achRows.length > 0) {
        console.log(`User ${userId} already has James Bond achievement.`);
        return;
    }

    // Only if not, do the calculation
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

        // Fetch the goal from the achievements table
        const [achievementRows] = await db.query(
            "SELECT goal FROM achievements WHERE id = 2"
        );

        if (achievementRows.length > 0) {
            const requiredCount = achievementRows[0].goal;

            if (count >= requiredCount) {
                await db.query(
                    "INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
                    [userId, 2]
                );
                console.log(`Achievement 2 awarded to user ${userId}`);
            } else {
                console.log(`User ${userId} has watched ${count} James Bond movies.`);
            }
        }
    } catch (error) {
        console.error("Error in jamesbondRewarder:", error);
    }
}

async function seriesJunkieRewarder(userId) {
    // Check if achievement already exists
    const [achRows] = await db.query(
        "SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 3",
        [userId]
    );
    if (achRows.length > 0) {
        console.log(`User ${userId} already has achievement 3.`);
        return;
    }

    // Only if not, do the calculation
    const sql = `
        SELECT COUNT(*) AS count
        FROM ratings
        WHERE user_id = ?
          AND type = 'tvseries'
    `;
    const params = [userId];
    try {
        const [rows] = await db.query(sql, params);
        const count = rows[0].count;

        // Fetch the goal from the achievements table
        const [achievementRows] = await db.query(
            "SELECT goal FROM achievements WHERE id = 3"
        );

        if (achievementRows.length > 0) {
            const requiredCount = achievementRows[0].goal;

            if (count >= requiredCount) {
                await db.query(
                    "INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
                    [userId, 3]
                );
                console.log(`Achievement 3 awarded to user ${userId}`);
            } else {
                console.log(`User ${userId} has watched ${count} TV series.`);
            }
        }
    } catch (error) {
        console.error("Error in seriesJunkieRewarder:", error);
    }
}

async function iambatmanRewarder(userId) {
    // Check if achievement already exists
    const [achRows] = await db.query(
        "SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 4",
        [userId]
    );
    if (achRows.length > 0) {
        console.log(`User ${userId} already has achievement 4.`);
        return;
    }

    // Only if not, do the calculation
    const sql = `
        SELECT mvdb_id
        FROM ratings
        WHERE user_id = ?
    `;
    const params = [userId];
    try {
        const [rows] = await db.query(sql, params);
        const mvdbIds = rows.map((row) => row.mvdb_id);

        // Fetch the goal from the achievements table
        const [achievementRows] = await db.query(
            "SELECT goal FROM achievements WHERE id = 4"
        );

        // check for keyword superhero for every movie
        let superheromovies = 0;
        for (const mvdbId of mvdbIds) {
            const keywords = await getContentKeywords(mvdbId, "movie");
            const hasSuperheroKeyword = keywords.keywords.some(
                (keyword) => keyword.name.toLowerCase() === "superhero"
            );
            if (hasSuperheroKeyword) {
                superheromovies++;
            }
        }

        if (achievementRows.length > 0) {
            const requiredCount = achievementRows[0].goal;

            if (superheromovies >= requiredCount) {
                await db.query(
                    "INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
                    [userId, 4]
                );
                console.log(`Achievement 4 awarded to user ${userId}`);
            } else {
                console.log(
                    `User ${userId} has watched ${superheromovies} superhero movies.`
                );
            }
        }
    } catch (error) {
        console.error("Error in iambatmanRewarder:", error);
    }
}

async function scaredyetRewarder(userId) {
		// Check if achievement already exists
		const [achRows] = await db.query(
				"SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 5",
				[userId]
		);
		if (achRows.length > 0) {
				console.log(`User ${userId} already has achievement 5.`);
				return;
		}

		// Only if not, do the calculation
		const sql = `
				SELECT mvdb_id
				FROM ratings
				WHERE user_id = ?
		`;
		const params = [userId];
		try {
				const [rows] = await db.query(sql, params);
				const mvdbIds = rows.map((row) => row.mvdb_id);

				// Fetch the goal from the achievements table
				const [achievementRows] = await db.query(
						"SELECT goal FROM achievements WHERE id = 5"
				);

				// check for keyword horror for every movie
				let horrormovies = 0;
				for (const mvdbId of mvdbIds) {
						const movieDetails = await getContentDetails(mvdbId, "movie");
						const genres = movieDetails.genres;

						const isHorrorMovie = genres.some(
								(genre) => genre.name.toLowerCase() === "horror"
						);

						if (isHorrorMovie) {
								horrormovies++;
						}
				}

				if (achievementRows.length > 0) {
						const requiredCount = achievementRows[0].goal;

						if (horrormovies >= requiredCount) {
								await db.query(
										"INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
										[userId, 5]
								);
								console.log(`Achievement 5 awarded to user ${userId}`);
						} else {
								console.log(
										`User ${userId} has watched ${horrormovies} horror movies.`
								);
						}
				}
		} catch (error) {
				console.error("Error in scaredyetRewarder:", error);
		}
}

async function childishRewarder(userId) {
	// watch 20 kids shows/movies
	// Check if achievement already exists
	const [achRows] = await db.query(
		"SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = 6",
		[userId]
	);
	
	if (achRows.length > 0) {
		console.log(`User ${userId} already has achievement 6.`);
		return;
	}
	
	console.log(`Checking user ${userId} for kids content`);
	// Only if not, do the calculation
	const sql = `
		SELECT mvdb_id
		FROM ratings
		WHERE user_id = ?
	`;
	const params = [userId];

	try {
		const [rows] = await db.query(sql, params);
		const mvdbIds = rows.map((row) => row.mvdb_id);

		// Fetch the goal from the achievements table
		const [achievementRows] = await db.query(
			"SELECT goal FROM achievements WHERE id = 6"
		);

		// check for keyword kids for every movie
		let kidscontent = 0;
		for (const mvdbId of mvdbIds) {
			const movieDetails = await getContentDetails(mvdbId, "movie");
			const tvDetaisl	= await getContentDetails(mvdbId, "tv");
			const genres = movieDetails.genres;
			const tvgenres = tvDetaisl.genres;
			const isKidsMovie = genres.some(
				(genre) => genre.name.toLowerCase() === "family"
			);
			const isKidsTV = tvgenres.some(
				(genre) => genre.name.toLowerCase() === "family"
			);
			if (isKidsMovie || isKidsTV) {
				kidscontent++;
			}
		}
		if (achievementRows.length > 0) {
			const requiredCount = achievementRows[0].goal;

			if (kidscontent >= requiredCount) {
				await db.query(
					"INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)",
					[userId, 6]
				);
				console.log(`Achievement 6 awarded to user ${userId}`);
			} else {
				console.log(
					`User ${userId} has watched ${kidscontent} kids movies/shows.`
				);
			}
		}

	}
	catch (error) {
		console.error("Error in childishRewarder:", error);
	}
}


// General function to check user achievement progress
async function checkUserAchievementProgress(userId, mvdbID, type) {
	console.log(`Checking user ${userId} for movie ID ${mvdbID}`);

	const numericMvdbID = Number(mvdbID);

	childishRewarder(userId);

	if (type === "movie") {
		console.log(`User ${userId} has watched a movie: ${mvdbID}`);
		await thisistheendRewarder(userId);
		if (jamesbond_movies.includes(numericMvdbID)) {
			await jamesbondRewarder(userId);
			console.log(`User ${userId} has watched a James Bond movie: ${mvdbID}`);
		}
		
	} else if (type === "tvseries") {
		await seriesJunkieRewarder(userId);
		console.log(`User ${userId} has watched a TV series: ${mvdbID}`);
	}
}

module.exports = {
	checkUserAchievementProgress,
};
