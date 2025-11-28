
import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SimulatedScanner } from '../Models';
import * as THREE from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const ScanSection: React.FC = () => {
  const scannerRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (scannerRef.current) {
      scannerRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    }
    // Scanning light effect
    if(lightRef.current) {
        lightRef.current.position.y = Math.sin(t * 2) * 1.5;
    }
  });

  return (
    <group>
      {/* Scanner Model */}
      <group ref={scannerRef} position={[0, -1, 0]}>
         <SimulatedScanner />
         
         {/* Holographic scanning beam */}
         <group ref={lightRef}>
             <mesh rotation={[Math.PI/2, 0, 0]}>
                 <planeGeometry args={[3, 3]} />
                 <meshBasicMaterial color="#00ffff" transparent opacity={0.1} side={THREE.DoubleSide} />
             </mesh>
             <mesh rotation={[Math.PI/2, 0, 0]}>
                 <ringGeometry args={[1.4, 1.5, 32]} />
                 <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
             </mesh>
         </group>
      </group>

      <Html transform position={[0, 2, 0]} center scale={0.6}>
        <div className="text-center bg-black/50 p-6 rounded-2xl backdrop-blur-lg border-t border-cyan-500/50">
          <h2 className="text-5xl font-['Orbitron'] text-white mb-2">Escaneamento Digital</h2>
          <div className="h-1 w-24 bg-cyan-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-200 text-lg max-w-lg mx-auto">
            Precisão milimétrica com tecnologia de captura em 3D. 
            Rapidez e conforto em cada exame, sem moldes desconfortáveis.
          </p>
        </div>
      </Html>
    </group>
  );
};

export default ScanSection;
