import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';

function RotatingModel() {
  const { scene } = useGLTF('/models/prisma.glb');
  const modelRef = useRef();

  // Rotate continuously
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

export default function Background3D() {
  // Removed global background canvas for better fidelity to reference; kept file for potential reuse
  return null;
}
