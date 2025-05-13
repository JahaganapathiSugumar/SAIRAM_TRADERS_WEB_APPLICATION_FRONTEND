import { useState, useEffect } from 'react';
import { FaCalculator, FaPaintRoller } from 'react-icons/fa';

const PaintCalculator = () => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    doors: 0,
    windows: 0
  });

  const [results, setResults] = useState({
    totalArea: 0,
    paintableArea: 0,
    litersNeeded: 0
  });

  const DOOR_AREA = 1.9; // square meters
  const WINDOW_AREA = 1.5; // square meters
  const PAINT_COVERAGE = 10; // square meters per liter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (dimensions.length && dimensions.width && dimensions.height) {
      // Calculate total wall area
      const totalArea = 2 * dimensions.height * (Number(dimensions.length) + Number(dimensions.width));
      
      // Calculate area taken by doors and windows
      const doorArea = dimensions.doors * DOOR_AREA;
      const windowArea = dimensions.windows * WINDOW_AREA;
      
      // Calculate paintable area
      const paintableArea = totalArea - doorArea - windowArea;
      
      // Calculate liters needed (rounded up)
      const litersNeeded = Math.ceil(paintableArea / PAINT_COVERAGE);
      
      setResults({
        totalArea: totalArea.toFixed(2),
        paintableArea: paintableArea.toFixed(2),
        litersNeeded
      });
    }
  }, [dimensions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <FaCalculator className="text-primary text-3xl mr-2" />
        <h2 className="text-2xl font-bold dark:text-white">Paint Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Room Length (meters)
          </label>
          <input
            type="number"
            name="length"
            value={dimensions.length}
            onChange={handleInputChange}
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Room Width (meters)
          </label>
          <input
            type="number"
            name="width"
            value={dimensions.width}
            onChange={handleInputChange}
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Room Height (meters)
          </label>
          <input
            type="number"
            name="height"
            value={dimensions.height}
            onChange={handleInputChange}
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Doors
          </label>
          <input
            type="number"
            name="doors"
            value={dimensions.doors}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Windows
          </label>
          <input
            type="number"
            name="windows"
            value={dimensions.windows}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {results.paintableArea > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center mb-4">
            <FaPaintRoller className="text-primary text-2xl mr-2" />
            <h3 className="text-lg font-semibold dark:text-white">Results</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Total Wall Area: <span className="font-semibold">{results.totalArea} m²</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Paintable Area: <span className="font-semibold">{results.paintableArea} m²</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Paint Needed: <span className="font-semibold">{results.litersNeeded} liters</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintCalculator;