// src/components/headers/HomeThreeScene.tsx
"use client"; 
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { colors } from '@/design-tokens';

const HomeThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.4);
    mountRef.current.appendChild(renderer.domElement);
    // Add a simple rotating cube as a placeholder for digital stage elements
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: colors.accent1 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    // Cleanup on unmount
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="max-w-4xl mx-auto h-64 md:h-96" />;
};

export default HomeThreeScene;