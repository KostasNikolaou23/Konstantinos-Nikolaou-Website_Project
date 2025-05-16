import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getMovieDetails, getTVDetails } from "../Components/API";
import { addMyList } from "../Components/UserAPI";

function ContentPreview({ type = "movie" }) {
    const { id } = useParams();
    const mvdb_id = id;

    const [details, setDetails] = useState(null);

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

    if (!details) {
        return <div>Loading...</div>;
    }

    const { title, name, overview, vote_average, poster_path, backdrop_path } =
        details;

    // Prefer backdrop, fallback to poster
    const image = backdrop_path
        ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
        : poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : null;

    return (
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
                        <Button variant="primary" size="lg">
                            Watch Now
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-primary" size="lg">
                            <i className="fa fa-star"></i> Rate it
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="danger"
                            size="lg"
                            onClick={() => addMyList(mvdb_id, type)}
                        >
                            <i className="fa fa-heart"></i>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ContentPreview;
