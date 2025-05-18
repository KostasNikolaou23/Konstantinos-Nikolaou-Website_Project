import { useEffect } from "react";
import ContentCategorySelector from "../Components/pages/ContentCategorySelector";
import AnalyticsPush from "../Components/pages/AnalyticsPush";

export function Movies() {
    useEffect(() => {
        console.log("useEffect triggered for Movies page"); // Debug log
        AnalyticsPush("movies"); // Push analytics for movies
    }, []);

    return (
        <div className="container">
            <ContentCategorySelector type="movies" />
        </div>
    );
}

export default Movies;
