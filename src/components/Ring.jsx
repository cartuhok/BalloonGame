import React, { useEffect } from 'react'
import { TextureLoader, RepeatWrapping } from 'three'
import { useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Sparkles } from "@react-three/drei"

export function Ring({ position, size, textureUrl }) {
  const [radius, tube] = size
  const checkeredTexture = textureUrl ? useLoader(TextureLoader, textureUrl) : null

  useEffect(() => {
    if (checkeredTexture) {
      checkeredTexture.wrapS = RepeatWrapping
      checkeredTexture.repeat.set(10, 1)

     checkeredTexture.needsUpdate = true
    }
  }, [checkeredTexture])

  return ( 
    <RigidBody type="fixed" colliders="trimesh" isSensor={true} position={position}>
      <mesh>
        <torusGeometry args={[radius, tube, 16, 100]} />
        <meshStandardMaterial 
          color={!checkeredTexture ? "gold" : undefined} 
          map={checkeredTexture} 
        />
        <Sparkles count={15} scale={5} size={5} speed={1} color="gold" />
      </mesh>
    </RigidBody>
  )
}
