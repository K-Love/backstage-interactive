"use client";
import dynamic from "next/dynamic";

// Correct dynamic import for the client-side Three.js scene
const HomeThreeScene = dynamic(
  () => import("@/components/headers/HomeThreeScene"),
  { ssr: false }
);

export default function HomeThreeSceneClientWrapper() {
  // Make sure to return the component, not just reference it
  return <HomeThreeScene />;
}