import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Cube({ position, scale }: { 
  position: [number, number, number]; 
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.005;
    }
  });

  return (
    <Box ref={mesh} position={position} scale={[scale, scale, scale]}>
      <MeshDistortMaterial
        color="#FFFFFF"
        roughness={0.5}
        metalness={0.8}
        distort={0.4}
        speed={2}
        opacity={0.8}
        transparent
      />
    </Box>
  );
}

export default function FloatingCubes() {
  const cubes = [
    { position: [-4, 2, -5] as [number, number, number], scale: 1 },
    { position: [4, -2, -3] as [number, number, number], scale: 1.5 },
    { position: [0, 3, -4] as [number, number, number], scale: 0.8 },
    { position: [-2, -1, -6] as [number, number, number], scale: 1.2 }
  ];

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {cubes.map((cube, index) => (
        <Cube key={index} {...cube} />
      ))}
    </group>
  );
} 