import ContentCategorySelector from "../Components/pages/ContentCategorySelector";

function Home() {
	return (
		<div className="container fluid">
			{/* Movies Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>Movies</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<a href="/movies">
						<button className="watch-button">View More</button>
					</a>
				</div>
			</div>
			<ContentCategorySelector
				type="movies"
				limit="4"
				disableGenreSelection="true"
			/>

			{/* TV Series Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>TV Series</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<a href="/tvseries">
						<button className="watch-button">View More</button>
					</a>
				</div>
			</div>
			<ContentCategorySelector
				type="tvseries"
				limit="4"
				genreMap={{
					10759: "Action & Adventure",
					80: "Crime",
					99: "Documentary",
					18: "Drama",
					9648: "Mystery",
					10765: "Sci-Fi & Fantasy",
				}}
				disableGenreSelection="true"
			/>

			{/* Documentaries Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>Documentaries</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<a href="/documentaries">
						<button className="watch-button">View More</button>
					</a>
				</div>
			</div>
			<ContentCategorySelector
				type="movies"
				limit="4"
				disableGenreSelection="true"
				genreMap={{ 99: "Documentaries" }}
			/>

			{/* Kids Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>Kids</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<a href="/kids">
						<button className="watch-button">View More</button>
					</a>
				</div>
			</div>
			<ContentCategorySelector
				type="tvseries"
				limit="4"
				disableGenreSelection="true"
				genreMap={{
					10751: "Family",
					16: "Animation",
					10762: "Kids",
				}}
			/>
		</div>
	);
}

export default Home;
