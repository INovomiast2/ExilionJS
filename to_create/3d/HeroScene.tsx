import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import FloatingCubes from './FloatingCubes';
import ParticlesBackground from './ParticlesBackground';

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 5, 30]} />
        
        <Float
          speed={1.5}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <FloatingCubes />
        </Float>
        <ParticlesBackground />
      </Canvas>
    </div>
  );
} 