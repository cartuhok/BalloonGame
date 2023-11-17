import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Clouds, Cloud, Environment, OrbitControls, Sky, Html } from '@react-three/drei';
import { Balloon } from './Balloon';
import { Ring } from "./Ring";
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import ScoreDisplay from './ScoreDisplay'
import { useControls } from "leva"

export default function CanvasContainer() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameOver(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        startGame();
      }
    };

    const handleTouchStart = () => {
      startGame();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameStarted]);


  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const minRingSize = [2, 0.1];
  const rings = Array.from({ length: 5 }, (_, index) => {
    const zPosition = -10 * (index + 1);
    const centerY = randomInRange(-6, 6);
    const radius = randomInRange(minRingSize[0], minRingSize[0] + 0.5);
    const tubeThickness = randomInRange(minRingSize[1], minRingSize[1] + 0.05);

    return {
      position: [0, centerY, zPosition],
      size: [radius, tubeThickness],
      topY: centerY + radius,
      bottomY: centerY - radius,
      z: zPosition
    };
  });

  // const { color, x, y, z, range, ...config } = useControls({
  //   seed: { value: 1, min: 1, max: 100, step: 1 },
  //   segments: { value: 20, min: 1, max: 80, step: 1 },
  //   volume: { value: 6, min: 0, max: 100, step: 0.1 },
  //   opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
  //   fade: { value: 10, min: 0, max: 400, step: 1 },
  //   growth: { value: 4, min: 0, max: 20, step: 1 },
  //   speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
  //   x: { value: 6, min: 0, max: 100, step: 1 },
  //   y: { value: 1, min: 0, max: 100, step: 1 },
  //   z: { value: 1, min: 0, max: 100, step: 1 },
  //   color: "white",
  // })

  // Function to reset the game
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(true);
  };

  return (
    <>
      {gameOver && (
        <div className="game-over-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white text-center text-2xl">
          Game Over. Press Space to Restart
        </div>
      )}
      {!gameStarted && !gameOver && (
        <div className="start-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white text-center text-2xl">
          Press Space to Start
        </div>
      )}

      {gameStarted && <ScoreDisplay />}

      <Canvas>
        <Perf />
        {/* <OrbitControls /> */}
        <Environment preset="city" />
        <Sky />
        <ambientLight intensity={Math.PI / 1.5} />
        <Clouds limit={400}>
          <Cloud   bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="white" />
          <Cloud  bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#FFBBB2" position={[15, 0, 0]} />
          <Cloud  bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#FFB4A4" position={[-15, 0, 0]} />
          <Cloud  bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#AFDEF1" position={[0, 0, -12]} />
          <Cloud  bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#F5AAAA" position={[0, 0, 12]} />
          <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={1.25} seed={0.3} bounds={200} volume={200} />
        </Clouds>
        {gameStarted ? (
          <Physics>
            <Balloon
              ringPositions={rings.map(ring => ({
                ...ring.position,
                topY: ring.topY,
                bottomY: ring.bottomY,
                z: ring.z
              }))}
              onMiss={resetGame}
            />
            {rings.map((ring, index) => (
              <Ring key={index} position={ring.position} size={ring.size} />
            ))}
          </Physics>
        ) : null}
      </Canvas>
    </>
  );
}