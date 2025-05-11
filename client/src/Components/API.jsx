// API Key:  b0812657fe4728b09b554c6593466d18
// API Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDgxMjY1N2ZlNDcyOGIwOWI1NTRjNjU5MzQ2NmQxOCIsIm5iZiI6MTU5MzU0Njg0NC43ODIsInN1YiI6IjVlZmI5ODVjNTViMGMwMDAzOTE2N2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPa6yN3TD96GKBmR-oirawc2PPjBwPoS1uiZlAKD0tw

let apiKey = "b0812657fe4728b09b554c6593466d18";

const url = "https://api.themoviedb.org/3/authentication";
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDgxMjY1N2ZlNDcyOGIwOWI1NTRjNjU5MzQ2NmQxOCIsIm5iZiI6MTU5MzU0Njg0NC43ODIsInN1YiI6IjVlZmI5ODVjNTViMGMwMDAzOTE2N2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPa6yN3TD96GKBmR-oirawc2PPjBwPoS1uiZlAKD0tw",
	},
};

fetch(url, options)
	.then((res) => res.json())
	// .then(json => console.log(json))
	.catch((err) => console.error(err));

/**
 * Function to get search results using the MovieDB API
 * @param {string} searchTerm - The term to search for.
 * @param {number} startPage - The starting page for results (default is 1).
 * @param {boolean} includeAdult - Whether to include adult content (default is false).
 * @param {string} language - The language of the results (e.g., "en-US").
 * @param {string} primaryReleaseYear - Filter results by the primary release year.
 * @param {string} region - Specify a region for the results (e.g., "US").
 * @param {string} year - Filter results by the year.
 * @returns {Promise<*>} - A promise resolving to the search results.
 */
async function getSearchResults(
	searchTerm,
	startPage = 1,
	includeAdult = false,
	language = "en-US",
	primaryReleaseYear = "",
	region = "",
	year = ""
) {
	const url = "https://api.themoviedb.org/3/search/movie";
	const params = new URLSearchParams({
		query: searchTerm,
		page: startPage,
		include_adult: includeAdult,
		language,
		primary_release_year: primaryReleaseYear,
		region,
		year,
		api_key: apiKey, // Use your API key
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching search results: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Error fetching search results:", error);
		throw error;
	}
}

/**
 * Function to get recommendations using getRecommendationsAsync
 * @param {number} page - The page number for recommendations.
 * @returns {Promise<*>} - A promise resolving to the recommendations.
 */
async function getRecommendations(page = 1) {}

async function getMovieDetails(movie_id) {
	const url = `https://api.themoviedb.org/3/movie/${movie_id}`;
	const params = new URLSearchParams({
		api_key: apiKey,
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching movie details: ${response.statusText}`);
		}

		const data = await response.json();
		console.log(data); // Log the full response to verify the structure
		return data; // Return the full movie details object
	} catch (error) {
		console.error("Error fetching movie details:", error);
		throw error;
	}
}

// Images

async function getImages(
	type,
	id,
	season_number = null,
	episode_number = null
) {
	let url = "";
	switch (type) {
		case "movie":
			url = `https://api.themoviedb.org/3/movie/${id}/images`;
			break;
		case "tv":
			url = `https://api.themoviedb.org/3/tv/${id}/images`;
			break;
		case "tvseason":
			url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/images`;
			break;
		case "tvepisode":
			url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}/images`;
			break;
		default:
			throw new Error(`Invalid type: ${type}`);
	}

	const params = new URLSearchParams({
		api_key: apiKey,
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			if (response.status === 404) {
				console.warn(`Resource not found for ID: ${id}`);
				return null; // Return null for 404 errors
			}
			const errorBody = await response.text();
			console.error(`Error response body: ${errorBody}`);
			throw new Error(`Error fetching images: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching images:", error);
		throw error;
	}
}

/**
 * Function to get trending movies for the week
 * @param {number} limit - The maximum number of movies to return (default is 10).
 * @returns {Promise<*>} - A promise resolving to the trending movies data.
 */

/**
 * Function to get trending content (movies or TV series)
 * @param {string} type - The type of content to fetch ('movies' or 'tvseries').
 * @param {number} limit - The maximum number of items to return (default is 10).
 * @returns {Promise<*>} - A promise resolving to the trending content data.
 */
async function getTrendingContent(type = "movies", limit = 10) {
	let url;

	if (type === "movies") {
		url = "https://api.themoviedb.org/3/trending/movie/week";
	} else if (type === "tvseries") {
		url = "https://api.themoviedb.org/3/trending/tv/day";
	} else {
		throw new Error("Invalid type. Use 'movies' or 'tvseries'.");
	}

	const params = new URLSearchParams({
		api_key: apiKey, // Use your API key
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${apiKey}`, // Add the Authorization header
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching trending content: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results.slice(0, limit); // Limit the number of returned items
	} catch (error) {
		console.error("Error fetching trending content:", error);
		throw error;
	}
}

/**
 * Function to discover content (movies or TV series) based on genre and type
 * @param {string} type - The type of content to fetch ('movies' or 'tvseries').
 * @param {string} genre_ids - A comma-separated list of genre IDs to filter by.
 * @param {number} limit - The maximum number of items to return (default is 10).
 * @returns {Promise<*>} - A promise resolving to the discovered content data.
 */
async function discoverContent(type, genre_ids, limit = 10) {
	let url;

	if (type === "movies") {
		url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=2025&sort_by=popularity.desc&with_genres=${genre_ids}`;
	} else if (type === "tvseries") {
		url = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&&primary_release_year=2025sort_by=popularity.desc&with_genres=${genre_ids}`;
	} else {
		throw new Error("Invalid type. Use 'movies' or 'tvseries'.");
	}

	const params = new URLSearchParams({
		api_key: apiKey, // Use your API key
	});

	try {
		const response = await fetch(`${url}&${params.toString()}`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching discovered content: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results.slice(0, limit); // Limit the number of returned items
	} catch (error) {
		console.error("Error fetching discovered content:", error);
		throw error;
	}
}

module.exports = {
	getSearchResults,
	getRecommendations,
	getMovieDetails,
	getImages,
	getTrendingContent,
	discoverContent,
};
