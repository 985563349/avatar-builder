import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

const Model: React.FC<JSX.IntrinsicElements['group']> = (props) => {
  const { nodes } = useGLTF('/models/peeps.gltf') as GLTFResult;

  return (
    <group {...props}>
      <mesh geometry={nodes.head001.geometry} material={nodes.head001.material} receiveShadow />
      <mesh geometry={nodes.hair001.geometry} material={nodes.hair001.material} castShadow />
      <mesh geometry={nodes.ears000.geometry} material={nodes.ears000.material} />
      <mesh
        geometry={nodes.eyebrows001.geometry}
        material={nodes.eyebrows001.material}
        castShadow
      />
      <mesh geometry={nodes.eyes000.geometry} material={nodes.eyes000.material} castShadow />
      <mesh geometry={nodes.nose000.geometry} material={nodes.nose000.material} />
      <mesh geometry={nodes.teeth001.geometry} material={nodes.teeth001.material} />
      <mesh geometry={nodes.neck000.geometry} material={nodes.neck000.material} />
      <mesh geometry={nodes.clothes001.geometry} material={nodes.clothes001.material} />
    </group>
  );
};

export { Model };

useGLTF.preload('/models/peeps.gltf');
