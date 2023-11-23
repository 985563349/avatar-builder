import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';

import { useCustomization } from '@/providers/customization';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

const generateMeshName = (prefix: string, index: number) => {
  return `${prefix}${index.toString().padStart(3, '0')}`;
};

const generateTattooMaterialName = (theme: string, index: number) => {
  return `TATTOO${theme.toUpperCase()}.${index.toString().padStart(3, '0')}`;
};

const MESH_INDEX_OFFSET = 1;
const MATERIAL_INDEX_OFFSET = 1;
const TEETH_MESH_INDEX = [6, 9, 10];
const TONGUE_MESH_INDEX = [8, 11];

const Model: React.FC<JSX.IntrinsicElements['group']> = (props) => {
  const { nodes, materials } = useGLTF('/models/peeps.gltf') as GLTFResult;

  const { theme, expression, hair, eyebrows, sunglasses, clothes, necklace, earrings, tattoo } =
    useCustomization();

  const expressionMeshName = generateMeshName('head', expression);
  const expressionMesh = nodes[expressionMeshName];

  const teethMeshName = generateMeshName('teeth', expression);
  const teethMesh = TEETH_MESH_INDEX.includes(expression) ? nodes.teeth002 : nodes[teethMeshName];

  const tongueMeshName = generateMeshName('tongue', expression);
  const tongueMesh = TONGUE_MESH_INDEX.includes(expression) ? nodes[tongueMeshName] : null;

  const eyebrowsMeshName = generateMeshName('eyebrows', eyebrows);
  const eyebrowsMesh = nodes[eyebrowsMeshName];

  const eyesMesh = nodes.eyes000;
  const earsMesh = nodes.ears000;
  const noseMesh = nodes.nose000;
  const neckMesh = nodes.neck000;

  const HairMeshName = generateMeshName('hair', hair - MESH_INDEX_OFFSET);
  const HairMesh = hair > MESH_INDEX_OFFSET ? nodes[HairMeshName] : null;

  const frameMeshName = generateMeshName('frame', sunglasses - MESH_INDEX_OFFSET);
  const frameMesh = sunglasses > MESH_INDEX_OFFSET ? nodes[frameMeshName] : null;

  const glassMeshName = generateMeshName('glass', sunglasses - MESH_INDEX_OFFSET);
  const glassMesh = sunglasses > MESH_INDEX_OFFSET ? nodes[glassMeshName] : null;

  const clothesMeshName = generateMeshName('clothes', clothes);
  const clothesMesh = nodes[clothesMeshName];

  const necklaceMeshName = generateMeshName('necklace', necklace - MESH_INDEX_OFFSET);
  const necklaceMesh = necklace > MESH_INDEX_OFFSET ? nodes[necklaceMeshName] : null;

  const earringsMeshName = generateMeshName('earrings', earrings - MESH_INDEX_OFFSET);
  const earringsMesh = earrings > MESH_INDEX_OFFSET ? nodes[earringsMeshName] : null;

  const themeMaterialName = theme === 'light' ? 'SKIN FACE BODY LIGHT' : 'SKIN FACE BODY DARK';
  const tattooMaterialName = generateTattooMaterialName(theme, tattoo - MATERIAL_INDEX_OFFSET);

  const globalMaterial =
    tattoo > MATERIAL_INDEX_OFFSET ? materials[tattooMaterialName] : materials[themeMaterialName];

  return (
    <group {...props} dispose={null}>
      <mesh geometry={expressionMesh.geometry} material={globalMaterial} receiveShadow />

      <mesh geometry={teethMesh.geometry} material={teethMesh.material} />

      {tongueMesh && <mesh geometry={tongueMesh.geometry} material={tongueMesh.material} />}

      <mesh geometry={eyebrowsMesh.geometry} material={eyebrowsMesh.material} castShadow />

      <mesh geometry={eyesMesh.geometry} material={globalMaterial} castShadow />
      <mesh geometry={earsMesh.geometry} material={globalMaterial} />
      <mesh geometry={noseMesh.geometry} material={globalMaterial} />
      <mesh geometry={neckMesh.geometry} material={globalMaterial} receiveShadow />

      {HairMesh && <mesh geometry={HairMesh.geometry} material={HairMesh.material} castShadow />}

      {frameMesh && <mesh geometry={frameMesh.geometry} material={frameMesh.material} />}
      {glassMesh && <mesh geometry={glassMesh.geometry} material={glassMesh.material} />}

      <mesh geometry={clothesMesh.geometry} material={clothesMesh.material} receiveShadow />

      {necklaceMesh && (
        <mesh geometry={necklaceMesh.geometry} material={necklaceMesh.material} castShadow />
      )}

      {earringsMesh && <mesh geometry={earringsMesh.geometry} material={earringsMesh.material} />}
    </group>
  );
};

export { Model };

useGLTF.preload('/models/peeps.gltf');
