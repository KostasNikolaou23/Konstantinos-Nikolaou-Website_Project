import { useState, useEffect } from "react";
import { getTrendingContent } from "../Components/API";
import GridItem from "../Components/pages/Home/GridItem";

function Home() {
    const [trendingContent, setTrendingContent] = useState({
        movies: [],
        tvseries: [],
    });

    useEffect(() => {
        async function fetchContent() {
            try {
                // Fetch trending movies and TV series
                const movies = await getTrendingContent("movies", 4);
                const tvSeries = await getTrendingContent("tvseries", 4);

                setTrendingContent({
                    movies,
                    tvseries: tvSeries,
                });
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        }

        fetchContent();
    }, []);

    return (
        <div className="container fluid">
            {/* Movies Section */}
            <div className="row align-items-center">
                <div className="col">
                    <h2>Movies</h2>
                </div>
                <div className="col"></div>
                <div className="col d-flex justify-content-end">
                    <button className="watch-button">View More</button>
                </div>
            </div>
            <section className="grid">
                {trendingContent.movies.map((movie, index) => (
                    <GridItem
                        key={index}
                        cardName={movie.title}
                        cardDesc={movie.overview}
                        cardImage={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : "path/to/fallback-image.jpg"
                        }
                        enableFavoriteButton={true} // Enable favorite button for movies
                        enableReviewButton={true} // Enable review button for movies
                    />
                ))}
            </section>

            {/* TV Series Section */}
            <div className="row align-items-center">
                <div className="col">
                    <h2>TV Series</h2>
                </div>
                <div className="col"></div>
                <div className="col d-flex justify-content-end">
                    <a href="/tvseries">
                        <button className="watch-button">View More</button>
                    </a>
                </div>
            </div>
            <section className="grid">
                {trendingContent.tvseries.map((series, index) => (
                    <GridItem
                        key={index}
                        cardName={series.name} // Use `name` for TV series
                        cardDesc={series.overview}
                        cardImage={
                            series.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${series.poster_path}`
                                : "path/to/fallback-image.jpg"
                        }
                        enableFavoriteButton={true} // Enable favorite button for TV series
                        enableReviewButton={true} // Enable review button for TV series
                    />
                ))}
            </section>
        </div>
    );
}

export default Home;