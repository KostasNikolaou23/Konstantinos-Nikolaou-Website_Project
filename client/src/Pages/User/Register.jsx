import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!email || !username || !password || !repeatPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!agree) {
            setError("You must agree with the terms of service.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });
            if (response.ok) {
                setSuccess(true);
                setEmail("");
                setUsername("");
                setPassword("");
                setRepeatPassword("");
                setAgree(false);
            } else {
                const data = await response.json();
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formRepeatPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="I agree with the terms of service"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>

                {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
                {success && (
                    <div style={{ color: "green", marginTop: 10 }}>
                        Registration successful! You can now log in.
                    </div>
                )}
            </Form>
        </div>
    );
}

export default Register;
