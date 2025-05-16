"use client";

import { useState } from "react";

const clientId = "6f60aabc05214931a8885ca92fccadc0";
const redirectUri = "http://127.0.0.1:3000/callback";
const scope = "user-read-private user-read-email";

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await result.json();
}

export default function SpotAuth({ isConnected, setIsConnected }) {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("Hit button to connect to Spotify");

  const handleConnect = async () => {
    if (isConnected) {
      return;
    } else {
      setMessage("Connecting...");
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);
      localStorage.setItem("verifier", verifier);
      const authParams = new URLSearchParams();
      authParams.append("client_id", clientId);
      authParams.append("response_type", "code");
      authParams.append("redirect_uri", redirectUri);
      authParams.append("scope", scope);
      authParams.append("code_challenge_method", "S256");
      authParams.append("code_challenge", challenge);
      window.location = `https://accounts.spotify.com/authorize?${authParams.toString()}`;
      setMessage("Connected!");
      setIsConnected(true);
    }
  };

  // Optionally, you can add logic to check for code in the URL and fetch profile after redirect

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {!profile && (
          <>
            <h1 className="text-2xl font-bold mb-6">
              {isConnected
                ? "you are connected to Spotify!"
                : "hit the button to auth into spotfiy"}{" "}
            </h1>
            <svg
              className="inline-block mr-2 align-middle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#1DB954" />
              <path
                d="M17.25 16.25C15.25 15 8.75 15 6.75 16.25"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 13C15.5 11.5 8.5 11.5 6 13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18.5 10C15.5 8.5 8.5 8.5 5.5 10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <button
              className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-4 focus:ring-spotify/50"
              onClick={handleConnect}
            >
              Connect to Spotify
            </button>
          </>
        )}
        {profile && (
          <section id="profile">
            <h2>
              Logged in as <span>{profile.display_name}</span>
            </h2>
            <img
              src={profile.images[0]?.url}
              alt="Avatar"
              className="mx-auto rounded-full w-32 h-32 my-4"
            />
            <ul className="text-left inline-block">
              <li>
                User ID: <span>{profile.id}</span>
              </li>
              <li>
                Email: <span>{profile.email}</span>
              </li>
              <li>
                Spotify URI:{" "}
                <a href={profile.uri} className="text-blue-500 underline">
                  {profile.uri}
                </a>
              </li>
              <li>
                Link:{" "}
                <a
                  href={profile.external_urls.spotify}
                  className="text-blue-500 underline"
                >
                  {profile.external_urls.spotify}
                </a>
              </li>
              <li>
                Profile Image: <span>{profile.images[0]?.url}</span>
              </li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
