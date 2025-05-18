import { useEffect } from "react";
import ContentCategorySelector from "../Components/pages/ContentCategorySelector";
import AnalyticsPush from "../Components/pages/AnalyticsPush";

export function TVSeries() {
    const genreMap = {
        10759: "Action & Adventure",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        9648: "Mystery",
        10763: "News",
        10764: "Reality",
        10765: "Sci-Fi & Fantasy",
        10766: "Soap",
        10767: "Talk",
        10768: "War & Politics",
        37: "Western",
    };

    useEffect(() => {
        console.log("useEffect triggered for Movies page"); // Debug log
        AnalyticsPush("tvseries");
    }, []);

    return (
        <div className="container">
            <ContentCategorySelector type="tvseries" genreMap={genreMap} />
        </div>
    );
}

export default TVSeries;