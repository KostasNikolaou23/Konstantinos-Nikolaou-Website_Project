import { getSession } from "../UserAPI";

export async function AnalyticsPush(type) {
    console.log(`AnalyticsPush called for type: ${type}`); // Debug log

    try {
        // Get the user ID from the session
        const session = await getSession();
        if (!session.userid) {
            console.error("User ID not found. Cannot push analytics.");
            return;
        }

        // Make the POST request to the correct endpoint
        const response = await fetch(`http://localhost:5000/api/analytics/${type}/${session.userid}`, {
            method: "POST",
            credentials: "include", // Include cookies for session validation
        });

        if (!response.ok) {
            console.error(`Failed to push analytics for ${type}:`, response.statusText);
        } else {
            console.log(`Analytics pushed for ${type}`); // Success log
        }
    } catch (error) {
        console.error(`Error pushing analytics for ${type}:`, error);
    }
}

export default AnalyticsPush;