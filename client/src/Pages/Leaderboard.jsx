import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchLeaderboard() {
			try {
				const response = await fetch(
					"http://localhost:5000/api/user/achievements/top",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data = await response.json();
				setLeaderboard(data);
			} catch (err) {
				setError(err.message);
			}
		}

		fetchLeaderboard();
	}, []);

	return (
		<div className="container">
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
			/>
			{error && <p style={{ color: "red" }}>Error: {error}</p>}
			<Table
				striped
				bordered
				hover
				size="sm"
				responsive="sm"
				className="leaderboard-table"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>
							<center>Username</center>
						</th>
						<th>
							<center>Achievements</center>
						</th>
					</tr>
				</thead>

				<tbody>
					{leaderboard.map((user, index) => (
						<tr key={user.userid}>
							<td className={index <= 2 ? "table-active" : ""}>{index + 1}</td>
							<td className={index <= 2 ? "table-active" : ""}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{index === 0 && (
										<i
											className="fa-solid fa-medal"
											style={{ color: "#FFD43B", marginRight: "8px", fontSize: "1.2em" }}
										></i>
									)}
									{index === 1 && (
										<i
											className="fa-solid fa-medal"
											style={{ color: "#aaa9a7", marginRight: "8px", fontSize: "1.2em" }}
										></i>
									)}
									{index === 2 && (
										<i
											className="fa-solid fa-medal"
											style={{ color: "#b36205", marginRight: "8px", fontSize: "1.2em" }}
										></i>
									)}
									<a
										href={`/user/view/${user.username}`}
										style={{ 
											textDecoration: "none", 
											color: index === 0 ? "#ffd803" : index === 1 ? "#aaa9a7" : index === 2 ? "#b36205" : "inherit" 
										}}
									>
										<span>{user.username}</span>
									</a>
								</div>
							</td>
							<td className={index <= 2 ? "table-active" : ""}>
								<div 
									style={{ 
										textAlign: "center",
										color: index === 0 ? "#ffd803" : index === 1 ? "#aaa9a7" : index === 2 ? "#b36205" : "inherit"
									}}
								>
									{user.achievement_count}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Leaderboard;
