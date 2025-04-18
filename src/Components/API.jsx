// API Key:  b0812657fe4728b09b554c6593466d18
// API Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDgxMjY1N2ZlNDcyOGIwOWI1NTRjNjU5MzQ2NmQxOCIsIm5iZiI6MTU5MzU0Njg0NC43ODIsInN1YiI6IjVlZmI5ODVjNTViMGMwMDAzOTE2N2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPa6yN3TD96GKBmR-oirawc2PPjBwPoS1uiZlAKD0tw


let apiKey = 'b0812657fe4728b09b554c6593466d18';

const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDgxMjY1N2ZlNDcyOGIwOWI1NTRjNjU5MzQ2NmQxOCIsIm5iZiI6MTU5MzU0Njg0NC43ODIsInN1YiI6IjVlZmI5ODVjNTViMGMwMDAzOTE2N2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPa6yN3TD96GKBmR-oirawc2PPjBwPoS1uiZlAKD0tw'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

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
async function getRecommendations(page = 1) {

}

module.exports = {
  getSearchResults,
  getRecommendations,
};