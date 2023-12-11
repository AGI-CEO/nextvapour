import { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";

export function GameCase({ back, spine, cover, zPos, ...props }) {
  const { nodes, materials } = useGLTF(
    "./assets/dvd_bd_game_case_with_sample_labels.glb"
  );
  const [coverMaterial, setCoverMaterial] = useState(materials.cover.clone());
  const [spineMaterial, setSpineMaterial] = useState(materials.spine.clone());
  const videoMaterial = useRef(new THREE.MeshBasicMaterial());

  useEffect(() => {
    new THREE.TextureLoader().load(cover, (texture) => {
      setCoverMaterial((material) => {
        material.map = texture;
        material.needsUpdate = true;
        return material;
      });
    });
    new THREE.TextureLoader().load(
      spine,
      (texture) => {
        setSpineMaterial((material) => {
          material.map = texture;
          material.needsUpdate = true;
          return material;
        });
      },
      undefined,
      (event) => {
        console.error(
          "An error occurred while loading the spine texture:",
          event.target.src
        );
      }
    );

    const video = document.createElement("video");
    video.src = back;
    video.muted = true;
    video.loop = true;
    video.load();
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoMaterial.current.map = videoTexture;
    videoMaterial.current.needsUpdate = true;
  }, [cover, spine, back]);

  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!coverMaterial.map || !spineMaterial.map || !back) return null;

  return (
    <animated.group position={[0, -1, 0]} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} ref={meshRef}>
          <group position={[0, 0.095, 0]} scale={[0.711, 1, 0.074]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={coverMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={spineMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={videoMaterial.current}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Car_plastic_dark}
            position={[0, 0.095, 0]}
            scale={[0.711, 1, 0.074]}
          />
        </group>
      </group>
    </animated.group>
  );
}

export default GameCase;
