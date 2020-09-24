import React, { Suspense, useEffect } from 'react';

import { Canvas, useLoader } from 'react-three-fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, useCubeTextureLoader, Plane, Loader } from 'drei';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Trophy = (props: JSX.IntrinsicElements['group']) => {
  const envMap = useCubeTextureLoader(
    ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    { path: 'cubemap/' }
  );
  const gltf = useLoader<GLTF>(GLTFLoader, '/julcsi.glb');

  useEffect(() => {
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse((child: any) => {
      if (child.material) child.material.envMap = envMap;
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [envMap, gltf]);

  return (
    <group {...props}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <pointLight position={[0, 5, 20]} intensity={0.1} />
      <directionalLight
        castShadow
        position={[2.5, 12, 12]}
        intensity={4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0003}
        color="hotpink"
      />
      <OrbitControls
        autoRotate
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - 0.35}
        maxPolarAngle={Math.PI / 2 + 0.35}
      />

      <Suspense fallback={null}>
        <Trophy rotation-y={(Math.PI / 2) * 3} position-y={-2.5} />
        <Plane
          args={[100, 100]}
          position-y={-2.5}
          rotation-x={-Math.PI / 2}
          receiveShadow
        >
          <meshStandardMaterial
            attach="material"
            color="hotpink"
            metalness={1}
            roughness={1}
          />
        </Plane>
      </Suspense>
    </>
  );
};

const App = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Canvas
        pixelRatio={2}
        concurrent
        noEvents
        colorManagement
        shadowMap
        onCreated={({ gl }) => {
          gl.setClearColor('hotpink');
        }}
      >
        <fog attach="fog" args={['hotpink', 5, 15]} />
        <Scene />
      </Canvas>
      <Loader {...({} as any)} />
      <Confetti width={width} height={height} />
    </>
  );
};

export default App;
