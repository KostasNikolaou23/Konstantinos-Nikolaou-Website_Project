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
				<h2 class="card-seriesname">{name}</h2>
				

				<Stack gap={3}>

					<ProgressBar
						now={progress}
						label={`${progress}%`}
						variant={
							((progress*100)/goal) < 20
								? "danger"
								: ((progress*100)/goal) < 50
								? "warning"
								: ((progress*100)/goal) < 75
								? "info"
								: "success"
						}
						animated
						style={{ width: "100%" }}
					/>
					
				</Stack>
			</div>
		</div>
	);
}

export default AchievementCard;
