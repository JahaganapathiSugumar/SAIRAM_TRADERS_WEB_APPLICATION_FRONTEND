import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Room component with separate wall colors
const Room = ({ roomType, wallColors }) => {
  const roomRef = useRef();
  const dimensions = {
    'living-room': { width: 6, height: 3, depth: 5 },
    'bedroom': { width: 4, height: 2.8, depth: 4 },
    'kitchen': { width: 3.5, height: 2.8, depth: 4 },
    'bathroom': { width: 2.5, height: 2.8, depth: 2.5 }
  };
  const { width, height, depth } = dimensions[roomType] || dimensions['living-room'];

  useFrame(() => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.001;
    }
  });

  const Furniture = () => {
    switch (roomType) {
      case 'living-room':
        return (
          <>
            {/* Sofa */}
            <mesh position={[0, -height/2 + 0.4, depth/3]} castShadow>
              <boxGeometry args={[2.5, 0.8, 1]} />
              <meshStandardMaterial color="#D8D0C0" />
            </mesh>
            {/* Coffee Table */}
            <mesh position={[0, -height/2 + 0.3, 0]} castShadow>
              <boxGeometry args={[1.2, 0.1, 0.8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* TV */}
            <mesh position={[0, 0.5, -depth/2 + 0.05]} castShadow>
              <boxGeometry args={[1.2, 0.7, 0.05]} />
              <meshStandardMaterial color="#222" />
            </mesh>
          </>
        );
      case 'bedroom':
        return (
          <>
            {/* Bed */}
            <mesh position={[0, -height/2 + 0.3, -depth/3]} castShadow>
              <boxGeometry args={[2, 0.4, 2.2]} />
              <meshStandardMaterial color="#E6E6FA" />
            </mesh>
            {/* Bedside Table */}
            <mesh position={[1.2, -height/2 + 0.2, -depth/3]} castShadow>
              <boxGeometry args={[0.5, 0.4, 0.5]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Wardrobe */}
            <mesh position={[-width/2 + 0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.6, 2, 1.2]} />
              <meshStandardMaterial color="#deb887" />
            </mesh>
          </>
        );
      case 'kitchen':
        return (
          <>
            {/* Counter */}
            <mesh position={[-width/3, -height/2 + 0.5, -depth/3]} castShadow>
              <boxGeometry args={[2, 1, 0.6]} />
              <meshStandardMaterial color="#D8D0C0" />
            </mesh>
            {/* Upper Cabinets */}
            <mesh position={[-width/3, height/4, -depth/2 + 0.3]} castShadow>
              <boxGeometry args={[2, 1, 0.4]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Fridge */}
            <mesh position={[width/2 - 0.4, -height/2 + 1, depth/2 - 0.4]} castShadow>
              <boxGeometry args={[0.6, 2, 0.6]} />
              <meshStandardMaterial color="#b0c4de" />
            </mesh>
          </>
        );
      case 'bathroom':
        return (
          <>
            {/* Vanity */}
            <mesh position={[width/3, -height/2 + 0.4, -depth/2 + 0.3]} castShadow>
              <boxGeometry args={[1.2, 0.8, 0.5]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Mirror */}
            <mesh position={[width/3, height/6, -depth/2 + 0.1]} castShadow>
              <boxGeometry args={[0.8, 1, 0.1]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
            {/* Bathtub */}
            <mesh position={[-width/3, -height/2 + 0.4, depth/3]} castShadow>
              <boxGeometry args={[1.5, 0.5, 0.7]} />
              <meshStandardMaterial color="#e0ffff" />
            </mesh>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <group ref={roomRef}>
      {/* Floor */}
      <mesh position={[0, -height/2, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, height/2, 0]} rotation={[Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 0, -depth/2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColors.back} />
      </mesh>
      {/* Front Wall */}
      <mesh position={[0, 0, depth/2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColors.front} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-width/2, 0, 0]} rotation={[0, Math.PI/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={wallColors.left} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[width/2, 0, 0]} rotation={[0, -Math.PI/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={wallColors.right} />
      </mesh>
      {/* Furniture */}
      <Furniture />
    </group>
  );
};

const WallGuide = ({ wallColors }) => (
  <div
    style={{
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 20,
      background: "#fff",
      borderRadius: 6,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: 4,
      width: 70,
      fontSize: 10
    }}
  >
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 35,
          height: 12,
          background: wallColors.back,
          border: "1px solid #ccc",
          textAlign: "center",
          lineHeight: "12px",
          fontWeight: "bold"
        }}
      >
        Back
      </div>
    </div>
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: 12,
          height: 35,
          background: wallColors.left,
          border: "1px solid #ccc",
          textAlign: "center",
          writingMode: "vertical-rl",
          fontWeight: "bold"
        }}
      >
        Left
      </div>
      <div
        style={{
          width: 35,
          height: 35,
          background: "#eee",
          border: "1px solid #ccc"
        }}
      ></div>
      <div
        style={{
          width: 12,
          height: 35,
          background: wallColors.right,
          border: "1px solid #ccc",
          textAlign: "center",
          writingMode: "vertical-rl",
          fontWeight: "bold"
        }}
      >
        Right
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 35,
          height: 12,
          background: wallColors.front,
          border: "1px solid #ccc",
          textAlign: "center",
          lineHeight: "12px",
          fontWeight: "bold"
        }}
      >
        Front
      </div>
    </div>
  </div>
);

const sampleRooms = [
  {
    name: "Traditional Living Room",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Modern Indian Bedroom",
    url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Indian Kitchen",
    url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Colorful Indian Hall",
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80"
  }
];

const RoomSimulation3D = ({ roomType = "living-room" }) => {
  const [wallColors, setWallColors] = useState({
    back: "#F5F5F5",
    front: "#F5F5F5",
    left: "#F5F5F5",
    right: "#F5F5F5",
  });

  return (
    <div className="relative w-full" style={{ minHeight: "85vh", height: "85vh" }}>
      {/* Tips at the top */}
      <div className="w-full flex justify-center mb-2">
        <div className="bg-blue-50 text-blue-900 rounded px-4 py-2 text-xs shadow font-medium max-w-xl">
          <span className="font-bold">Tips:</span> Select a room type, choose a color for each wall, drag to rotate, and scroll to zoom in/out.
        </div>
      </div>
      {/* Wall Guide in top-left */}
      <WallGuide wallColors={wallColors} />
      {/* Color pickers */}
      <div className="flex flex-wrap gap-4 mb-4 bg-white p-2 rounded shadow max-w-md mx-auto">
        {["back", "front", "left", "right"].map((wall) => (
          <div key={wall} className="flex items-center gap-2">
            <span className="capitalize">{wall} wall:</span>
            <input
              type="color"
              value={wallColors[wall]}
              onChange={e =>
                setWallColors({ ...wallColors, [wall]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
      {/* 3D Canvas */}
      <div className="relative w-full h-full" style={{ minHeight: "70vh", height: "calc(100% - 110px)" }}>
        <Canvas
          shadows
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 3, 13], fov: 50, near: 0.1, far: 100 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[0, 3, 0]} intensity={0.5} />
          <Room roomType={roomType} wallColors={wallColors} />
          <OrbitControls
            makeDefault
            enableZoom={true}
            enablePan={false}
            minDistance={6}
            maxDistance={30}
            target={[0, 0, 0]}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default RoomSimulation3D;