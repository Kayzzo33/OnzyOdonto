
import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const CTASection: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if(btnRef.current) {
          // Simple CSS transform via JS for high performance wobble
          const y = Math.sin(t * 3) * 5;
          btnRef.current.style.transform = `translateY(${y}px)`;
      }
  })

  return (
    <group>
      {/* Background Glow Mesh */}
      <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#000510" transparent opacity={0.9} />
      </mesh>
      
      <mesh position={[0, 0, -5]}>
          <circleGeometry args={[5, 64]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
      </mesh>

      <Html center transform position={[0, 0, 0]} scale={0.8}>
        <div className="flex flex-col items-center justify-center text-center w-[800px]">
           <h2 className="text-6xl font-bold font-['Orbitron'] text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
               TRANSFORME SEU SORRISO
           </h2>
           <p className="text-xl text-slate-300 mb-10 max-w-xl">
               A tecnologia existe para servir você. Entre em contato e agende sua consulta na Onzy Odonto hoje mesmo.
           </p>
           
           <button 
             ref={btnRef}
             className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-full border-2 border-cyan-400 text-cyan-400 font-bold text-lg uppercase tracking-widest hover:text-black transition-colors duration-300"
           >
             <span className="absolute inset-0 w-full h-full bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10">Agendar Agora</span>
           </button>
        </div>
      </Html>
    </group>
  );
};

export default CTASection;
