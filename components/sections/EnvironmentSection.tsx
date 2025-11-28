
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SimulatedPortal } from '../Models';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const EnvironmentSection: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
      if(ringRef.current) {
          ringRef.current.rotation.z -= 0.005; // Slow rotation
      }
  })

  return (
    <group>
      <group ref={ringRef} scale={[3, 3, 3]}>
        <SimulatedPortal />
      </group>

      <Html transform position={[0, 0, 0]} center scale={0.7} zIndexRange={[50, 0]}>
        <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 w-[400px] h-[400px] text-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
           <h2 className="text-2xl font-bold font-['Orbitron'] mb-4 text-white">Ambiente Relaxante</h2>
           <p className="text-sm text-slate-300">
             Um ambiente feito para você relaxar. <br/>
             Conforto, tecnologia e atendimento humano.
           </p>
           <div className="mt-4 text-xs tracking-widest uppercase text-cyan-400">
               Atravesse o portal
           </div>
        </div>
      </Html>
    </group>
  );
};

export default EnvironmentSection;
