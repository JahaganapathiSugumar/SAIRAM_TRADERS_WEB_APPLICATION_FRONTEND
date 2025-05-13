import { useContext, useState, useRef, useEffect } from 'react'
import { FaUpload, FaUndo, FaRedo, FaDownload, FaPalette, FaCube, FaTrash, FaInfoCircle } from 'react-icons/fa'
import RoomSimulation3D from '../components/RoomSimulation3D'
import { LanguageContext } from '../context/LanguageContext';

const ColorVisualizer = () => {
  const { translations } = useContext(LanguageContext);
  const [visualizationMode, setVisualizationMode] = useState('2d')
  const [selectedRoom, setSelectedRoom] = useState('living-room')
  const [selectedColor, setSelectedColor] = useState({ hex: '#6A8CAF', name: 'Serene Blue' })
  const [uploadedImage, setUploadedImage] = useState(null)
  const [activeWall, setActiveWall] = useState(null)
  const [selectedWalls, setSelectedWalls] = useState({})
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const rooms = {
    'living-room': {
      name: 'Living Room',
      walls: ['Back Wall', 'Front Wall', 'Left Wall', 'Right Wall'],
      defaultImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    },
    'bedroom': {
      name: 'Bedroom',
      walls: ['Back Wall', 'Front Wall', 'Left Wall', 'Right Wall'],
      defaultImage: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg'
    },
    'kitchen': {
      name: 'Kitchen',
      walls: ['Back Wall', 'Front Wall', 'Left Wall', 'Right Wall'],
      defaultImage: 'https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg'
    },
    'bathroom': {
      name: 'Bathroom',
      walls: ['Back Wall', 'Front Wall', 'Left Wall', 'Right Wall'],
      defaultImage: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg'
    }
  }

  const colors = [
    { name: "Serene Blue", hex: "#6A8CAF" },
    { name: "Sage Green", hex: "#9CAF88" },
    { name: "Terracotta", hex: "#CD5C45" },
    { name: "Dusty Rose", hex: "#D8A9A9" },
    { name: "Midnight Navy", hex: "#1D3461" },
    { name: "Golden Hour", hex: "#DCAE62" },
    { name: "Soft White", hex: "#F5F5F5" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Mint Green", hex: "#98FB98" },
    { name: "Lavender", hex: "#E6E6FA" }
  ]

  useEffect(() => {
    if (visualizationMode === '2d') {
      loadImage(uploadedImage || rooms[selectedRoom].defaultImage);
    }
  }, [visualizationMode, selectedRoom, uploadedImage]);

  const loadImage = (src) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      addToHistory(canvas.toDataURL());
    };
    img.src = src;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && visualizationMode === '2d') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setSelectedWalls({});
        setActiveWall(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (activeWall) {
      applyColorToWall(color.hex);
    }
  };

  const applyColorToWall = (color) => {
    if (!activeWall || visualizationMode !== '2d') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Save current canvas state
    const currentState = canvas.toDataURL();
    
    // Apply color overlay to selected wall area
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    
    // Define wall areas (simplified example - you'd need to implement proper wall area selection)
    const wallAreas = {
      'Back Wall': [0, 0, canvas.width * 0.8, canvas.height * 0.8],
      'Front Wall': [canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.6, canvas.height * 0.6],
      'Left Wall': [0, 0, canvas.width * 0.3, canvas.height],
      'Right Wall': [canvas.width * 0.7, 0, canvas.width * 0.3, canvas.height]
    };
    
    const area = wallAreas[activeWall];
    if (area) {
      ctx.fillRect(...area);
    }
    
    ctx.globalAlpha = 1.0;
    
    // Add to history
    addToHistory(canvas.toDataURL());
  };

  const addToHistory = (state) => {
    setHistory([...history.slice(0, historyIndex + 1), state]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      loadHistoryState(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      loadHistoryState(historyIndex + 1);
    }
  };

  const loadHistoryState = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[index];
  };

  const handleDownload = () => {
    if (visualizationMode === '2d' && canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'color-visualization.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{translations.colorVisualizer}</h1>
          <p className="text-lg opacity-90">{translations.colorVisualizerDesc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:w-1/4 space-y-6">
            {/* Visualization Mode Toggle */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">{translations.visualizationMode}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setVisualizationMode('2d')}
                  className={`flex-1 py-2 px-4 rounded ${
                    visualizationMode === '2d'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {translations.view2d}
                </button>
                <button
                  onClick={() => setVisualizationMode('3d')}
                  className={`flex-1 py-2 px-4 rounded ${
                    visualizationMode === '3d'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {translations.view3d}
                </button>
              </div>
            </div>

            {/* Room Selection */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">{translations.selectRoom}</h2>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(rooms).map(([id, room]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedRoom(id);
                      if (visualizationMode === '2d') {
                        setUploadedImage(null);
                      }
                    }}
                    className={`p-2 rounded ${
                      selectedRoom === id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload (2D Mode Only) */}
            {visualizationMode === '2d' && (
              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-lg font-semibold mb-4">{translations.roomImage}</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaUpload className="inline-block mr-2" />
                    {translations.uploadRoomPhoto}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500">
                    {translations.sampleRoomText}
                  </p>
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">{translations.chooseColor}</h2>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleColorSelect(color)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      selectedColor.hex === color.hex ? 'ring-2 ring-primary scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{selectedColor.name}</p>
                <p className="text-sm text-gray-600">{selectedColor.hex}</p>
              </div>
            </div>

            {/* Wall Selection */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">{translations.selectWall}</h2>
              <div className="space-y-2">
                {rooms[selectedRoom].walls.map((wall) => (
                  <button
                    key={wall}
                    onClick={() => setActiveWall(wall)}
                    className={`w-full py-2 px-4 rounded ${
                      activeWall === wall
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {wall}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Visualization Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-4">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  {visualizationMode === '2d' && (
                    <>
                      <button
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                        title={translations.undo}
                      >
                        <FaUndo />
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={historyIndex >= history.length - 1}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                        title={translations.redo}
                      >
                        <FaRedo />
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  <FaDownload className="mr-2" />
                  {translations.save}
                </button>
              </div>

              {/* Visualization Canvas/3D View */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {visualizationMode === '2d' ? (
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                  />
                ) : (
                  <RoomSimulation3D
                    roomType={selectedRoom}
                    selectedColor={selectedColor}
                    activeWall={activeWall}
                  />
                )}
              </div>

              {/* Help Text */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <FaInfoCircle className="text-primary mt-1 mr-2" />
                  <div>
                    <p className="font-medium">{translations.tips}</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      {visualizationMode === '2d' ? (
                        <>
                          <li>{translations.tips2d1}</li>
                          <li>{translations.tips2d2}</li>
                          <li>{translations.tips2d3}</li>
                          <li>{translations.tips2d4}</li>
                        </>
                      ) : (
                        <>
                          <li>{translations.tips3d1}</li>
                          <li>{translations.tips3d2}</li>
                          <li>{translations.tips3d3}</li>
                          <li>{translations.tips3d4}</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorVisualizer;