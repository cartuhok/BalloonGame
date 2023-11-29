import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"

export default function UFO() {
    const ufo = useGLTF('./LowPolyUFO.glb')
    const animations = useAnimations(ufo.animations, ufo.scene)
    const ufoRef = useRef()
    const [toggleX, setToggleX] = useState(false)

    console.log(animations.actions)

    useEffect(() => {
        const action1 = animations.actions.wobble
        const action2 = animations.actions.light
        action1.play()
        action2.play()
    }, [animations.actions])

    useFrame((state, delta) => {
        if (ufoRef.current) {
            ufoRef.current.position.z += 0.05
            if (ufoRef.current.position.z > 50) {
                ufoRef.current.position.z = -50
                setToggleX(!toggleX)
                ufoRef.current.position.x = toggleX ? 4 : -4
            }
        }
    })

    return (
        <>
            <primitive
                ref={ufoRef}
                object={ufo.scene}
                scale={1}
                position={[-4, 0, -18]}
                rotation-y={-1.5}
            />
        </>
    )
}
