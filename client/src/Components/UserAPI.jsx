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

// Fetch current user's profile data
export async function fetchUserProfile() {
	console.log("Fetching user profile...");
    try {
        const response = await fetch("http://localhost:5000/api/user/me", {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching user profile:", err);
        throw err;
    }
}

// MyList
// -----------------------------------------------------
export async function addMyList(mvdbID, type) {
	// Get userID from session
	const session = await getSession();
	if (!session.userid) {
		alert("You must be logged in to add to MyList.");
		return;
	}

	// Check if it even exists in the list
	if (await isInMyList(mvdbID, type)) {
		alert("This item is already in your MyList.");
		return;
	}

	try {
		const response = await fetch("http://localhost:5000/api/mylist/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				userID: session.userid,
				mvdbID,
				type,
			}),
		});
		if (response.ok) {
			alert("Added to MyList!");
		} else {
			// Log the raw error output from the backend
			const errorText = await response.text();
			console.error("Raw error from backend:", errorText);
			alert("Failed to add to MyList.");
		}
	} catch (error) {
		console.error("Error adding to MyList:", error);
		alert("Error adding to MyList.");
	}
}

export async function isInMyList(mvdbID, type) {
	const session = await getSession();
	if (!session.userid) return false;

	try {
		const response = await fetch("http://localhost:5000/api/mylist/check", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				userID: session.userid,
				mvdbID,
				type,
			}),
		});
		if (response.ok) {
			const data = await response.json();
			return data.exists === true;
		}
		return false;
	} catch (error) {
		console.error("Error checking MyList:", error);
		return false;
	}
}

// Remove content from MyList
export async function removeFromMyList(mvdbID, type) {
	const session = await getSession();
	if (!session.userid) {
		alert("You must be logged in to remove from MyList.");
		return;
	}

	// Check if it even exists in the list
	if (!(await isInMyList(mvdbID, type))) {
		alert("This item is not in your MyList.");
		return;
	}

	try {
		const response = await fetch("http://localhost:5000/api/mylist/remove", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				userID: session.userid,
				mvdbID,
				type,
			}),
		});
		if (response.ok) {
			alert("Removed from MyList!");
		} else {
			const errorText = await response.text();
			console.error("Raw error from backend:", errorText);
			alert("Failed to remove from MyList.");
		}
	} catch (error) {
		console.error("Error removing from MyList:", error);
		alert("Error removing from MyList.");
	}
}
