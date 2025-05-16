"use client";

import { useState } from "react";
import SpotAuth from "./components/spotAuth";

export default function Homepage() {
  const [message, setMessage] = useState("Need to Connect to Spotify");
  const [profile, setProfile] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setMessage("Connecting...");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SpotAuth
        setProfile={setProfile}
        isConnecting={isConnected}
        setIsConnecting={setIsConnected}
      />
      {profile && (
        <div>
          <h2>Profile in Parent Page</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
