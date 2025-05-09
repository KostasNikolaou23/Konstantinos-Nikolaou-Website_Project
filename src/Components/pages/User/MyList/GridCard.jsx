import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";

export function GridCard({
    name,
    poster,
    type,
    added,
}) {
    return (
        <div className="card">
            <img src={poster} alt={name} className="card-image" />
            <div className="card-content">
                <h2 className="card-seriesname">{name}</h2> {/* Fixed className */}
                <Stack gap={3}>
                    Added: {added} <br />
                </Stack>
            </div>
        </div>
    );
}

export default GridCard;