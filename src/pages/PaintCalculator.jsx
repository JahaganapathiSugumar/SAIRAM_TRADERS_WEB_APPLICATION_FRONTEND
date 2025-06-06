import { useContext, useState, useEffect } from 'react';
import { FaCalculator, FaPaintRoller, FaInfoCircle } from 'react-icons/fa';
import { paintProducts } from './ProductCatalog';
import { LanguageContext } from '../context/LanguageContext';

const PaintCalculator = () => {
  const { translations } = useContext(LanguageContext);

  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    doors: 0,
    windows: 0,
    doorDimensions: [{ width: 0.9, height: 2.1 }],
    windowDimensions: [{ width: 1.2, height: 1.25 }],
    coats: 2
  });

  const [results, setResults] = useState({
    totalArea: 0,
    paintableArea: 0,
    litersNeeded: 0,
    estimatedCost: 0
  });

  const [selectedPaintId, setSelectedPaintId] = useState(paintProducts[0]?.id || '');

  const selectedPaint = paintProducts.find(p => p.id === Number(selectedPaintId));
  const PAINT_PRICE = selectedPaint ? selectedPaint.price / parseInt(selectedPaint.size) : 499; // price per liter

  const handlePaintChange = (e) => {
    setSelectedPaintId(e.target.value);
  };

  const PAINT_COVERAGE = 10; // square meters per liter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDoorDimensionChange = (index, field, value) => {
    const newDoorDimensions = [...dimensions.doorDimensions];
    newDoorDimensions[index][field] = parseFloat(value) || 0;
    setDimensions(prev => ({
      ...prev,
      doorDimensions: newDoorDimensions
    }));
  };

  const handleWindowDimensionChange = (index, field, value) => {
    const newWindowDimensions = [...dimensions.windowDimensions];
    newWindowDimensions[index][field] = parseFloat(value) || 0;
    setDimensions(prev => ({
      ...prev,
      windowDimensions: newWindowDimensions
    }));
  };

  useEffect(() => {
    // Update door dimensions array when number of doors changes
    if (dimensions.doors > dimensions.doorDimensions.length) {
      // Add new doors with default dimensions
      const newDoors = Array(dimensions.doors - dimensions.doorDimensions.length)
        .fill()
        .map(() => ({ width: 0.9, height: 2.1 }));
      setDimensions(prev => ({
        ...prev,
        doorDimensions: [...prev.doorDimensions, ...newDoors]
      }));
    } else if (dimensions.doors < dimensions.doorDimensions.length) {
      // Remove extra doors
      setDimensions(prev => ({
        ...prev,
        doorDimensions: prev.doorDimensions.slice(0, dimensions.doors)
      }));
    }
  }, [dimensions.doors]);

  useEffect(() => {
    // Update window dimensions array when number of windows changes
    if (dimensions.windows > dimensions.windowDimensions.length) {
      // Add new windows with default dimensions
      const newWindows = Array(dimensions.windows - dimensions.windowDimensions.length)
        .fill()
        .map(() => ({ width: 1.2, height: 1.25 }));
      setDimensions(prev => ({
        ...prev,
        windowDimensions: [...prev.windowDimensions, ...newWindows]
      }));
    } else if (dimensions.windows < dimensions.windowDimensions.length) {
      // Remove extra windows
      setDimensions(prev => ({
        ...prev,
        windowDimensions: prev.windowDimensions.slice(0, dimensions.windows)
      }));
    }
  }, [dimensions.windows]);

  useEffect(() => {
    if (dimensions.length && dimensions.width && dimensions.height && selectedPaint) {
      const totalArea = 2 * dimensions.height * (Number(dimensions.length) + Number(dimensions.width));
      
      // Calculate total door area
      const doorArea = dimensions.doorDimensions.reduce(
        (sum, door) => sum + (door.width * door.height), 0
      );
      
      // Calculate total window area
      const windowArea = dimensions.windowDimensions.reduce(
        (sum, window) => sum + (window.width * window.height), 0
      );
      
      const paintableArea = totalArea - doorArea - windowArea;
      const baseAmount = paintableArea / PAINT_COVERAGE;
      const totalAmount = baseAmount * dimensions.coats;
      const litersNeeded = Math.ceil(totalAmount);
      const estimatedCost = litersNeeded * PAINT_PRICE;
      
      setResults({
        totalArea: totalArea.toFixed(2),
        paintableArea: paintableArea.toFixed(2),
        litersNeeded,
        estimatedCost: estimatedCost.toFixed(2)
      });
    }
  }, [dimensions, selectedPaint]);

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{translations.paintCalculator}</h1>
          <p className="text-xl">{translations.paintCalculatorDesc}</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <FaCalculator className="text-primary text-3xl mr-2" />
              <h2 className="text-2xl font-bold dark:text-white">{translations.paintCalculator}</h2>
            </div>

            {/* Paint Product Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translations.selectPaintProduct}
              </label>
              <select
                value={selectedPaintId}
                onChange={handlePaintChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {paintProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.size}, ₹{p.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Room Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations.roomLength}
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
                  {translations.roomWidth}
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
                  {translations.roomHeight}
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
                  {translations.numberOfCoats}
                </label>
                <select
                  name="coats"
                  value={dimensions.coats}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            {/* Doors Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">{translations.numberOfDoors}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.numberOfDoors}
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
              </div>

              {dimensions.doors > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 dark:text-white">{translations.doorDimensions}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dimensions.doorDimensions.map((door, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2 dark:text-white">
                          {translations.door} #{index + 1}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                              {translations.width} (length in m)
                            </label>
                            <input
                              type="number"
                              value={door.width}
                              onChange={(e) => handleDoorDimensionChange(index, 'width', e.target.value)}
                              min="0"
                              step="0.1"
                              className="w-full px-2 py-1 text-sm border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                              {translations.height} (width in m)
                            </label>
                            <input
                              type="number"
                              value={door.height}
                              onChange={(e) => handleDoorDimensionChange(index, 'height', e.target.value)}
                              min="0"
                              step="0.1"
                              className="w-full px-2 py-1 text-sm border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Windows Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">{translations.numberOfWindows}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.numberOfWindows}
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

              {dimensions.windows > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 dark:text-white">{translations.windowDimensions}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dimensions.windowDimensions.map((window, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2 dark:text-white">
                          {translations.window} #{index + 1}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                              {translations.width} (length in m)
                            </label>
                            <input
                              type="number"
                              value={window.width}
                              onChange={(e) => handleWindowDimensionChange(index, 'width', e.target.value)}
                              min="0"
                              step="0.1"
                              className="w-full px-2 py-1 text-sm border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                              {translations.height} (width in m)
                            </label>
                            <input
                              type="number"
                              value={window.height}
                              onChange={(e) => handleWindowDimensionChange(index, 'height', e.target.value)}
                              min="0"
                              step="0.1"
                              className="w-full px-2 py-1 text-sm border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {results.paintableArea > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <FaPaintRoller className="text-primary text-2xl mr-2" />
                  <h3 className="text-lg font-semibold dark:text-white">{translations.results}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.totalWallArea}: <span className="font-semibold">{results.totalArea} m²</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.paintableArea}: <span className="font-semibold">{results.paintableArea} m²</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.paintNeeded} ({dimensions.coats} {translations.numberOfCoats.toLowerCase()}): <span className="font-semibold">{results.litersNeeded} liters</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {translations.estimatedCost}: <span className="font-semibold">₹{results.estimatedCost}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-yellow-600 dark:text-yellow-400 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {translations.calculationIncludes}
                      </p>
                      <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        <li>{translations.coatsOfPaint.replace("{{count}}", dimensions.coats)}</li>
                        <li>{translations.standardCoverage}</li>
                        <li>{translations.premiumPaintQuality}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintCalculator;
