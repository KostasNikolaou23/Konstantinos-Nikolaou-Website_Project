import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import defaultPicture from "../../Components/pages/User/Profile/default-user.jpg";

export default function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch("http://localhost:5000/api/user/me", {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchProfile();
    }, []);

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
                                {userData && userData.achievements && userData.achievements.length > 0 ? (
                                    userData.achievements.map((ach, idx) => (
                                        <li key={idx}>{ach}</li>
                                    ))
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
