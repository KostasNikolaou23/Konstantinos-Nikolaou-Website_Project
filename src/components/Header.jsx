import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { getSearchResults } from "./API"; // Correct relative path

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchText, setSearchText] = useState(""); // State to store search input
	const [searchResults, setSearchResults] = useState([]); // State to store search results

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleSearch = () => setSearchOpen(!searchOpen);

	const handleSearchKeyDown = async (event) => {
		if (event.key === "Enter") {
			try {
				const results = await getSearchResults(searchText);
				setSearchResults(results); // Update state with search results
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		}
	};

	const [accountOpen, setAccountOpen] = useState(false);

	const toggleAccount = () => setAccountOpen(!accountOpen);

	return (
		<header className="header">
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>

			<Navbar sticky="top" expand="lg" className="bg-body-tertiary">
				<Container fluid> {/* Add the 'fluid' property here */}
					<Navbar.Brand href="/"><h1>Movie Cave</h1></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/movies">Movies</Nav.Link>
							<Nav.Link href="/series">TV Series</Nav.Link>
							<Nav.Link href="/kids">Kid Shows</Nav.Link>
							<Nav.Link href="/documentaries">Documentaries</Nav.Link>

							<NavDropdown title="Account" id="basic-nav-dropdown">
								<NavDropdown.Item href="/user/track">Track Progress</NavDropdown.Item>
								<NavDropdown.Divider />
                
                {/* If user is logged in, show a log out button, else, show register and login */}
								<NavDropdown.Item href="/user/login">Login</NavDropdown.Item>
								<NavDropdown.Item href="/user/register">Register</NavDropdown.Item>
							</NavDropdown>

						</Nav>
					</Navbar.Collapse>

					<div className={`search-container ${searchOpen ? "open" : ""}`}>
						<button className="btn btn-primary search-toggle" onClick={toggleSearch}>
							<i className="fa fa-search"></i>
						</button>
						{searchOpen && (
							<input
								type="text"
								placeholder="Search..."
								className="search-input"
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)} // Update state on input change
								onKeyDown={handleSearchKeyDown} // Trigger search on Enter key press
							/>
						)}
						{searchResults.length > 0 && (
							<ul className="dropdown-menu show search-dropdown">
								{searchResults.map((result) => (
									<li key={result.id} className="dropdown-item">
										<a
											href={`https://www.themoviedb.org/movie/${result.id}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											{result.title}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				</Container>
			</Navbar>

		</header>
	);
}

export default Header;
