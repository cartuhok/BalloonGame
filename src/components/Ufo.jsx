import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

export default function UFO() {
    const ufo = useGLTF('./LowPolyUFO.glb');
    const animations = useAnimations(ufo.animations, ufo.scene);
    const ufoRef = useRef();
    const [toggleX, setToggleX] = useState(false); // Toggle for x-position

    console.log(animations.actions);

    useEffect(() => {
        const action1 = animations.actions.wobble;
        const action2 = animations.actions.light;
        action1.play();
        action2.play();
    }, [animations.actions]);

    useFrame((state, delta) => {
        if (ufoRef.current) {
            ufoRef.current.position.z += 0.05; // Move the UFO along the Z-axis
            if (ufoRef.current.position.z > 50) {
                ufoRef.current.position.z = -50; // Reset position when it goes off screen
                setToggleX(!toggleX); // Toggle the x position
                ufoRef.current.position.x = toggleX ? 4 : -4; // Update x position based on the toggle
            }
        }
    });

    return (
        <>
            <primitive
                ref={ufoRef}
                object={ufo.scene}
                scale={1}
                position={[-4, 0, -18 ]}
                rotation-y={-1.5}
            />
        </>
    );
}
