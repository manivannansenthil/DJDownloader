// Function to refresh the access token
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

// Function to fetch user profile
export async function getUserProfile(accessToken) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

// Function to fetch user's playlists
export async function getUserPlaylists(accessToken) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
}
