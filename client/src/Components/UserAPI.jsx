export async function checkSession() {
    // Check if the session cookie exists
    const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="));
    if (!cookies) {
        // No session cookie found
        return { valid: false, username: null };
    }

    try {
        // Send a request to the backend to validate the session
        const response = await fetch("http://localhost:5000/api/user/checksession", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
            const data = await response.json();
            // Assume the backend returns the username if the session is valid
            return { valid: true, username: data.username };
        } else {
            // Session is invalid or expired
            return { valid: false, username: null };
        }
    } catch (error) {
        console.error("Error checking session:", error);
        return { valid: false, username: null };
    }
}

// Get session details
// /api/user/getsession
// SELECT u.userid, u.username FROM sessions s JOIN users u ON s.userID = u.userid WHERE s.identifier = "?";

export async function getSession() {
    try {
        const response = await fetch("http://localhost:5000/api/user/getsession", {
            method: "GET",
            credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Session data:", data); // Debugging
            return { userid: data.userid, username: data.username };
        } else {
            console.error("Session is invalid or expired");
            return { userid: null, username: null };
        }
    } catch (error) {
        console.error("Error fetching session:", error);
        return { userid: null, username: null };
    }
}

export async function logout() {
    try {
        const response = await fetch("http://localhost:5000/api/user/logout", {
            method: "POST",
            credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
            console.log("Logout successful");
            window.location.href = "/user/login"; // Redirect to login page
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
}
