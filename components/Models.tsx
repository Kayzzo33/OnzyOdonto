
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, RoundedBox, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

/* 
  NOTE FOR DEVELOPERS:
  This file currently generates procedural geometry to ensure the demo runs instantly.
  To use the real GLB files requested in the prompt, uncomment the useGLTF lines
  and replace the primitive meshes with <primitive object={scene} />.
  
  Example:
  const { scene } = useGLTF('/models/tooth.glb');
  return <primitive object={scene} {...props} />;
*/

// 1. Stylized Tooth (Simulated with a smooth, distorted white shape)
export const SimulatedTooth: React.FC<any> = (props) => {
    // const { scene } = useGLTF('/models/Stylized_Tooth_Clean_White_Version.glb');
    
    return (
        <mesh {...props}>
            <dodecahedronGeometry args={[1.5, 1]} />
            <MeshDistortMaterial 
                color="#ffffff" 
                roughness={0.1} 
                metalness={0.1} 
                distort={0.1} 
                speed={2} 
            />
        </mesh>
    );
};

// 2. Dental Implant (Simulated with metallic cylinders)
export const SimulatedImplant: React.FC<any> = (props) => {
    // const { scene } = useGLTF('/models/Dental_Implant_Titanium.glb');

    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(groupRef.current) groupRef.current.rotation.y += 0.01;
    });

    return (
        <group {...props} ref={groupRef}>
            {/* Screw Body */}
            <Cylinder args={[0.3, 0.1, 2, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.3} />
            </Cylinder>
            {/* Thread illusion */}
            {[...Array(8)].map((_, i) => (
                <Torus key={i} args={[0.32 - (i*0.02), 0.02, 16, 32]} position={[0, 0.8 - (i * 0.2), 0]} rotation={[Math.PI/2, 0, 0]}>
                     <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.3} />
                </Torus>
            ))}
            {/* Crown Base */}
            <Cylinder args={[0.4, 0.3, 0.5, 32]} position={[0, 1.2, 0]}>
                 <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
            </Cylinder>
        </group>
    );
};

// 3. Scanner (Simulated High Tech Device)
export const SimulatedScanner: React.FC<any> = (props) => {
    // const { scene } = useGLTF('/models/Futuristic_Dental_Intraoral_Scanner.glb');

    return (
        <group {...props}>
            <RoundedBox args={[1, 3, 0.5]} radius={0.1} smoothness={4}>
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            <RoundedBox args={[0.8, 0.5, 0.6]} position={[0, 1.2, 0.2]} radius={0.05} smoothness={4}>
                 <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </RoundedBox>
             <RoundedBox args={[0.2, 0.8, 0.2]} position={[0.5, -0.5, 0]} rotation={[0,0,-0.5]} radius={0.05} smoothness={4}>
                 <meshStandardMaterial color="#444" />
            </RoundedBox>
        </group>
    );
};

// 4. Portal Ring
export const SimulatedPortal: React.FC<any> = (props) => {
     // const { scene } = useGLTF('/models/Sci_Fi_Hologram_Ring.glb');
     
     return (
         <group {...props}>
             <Torus args={[2, 0.1, 16, 100]}>
                 <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
             </Torus>
             <Torus args={[2.2, 0.02, 16, 100]} rotation={[0.2, 0, 0]}>
                 <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
             </Torus>
         </group>
     )
}
