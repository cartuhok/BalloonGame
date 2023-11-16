import React from 'react';
import { RigidBody} from '@react-three/rapier';

export function Ring({ position, size }) {
    const [radius, tube] = size;
  
    return (
      <RigidBody type="fixed" colliders="trimesh" isSensor={true} position={position}>
        <mesh>
          <torusGeometry args={[radius, tube, 16, 100]} />
          <meshStandardMaterial color="gold" />
        </mesh>
      </RigidBody>
    );
  }