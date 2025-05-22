"use client";

import { useState } from "react";
import SpotAuth from "./components/spotAuth";

export default function Homepage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SpotAuth />
    </div>
  );
}
