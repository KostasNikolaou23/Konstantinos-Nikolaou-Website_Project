import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import defaultPicture from "../../Components/pages/User/Profile/default-user.jpg";
import { fetchUserProfile } from "../../Components/UserAPI";

export default function Profile({ view_profile = false }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        async function loadProfile() {
            try {
                let data;
                if (view_profile) {
                    // Fetch current user's profile
                    data = await fetchUserProfile();
                } else if (username) {
                    // Fetch another user's profile (implement this endpoint in your backend)
                    const response = await fetch(`http://localhost:5000/api/user/profile/${username}`);
                    if (!response.ok) throw new Error("Failed to fetch user profile");
                    data = await response.json();
                }
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        }
        loadProfile();
    }, [view_profile, username]);

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Row className="align-items-start">
                <Col xs="12" md="auto" className="text-start">
                    <img
                        src={defaultPicture}
                        alt="Profile"
                        className="profile-pic"
                        style={{ maxWidth: "150px", maxHeight: "150px", borderRadius: "50%" }}
                    />
                    <h2 style={{ marginTop: "1rem", textAlign: "center" }}>
                        {userData ? userData.username : "Loading..."}
                    </h2>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Badges</Card.Title>
                            <div style={{ marginBottom: "1rem" }}>
                                {userData && userData.badges && userData.badges.length > 0 ? (
                                    userData.badges.map((badge, idx) => (
                                        <Badge key={idx} bg="info" pill style={{ marginRight: "8px" }}>
                                            {badge}
                                        </Badge>
                                    ))
                                ) : (
                                    <span>No badges yet.</span>
                                )}
                            </div>
                            <Card.Title>My Achievements</Card.Title>
                            <ul>
                                {userData &&
                                userData.achievements &&
                                userData.achievements.length > 0 ? (
                                    userData.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)
                                ) : (
                                    <li>No achievements yet.</li>
                                )}
                            </ul>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
