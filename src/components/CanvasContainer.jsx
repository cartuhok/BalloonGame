import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Clouds, Cloud, Environment, OrbitControls, Sky, Html, Stars, Sparkles, useGLTF, useAnimations } from '@react-three/drei'
import { Balloon } from './Balloon'
import { Ring } from "./Ring"
import { Physics } from '@react-three/rapier'
import ScoreDisplay from './ScoreDisplay'
import Confetti from 'react-confetti'
import { useStore } from '../stores/useStore'
import Birds from './Birds'
import UFO from './Ufo'
import checkeredTextureUrl from '/CheckerFlag.jpg'

export default function CanvasContainer() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [levelCompleted, setLevelCompleted] = useState(false)
  const [startMessage, setStartMessage] = useState('Press Space to Start')
  const [instructionsMessage, setInstructionsMessage] = useState('')

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true)
      setGameOver(false)
      setLevelCompleted(false)
      useStore.getState().resetScore()
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        startGame()
      }
    }

    const handleTouchStart = () => {
      startGame()
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [gameStarted])

  useEffect(() => {
    const isMobileDevice = () => {
      return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/BlackBerry/i)) ||
        (navigator.userAgent.match(/Windows Phone/i))
      )
    }

    if (isMobileDevice()) {
      setInstructionsMessage('Tap to keep the hot air balloon afloat and navigate through rings to score points!')
      setStartMessage('Touch to Start')
    } else {
      setInstructionsMessage('Click to keep the hot air balloon afloat and navigate through rings to score points!')
      setStartMessage('Press Space to Start')
    }
  }, [])


  const randomInRange = (min, max) => Math.random() * (max - min) + min

  const minRingSize = [2, 0.1]
  const rings = Array.from({ length: 5 }, (_, index) => {
    const zPosition = -10 * (index + 1)
    const centerY = randomInRange(-6, 6)
    const radius = randomInRange(minRingSize[0], minRingSize[0] + 0.5)
    const tubeThickness = randomInRange(minRingSize[1], minRingSize[1] + 0.05)

    return {
      position: [0, centerY, zPosition],
      size: [radius, tubeThickness],
      topY: centerY + radius,
      bottomY: centerY - radius,
      z: zPosition
    }
  })

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(true)
    setLevelCompleted(false)
  }

  const checkForLevelCompletion = () => {
    const currentScore = useStore.getState().score
    if (currentScore >= 500) {
      setLevelCompleted(true)
      setGameStarted(false)
    }
  }

  return (
    <>
      {gameOver && (
        <>
          <div className="game-over-screen absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-5xl font-LuckiestGuy-Regular">
            Game Over.
          </div>
          <div className="restart-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-5xl font-LuckiestGuy-Regular">
            {startMessage}
          </div>
        </>
      )}
      {!gameStarted && !gameOver && !levelCompleted && (
        <>
          <div className="instructions-screen absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-2xl lg:text-5xl font-LuckiestGuy-Regular">
            {instructionsMessage}
          </div>
          <div className="start-screen absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-5xl font-LuckiestGuy-Regular">
            {startMessage}
          </div>
        </>
      )}
      {levelCompleted && (
        <div className='w-screen h-screen absolute overflow-hidden'>
          <div className="you-won-screen absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-5xl font-PressStart2P-Regular">
            You Won!
          </div>
          <div className="restart-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 select-none text-white drop-shadow-lg text-center text-5xl font-LuckiestGuy-Regular">
            {startMessage}
          </div>
          <Confetti />
        </div>
      )}


      {gameStarted && <ScoreDisplay />}

      <Canvas>
        <Environment preset="city" />
        <Sky sunPosition={[0, 1, 3]} azimuth={0.5} />
        <Stars radius={200} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />

        <Birds />

        <UFO />

        <ambientLight intensity={Math.PI / 1.5} />
        <Clouds limit={400}>
          <Cloud bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="white" />
          <Cloud bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#FFBBB2" position={[15, 0, 0]} />
          <Cloud bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#FFB4A4" position={[-15, 0, 0]} />
          <Cloud bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#AFDEF1" position={[0, 0, -12]} />
          <Cloud bounds={[8, 5, 42]} growth={5} opacity={0.8} speed={0.42} color="#F5AAAA" position={[0, 0, 12]} />
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
              checkForLevelCompletion={checkForLevelCompletion}
            />
            {
              rings.map((ring, index) => (
                <Ring
                  key={index}
                  position={ring.position}
                  size={ring.size}
                  textureUrl={index === rings.length - 1 ? checkeredTextureUrl : null}
                />
              ))
            }
          </Physics>
        ) : null}
      </Canvas>
    </>
  )
}
