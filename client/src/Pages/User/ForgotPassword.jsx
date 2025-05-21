import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Username is required.");
            setSuccess(false);
        } else {
            setError("");
            setSuccess(true);
        }
    };

    return (
        <div className="container">
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {success && (
                <p style={{ color: "green" }}>
                    If the account exists, we will send a password reset email your way, so please check your inbox!
                </p>
            )}
            {!success && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default ForgotPassword;
