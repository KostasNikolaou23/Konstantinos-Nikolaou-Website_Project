import Table from "react-bootstrap/Table";

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