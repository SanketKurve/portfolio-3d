import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reduced particle count for performance
export default function ParticleField({ count = 150, mouse }) {
    const mesh = useRef();

    // Generate particle positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 4 + Math.random() * 10;

            temp.push({
                position: [
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ],
                speed: 0.005 + Math.random() * 0.01,
                offset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    }, [count]);

    // Create geometry
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        particles.forEach((particle, i) => {
            pos[i * 3] = particle.position[0];
            pos[i * 3 + 1] = particle.position[1];
            pos[i * 3 + 2] = particle.position[2];
        });
        return pos;
    }, [particles, count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.elapsedTime;
        const positionArray = mesh.current.geometry.attributes.position.array;

        particles.forEach((particle, i) => {
            const i3 = i * 3;
            const angle = time * particle.speed + particle.offset;

            // Simple orbital movement
            positionArray[i3] = particle.position[0] + Math.sin(angle) * 0.3;
            positionArray[i3 + 1] = particle.position[1] + Math.cos(angle) * 0.3;
            positionArray[i3 + 2] = particle.position[2];
        });

        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = time * 0.01;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#00f0ff"
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
