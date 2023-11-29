import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"

export default function Birds() {
    const birds = useGLTF('./birds.glb')
    const animations = useAnimations(birds.animations, birds.scene)
    const birdRef = useRef()

    useEffect(() => {
        const action = animations.actions.Scene
        action.play()
    }, [animations.actions])

    useFrame((state, delta) => {
        if (birdRef.current) {
            birdRef.current.position.x += 0.1
            if (birdRef.current.position.x > 50) {
                birdRef.current.position.x = -50 // Reset position when it goes off screen
            }
        }
    })

    return (<>
        <primitive
            ref={birdRef}
            object={birds.scene}
            scale={1}
            position={[-50, 9, -38]}
            rotation-y={-1.5}
        />
    </>
    )
}
