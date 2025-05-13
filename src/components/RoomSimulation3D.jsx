import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Room = ({ wallColor, floorColor, ceilingColor, accentWallColor, accentWallPosition }) => {
  const roomRef = useRef()
  
  const width = 5
  const height = 3
  const depth = 4
  
  const floorTexture = useTexture('https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(2, 2)
  
  // Create materials once and reuse
  const materials = {
    wall: new THREE.MeshStandardMaterial({ 
      color: wallColor,
      roughness: 0.8,
      metalness: 0.2
    }),
    accent: new THREE.MeshStandardMaterial({ 
      color: accentWallColor,
      roughness: 0.8,
      metalness: 0.2
    }),
    floor: new THREE.MeshStandardMaterial({ 
      color: floorColor,
      map: floorTexture,
      roughness: 0.8,
      metalness: 0.2
    }),
    ceiling: new THREE.MeshStandardMaterial({ 
      color: ceilingColor,
      roughness: 0.8,
      metalness: 0.2
    })
  }

  // Update material colors when props change
  useEffect(() => {
    materials.wall.color.set(wallColor)
    materials.accent.color.set(accentWallColor)
    materials.floor.color.set(floorColor)
    materials.ceiling.color.set(ceilingColor)
  }, [wallColor, accentWallColor, floorColor, ceilingColor])

  useFrame(() => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.001
    }
  })

  // Helper function to determine wall material
  const getWallMaterial = (position) => {
    // accentWallPosition can be 'back', 'front', 'left', or 'right'
    return position === accentWallPosition ? materials.accent : materials.wall;
  }

  return (
    <group ref={roomRef} position={[0, 0, 0]}>
      {/* Floor */}
      <mesh 
        position={[0, -height/2, 0]} 
        rotation={[-Math.PI/2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <primitive object={materials.floor} />
      </mesh>
      
      {/* Ceiling */}
      <mesh 
        position={[0, height/2, 0]} 
        rotation={[Math.PI/2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <primitive object={materials.ceiling} />
      </mesh>
      
      {/* Back Wall */}
      <mesh 
        position={[0, 0, -depth/2]} 
        receiveShadow
        castShadow
      >
        <planeGeometry args={[width, height]} />
        <primitive object={getWallMaterial('back')} />
      </mesh>
      
      {/* Front Wall */}
      <mesh 
        position={[0, 0, depth/2]} 
        rotation={[0, Math.PI, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[width, height]} />
        <primitive object={getWallMaterial('front')} />
      </mesh>
      
      {/* Left Wall */}
      <mesh 
        position={[-width/2, 0, 0]} 
        rotation={[0, Math.PI/2, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[depth, height]} />
        <primitive object={getWallMaterial('left')} />
      </mesh>
      
      {/* Right Wall */}
      <mesh 
        position={[width/2, 0, 0]} 
        rotation={[0, -Math.PI/2, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[depth, height]} />
        <primitive object={getWallMaterial('right')} />
      </mesh>
      
      {/* Furniture */}
      {/* Cabinet */}
      <mesh position={[0, -height/2 + 0.4, -depth/2 + 1]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1]} />
        <meshStandardMaterial color="#D8D0C0" />
      </mesh>
      
      {/* Cabinet Top */}
      <mesh position={[0, -height/2 + 0.8, -depth/2 + 0.6]} castShadow>
        <boxGeometry args={[2.5, 0.8, 0.2]} />
        <meshStandardMaterial color="#D8D0C0" />
      </mesh>
      
      {/* Table */}
      <mesh position={[0, -height/2 + 0.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Table Legs */}
      {[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], -height/2 + 0.15, pos[1]]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
      ))}
      
      {/* Picture Frame */}
      <mesh 
        position={[0, 0, -depth/2 + 0.01]} 
        castShadow
      >
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  )
}

const Scene = ({ wallColor, floorColor, ceilingColor, accentWallColor, accentWallPosition }) => {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 6)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      <pointLight position={[0, 1, 0]} intensity={0.8} />
      
      <Room 
        wallColor={wallColor} 
        floorColor={floorColor} 
        ceilingColor={ceilingColor} 
        accentWallColor={accentWallColor}
        accentWallPosition={accentWallPosition}
      />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI/6}
        maxPolarAngle={Math.PI/2}
      />
    </>
  )
}

const RoomSimulation3D = ({ selectedColor }) => {
  const [accentWallPosition, setAccentWallPosition] = useState('back')
  const [floorColor, setFloorColor] = useState('#8B4513')
  const [ceilingColor, setCeilingColor] = useState('#FFFFFF')
  const [webGLSupported, setWebGLSupported] = useState(true)
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-xl font-bold mb-4">3D Visualization Not Available</h3>
          <p className="text-gray-600">
            Your browser doesn't support WebGL, which is required for 3D visualization.
            Please try using a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="p-2 bg-white flex justify-between items-center">
        <h3 className="font-medium">3D Room Simulation</h3>
        <div className="flex space-x-2">
          <select 
            className="text-sm border rounded p-1"
            value={accentWallPosition}
            onChange={(e) => setAccentWallPosition(e.target.value)}
          >
            <option value="back">Accent: Back Wall</option>
            <option value="front">Accent: Front Wall</option>
            <option value="left">Accent: Left Wall</option>
            <option value="right">Accent: Right Wall</option>
          </select>
        </div>
      </div>
      
      <Canvas shadows>
        <Scene 
          wallColor="#F5F5F5" 
          floorColor={floorColor} 
          ceilingColor={ceilingColor} 
          accentWallColor={selectedColor.hex || '#6A8CAF'}
          accentWallPosition={accentWallPosition}
        />
      </Canvas>
      
      <div className="p-2 bg-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Floor:</span>
          <input 
            type="color" 
            value={floorColor} 
            onChange={(e) => setFloorColor(e.target.value)}
            className="w-6 h-6 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Ceiling:</span>
          <input 
            type="color" 
            value={ceilingColor} 
            onChange={(e) => setCeilingColor(e.target.value)}
            className="w-6 h-6 rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default RoomSimulation3D