import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import defaultPicture from "../../Components/pages/User/Profile/default-user.jpg";

const example_user = {
	id: 1,
	username: "example_user",
	email: "example1@example.com",
	joined: "2023-10-01",
};

export function Profile(profile_picture) {
	return (
		<Container>
			<Row>
				{/* Main Row */}
				<h1>My Profile</h1>

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
					Username: {example_user.username}
					
					<Badge bg="primary" pill>
						Active
					</Badge>
					<Badge bg="secondary" pill>
						Inactive
					</Badge>
					<Badge bg="success" pill>
						Completed
					</Badge>
					
					<br />
					Joined: {example_user.joined}
				</h5>
					
				</Col>
			</Row>

			<Row>
				<p>Welcome to your profile page!</p>
				<p>Here you can view and edit your personal information.</p>
				<p>Feel free to explore the other sections of the site as well.</p>

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
			</Row>

		</Container>
	);
}

export default Profile;
