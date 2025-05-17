import { useState, useEffect } from "react";
import { discoverContent } from "../API"; // Import the discoverContent function
import GridItem from "./Home/GridItem";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col } from "react-bootstrap";

export function ContentCategorySelector({
	type = "movies", // Default to 'movies'
	genreMap = {
		28: "Action",
		12: "Adventure",
		27: "Horror",
		878: "Science Fiction",
		35: "Comedy",
		18: "Drama",
		53: "Thriller",
		14: "Fantasy",
		80: "Crime",
		10752: "War",
		9648: "Mystery",
		37: "Western",
	},
	disableGenreSelection = "false",
	limit = 50, // Default limit for content
}) {
	// Initialize selectedGenre and selectedGenreName based on the first entry in genreMap
	const [selectedGenre, setSelectedGenre] = useState(Object.keys(genreMap)[0]); // Default to the first genre ID
	const [selectedGenreName, setSelectedGenreName] = useState(
		genreMap[Object.keys(genreMap)[0]] // Default to the first genre name
	);
	const [content, setContent] = useState([]); // State to store discovered content

	// Function to fetch content based on the selected genre
	const fetchContent = async (genreId) => {
		try {
			const contentData = await discoverContent(type, genreId, limit); // Fetch content with the specified limit
			setContent(contentData); // Update state with fetched content
		} catch (error) {
			console.error(`Error fetching ${type}:`, error);
		}
	};

	// Fetch content when the component mounts or when the selected genre changes
	useEffect(() => {
		fetchContent(selectedGenre);
	}, [selectedGenre, limit]);

	// Handle category selection
	const handleCategorySelect = (genreId) => {
		setSelectedGenre(genreId); // Update the selected genre
		setSelectedGenreName(genreMap[genreId]); // Update the selected genre name
	};

	return (
		<>
			{/* Content Section */}
			<Row>
				<Col>
					{disableGenreSelection === "false" && (
						<Dropdown as={ButtonGroup}>
							<Button variant="secondary btn-lg">{selectedGenreName}</Button>

							<Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

							<Dropdown.Menu>
								{Object.entries(genreMap).map(([genreId, genreName]) => (
									<Dropdown.Item
										key={genreId}
										onClick={() => handleCategorySelect(genreId)}
									>
										{genreName}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
					)}
				</Col>
				<Col></Col>
			</Row>

			<section className="grid">
				{content.map((item) => (
					<GridItem
						key={item.id}
						cardName={type === "movies" ? item.title : item.name} // Use 'title' for movies and 'name' for TV series
						cardDesc={item.overview} // Description
						cardImage={
							item.poster_path
								? `https://image.tmdb.org/t/p/w500/${item.poster_path}` // Poster image
								: "path/to/fallback-image.jpg" // Fallback image
						}
						enableFavoriteButton={true} // Enable favorite button
						enableReviewButton={true} // Enable review button
						mvdbID={item.id} // <-- Pass the correct id
						type={type === "movies" ? "movie" : "tvseries"} // <-- Pass the correct type
					/>
				))}
			</section>
		</>
	);
}

export default ContentCategorySelector;
