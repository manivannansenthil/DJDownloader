"use client";

export default function SpotAuth({}) {
  const handleSpotifyAuth = async () => {
    try {
      // Spotify OAuth configuration
      const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
      const scope = "user-read-private user-read-email";

      // Construct Spotify authorization URL
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

      // Redirect to Spotify login page
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error during Spotify authentication:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Let's get this working</h1>
      <button
        onClick={handleSpotifyAuth}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Click to Connect to Spotify
      </button>
    </div>
  );
}
