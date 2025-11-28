
import React from 'react';
import { Html, Float, MeshDistortMaterial } from '@react-three/drei';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const TestimonialBubble: React.FC<{ position: [number, number, number], quote: string, author: string, color: string }> = ({ position, quote, author, color }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
            <group position={position}>
                {/* Bubble Mesh */}
                <mesh>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <MeshDistortMaterial 
                        color={color} 
                        envMapIntensity={1} 
                        clearcoat={1} 
                        transmission={0.4} 
                        opacity={0.5} 
                        transparent 
                        distort={0.3} 
                        speed={2} 
                    />
                </mesh>
                
                <Html center distanceFactor={10} className="pointer-events-none w-48 text-center select-none">
                    <div className="text-white drop-shadow-md">
                        <p className="text-sm italic mb-2">"{quote}"</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-white/80">- {author}</p>
                    </div>
                </Html>
            </group>
        </Float>
    )
}

const TestimonialSection: React.FC = () => {
  return (
    <group>
       <Html position={[0, 4, 0]} center transform scale={1}>
           <h2 className="text-5xl font-['Orbitron'] text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">O QUE DIZEM</h2>
       </Html>

       <TestimonialBubble 
         position={[-3, 1, 0]} 
         quote="Nunca imaginei que ir ao dentista poderia ser tão tecnológico e tranquilo." 
         author="Mariana S."
         color="#00aaff"
       />

       <TestimonialBubble 
         position={[3, -1, -2]} 
         quote="O escaneamento 3D é incrível. Adeus massinha desconfortável!" 
         author="Carlos P."
         color="#00ffff"
       />

       <TestimonialBubble 
         position={[0, -2.5, 2]} 
         quote="Ambiente futurista e atendimento super humano. Recomendo demais." 
         author="Fernanda L."
         color="#ffffff"
       />
    </group>
  );
};

export default TestimonialSection;
