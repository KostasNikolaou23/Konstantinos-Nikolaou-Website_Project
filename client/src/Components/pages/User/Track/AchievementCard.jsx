import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

export function AchievementCard({
	name,
	description,
}) {
	return (
		<Card>
			<div className="card">
				<div className="card-content">
					<center>
					<b><h2 class="card-seriesname">{name}</h2></b>
					

					<Stack gap={3}>

						<Card.Body>
							{description}
						</Card.Body>

					</Stack>
					</center>	
				</div>
			</div>
		</Card>
	);
}

export default AchievementCard;
