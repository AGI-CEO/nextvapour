import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import GameCase from "./models/GameCase";
import { useSpring } from "@react-spring/three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sparkles } from "@react-three/drei";

const GameCaseComp = ({
  cover: gameCover,
  spine: gameSpine,
  back: gameBack,
}) => {
  const [zPos, setZPos] = useState(3.4);
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({ zPos: isHovered ? 3 : 2.4 });

  const handleMouseOver = () => {
    setZPos(4.4);
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setZPos(3.4);
    setIsHovered(false);
  };

  return (
    <>
      <Canvas
        className="mx-auto"
        style={{
          height: "200px",
        }}
        camera={{ near: 0.1, far: 1000 }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <Sparkles count={2000} factor={4} scale={2000} colors={["#ffffff"]} />

        <GameCase
          zPos={springProps.zPos}
          position-z={springProps.zPos}
          scale={[12, 12, 12]}
          rotation={[0.1, 0.2, 0.1]}
          cover={gameCover}
          style={springProps}
          spine={gameSpine}
          back={gameBack}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={200}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default GameCaseComp;
