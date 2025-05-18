import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getMovieDetails, getTVDetails } from "../Components/API";
import { addMyList, removeFromMyList, isInMyList, getRecommendations } from "../Components/UserAPI";

function ContentPreview({ type = "movie" }) {
    const { id } = useParams();
    const mvdb_id = id;
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [inMyList, setInMyList] = useState(false);
    const [loadingMyList, setLoadingMyList] = useState(true);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchDetails() {
            if (!mvdb_id) return;
            try {
                let data;
                if (type === "movie") {
                    data = await getMovieDetails(mvdb_id);
                } else if (type === "tvseries") {
                    data = await getTVDetails(mvdb_id);
                }
                setDetails(data);
            } catch (error) {
                setDetails(null);
            }
        }
        fetchDetails();
    }, [mvdb_id, type]);

    useEffect(() => {
        async function checkList() {
            setLoadingMyList(true);
            const exists = await isInMyList(mvdb_id, type);
            setInMyList(exists);
            setLoadingMyList(false);
        }
        if (mvdb_id) {
            checkList();
        }
    }, [mvdb_id, type]);

    // Fetch recommendations
    useEffect(() => {
        async function fetchRecs() {
            if (!mvdb_id) return setRecommendations([]);
            const recs = await getRecommendations(mvdb_id, type);
            setRecommendations(recs);
        }
        fetchRecs();
    }, [mvdb_id, type]);

    const handleMyListClick = async () => {
        if (inMyList) {
            await removeFromMyList(mvdb_id, type);
            setInMyList(false);
        } else {
            await addMyList(mvdb_id, type);
            setInMyList(true);
        }
    };

    const handleWatchNow = () => {
        navigate(`/watchnow/${type}/${mvdb_id}`);
    };

    if (!details) {
        return <div>Loading...</div>;
    }

    const { title, name, overview, vote_average, poster_path, backdrop_path } = details;

    // Prefer backdrop, fallback to poster
    const image = backdrop_path
        ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
        : poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : null;

    return (
        <div>
            <Card
                className="my-4 mx-auto"
                style={{ maxWidth: "700px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
            >
                {image && (
                    <Card.Img
                        variant="top"
                        src={image}
                        alt={title || name}
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                )}
                <Card.Body>
                    <Card.Title
                        as="h2"
                        className="mb-3 d-flex align-items-center justify-content-between"
                    >
                        {title || name}

                        {vote_average !== undefined && (
                            <Badge bg="success" pill style={{ fontSize: "1.1rem" }}>
                                <i
                                    className="fa fa-star"
                                    style={{ color: "#FFD700", marginRight: "6px" }}
                                ></i>
                                {vote_average}
                            </Badge>
                        )}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1.15rem" }}>{overview}</Card.Text>
                    <Row className="mt-4">
                        <Col xs="auto">
                            <Button variant="primary" size="lg" onClick={handleWatchNow}>
                                Watch Now
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="outline-primary"
                                size="lg"
                                onClick={() => navigate(`/rate/${type}/${mvdb_id}`)}
                            >
                                <i className="fa fa-star"></i> Rate it
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant={inMyList ? "outline-danger" : "danger"}
                                size="lg"
                                onClick={handleMyListClick}
                                disabled={loadingMyList}
                            >
                                <i className={inMyList ? "fa fa-heart-broken" : "fa fa-heart"}></i>
                                {inMyList ? " Remove from MyList" : " Add to MyList"}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Recommendations Section */}
            <div className="container mb-4">
                <div style={{ height: "2rem" }}></div> {/* Spacer */}
                <h4 className="text-center">Movie Cave Recommends</h4>
                <div style={{ height: "2rem" }}></div> {/* Spacer */}
                <div className="d-flex justify-content-center">
                        {recommendations.length === 0 && <div>No recommendations found.</div>}
                        {recommendations.map((rec) => (
                            <>
                                <div
                                    key={rec.id}
                                    className="card"
                                    style={{
                                        minWidth: "200px",
                                        maxWidth: "200px",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                        border: "none",
                                        transition: "transform 0.15s",
                                        willChange: "transform",
                                    }}
                                    onClick={() => navigate(`/${type}/${rec.id}`)}
                                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <img
                                        src={
                                            rec.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${rec.poster_path}`
                                                : "https://via.placeholder.com/200x300?text=No+Image"
                                        }
                                        alt={rec.title || rec.name}
                                        className="card-image"
                                        style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "cover",
                                            borderTopLeftRadius: "8px",
                                            borderTopRightRadius: "8px"
                                        }}
                                    />
                                    <div className="card-content" style={{ padding: "0.75rem" }}>
                                        <h5
                                            style={{
                                                fontSize: "1.05rem",
                                                fontWeight: 600,
                                                margin: "0 0 0.5rem 0",
                                                color: "#007bff",
                                                textDecoration: "underline",
                                                cursor: "pointer",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}
                                            title={rec.title || rec.name}
                                        >
                                            {rec.title || rec.name}
                                        </h5>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            color: "#444",
                                            margin: 0,
                                            minHeight: "2.5em",
                                            whiteSpace: "normal",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {rec.overview
                                                ? rec.overview.length > 90
                                                    ? rec.overview.substring(0, 90) + "..."
                                                    : rec.overview
                                                : "No description available."}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ width: "1rem" }}></div> {/* Spacer */}
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ContentPreview;
