"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    // The code will be in the URL when Spotify redirects back
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      // Store the code and redirect back to homepage
      localStorage.setItem("spotify_code", code);
      router.push("/homepage");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connecting to Spotify...</h1>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
