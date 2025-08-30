import { useGLTF } from '@react-three/drei';

export default function Model() {
  const { scene } = useGLTF("/models/prisma.glb");
 

  return <primitive object={scene} />;
}
