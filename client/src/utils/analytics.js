export async function pushAnalyticsClick(type) {
    try {
        const response = await fetch(`http://localhost:5000/api/analytics/${type}/me`, {
            method: "POST",
            credentials: "include", // Include cookies for session validation
        });
        if (!response.ok) {
            console.error(`Failed to push analytics for ${type}:`, response.statusText);
        }
    } catch (error) {
        console.error(`Error pushing analytics for ${type}:`, error);
    }
}