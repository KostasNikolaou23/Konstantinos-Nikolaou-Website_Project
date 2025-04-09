import logo from '../logo.svg'; // Import the logo

import Header from '../Components/Header';

function Home() {
	return (
		<div className="App">

			<header className="App-header">
				<Header />
			</header>
			<body>
				
			</body>
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Home page
				</p>
				
		</div>
	);
}

export default Home;