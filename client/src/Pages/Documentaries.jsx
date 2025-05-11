import ContentCategorySelector from "../Components/pages/ContentCategorySelector";

export function Documentaries() {

	return (

		<div className="container">
			<h1 className="text-center">Movie Documentaries</h1>
			<ContentCategorySelector type="movies" genreMap={{99: "Documentary"}} limit="12" disableGenreSelection="true" />
			
			<h1 className="text-center">TV Documentaries</h1>
			<ContentCategorySelector type="tvseries" genreMap={{99: "Documentary"}} limit="12" disableGenreSelection="true" />
		</div>
	);
}

export default Documentaries;