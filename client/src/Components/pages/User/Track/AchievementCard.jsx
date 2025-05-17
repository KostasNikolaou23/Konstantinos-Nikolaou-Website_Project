import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';


export function AchievementCard({
	name,
	description,
}) {
	return (
		<Card>
			<div className="card">
				{/* <img src={poster} alt={name} className="card-image" /> */}
				<div className="card-content">
					<center>
					<b><h2 class="card-seriesname">{name}</h2></b>
					

					<Stack gap={3}>

						<Card.Body>
							{description}
						</Card.Body>

						{/* Something to indicate completion */}
					</Stack>
					</center>	
				</div>
			</div>
		</Card>
	);
}

export default AchievementCard;
