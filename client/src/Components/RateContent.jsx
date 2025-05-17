import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
    getMovieDetails,
    getTVDetails,
} from "./API";
import { getSession } from "./UserAPI";

export default function RateContent() {
    const { type, id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [initialRating, setInitialRating] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAll() {
            setLoading(true);
            try {
                // Check session
                const session = await getSession();
                if (!session.userid) {
                    setLoggedIn(false);
                    setLoading(false);
                    return;
                }
                setLoggedIn(true);
                setUsername(session.username);

                // Fetch content details
                let details;
                if (type === "movie") {
                    details = await getMovieDetails(id);
                } else if (type === "tvseries") {
                    details = await getTVDetails(id);
                } else {
                    setError("Invalid content type");
                    setLoading(false);
                    return;
                }
                setData(details);

                // Fetch user's previous rating
                const resp = await fetch(
                    `http://localhost:5000/api/getRating/${session.userid}/${id}/${type}`,
                    { credentials: "include" }
                );
                if (resp.ok) {
                    const { rating: prevRating } = await resp.json();
                    setInitialRating(prevRating);
                    setRating(prevRating);
                } else {
                    setInitialRating(null);
                    setRating(0);
                }
            } catch (err) {
                setError("Error fetching details");
            }
            setLoading(false);
        }
        fetchAll();
        // eslint-disable-next-line
    }, [type, id]);

    const handleStarClick = (star) => {
        setRating(star);
        setSuccess(false);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSuccess(false);
        try {
            const session = await getSession();
            if (!session.userid) {
                alert("You must be logged in to rate.");
                setSubmitting(false);
                return;
            }
            const response = await fetch("http://localhost:5000/api/setRating", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    userID: session.userid,
                    mvdbID: id,
                    type,
                    rating,
                }),
            });
            if (response.ok) {
                setSuccess(true);
                setInitialRating(rating);
            } else {
                alert("Failed to submit rating.");
            }
        } catch (err) {
            alert("Error submitting rating.");
        }
        setSubmitting(false);
    };

    if (error) return <div>{error}</div>;
    if (loading || !data) return <div>Loading...</div>;

    const { poster_path, backdrop_path } = data;
    const image = backdrop_path
        ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
        : poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : null;
    const name = data.original_title || data.title || data.name;

    return (
        <Card
            className="my-4 mx-auto"
            style={{ maxWidth: "700px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
            {image && (
                <Card.Img
                    variant="top"
                    src={image}
                    alt={name}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                />
            )}
            <Card.Body>
                <Card.Title
                    as="h2"
                    className="mb-3 d-flex align-items-center justify-content-between"
                >
                    {name}
                </Card.Title>
                {!loggedIn ? (
                    <div style={{ color: "red", fontSize: "1.2rem" }}>
                        You must be logged in to rate this content.
                    </div>
                ) : (
                    <>
                        <Card.Text style={{ alignContent: "center", fontSize: "1.15rem" }}>
                            Leave your rating for this {type === "movie" ? "movie" : "TV series"}!
                        </Card.Text>
                        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        cursor: "pointer",
                                        color: star <= rating ? "#FFD700" : "#ccc",
                                        transition: "color 0.2s",
                                    }}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        {initialRating && (
                            <div style={{ marginBottom: "1rem", color: "#555" }}>
                                Your previous rating: <b>{initialRating} ★</b>
                            </div>
                        )}
                        <Button
                            variant="primary"
                            disabled={submitting || rating === 0}
                            onClick={handleSubmit}
                        >
                            {submitting ? "Submitting..." : "Submit Rating"}
                        </Button>
                        {success && (
                            <div style={{ color: "green", marginTop: "1rem" }}>
                                Thank you for your rating!
                            </div>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
