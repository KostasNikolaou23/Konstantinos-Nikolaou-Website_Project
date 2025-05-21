import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include", // Include cookies in the request and response
            });

            if (!response.ok) {
                throw new Error("Invalid credentials or server error");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Notify other components (like Header) to refresh session
            window.dispatchEvent(new Event("sessionUpdate"));

            // Redirect to the home page on successful login
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
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

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <div style={{ marginTop: "1rem" }}>
                    Forgot your password?{" "}
                    <a href="/user/forgotpassword">Reset it here!</a>
                </div>

                <br />

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;
