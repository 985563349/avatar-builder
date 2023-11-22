import { Canvas } from '@react-three/fiber';

import { Scene } from '@/components/scene';
import { Configurator } from '@/components/configurator';

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-slate-300 p-6">
      <div className="text-right">
        <button className="transition-colors rounded-xl px-6 py-3 text-lg text-white bg-teal-500 hover:bg-teal-600">
          Download
        </button>
      </div>

      <div className="mx-auto w-full lg:w-[calc(100vh-300px)] aspect-square">
        <Canvas
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ antialias: true, useLegacyLights: true }}
          shadows
          orthographic
        >
          <Scene />
        </Canvas>
      </div>

      <Configurator />
    </div>
  );
}

export default App;
