import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await fetch("http://localhost:5000/api/user/achievements/top", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
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
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <Table striped bordered hover size="sm" responsive="sm">
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
                            {index === 0 ? (
                                <>
                                    <td className="table-active">{index + 1}</td>
                                    <td className="table-active">
                                        <center>{user.username}</center>
                                    </td>
                                    <td className="table-active">
                                        <center>{user.achievement_count}</center>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{index + 1}</td>
                                    <td>
                                        <center>{user.username}</center>
                                    </td>
                                    <td>
                                        <center>{user.achievement_count}</center>
                                    </td>
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