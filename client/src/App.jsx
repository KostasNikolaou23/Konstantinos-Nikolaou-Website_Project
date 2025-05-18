import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS

// Pages
// -----------------------------------------------------------
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import Statistics from "./Pages/Statistics";

import Movies from "./Pages/Movies";
import TVSeries from "./Pages/TVSeries";
import Kids from "./Pages/Kids";
import Documentaries from "./Pages/Documentaries";
import ContentPreview from "./Pages/ContentPreview";
import WatchNow from "./Components/WatchNow";
import RateContent from "./Components/RateContent";

// Account Functionality
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Track from "./Pages/User/Track";
import MyList from "./Pages/User/MyList";
import Profile from "./Pages/User/Profile";

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/settings" element={<Statistics/>} />
						<Route path="/leaderboard" element={<Leaderboard />} />
						<Route path="/statistics" element={<div>About</div>} />

						{/* Account Functionality */}
						<Route path="/user/login" element={<Login />} />
						<Route path="/user/register" element={<Register />} />
						<Route path="/user/track" element={<Track />} />
						<Route path="/user/mylist" element={<MyList />} />
						<Route path="/user/profile" element={<Profile view_profile={true} />} />
						<Route path="/user/logout" element={<div>Logout</div>} />
						<Route
							path="/user/view/:username"
							element={<Profile user_edit={false} />}
						/>

						{/* Content Pages */}
						<Route path="/movies" element={<Movies />} />
						<Route path="/tvseries" element={<TVSeries />} />
						<Route path="/kids" element={<Kids />} />
						<Route path="/documentaries" element={<Documentaries />} />
						<Route path="/movie/:id" element={<ContentPreview type="movie" />} />
						<Route
							path="/tvseries/:id"
							element={<ContentPreview type="tvseries" />}
						/>
						<Route path="/watchnow/:type/:id" element={<WatchNow />} />
						<Route path="/rate/:type/:id" element={<RateContent />} />


						{/* 404 Not Found */}
						<Route
							path="*"
							element={
								<div>
									<center>404 Not Found</center>
								</div>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</Router>
		</>
	);
}

export default App;
