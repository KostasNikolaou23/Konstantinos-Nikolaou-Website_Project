import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from 'react-bootstrap/Stack';


export function AchievementCard({
	name,
	description,
	goal,
	progress,
}) {
	return (
		<div className="card">
			{/* <img src={poster} alt={name} className="card-image" /> */}
			<div className="card-content">
				<center>
				<b><h2 class="card-seriesname">{name}</h2></b>
				

				<Stack gap={3}>

					<p class="card-description">{description}<br/>
					Goal: {goal}</p>

					<ProgressBar
						now={(progress/goal)*100}
						label={`${progress}`}
						variant={
							(progress/goal)*100 < 20
								? "danger"
								: (progress/goal)*100 < 75
								? "warning"
								: (progress/goal)*100 <= 99
								? "info"
								: "success"
						}
						animated
						style={{ width: "100%" }}
					/>
					
				</Stack>
				</center>	
			</div>
		</div>
	);
}

export default AchievementCard;
