import React, { useEffect, useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei"
import { RigidBody, vec3 } from "@react-three/rapier"
import { useStore } from '../stores/useStore'
import * as THREE from 'three'

export function Balloon({ ringPositions, onMiss, checkForLevelCompletion }) {
  const { nodes, materials } = useGLTF("./hotAirBalloon.glb")
  const rigidBodyRef = useRef()
  const encounteredRingsRef = useRef({})

  const [encounteredRings, setEncounteredRings] = useState({})
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3())
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

  // Importing the `resetScore` function from the store
  const resetScore = useStore(state => state.resetScore)

  // State to manage the upward force
  const [impulse, setImpulse] = useState({ x: 0, y: 0, z: 0 })

  // Constant velocity along the Z-axis
  const zVelocity = { x: 0, y: 0, z: -2 }

  // Upper and lower limits for the balloon's position
  const upperLimit = 30
  const lowerLimit = -20


  useFrame((state, delta) => {
    if (rigidBodyRef.current && Array.isArray(ringPositions)) {
      const bodyPosition = vec3(rigidBodyRef.current.translation())
      const balloonY = bodyPosition.y
      const balloonZ = bodyPosition.z

      // Check if the balloon's position is outside the limits
      if (balloonY > upperLimit || balloonY < lowerLimit) {
        resetScore()
        onMiss()
        return
      }

      ringPositions.forEach((ring, index) => {
        if (encounteredRingsRef.current[index]) return // Skip if already encountered
        const { topY, bottomY, z } = ring
        const zThreshold = 0.5

        if (Math.abs(balloonZ - z) <= zThreshold) {
          if (balloonY <= topY && balloonY >= bottomY) {
            if (!encounteredRingsRef.current[index]) {
              useStore.getState().incrementScore()
              encounteredRingsRef.current[index] = true // Mark as encountered
              checkForLevelCompletion()
            }
          } else {
            if (!encounteredRingsRef.current[index]) {
              resetScore()
              onMiss()
              encounteredRingsRef.current[index] = true
            }
          }
        }
      })

      const cameraPosition = new THREE.Vector3()
      cameraPosition.copy(bodyPosition)
      cameraPosition.z += 4.25

      const cameraTarget = new THREE.Vector3()
      cameraTarget.copy(bodyPosition)
      cameraTarget.y -= 0.5

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

      state.camera.position.copy(smoothedCameraPosition)
      state.camera.lookAt(smoothedCameraTarget)

      // Apply impulse if there is one
      if (impulse.y !== 0) {
        const currentVel = rigidBodyRef.current.linvel()
        const newVelocity = { x: 0, y: currentVel.y + impulse.y, z: zVelocity.z }
        rigidBodyRef.current.setLinvel(newVelocity, true)
        setImpulse({ x: 0, y: 0, z: 0 })
      } else {
        const currentVel = rigidBodyRef.current.linvel()
        const newVelocity = { x: 0, y: currentVel.y, z: zVelocity.z }
        rigidBodyRef.current.setLinvel(newVelocity, true)
      }
    }
  })

  const mouseImpulseValue = 10  // Impulse for mouse click
  const touchImpulseValue = 2   // Impulse for touch screen tap

  useEffect(() => {
    const applyMouseImpulse = () => {
      setImpulse({ x: 0, y: mouseImpulseValue, z: 0 })
    }

    const applyTouchImpulse = () => {
      setImpulse({ x: 0, y: touchImpulseValue, z: 0 })
    }

    window.addEventListener('mousedown', applyMouseImpulse)
    window.addEventListener('touchstart', applyTouchImpulse)

    return () => {
      window.removeEventListener('mousedown', applyMouseImpulse)
      window.removeEventListener('touchstart', applyTouchImpulse)
    }
  }, [])

  return (<>
    <RigidBody ref={rigidBodyRef} type="dynamic" colliders="hull" restitution={0.2} friction={1}>
      <group dispose={null} position={[0, -2, 0]} rotation={[0, Math.PI, 0]}>
        <group name="Balloon" position={[0, 2.263952, 0]}>
          <mesh
            name="Sphere"
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["PlasticPink pastel swiss krono"]}
          />
          <mesh
            name="Sphere_1"
            castShadow
            receiveShadow
            geometry={nodes.Sphere_1.geometry}
            material={materials["Pigeon Blue pastel SWISS KRONO plastic"]}
          />

        </group>
        <mesh
          name="Circle"
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials["Material.002"]}
          scale={0.268715}
        />
        <mesh
          name="Circle001"
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials["Material.005"]}
          position={[0, -0.497079, 0]}
          scale={[0.942047, 2.708636, 0.942047]}
        />
        <mesh
          name="Circle002"
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={materials["Material.003"]}
          position={[0, 0.000775, 0]}
          scale={1.007654}
        />
        <mesh
          name="Circle003"
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials["Material.003"]}
          position={[0, 0.511959, 0]}
          scale={0.798426}
        />
        <group name="Cartoon_Bear_lowpoly" scale={0.138092}>
          <group
            name="dasterast001"
            position={[-0.000442, 1.27321, 0.005541]}
            scale={5.464649}
          >
            <mesh
              name="Quad_Sphere056"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056.geometry}
              material={materials["Material.017"]}
            />
            <mesh
              name="Quad_Sphere056_1"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_1.geometry}
              material={materials["Material.016"]}
            />
            <mesh
              name="Quad_Sphere056_2"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_2.geometry}
              material={materials["Material.015"]}
            />
            <mesh
              name="Quad_Sphere056_3"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_3.geometry}
              material={materials["Material.014"]}
            />
            <mesh
              name="Quad_Sphere056_4"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_4.geometry}
              material={materials["Material.013"]}
            />
            <mesh
              name="Quad_Sphere056_5"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_5.geometry}
              material={materials["Material.008"]}
            />
            <mesh
              name="Quad_Sphere056_6"
              castShadow
              receiveShadow
              geometry={nodes.Quad_Sphere056_6.geometry}
              material={materials["Material.006"]}
            />

          </group>
        </group>
      </group>
    </RigidBody>
  </>
  )
}

useGLTF.preload("./hotAirBalloon.glb")
