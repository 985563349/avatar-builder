import { Canvas } from '@react-three/fiber';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

import { Experience } from '@/components/experience';
import { Configurator } from '@/components/configurator';
import { CustomizationProvider } from '@/providers/customization';

function App() {
  return (
    <CustomizationProvider>
      <div className="min-w-screen min-h-screen bg-slate-300 p-6">
        <div className="text-right">
          <button className="inline-flex transition-colors rounded-xl px-6 py-3 text-white bg-teal-500 hover:bg-teal-600">
            <ArrowDownTrayIcon className="mr-2 w-6 h-6" />
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
            <Experience />
          </Canvas>
        </div>

        <Configurator />
      </div>
    </CustomizationProvider>
  );
}

export default App;
