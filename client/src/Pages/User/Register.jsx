import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function Register() {
	return (
		<div className="container">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Enter username" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formRepeatPassword">
					<Form.Label>Repeat Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="I agree with the terms of service" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>

			</Form>
		</div>
	);
}

export default Register;
