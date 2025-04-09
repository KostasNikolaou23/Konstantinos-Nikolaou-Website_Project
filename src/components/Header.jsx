import React from "react";

function Header() {
	return (
		<header>
			<h1>My Website</h1>
			<nav>
				<ol>
					<li><a href="#home">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#contact">Contact</a></li>
				</ol>
			</nav>
		</header>
	);
}

export default Header;