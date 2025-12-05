import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Portal({ mouse }) {
    const portalRef = useRef();
    const innerRingsRef = useRef();
    const outerRingsRef = useRef();
    const coreRef = useRef();

    // Create simplified rings data - reduced from 8 to 4
    const rings = useMemo(() => {
        return [
            { scale: 0.7, color: '#00f0ff', offset: 0 },
            { scale: 0.9, color: '#ff0080', offset: Math.PI / 4 },
            { scale: 1.1, color: '#b026ff', offset: Math.PI / 2 },
            { scale: 1.3, color: '#00f0ff', offset: Math.PI * 0.75 },
        ];
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Rotate entire portal slightly based on mouse
        if (portalRef.current && mouse) {
            portalRef.current.rotation.x = THREE.MathUtils.lerp(
                portalRef.current.rotation.x,
                mouse.y * 0.2,
                0.03
            );
            portalRef.current.rotation.y = THREE.MathUtils.lerp(
                portalRef.current.rotation.y,
                mouse.x * 0.2,
                0.03
            );
        }

        // Animate inner rings
        if (innerRingsRef.current) {
            innerRingsRef.current.rotation.z = time * 0.3;
        }

        // Animate outer rings (opposite direction)
        if (outerRingsRef.current) {
            outerRingsRef.current.rotation.z = -time * 0.2;
        }

        // Pulse the core
        if (coreRef.current) {
            const pulse = 1 + Math.sin(time * 1.5) * 0.08;
            coreRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group ref={portalRef}>
            {/* Core glow sphere */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.8, 24, 24]} />
                <meshBasicMaterial
                    color="#ff0080"
                    transparent
                    opacity={0.25}
                />
            </mesh>

            {/* Inner nebula effect */}
            <mesh>
                <sphereGeometry args={[1.2, 24, 24]} />
                <meshBasicMaterial
                    color="#b026ff"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Rotating rings - inner */}
            <group ref={innerRingsRef}>
                {rings.slice(0, 2).map((ring, i) => (
                    <mesh
                        key={`inner-${i}`}
                        rotation={[Math.PI / 2 + ring.offset, 0, 0]}
                        scale={ring.scale}
                    >
                        <torusGeometry args={[2, 0.02, 8, 64]} />
                        <meshBasicMaterial
                            color={ring.color}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                ))}
            </group>

            {/* Rotating rings - outer */}
            <group ref={outerRingsRef}>
                {rings.slice(2).map((ring, i) => (
                    <mesh
                        key={`outer-${i}`}
                        rotation={[Math.PI / 2 + ring.offset, ring.offset / 2, 0]}
                        scale={ring.scale}
                    >
                        <torusGeometry args={[2, 0.025, 8, 64]} />
                        <meshBasicMaterial
                            color={ring.color}
                            transparent
                            opacity={0.5}
                        />
                    </mesh>
                ))}
            </group>

            {/* Main portal ring with glow */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.04, 12, 64]} />
                <meshBasicMaterial color="#00f0ff" />
            </mesh>

            {/* Portal surface (dark center) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.9, 48]} />
                <meshBasicMaterial
                    color="#0d0221"
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Simplified lighting */}
            <pointLight color="#00f0ff" intensity={1.5} distance={8} />
            <pointLight color="#ff0080" intensity={0.8} distance={6} position={[0, 0, 1]} />
        </group>
    );
}
