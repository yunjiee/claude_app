'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Icosahedron({
  position, color, speed, opacity = 0.45,
}: { position: [number, number, number]; color: string; speed: number; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.x += d * speed * 0.4
    ref.current.rotation.y += d * speed * 0.7
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.6}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  )
}

function Torus({
  position, color, speed, opacity = 0.4,
}: { position: [number, number, number]; color: string; speed: number; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.x += d * speed * 0.5
    ref.current.rotation.z += d * speed * 0.3
  })
  return (
    <Float speed={2} rotationIntensity={0.7} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.42, 0.14, 16, 60]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  )
}

function Octahedron({
  position, color, speed, opacity = 0.42,
}: { position: [number, number, number]; color: string; speed: number; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.y += d * speed * 0.6
    ref.current.rotation.z += d * speed * 0.3
  })
  return (
    <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.8}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#6366f1" />

      {/* Left cluster */}
      <Icosahedron position={[-3.6, 1.6, -1]}   color="#6366f1" speed={0.4} />
      <Octahedron  position={[-3.2, -1.4, -0.5]} color="#818cf8" speed={0.5} />

      {/* Right cluster */}
      <Torus       position={[3.4, 0.8, -0.8]}   color="#8b5cf6" speed={0.55} />
      <Icosahedron position={[3.0, -1.6, -1]}    color="#a78bfa" speed={0.35} />

      {/* Center-top */}
      <Octahedron  position={[0.6, 2.4, -2]}     color="#3b82f6" speed={0.45} />

      {/* Far back */}
      <Torus       position={[-1.5, -2.2, -2.5]} color="#60a5fa" speed={0.3}  opacity={0.25} />
      <Icosahedron position={[2.0, 2.0, -3]}     color="#c4b5fd" speed={0.25} opacity={0.2} />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
