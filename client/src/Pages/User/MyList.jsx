import { useEffect, useState } from "react";
import GridCard from "../../Components/pages/User/MyList/GridCard";
import API from "../../Components/API";
import { getSession } from "../../Components/UserAPI";

export function MyList() {
    const [type, setType] = useState("movie"); // "movie" or "tvseries"
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Caches for lists and details
    const [movieList, setMovieList] = useState([]);
    const [tvList, setTvList] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});
    const [tvDetails, setTvDetails] = useState({});

    // Current view
    const myList = type === "movie" ? movieList : tvList;
    const detailsCache = type === "movie" ? movieDetails : tvDetails;

    // Fetch list only if not already cached
    useEffect(() => {
        async function fetchMyList() {
            setLoading(true);
            setError(null);
            try {
                const session = await getSession();
                if (!session.userid) {
                    setError("You must be logged in to view your list.");
                    setLoading(false);
                    return;
                }
                let endpoint, setList, listCache;
                if (type === "movie") {
                    endpoint = `http://localhost:5000/api/mylist/movies/${session.userid}`;
                    setList = setMovieList;
                    listCache = movieList;
                } else {
                    endpoint = `http://localhost:5000/api/mylist/tvseries/${session.userid}`;
                    setList = setTvList;
                    listCache = tvList;
                }
                if (listCache.length > 0) {
                    setLoading(false);
                    return;
                }
                const response = await fetch(endpoint, { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch MyList");
                const data = await response.json();
                const list = Array.isArray(data.movies)
                    ? data.movies
                    : Array.isArray(data.tvseries)
                        ? data.tvseries
                        : [];
                setList(list);
            } catch (err) {
                setError("Error fetching your list.");
            }
            setLoading(false);
        }
        fetchMyList();
        // eslint-disable-next-line
    }, [type]);

    // Fetch details only for items not already cached
    useEffect(() => {
        async function fetchDetails() {
            let detailsCache = type === "movie" ? movieDetails : tvDetails;
            let setDetails = type === "movie" ? setMovieDetails : setTvDetails;
            const newDetails = { ...detailsCache };
            let updated = false;
            for (const item of myList) {
                if (!newDetails[item.mvdbID]) {
                    try {
                        let posterResponse, detailsResponse;
                        if (type === "movie") {
                            posterResponse = await API.getImages("movie", item.mvdbID);
                            detailsResponse = await API.getMovieDetails(item.mvdbID);
                        } else {
                            posterResponse = await API.getImages("tv", item.mvdbID);
                            detailsResponse = await API.getTVDetails(item.mvdbID);
                        }
                        if (detailsResponse && (detailsResponse.title || detailsResponse.name)) {
                            newDetails[item.mvdbID] = {
                                poster: posterResponse?.posters?.[0]?.file_path || null,
                                title: detailsResponse.title || detailsResponse.name || "Unknown Title"
                            };
                        } else {
                            newDetails[item.mvdbID] = {
                                poster: null,
                                title: "Unknown Title"
                            };
                        }
                        updated = true;
                    } catch {
                        newDetails[item.mvdbID] = {
                            poster: null,
                            title: "Unknown Title"
                        };
                        updated = true;
                    }
                }
            }
            if (updated) setDetails(newDetails);
        }
        if (myList.length > 0) {
            fetchDetails();
        }
        // eslint-disable-next-line
    }, [myList, type]);

    return (
        <div className="container">
            <div style={{ margin: "1rem 0" }}>
                <button
                    className={`btn btn-${type === "movie" ? "primary" : "outline-primary"} mx-2`}
                    onClick={() => setType("movie")}
                >
                    Movies
                </button>
                <button
                    className={`btn btn-${type === "tvseries" ? "primary" : "outline-primary"} mx-2`}
                    onClick={() => setType("tvseries")}
                >
                    TV Series
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : (
                <section className="grid">
                    {(Array.isArray(myList) && myList.length === 0) ? (
                        <div>No items in your {type === "movie" ? "movie" : "TV series"} list.</div>
                    ) : (
                        (Array.isArray(myList) ? myList : []).map((item, index) => {
                            const details = detailsCache[item.mvdbID] || {};
                            if (details.title === "Unknown Title") return null;
                            const baseUrl = "https://image.tmdb.org/t/p/w200/";
                            const poster = details.poster
                                ? `${baseUrl}${details.poster}`
                                : "path/to/fallback-image.jpg";
                            return (
                                <GridCard
                                    key={index}
                                    name={details.title || "Loading..."}
                                    poster={poster}
                                    type={type}
                                    added={item.added}
                                    mvdbID={item.mvdbID} // <-- Add this line!
                                    enableWatchButton={true}
                                    enableFavoriteButton={true}
                                    
                                />
                            );
                        })
                    )}
                </section>
            )}
        </div>
    );
}

export default MyList;
