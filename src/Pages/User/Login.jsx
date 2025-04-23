import Header from '../../Components/Header';


export function Login() {
	return (
	<div className="container">
		<Header />

		<center>
		<div className="card">
			<h1>Login</h1>

			<form>
			<div className="form-group">
				<label htmlFor="username">Username: </label>
				<input type="text" id="username" name="username" required />
			</div>
			<div className="form-group">
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" name="password" required />
			</div>

			<div className="spacer"></div>

			<button type="submit">Login</button>
			</form>

			<p>Don't have an account? <a href="/user/register">Register here</a></p>
		</div>
		</center>
	</div>
	);
}

export default Login;