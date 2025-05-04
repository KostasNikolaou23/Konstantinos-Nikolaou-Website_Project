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

			<Navbar sticky="top" expand="lg" className="bg-body-tertiary full-width-navbar">
				<Container fluid>
					<Navbar.Brand href="/"><h1>Movie Cave</h1></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/movies">Movies</Nav.Link>
							<Nav.Link href="/series">TV Series</Nav.Link>
							<Nav.Link href="/kids">Kid Shows</Nav.Link>
							<Nav.Link href="/documentaries">Documentaries</Nav.Link>
							<Nav.Link href="/user/mylist">My List</Nav.Link>
						</Nav>

						<div className="right-container">
							<div className={`account-container ${accountOpen ? "open" : ""}`}>
								<button className="btn btn-primary account-toggle" onClick={toggleAccount}>
									<i className="fa fa-user"></i>
								</button>

								{accountOpen && (
									<ul className="dropdown-menu show account-dropdown">
										<li>
											<a className="dropdown-item" href="/user/achievements">
												Achievements
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="/user/track">
												Track Progress
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<a className="dropdown-item" href="/user/login">
												Login
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="/user/register">
												Register
											</a>
										</li>
									</ul>
								)}
							</div>

							<button className="btn btn-primary account-toggle" href="/settings">
								<i className="fa fa-gear"></i>
							</button>

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
						</div>

					</Navbar.Collapse>
				</Container>
			</Navbar>

		</header>
	);
}

export default Header;