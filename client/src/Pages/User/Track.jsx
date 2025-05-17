import { useEffect, useState } from "react";
import AchievementCard from "../../Components/pages/User/Track/AchievementCard";
import { getSession } from "../../Components/UserAPI";

export function Track() {
    const [userAchievements, setUserAchievements] = useState([]);
    const [allAchievements, setAllAchievements] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetchAchievements() {
            // Get session to find userID
            const session = await getSession();
            setUsername(session.username);

            // Fetch user's achievements
            let userAch = [];
            try {
                const res = await fetch(`http://localhost:5000/api/user/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    userAch = data.achievements || [];
                }
            } catch (e) {
                userAch = [];
            }
            setUserAchievements(userAch);

            // Fetch all achievements
            try {
                const res = await fetch("http://localhost:5000/api/achievements/all");
                if (res.ok) {
                    const data = await res.json();
                    setAllAchievements(data);
                }
            } catch (e) {
                setAllAchievements([]);
            }
        }
        fetchAchievements();
    }, []);

		return (
			<div className="container">
				<h3>{username ? `${username}'s Achievements` : "Your Achievements"}</h3>
				<section className="grid">
					{userAchievements.length === 0 ? (
						<div>No achievements yet.</div>
					) : (
						userAchievements.map((name, idx) => {
							const achievement = allAchievements.find((ach) => ach.name === name);
							return (
								<AchievementCard
									key={idx}
									name={name}
									description={achievement ? achievement.description : "No description available"}
								/>
							);
						})
					)}
				</section>
				<hr style={{ margin: "2rem 0" }} />
				<h4>Remaining Achievements</h4>
				<section className="grid">
					{allAchievements.length === 0 ? (
						<div>No achievements found.</div>
					) : (
						allAchievements
							.filter((ach) => !userAchievements.includes(ach.name)) // Filter out user achievements
							.map((ach, idx) => (
								<AchievementCard
									key={ach.id || idx}
									name={ach.name}
									description={ach.description}
								/>
							))
					)}
				</section>
			</div>
		);
}

export default Track;
