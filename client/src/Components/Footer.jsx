import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-content">
					<div className="row">
						<div className="col">
							<p>© 2025 Movie Cave. All rights reserved.</p>
							<a
								href="https://www.facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Facebook
							</a>
							<a
								href="https://www.twitter.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Twitter
							</a>
							<a
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Instagram
							</a>
						</div>
						<div className="col">
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Contact us</Form.Label>
									<Form.Control type="text" placeholder="Name" />
								</Form.Group>

								<FloatingLabel
									controlId="floatingTextarea"
									label="Enter your text here..."
									className="mb-3"
								>
									<Form.Control as="textarea" placeholder="Leave a comment here" />
								</FloatingLabel>

								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
