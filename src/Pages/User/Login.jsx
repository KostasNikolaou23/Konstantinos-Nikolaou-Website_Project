import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import UserAPI from "../../Components/pages/User/UserAPI";

export function Login() {
	return (
		<div className="container">
			<Form>
				<Form.Group className="mb-3" controlId="formUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Enter username" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default Login;
