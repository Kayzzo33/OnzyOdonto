
import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Import Section Components
import HeroSection from './sections/HeroSection';
import TechSection from './sections/TechSection';
import ScanSection from './sections/ScanSection';
import TreatmentSection from './sections/TreatmentSection';
import EnvironmentSection from './sections/EnvironmentSection';
import TestimonialSection from './sections/TestimonialSection';
import CTASection from './sections/CTASection';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const Scene: React.FC = () => {
  const scroll = useScroll();
  const { scene, mouse } = useThree();

  // Z-positions for each section (The Tunnel)
  const SECTIONS = {
    hero: 0,
    tech: -10,
    scan: -20,
    treatments: -30,
    portal: -40,
    testimonials: -50,
    cta: -60,
  };

  useFrame((state, delta) => {
    // 1. Camera Movement along Z based on scroll
    // We map scroll offset (0 to 1) to Z position (5 to -65)
    // scroll.offset is 0 at top, 1 at bottom
    const targetZ = 5 - (scroll.offset * 75); 
    
    // Smooth lerp for camera Z
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2);

    // 2. Mouse Parallax / Tilt
    // Subtle rotation based on mouse position
    const targetRotX = (mouse.y * 0.1); // Tilt up/down
    const targetRotY = -(mouse.x * 0.1); // Pan left/right

    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, delta * 4);
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotY, delta * 4);
    
    // Also rotate the entire scene slightly for extra immersion
    scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, mouse.x * 0.05, delta * 2);
  });

  return (
    <>
      {/* --- Lighting --- */}
      <ambientLight intensity={0.5} color="#b0c4de" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#00aaff" />

      {/* --- Environment --- */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#00ffff" />
      
      {/* --- Sections placed along the Z-Axis --- */}
      
      {/* 1. HERO - Z: 0 */}
      <group position={[0, 0, SECTIONS.hero]}>
        <HeroSection />
      </group>

      {/* 2. TECH - Z: -10 */}
      <group position={[0, 0, SECTIONS.tech]}>
        <TechSection />
      </group>

      {/* 3. SCAN - Z: -20 */}
      <group position={[0, 0, SECTIONS.scan]}>
        <ScanSection />
      </group>

      {/* 4. TREATMENTS - Z: -30 */}
      <group position={[0, 0, SECTIONS.treatments]}>
        <TreatmentSection />
      </group>

      {/* 5. PORTAL - Z: -40 */}
      <group position={[0, 0, SECTIONS.portal]}>
        <EnvironmentSection />
      </group>

      {/* 6. TESTIMONIALS - Z: -50 */}
      <group position={[0, 0, SECTIONS.testimonials]}>
        <TestimonialSection />
      </group>

      {/* 7. CTA - Z: -60 */}
      <group position={[0, 0, SECTIONS.cta]}>
        <CTASection />
      </group>

    </>
  );
};

export default Scene;
