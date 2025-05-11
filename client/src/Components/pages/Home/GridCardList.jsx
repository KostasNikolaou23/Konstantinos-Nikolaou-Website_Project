import React from "react";
import GridItem from "./GridItem"; // Import the new component

export function GridCardList({ }) {
	<>
		<div class="row align-items-center">
			<div class="col">
				<h2>Test</h2>
			</div>

			<div class="col"></div>

			<div class="col d-flex justify-content-end">
				<button className="watch-button">View More</button>
			</div>
		</div>
		<section className="grid">
			{shows.map((show, index) => (
				<GridItem key={index} show={show} />
			))}
		</section>
	</>;
}

export default GridCardList;
