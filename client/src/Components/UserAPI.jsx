export async function checkSession() {
    // Check if the session cookie exists
    const cookies = document.cookie.split("; ").find((row) => row.startsWith("session="));
    if (!cookies) {
        // No session cookie found
        return false;
    }

    try {
        // Send a request to the backend to validate the session
        const response = await fetch("http://localhost:5000/api/user/checksession", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
            // Session is valid
            return true;
        } else {
            // Session is invalid or expired
            return false;
        }
    } catch (error) {
        console.error("Error checking session:", error);
        return false;
    }
}

export default checkSession;