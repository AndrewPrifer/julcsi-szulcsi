import React, { Suspense, useEffect, useRef } from 'react';

import { Canvas, useLoader } from 'react-three-fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, useCubeTextureLoader } from 'drei';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { SpotLight } from 'three';

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
  const spotLightRef = useRef<SpotLight>();

  // Shadow helper
  // const { scene } = useThree();
  // useEffect(() => {
  //   if (spotLightRef.current && spotLightRef.current.shadow) {
  //     const helper = new CameraHelper(spotLightRef.current.shadow.camera);
  //     scene.add(helper);
  //
  //     console.log(spotLightRef.current.shadow.camera.near);
  //     console.log(spotLightRef.current.shadow.camera.far);
  //   }
  // }, [scene, spotLightRef]);

  return (
    <>
      <pointLight position={[0, 5, 20]} intensity={0.1} />
      <spotLight
        ref={spotLightRef}
        position={[3, 3, 3]}
        penumbra={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={10}
        shadow-bias={-0.001}
      />
      <OrbitControls
        autoRotate
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
      <Suspense fallback={null}>
        <Trophy rotation-y={(Math.PI / 2) * 3} position-y={-2.5} />
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
        <Scene />
      </Canvas>
      <Confetti width={width} height={height} />
    </>
  );
};

export default App;
