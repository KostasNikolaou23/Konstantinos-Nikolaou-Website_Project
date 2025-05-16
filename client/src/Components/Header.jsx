import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { getSession, logout } from "../Components/UserAPI"; // Import getSession
import { getSearchResults } from "./API"; // Correct relative path
import { useNavigate } from "react-router-dom";

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchText, setSearchText] = useState(""); // State to store search input
	const [searchResults, setSearchResults] = useState([]); // State to store search results

	const searchContainerRef = useRef(null); // Ref for the search container
	const navigate = useNavigate();

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
	const [username, setUsername] = useState("Username"); // Default username
	const [darkMode, setDarkMode] = useState(() => {
		// Initialize dark mode from cookie
		return (
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("darkMode="))
				?.split("=")[1] === "true"
		);
	});

	// Toggles
	const accountContainerRef = useRef(null); // <-- Add this ref
	const toggleAccount = () => setAccountOpen(!accountOpen);

	const toggleDarkMode = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		document.cookie = `darkMode=${newMode}; path=/; max-age=31536000`;
		if (newMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	};

	useEffect(() => {
		async function fetchSession() {
			try {
				console.log("Fetching session...");
				const session = await getSession(); // Fetch session details
				console.log("Session fetched:", session);

				if (session.username) {
					setUsername(session.username); // Update username if session is valid
					console.log("Username set to:", session.username);
				} else {
					console.log("No valid session found");
				}
			} catch (error) {
				console.error("Error fetching session:", error);
			}
		}

		fetchSession();

		if (darkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [darkMode]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			// Search dropdown
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target)
			) {
				setSearchOpen(false); // Close the search suggestions
			}
			// Account dropdown
			if (
				accountContainerRef.current &&
				!accountContainerRef.current.contains(event.target)
			) {
				setAccountOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const isLoggedIn = username !== "Username"; // Check if the user is logged in

	return (
		<header className={`header${darkMode ? " dark-header" : " light-header"}`}>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>
			<Navbar
				sticky="top"
				expand="lg"
				className={`full-width-navbar${
					darkMode ? " navbar-dark" : " navbar-light"
				}`}
			>
				<Container fluid>
					<Navbar.Brand href="/">
						<h1>Movie Cave</h1>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/movies">Movies</Nav.Link>
							<Nav.Link href="/tvseries">TV Series</Nav.Link>
							<Nav.Link href="/kids">Kids</Nav.Link>
							<Nav.Link href="/documentaries">Documentaries</Nav.Link>
							<Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
						</Nav>

						<div className="right-container">
							<div
								className={`account-container ${accountOpen ? "open" : ""}`}
								ref={accountContainerRef} // <-- Attach the ref here
							>
								<button
									className="btn btn-primary account-toggle"
									onClick={toggleAccount}
								>
									<i className="fa fa-user"></i>
									&nbsp; {username !== "Username" ? username : ""}
								</button>

								{accountOpen && (
									<ul className="dropdown-menu show account-dropdown">
										{isLoggedIn ? (
											<>
												<li>
													<a className="dropdown-item" href="/user/profile">
														My Profile
													</a>
													<a className="dropdown-item" href="/user/mylist">
														My List
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
													<a className="dropdown-item" href="/" onClick={logout}>
														Logout
													</a>
												</li>
											</>
										) : (
											<>
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
											</>
										)}
									</ul>
								)}
							</div>

							<button
								className="btn btn-secondary theme-toggle"
								onClick={toggleDarkMode}
							>
								{darkMode ? "Light Mode" : "Dark Mode"}
							</button>

							<div
								className={`search-container ${searchOpen ? "open" : ""}`}
								ref={searchContainerRef} // Attach the ref to the search container
							>
								<Col>
									<button
										className="btn btn-primary search-toggle"
										onClick={toggleSearch}
									>
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
										<Dropdown show={searchOpen}>
											<Dropdown.Menu className="search-dropdown">
												{searchResults.map((result) => {
													const title =
														(result.title || result.name || "").length > 35
															? (result.title || result.name).substring(0, 30) + "..."
															: result.title || result.name;
													// Determine type and id
													const type = result.media_type === "tv" ? "tvseries" : "movie";
													const id = result.id;
													return (
														<Dropdown.Item
															key={result.id + result.media_type}
															onClick={() => {
																setSearchOpen(false);
																navigate(`/${type}/${id}`);
															}}
														>
															{title}
															<span
																style={{ marginLeft: 8, color: "#888", fontSize: "0.9em" }}
															>
																{type === "movie" ? "🎬" : "📺"}
															</span>
														</Dropdown.Item>
													);
												})}
											</Dropdown.Menu>
										</Dropdown>
									)}
								</Col>
							</div>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
