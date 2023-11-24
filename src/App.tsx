import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

import { Experience } from '@/components/experience';
import { Configurator } from '@/components/configurator';
import { CustomizationProvider } from '@/providers/customization';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const exportImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const link = document.createElement('a');
      const href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      link.setAttribute('download', 'avatar.png');
      link.setAttribute('href', href);
      link.click();
    }
  };

  return (
    <CustomizationProvider>
      <div className="min-w-screen min-h-screen bg-slate-300 p-6">
        <div className="text-right">
          <button
            className="inline-flex transition-colors rounded-xl px-6 py-3 text-white bg-teal-500 hover:bg-teal-600"
            onClick={exportImage}
          >
            <ArrowDownTrayIcon className="mr-2 w-6 h-6" />
            Download
          </button>
        </div>

        <div className="mx-auto w-full lg:w-[calc(100vh-300px)] aspect-square">
          <Canvas
            ref={canvasRef}
            frameloop="demand"
            dpr={[1, 2]}
            gl={{
              antialias: true,
              useLegacyLights: true,
              preserveDrawingBuffer: true,
            }}
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
