import Header from '../../Components/Header';


export function Register() {
	return (
	<div className="container">
		<Header />

		<center>
		<div className="card">
			<h1>Register</h1>

			<form>
			<div className="form-group">
				<label htmlFor="username">Username: </label>
				<input type="text" id="username" name="username" required />
			</div>
			<div className="form-group">
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" name="password" required />
			</div>
			<div className="form-group">
				<label htmlFor="password">Repeat Password: </label>
				<input type="password" id="rep-password" name="password" required />
			</div>

			<div className="spacer"></div>

			<button type="submit">Register</button>
			</form>

			<p>Gave an account? <a href="/user/login">Login here</a></p>
		</div>
		</center>
	</div>
	);
}

export default Register;