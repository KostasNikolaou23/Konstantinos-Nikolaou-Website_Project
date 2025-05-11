import Table from "react-bootstrap/Table";
// import { getSearchResults } from "../Components/UserAPI";

// Criteria: Users with most achievements is at the top

const leaderboard_test = {
	19542: {
		username: "User2",
		achievements: "700",
	},
	19541: {
		username: "User1",
		achievements: "800",
	},
	19543: {
		username: "User3",
		achievements: "600",
	},
};

// Fetch user trophies/achievements
// app.get("/api/user/:id/trophies", (req, res) => {
//   const userId = req.params.id;

//   const sql = "SELECT achievements FROM users WHERE id = ?";
//   db.query(sql, [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ message: "User not found!" });

//     res.status(200).json({ achievements: results[0].achievements });
//   });
// });

export function Leaderboard() {
	return (
		<div className="container">
			<Table striped bordered hover size="sm" responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th><center>Username</center></th>
						<th><center>Achievements</center></th>
					</tr>
				</thead>

				<tbody>
					{Object.entries(leaderboard_test)
						.sort((a, b) => b[1].achievements - a[1].achievements)
						.map(([userId, userData], index) => (
							<tr>
								{index === 0 ? (
									<>
										<td class="table-active">{index + 1}</td>
										<td class="table-active"><center>{userData.username}</center></td>
										<td class="table-active"><center>{userData.achievements}</center></td>
									</>
								) : (
									<>
										<td>{index + 1}</td>
										<td><center>{userData.username}</center></td>
										<td><center>{userData.achievements}</center></td>
									</>
								)}
							</tr>
						))}
				</tbody>

			</Table>
		</div>
	);
}

export default Leaderboard;