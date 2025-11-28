
import React from 'react';
import { Html, Float } from '@react-three/drei';
import { SimulatedImplant } from '../Models';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const TechSection: React.FC = () => {
  return (
    <group>
       <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
        <group position={[-2, 0, 0]} rotation={[0.5, 0.5, 0]}>
            <SimulatedImplant />
        </group>
      </Float>

      <Html
        transform
        position={[1.5, 0, 0]}
        scale={0.5}
        zIndexRange={[90, 0]}
      >
        <div className="w-[500px] text-right">
          <h2 className="text-4xl font-bold font-['Orbitron'] text-white mb-4">
            Tecnologia que aproxima você
          </h2>
          <p className="text-xl text-cyan-300 mb-6 font-semibold">
            DO SEU MELHOR SORRISO
          </p>
          <p className="text-base text-slate-300 leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
            Aparelhos digitais, alinhadores invisíveis, scanners intraorais 
            e um ambiente completamente digital. Tudo integrado para sua segurança.
          </p>
        </div>
      </Html>
      
      {/* Decorative floating particles representing digital tech */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 2]} scale={0.05}>
            <boxGeometry />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
};

export default TechSection;
