import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import defaultPicture from "../../Components/pages/User/Profile/default-user.jpg";
import { useParams } from "react-router-dom";

export function Profile({ profile_picture = null, user_editing = false }) {
    const { username } = useParams(); // Extract username from the route
    const [userData, setUserData] = useState(null); // State to store user data
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/get/${username}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data); // Set the user data from the response
            } catch (err) {
                setError(err.message);
            }
        }

        if (username) {
            fetchUserData();
        }
    }, [username]);

    // Helper function to format the joined date
    const formatDate = (isoDate) => {
        if (!isoDate) return "Loading...";
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    };

    return (
        <Container>
            <Row>
                {/* Main Row */}
                <h1>{username ? username : "Failed to get username"}</h1>

                <Col>
                    {profile_picture ? (
                        <img
                            src={defaultPicture}
                            alt="Profile"
                            className="profile-pic"
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="profile-pic"
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                        />
                    )}
                </Col>

                <Col>
                    <h5>
                        User ID: {userData ? userData.userid : "Loading..."}
                        <br />
                        Joined: {userData ? formatDate(userData.joined) : "Loading..."}
                    </h5>
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    <Badge bg="primary" pill>
                        Active
                    </Badge>
                    <Badge bg="secondary" pill>
                        Inactive
                    </Badge>
                    <Badge bg="success" pill>
                        Completed
                    </Badge>
                </Col>
            </Row>

            <Row>
                <p>Welcome to your profile page!</p>
                <p>Here you can view and edit your personal information.</p>
                <p>Feel free to explore the other sections of the site as well.</p>

                {user_editing ? (
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                ) : null}
            </Row>
        </Container>
    );
}

export default Profile;
