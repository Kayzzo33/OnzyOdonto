
import React, { useRef } from 'react';
import { Html, Float, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SimulatedTooth } from '../Models';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const HeroSection: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating/breathing independent of Float component
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Model: Stylized Tooth */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[2.5, 0, -2]} rotation={[0, -0.5, 0]}>
           {/* Fallback to simulated shape if GLB fails or during dev */}
           <SimulatedTooth scale={1.2} />
        </group>
      </Float>

      {/* Text Overlay */}
      <Html
        transform
        position={[-1.5, 0.5, 0]}
        scale={0.5} // Scale down HTML in 3D space
        className="pointer-events-none"
        zIndexRange={[100, 0]}
      >
        <div ref={textRef} className="w-[600px] text-left select-none">
          <h1 className="text-7xl font-bold font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Onzy Odonto
          </h1>
          <h2 className="text-3xl font-light text-white mb-6 tracking-wide">
            Odontologia que ultrapassa o padrão.
          </h2>
          <p className="text-lg text-slate-300 font-light max-w-md leading-relaxed border-l-2 border-cyan-400 pl-4 bg-black/20 backdrop-blur-sm p-4 rounded-r-lg">
            Experiência imersiva. Precisão digital.<br />
            Tecnologia para transformar sorrisos.
          </p>
        </div>
      </Html>
    </group>
  );
};

export default HeroSection;
