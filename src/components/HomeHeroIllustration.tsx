import React from "react";

export default function HomeHeroIllustration() {
  return (
    <svg
      viewBox="0 0 1440 400"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Lighter, more neutral background */}
        <radialGradient id="glow" cx="50%" cy="40%" r="80%" fx="50%" fy="40%">
          <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.4" />
        </radialGradient>
        {/* Deeper, more saturated lines */}
        <linearGradient id="lines" x1="0" y1="0" x2="1440" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" stopOpacity="0.85" />
          <stop offset="1" stopColor="#a21caf" stopOpacity="0.7" />
        </linearGradient>
        {/* Multicolor shapes */}
        <linearGradient id="teal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e42" />
        </linearGradient>
        <linearGradient id="purple" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a21caf" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="1440" height="400" fill="url(#glow)" />
      {/* Wavy lines */}
      <g stroke="url(#lines)" strokeWidth="6">
        <path d="M0 320 Q 360 200 720 320 T 1440 320" fill="none" />
        <path d="M0 360 Q 360 240 720 360 T 1440 360" fill="none" />
        <path d="M0 400 Q 360 280 720 400 T 1440 400" fill="none" />
      </g>
      {/* Multicolor shapes */}
      <circle cx="1200" cy="100" r="70" fill="url(#teal)" fillOpacity="0.75" />
      <circle cx="200" cy="60" r="60" fill="url(#gold)" fillOpacity="0.75" />
      <rect x="700" y="50" width="140" height="20" rx="10" fill="url(#purple)" fillOpacity="0.75" />
      <rect x="900" y="120" width="120" height="20" rx="10" fill="#4f46e5" fillOpacity="0.65" />
      {/* Extra accent shape for style */}
      <ellipse cx="400" cy="350" rx="50" ry="18" fill="#0ea5e9" fillOpacity="0.55" />
    </svg>
  );
}