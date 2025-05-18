import { useEffect } from "react";
import ContentCategorySelector from "../Components/pages/ContentCategorySelector";
import AnalyticsPush from "../Components/pages/AnalyticsPush";

export function Kids() {
    const genreMapMovies = {
        10751: "Family",
    };

    const genreMapTV = {
        10751: "Family",
        16: "Animation",
        10762: "Kids",
    };

    useEffect(() => {
        console.log("useEffect triggered for Movies page"); // Debug log
        AnalyticsPush("kids");
    }, []);

    return (
        <div className="container">
            <h1>Kids Movies</h1>
            <ContentCategorySelector
                type="movies"
                genreMap={genreMapMovies}
                disableGenreSelection="true"
                limit="12"
            />
            <p></p>

            <h1>Kids TV</h1>
            <br />
            <ContentCategorySelector
                type="tvseries"
                genreMap={genreMapTV}
                disableGenreSelection="false"
                limit="12"
            />
        </div>
    );
}

export default Kids;