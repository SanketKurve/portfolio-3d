import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function SkillOrb({ skill, index, total, onClick, isSelected }) {
    const meshRef = useRef();
    const ringRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Calculate position in a sphere pattern
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 6;

    const position = [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    ];

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Idle floating animation
        meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;

        // Spin effect
        meshRef.current.rotation.y = time * 0.5;

        // Ring rotation
        if (ringRef.current) {
            ringRef.current.rotation.x = time * 1;
            ringRef.current.rotation.z = time * 0.5;
        }

        // Scale on hover/select
        const targetScale = hovered || isSelected ? 1.3 : 1;
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        );
    });

    const color = new THREE.Color(skill.color);
    const orbSize = 0.3 + (skill.level / 100) * 0.3;

    return (
        <group
            ref={meshRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'auto';
            }}
        >
            {/* Core sphere */}
            <mesh>
                <sphereGeometry args={[orbSize, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered || isSelected ? 0.8 : 0.4}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[orbSize * 1.2, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Orbiting ring */}
            <group ref={ringRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[orbSize * 1.5, 0.02, 8, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.6} />
                </mesh>
            </group>

            {/* Second ring */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[orbSize * 1.3, 0.015, 8, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>

            {/* Point light */}
            <pointLight color={color} intensity={hovered ? 2 : 1} distance={3} />

            {/* Skill name label (visible on hover) */}
            {(hovered || isSelected) && (
                <Text
                    position={[0, orbSize + 0.5, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="bottom"
                    font="/fonts/Orbitron-Bold.woff"
                >
                    {skill.name}
                </Text>
            )}
        </group>
    );
}
