import { useState, useRef, useEffect } from 'react'
import { FaUpload, FaUndo, FaRedo, FaDownload, FaPalette, FaCube, FaTrash, FaInfoCircle } from 'react-icons/fa'
import RoomSimulation3D from '../components/RoomSimulation3D'

const ColorVisualizer = () => {
  const roomImages = [
    {
      id: 'living-room',
      name: 'Living Room',
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'A cozy living room where family and friends gather. Choose warm, inviting colors for a welcoming atmosphere.',
      walls: [
        {id: 'wall1', name: 'Main Wall', x: 0.2, y: 0.3, width: 0.6, height: 0.5},
        {id: 'wall2', name: 'Side Wall', x: 0.05, y: 0.3, width: 0.15, height: 0.5}
      ]
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      src: 'hhttps://res.cloudinary.com/dyxu6ylng/image/upload/v1747099147/download_kijv9u.jpg',
      description: 'Your personal sanctuary for rest and relaxation. Consider calming blues or soft neutrals for a peaceful sleep environment.',
      walls: [
        {id: 'wall1', name: 'Bed Wall', x: 0.1, y: 0.2, width: 0.8, height: 0.6},
        {id: 'wall2', name: 'Side Wall', x: 0.1, y: 0.2, width: 0.2, height: 0.6}
      ]
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      src: 'https://res.cloudinary.com/dyxu6ylng/image/upload/v1747099117/images_e5bxtt.jpg',
      description: 'The heart of your home where meals are prepared. Bright, energetic colors can stimulate appetite and conversation.',
      walls: [
        {id: 'wall1', name: 'Main Wall', x: 0.1, y: 0.1, width: 0.8, height: 0.5},
        {id: 'wall2', name: 'Cabinet Wall', x: 0.1, y: 0.1, width: 0.4, height: 0.5}
      ]
    },
    {
      id: 'exterior',
      name: 'House Exterior',
      src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      description: 'The first impression of your home. Choose colors that complement your surroundings and reflect your personal style.',
      walls: [
        {id: 'wall1', name: 'Front Wall', x: 0.2, y: 0.2, width: 0.6, height: 0.6},
        {id: 'wall2', name: 'Side Wall', x: 0.05, y: 0.2, width: 0.15, height: 0.6}
      ]
    }
  ]

  const paintColors = [
    { name: "Serene Blue", hex: "#6A8CAF", description: "A calming blue that brings tranquility" },
    { name: "Sage Green", hex: "#9CAF88", description: "An earthy green that connects with nature" },
    { name: "Terracotta", hex: "#CD5C45", description: "A warm, earthy tone for coziness" },
    { name: "Dusty Rose", hex: "#D8A9A9", description: "A soft, muted pink for subtle warmth" },
    { name: "Midnight Navy", hex: "#1D3461", description: "A deep, sophisticated navy" },
    { name: "Golden Hour", hex: "#DCAE62", description: "A warm gold capturing sunset magic" },
    { name: "Soft White", hex: "#F5F5F5", description: "A clean, versatile white" },
    { name: "Charcoal", hex: "#36454F", description: "A rich, modern neutral" },
    { name: "Mint Green", hex: "#98FB98", description: "A fresh, invigorating green" },
    { name: "Lavender", hex: "#E6E6FA", description: "A gentle, soothing purple" }
  ]

  const [selectedRoom, setSelectedRoom] = useState(roomImages[0])
  const [selectedColor, setSelectedColor] = useState(paintColors[0])
  const [customColor, setCustomColor] = useState('#6A8CAF')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [opacity, setOpacity] = useState(0.7)
  const [visualizationMode, setVisualizationMode] = useState('2d')
  const [selectedWalls, setSelectedWalls] = useState({})
  const [activeWall, setActiveWall] = useState(null)
  const [showTip, setShowTip] = useState(true)
  
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (visualizationMode === '2d') {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.src = uploadedImage || selectedRoom.src
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        if (!uploadedImage) {
          Object.entries(selectedWalls).forEach(([wallId, colorInfo]) => {
            const wall = selectedRoom.walls.find(w => w.id === wallId)
            if (wall) {
              applyColorToWall(ctx, canvas, wall, colorInfo.color, colorInfo.opacity)
            }
          })
        }
        
        if (historyIndex === history.length - 1 || historyIndex === -1) {
          const newHistoryItem = canvas.toDataURL()
          setHistory([...history.slice(0, historyIndex + 1), newHistoryItem])
          setHistoryIndex(historyIndex + 1)
        }
      }
    }
  }, [selectedRoom, uploadedImage, visualizationMode, selectedWalls])

  useEffect(() => {
    setSelectedWalls({})
    setActiveWall(null)
  }, [selectedRoom])

  const applyColorToWall = (ctx, canvas, wall, color, wallOpacity = opacity) => {
    const x = wall.x * canvas.width
    const y = wall.y * canvas.height
    const width = wall.width * canvas.width
    const height = wall.height * canvas.height
    
    ctx.fillStyle = color
    ctx.globalAlpha = wallOpacity
    ctx.fillRect(x, y, width, height)
    ctx.globalAlpha = 1.0
  }

  const handleRoomChange = (room) => {
    setSelectedRoom(room)
    setUploadedImage(null)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setCustomColor(color.hex)
    
    if (activeWall) {
      applyColorToActiveWall(color.hex)
    }
  }

  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value)
    setSelectedColor({ name: "Custom", hex: e.target.value })
    
    if (activeWall) {
      applyColorToActiveWall(e.target.value)
    }
  }

  const applyColorToActiveWall = (color) => {
    if (!activeWall) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const wall = selectedRoom.walls.find(w => w.id === activeWall)
    if (!wall) return
    
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = uploadedImage || selectedRoom.src
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      const updatedWalls = {
        ...selectedWalls,
        [activeWall]: { color, opacity }
      }
      setSelectedWalls(updatedWalls)
      
      Object.entries(updatedWalls).forEach(([wallId, colorInfo]) => {
        const w = selectedRoom.walls.find(w => w.id === wallId)
        if (w) {
          applyColorToWall(ctx, canvas, w, colorInfo.color, colorInfo.opacity)
        }
      })
      
      const newHistoryItem = canvas.toDataURL()
      setHistory([...history.slice(0, historyIndex + 1), newHistoryItem])
      setHistoryIndex(historyIndex + 1)
    }
  }

  const handleWallSelect = (wallId) => {
    setActiveWall(wallId)
    setShowTip(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target.result)
        setSelectedWalls({})
        setActiveWall(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      const img = new Image()
      img.src = history[historyIndex - 1]
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      const img = new Image()
      img.src = history[historyIndex + 1]
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
    }
  }

  const handleDownload = () => {
    if (visualizationMode === '2d') {
      const canvas = canvasRef.current
      const image = canvas.toDataURL("image/png")
      const link = document.createElement('a')
      link.download = `colorcraft-visualization-${new Date().getTime()}.png`
      link.href = image
      link.click()
    } else {
      alert('3D visualization download coming soon!')
    }
  }

  const handleOpacityChange = (e) => {
    const newOpacity = parseFloat(e.target.value)
    setOpacity(newOpacity)
    
    if (activeWall && selectedWalls[activeWall]) {
      const updatedWalls = {
        ...selectedWalls,
        [activeWall]: { 
          ...selectedWalls[activeWall],
          opacity: newOpacity 
        }
      }
      setSelectedWalls(updatedWalls)
      
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.src = uploadedImage || selectedRoom.src
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        Object.entries(updatedWalls).forEach(([wallId, colorInfo]) => {
          const wall = selectedRoom.walls.find(w => w.id === wallId)
          if (wall) {
            applyColorToWall(ctx, canvas, wall, colorInfo.color, colorInfo.opacity)
          }
        })
      }
    }
  }

  const handleClearColors = () => {
    setSelectedWalls({})
    setActiveWall(null)
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = uploadedImage || selectedRoom.src
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      const newHistoryItem = canvas.toDataURL()
      setHistory([...history.slice(0, historyIndex + 1), newHistoryItem])
      setHistoryIndex(historyIndex + 1)
    }
  }

  const toggleVisualizationMode = () => {
    setVisualizationMode(visualizationMode === '2d' ? '3d' : '2d')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container-custom py-12">
          <h1 className="text-4xl font-bold mb-4">Color Visualizer</h1>
          <p className="text-xl opacity-90">Transform your space with our interactive color visualization tool</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Room Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Choose a Room</h2>
              <div className="grid grid-cols-2 gap-3">
                {roomImages.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleRoomChange(room)}
                    className={`relative rounded-lg overflow-hidden transition-all ${
                      selectedRoom.id === room.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-gray-200'
                    }`}
                  >
                    <img 
                      src={room.src} 
                      alt={room.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{room.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>{selectedRoom.description}</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaUpload className="mr-2" />
                  Upload Your Own Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Colors</h2>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {paintColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      selectedColor.hex === color.hex ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      className="h-10 w-10 rounded"
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Opacity: {Math.round(opacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={handleOpacityChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Wall Selection */}
            {visualizationMode === '2d' && !uploadedImage && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Select Wall</h2>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRoom.walls.map((wall) => (
                    <button
                      key={wall.id}
                      onClick={() => handleWallSelect(wall.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeWall === wall.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {wall.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleUndo}
                    disabled={historyIndex <= 0 || visualizationMode === '3d'}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                  >
                    <FaUndo />
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1 || visualizationMode === '3d'}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                  >
                    <FaRedo />
                  </button>
                  <button
                    onClick={handleClearColors}
                    className="p-2 rounded-lg hover:bg-gray-100 text-red-500"
                    title="Clear Colors"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={toggleVisualizationMode}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {visualizationMode === '2d' ? (
                      <><FaCube className="mr-2" /> Switch to 3D</>
                    ) : (
                      <><FaPalette className="mr-2" /> Switch to 2D</>
                    )}
                  </button>
                </div>
              </div>

              {/* Visualization Area */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                {visualizationMode === '2d' ? (
                  <>
                    <canvas 
                      ref={canvasRef}
                      className="w-full h-auto"
                    />
                    {showTip && !uploadedImage && (
                      <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-4 shadow-lg max-w-sm">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-primary mt-1 mr-2" />
                          <div>
                            <p className="font-medium">Getting Started</p>
                            <p className="text-sm text-gray-600">Select a wall from the sidebar and choose a color to begin visualizing.</p>
                          </div>
                          <button 
                            onClick={() => setShowTip(false)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <RoomSimulation3D selectedColor={selectedColor} />
                )}
              </div>

              {/* Selected Color Info */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="font-medium">{selectedColor.name}</span>
                  <span className="text-gray-500">{selectedColor.description}</span>
                </div>
                {visualizationMode === '3d' && (
                  <p className="text-sm text-gray-500">
                    Tip: Drag to rotate, scroll to zoom
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorVisualizer