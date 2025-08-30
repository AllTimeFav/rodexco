import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, ScrollControls, useScroll } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";

// ===== MODEL CONTROL PARAMETERS =====
// Adjust these values to control the entire experience

const MODEL_CONTROLS = {
  // Base model properties
  baseScale: 1.9,           // Starting size of the model
  basePosition: [-0.5, -2, 0],  // Starting position [x, y, z] - centered and visible
  
  // Rotation speeds for each phase
  rotationSpeeds: {
    phase0: Math.PI * 0.1,  // Hero section - very slow
    phase1: Math.PI * 0.3,  // Middle section - medium
    phase2: Math.PI * 0.8   // End section - fast
  },
  
  // Scaling behavior for each phase
  scaling: {
    phase0: { start: 1.5, end: 2.0, range: 0.5 },
    phase1: { start: 2.0, end: 3.5, range: 1.5 },
    phase2: { start: 3.5, end: 5.5, range: 2.0 }
  },
  
  // Movement ranges for each phase
  movement: {
    phase0: { y: 2, x: 0, z: 0 },
    phase1: { y: 4, x: 1.5, z: 0 },
    phase2: { y: 6, x: 2.5, z: 0 }
  },
  
  // Scroll phase boundaries (0.0 to 1.0)
  phaseBoundaries: {
    phase1Start: 0.33,  // When phase 1 begins
    phase2Start: 0.66   // When phase 2 begins
  },
  
  // Animation intensity multipliers
  intensity: {
    horizontalMovement: 1.0,    // How much horizontal movement
    verticalMovement: 1.0,      // How much vertical movement
    rotationIntensity: 1.0,     // How intense rotations are
    scaleIntensity: 1.0         // How dramatic scaling is
  },
  
  // Scroll behavior controls
  scroll: {
    pages: 3,                   // Number of scroll pages
    damping: 0.25,              // Scroll damping (0.25 = smooth, responsive)
    distance: 1.0,              // Scroll distance multiplier
    enabled: true,              // Enable/disable scroll controls
    infinite: false             // Infinite scrolling
  }
};

function ScrollAnimatedModel({ position = [0, 0, 0], landingPhase = 0 }) {
  const { scene } = useGLTF("/models/prisma.glb");
  const modelRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (modelRef.current && landingPhase >= 1) {
      // Get scroll progress (0 to 1)
      const scrollOffset = scroll.offset;
      
      // Base rotation speed
      const baseRotationSpeed = Math.PI * 0.2; // 0.2 radians per second
      
      // Adjust rotation speed based on scroll - faster scrolling = faster rotation
      const scrollSpeedMultiplier = 1 + (scrollOffset * 2); // 1x to 3x speed
      const rotationSpeed = baseRotationSpeed * scrollSpeedMultiplier;
      
      // Smooth rotation around Y axis
      modelRef.current.rotation.y += rotationSpeed * delta;
      
      // Landing animation based on phase
      if (landingPhase === 1) {
        // Phase 1: Model is appearing - gentle entrance
        const entranceProgress = Math.min((state.clock.elapsedTime - 0.5) / 2, 1);
        const entranceEase = 1 - Math.pow(1 - entranceProgress, 3); // Smooth ease-out
        
        // Start from above the target position and gently land
        const startY = MODEL_CONTROLS.basePosition[1] + 5;
        const targetY = MODEL_CONTROLS.basePosition[1];
        modelRef.current.position.y = startY + (targetY - startY) * entranceEase;
        
        // Gentle floating animation once landed
        if (entranceProgress >= 1) {
          const floatOffset = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
          modelRef.current.position.y = targetY + floatOffset;
        }
        
        // Scale up from 0 to full size
        const scale = MODEL_CONTROLS.baseScale * entranceEase;
        modelRef.current.scale.setScalar(scale);
      } else if (landingPhase >= 2) {
        // Phase 2: Model is fully landed - normal behavior
        const floatOffset = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
        modelRef.current.position.y = MODEL_CONTROLS.basePosition[1] + floatOffset;
        modelRef.current.scale.setScalar(MODEL_CONTROLS.baseScale);
      }
      
      // Use basePosition for X and Z coordinates
      modelRef.current.position.x = MODEL_CONTROLS.basePosition[0];
      modelRef.current.position.z = MODEL_CONTROLS.basePosition[2];
    }
  });

  // Clean up model resources on unmount
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

  // Don't render model until landing phase begins
  if (landingPhase === 0) {
    return null;
  }

  return <primitive ref={modelRef} object={scene} scale={0} position={MODEL_CONTROLS.basePosition} />;
}

export default function InlinePrisma({ position = [0, 0, 0] }) {
  const [landingPhase, setLandingPhase] = useState(0); // 0: hidden, 1: appearing, 2: landed

  useEffect(() => {
    // Landing animation sequence
    const landingSequence = async () => {
      // Phase 1: Model starts hidden, then appears with fade-in
      await new Promise(resolve => setTimeout(resolve, 500));
      setLandingPhase(1);
      
      // Phase 2: Model fully visible, wait for landing completion
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLandingPhase(2);
      
      // Phase 3: After model is landed, trigger hero section animations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dispatch custom event to trigger hero animations
      const event = new CustomEvent('heroReady', { detail: { ready: true } });
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
        <directionalLight intensity={1.4} position={[10, 10, 10]} />
        <Suspense fallback={null}>
          {/* ScrollControls with improved scrolling */}
          <ScrollControls 
            pages={3}
            damping={0.25}
            distance={1.0}
            enabled={true}
            infinite={false}
            maxSpeed={0.5}
            minDistance={0.1}
          >
            <ScrollAnimatedModel 
              position={position} 
              landingPhase={landingPhase}
            />
          </ScrollControls>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      
      {/* Landing overlay - smooth fade out */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#050a0b] via-[#0b1b1f] to-[#040708] transition-all duration-3000 ease-out pointer-events-none ${
          landingPhase >= 1 ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #74cec8 0%, #0b1b1f 40%, #050a0b 80%)",
          filter: "blur(100px)",
        }}
      ></div>
    </div>
  );
}
