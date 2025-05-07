import React, { useEffect, useState } from "react";

import API from "../../Components/API"; // Import the API component
import AchievementCard from "../../Components/pages/Achievements/AchievementCard";

var achievemnts = [
	{
		title: "Ma name Jeff",
		desc: "watch movies TILL YOU DIE!",
		goal: 800,
		progress: 40,
	},
	{
		title: "Ma name Bond",
		desc: "Watch 20 James Bond movies",
		goal: 20,
		progress: 10,
	},
	{
		title: "Hello?!?!",
		desc: "Watch 10 horror movies",
		goal: 10,
		progress: 4,
	},
	{
		title: "I AM BATMAN",
		desc: "Watch 25 superhero movies",
		goal: 25,
		progress: 25,
	},
	{
		title: "Lorem ipsum",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		goal: 100,
		progress: 99,
	}

]

export function Achievements({}) {

	return (
		<div className="container">
			<section className="grid">
				{achievemnts.map((achievement, index) => (
					<AchievementCard
						key={index}
						name={achievement.title}
						description={achievement.desc}
						goal={achievement.goal}
						progress={achievement.progress}
					/>
				))}
			</section>
		</div>
	);
}

export default Achievements;
