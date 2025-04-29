import logo from '../logo.svg'; // Import the logo

import React, { useState } from "react";
import Header from "../Components/Header";
import GridItem from "../Components/pages/Home/GridItem"; // Import the new component

import '../App.css'; // Import the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

const shows = [
	{
		title: "Movies",
		description: "Explore a variety of movies.",
		image: "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/greatest-movies-of-all-time.jpg",
	},
	{
		title: "Series",
		description: "Watch through a never-ending list of series.",
		image: "https://i.imgflip.com/8prdek.jpg?a484200",
	},
	{
		title: "Kids Shows",
		description: "Fun and educational content for kids.",
		image: "https://www.highbrowmagazine.com/sites/default/files/4tvshows.jpg",
	},
	{
		title: "Documentaries",
		description: "Learn about things through these documentaries.",
		image: "https://tfiglobalnews.com/wp-content/uploads/2023/03/greatest-documentaries-of-all-time-art-001.jpg",
	}
];

function Home() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleSearch = () => setSearchOpen(!searchOpen);

	return (
		<div className="container">
			<Header />

			<section className="grid">
				{shows.map((show, index) => (
					<GridItem key={index} show={show} />
				))}
			</section>
		</div>
	);
}

export default Home;