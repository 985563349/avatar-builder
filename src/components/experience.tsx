import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Model } from '@/components/model';

const POLAR_ANGLE = Math.PI / 2;
const AZIMUTH_ANGLE = Math.PI / 4;

const Experience: React.FC = () => {
  useFrame(({ gl, camera }) => {
    const zoom = gl.domElement.clientWidth / 3;

    if (camera.zoom !== zoom) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={POLAR_ANGLE}
        maxPolarAngle={POLAR_ANGLE}
        minAzimuthAngle={-AZIMUTH_ANGLE}
        maxAzimuthAngle={AZIMUTH_ANGLE}
      />

      <ambientLight color={0xffffff} intensity={0.6} />
      <pointLight
        color={0xffffff}
        intensity={0.6}
        position={[-0, 4, -2]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
      />
      <pointLight
        color={0xfffceb}
        intensity={0.4}
        position={[-4, 4, 4]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
      />
      <pointLight
        color={0x99b9ff}
        intensity={1.2}
        position={[3, 2, -5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
      />
      <pointLight color={0xfdd3d5} intensity={1} position={[-4, 2, -2]} />
      <spotLight
        color={0xfff3e7}
        intensity={0.8}
        angle={0.3}
        position={[5, 1, 6]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
      />

      <Model position={[0, -0.2, 0]} />
    </>
  );
};

export { Experience };
