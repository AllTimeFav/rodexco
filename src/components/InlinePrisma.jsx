import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";

const MODEL_CONTROLS = {
  baseScale: 3.8,
  basePosition: [0, 0, 0],
};

function ScrollAnimatedModel({ landingPhase = 0 }) {
  const { scene } = useGLTF("/models/prisma.glb");
  const modelRef = useRef();
  const shineRef = useRef({ intensity: 0 });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.metalness = 0.9;
          child.material.roughness = 0.15;
          child.material.envMapIntensity = 1.5;
          child.material.emissive = child.material.emissive || { r: 1, g: 1, b: 1 };
          child.material.emissiveIntensity = 0.15;
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
  if (modelRef.current && landingPhase >= 1) {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress (0 → 1)
    const totalScrollable = docHeight - viewportHeight;
    const scrollProgress = scrollY / totalScrollable;

    // ✅ Model stays centered until 90% scroll
    const baseY = MODEL_CONTROLS.basePosition[1];
    const maxMoveUp = 6; // Move up by 6 units
    let moveY = 0;

    if (scrollProgress > 0.9) {
      // Normalize progress from 90% → 100%
      const progressAfter90 = (scrollProgress - 0.9) / 0.1;
      moveY = progressAfter90 * maxMoveUp;
    }

    modelRef.current.position.y = baseY + moveY;

    // ✅ Rotation speed based on overall scroll progress
    const baseRotationSpeed = Math.PI * 0.3;
    const rotationSpeed = baseRotationSpeed * (1 + scrollProgress * 1.5);
    modelRef.current.rotation.y += rotationSpeed * delta;

    // ✅ Landing animation
    if (landingPhase === 1) {
      const entranceProgress = Math.min((state.clock.elapsedTime - 0.5) / 2, 1);
      const ease = 1 - Math.pow(1 - entranceProgress, 3);
      const startY = MODEL_CONTROLS.basePosition[1] + 5;
      const targetY = MODEL_CONTROLS.basePosition[1];
      modelRef.current.position.y = startY + (targetY - startY) * ease;
      const scale = MODEL_CONTROLS.baseScale * ease;
      modelRef.current.scale.setScalar(scale);
    }

    // ✅ Dynamic shine
    shineRef.current.intensity = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
    modelRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.emissiveIntensity = 0.15 + shineRef.current.intensity * 0.3;
      }
    });

    modelRef.current.position.x = MODEL_CONTROLS.basePosition[0];
    modelRef.current.position.z = MODEL_CONTROLS.basePosition[2];
  }
});

  // Cleanup
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  if (landingPhase === 0) return null;

  return (
    <primitive ref={modelRef} object={scene} scale={0} position={MODEL_CONTROLS.basePosition} />
  );
}

export default function InlinePrisma() {
  const [landingPhase, setLandingPhase] = useState(0);

  useEffect(() => {
    const landingSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLandingPhase(1);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLandingPhase(2);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const event = new CustomEvent("heroReady", { detail: { ready: true } });
      document.dispatchEvent(event);
    };

    landingSequence();
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 8] }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost");
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            console.log("WebGL context restored");
          });
        }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight intensity={1.4} position={[10, 10, 10]} color="#7bdbd4" />
        <directionalLight intensity={1.8} position={[-10, -10, -10]} color="#7bdbd4" />
        <Suspense fallback={null}>
          <ScrollAnimatedModel landingPhase={landingPhase} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
