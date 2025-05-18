import { useEffect } from "react";
import ContentCategorySelector from "../Components/pages/ContentCategorySelector";
import AnalyticsPush from "../Components/pages/AnalyticsPush";

export function Documentaries() {
    useEffect(() => {
        console.log("useEffect triggered for Movies page"); // Debug log
        AnalyticsPush("documentary");
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Movie Documentaries</h1>
            <ContentCategorySelector
                type="movies"
                genreMap={{ 99: "Documentary" }}
                limit="12"
                disableGenreSelection="true"
            />

            <h1 className="text-center">TV Documentaries</h1>
            <ContentCategorySelector
                type="tvseries"
                genreMap={{ 99: "Documentary" }}
                limit="12"
                disableGenreSelection="true"
            />
        </div>
    );
}

export default Documentaries;