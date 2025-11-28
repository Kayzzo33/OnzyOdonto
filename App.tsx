
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Loader } from '@react-three/drei';
import Scene from './components/Scene';

// Augment the global JSX namespace to include React Three Fiber elements.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[#050510]">
      {/* 
        The Canvas covers the entire screen. 
        ScrollControls creates the scrollable height.
      */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="touch-none pointer-events-none" // Ensure pointer events pass through for scroll
      >
        <color attach="background" args={['#050510']} />
        
        {/* Fog to hide the loading of far objects and enhance depth - Adjusted to start further back */}
        <fog attach="fog" args={['#050510', 10, 40]} />

        {/* Suspense handles async loading (fonts, models) to prevent blank screens */}
        <Suspense fallback={null}>
          {/* ScrollControls provides the scroll state to R3F components */}
          <ScrollControls pages={7} damping={0.2}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      <Loader />
      
      {/* Floating UI Elements (Logo, Menu) - Sticky */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <div className="text-2xl font-bold tracking-widest uppercase font-['Orbitron'] pointer-events-auto cursor-pointer">
          ONZY
        </div>
        <button className="pointer-events-auto border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-md">
          Menu
        </button>
      </div>
    </div>
  );
};

export default App;
