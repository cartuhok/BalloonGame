import React from 'react';
import { RigidBody} from '@react-three/rapier';
import { Sparkles } from "@react-three/drei";

export function Ring({ position, size }) {
    const [radius, tube] = size;
  
    return (
      <RigidBody type="fixed" colliders="trimesh" isSensor={true} position={position}>
        <mesh>
          <torusGeometry args={[radius, tube, 16, 100]} />
          <meshStandardMaterial color="gold" />
          <Sparkles count={15} scale={5} size={5} speed={1} color="gold" />
        </mesh>
      </RigidBody>
    );
  }
