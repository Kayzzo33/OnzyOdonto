
import React, { useRef } from 'react';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const TreatmentCard: React.FC<{ position: [number, number, number]; text: string; delay: number }> = ({ position, text, delay }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if(meshRef.current) {
            // Subtle rotation towards camera
            meshRef.current.lookAt(0,0,5); 
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
            <group position={position}>
                {/* Glass Plate */}
                <mesh ref={meshRef}>
                    <boxGeometry args={[3.5, 1, 0.1]} />
                    <meshPhysicalMaterial 
                        color="#ffffff" 
                        transmission={0.6} 
                        roughness={0.1} 
                        thickness={0.5} 
                        clearcoat={1}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                {/* Text on plate */}
                <Text
                    position={[0, 0, 0.06]}
                    fontSize={0.25}
                    color="#000000" // Black text on glass for readability or Cyan
                    font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86ZGomt_47Ww8.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {text}
                </Text>
                {/* Glow border */}
                <mesh>
                     <boxGeometry args={[3.55, 1.05, 0.09]} />
                     <meshBasicMaterial color="#00ffff" wireframe />
                </mesh>
            </group>
        </Float>
    );
}

const TreatmentSection: React.FC = () => {
  const treatments = [
    "Implantes Digitais",
    "Alinhadores Invisíveis",
    "Lentes de Contato",
    "Limpeza Profunda",
    "Restaurações Estéticas",
    "Harmonização Facial"
  ];

  return (
    <group>
      <Text 
        position={[0, 3, 0]} 
        fontSize={0.8} 
        font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86ZGomt_47Ww8.woff"
        color="#ffffff"
      >
        NOSSOS TRATAMENTOS
      </Text>
      
      {treatments.map((t, i) => {
          // Spiral layout or random scatter
          const x = (i % 2 === 0 ? -1 : 1) * 2.5;
          const y = 1.5 - (i * 0.8);
          const z = - (i * 1.5); // Stagger depth
          
          return <TreatmentCard key={i} position={[x, y, z]} text={t.toUpperCase()} delay={i} />
      })}
    </group>
  );
};

export default TreatmentSection;
