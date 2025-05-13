import { useState } from 'react';
import { FaTimes, FaPlus, FaCheck } from 'react-icons/fa';

const PaintComparison = ({ products, onClose }) => {
  const [selectedPaints, setSelectedPaints] = useState([]);
  const [showProductSelector, setShowProductSelector] = useState(false);

  const addPaint = (paint) => {
    if (selectedPaints.length < 4) {
      setSelectedPaints([...selectedPaints, paint]);
      setShowProductSelector(false);
    }
  };

  const removePaint = (index) => {
    setSelectedPaints(selectedPaints.filter((_, i) => i !== index));
  };

  const getFeatureValue = (paint, feature) => {
    const featureMap = {
      coverage: {
        'Premium Matte Finish': '400 sq ft/gallon',
        'Signature Gloss': '350 sq ft/gallon',
        'Natural Satin': '375 sq ft/gallon',
        'Designer Eggshell': '400 sq ft/gallon',
        'Ultra Matte': '425 sq ft/gallon',
        'High Gloss Enamel': '350 sq ft/gallon',
      },
      dryingTime: {
        'Premium Matte Finish': '1-2 hours',
        'Signature Gloss': '2-3 hours',
        'Natural Satin': '1-2 hours',
        'Designer Eggshell': '1-2 hours',
        'Ultra Matte': '1 hour',
        'High Gloss Enamel': '4-6 hours',
      },
      durability: {
        'Premium Matte Finish': 'High',
        'Signature Gloss': 'Very High',
        'Natural Satin': 'Medium',
        'Designer Eggshell': 'High',
        'Ultra Matte': 'Medium',
        'High Gloss Enamel': 'Very High',
      },
      washability: {
        'Premium Matte Finish': 'Good',
        'Signature Gloss': 'Excellent',
        'Natural Satin': 'Very Good',
        'Designer Eggshell': 'Good',
        'Ultra Matte': 'Fair',
        'High Gloss Enamel': 'Excellent',
      },
      recommended: {
        'Premium Matte Finish': 'Living rooms, Bedrooms',
        'Signature Gloss': 'Kitchens, Bathrooms',
        'Natural Satin': 'All rooms',
        'Designer Eggshell': 'Living rooms, Dining rooms',
        'Ultra Matte': 'Ceilings, Low-traffic areas',
        'High Gloss Enamel': 'Doors, Trim, Cabinets',
      }
    };
    return featureMap[feature]?.[paint.name] || 'N/A';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Paint Comparison</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {selectedPaints.map((paint, index) => (
              <div key={index} className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <button
                  onClick={() => removePaint(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  <FaTimes />
                </button>
                <img 
                  src={paint.image} 
                  alt={paint.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold dark:text-white">{paint.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{paint.brand}</p>
                <p className="text-primary font-bold mt-1">${paint.price}</p>
              </div>
            ))}
            {selectedPaints.length < 4 && (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowProductSelector(true)}
                  className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors duration-200"
                >
                  <FaPlus size={24} className="mb-2" />
                  <span>Add Paint</span>
                </button>
              </div>
            )}
          </div>

          {selectedPaints.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-4 dark:text-white">Feature</th>
                    {selectedPaints.map((paint, index) => (
                      <th key={index} className="text-left p-4 dark:text-white">{paint.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-medium dark:text-white">Coverage</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">{getFeatureValue(paint, 'coverage')}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 font-medium dark:text-white">Drying Time</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">{getFeatureValue(paint, 'dryingTime')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium dark:text-white">Durability</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">{getFeatureValue(paint, 'durability')}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 font-medium dark:text-white">Washability</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">{getFeatureValue(paint, 'washability')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium dark:text-white">Recommended For</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">{getFeatureValue(paint, 'recommended')}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 font-medium dark:text-white">Price</td>
                    {selectedPaints.map((paint, index) => (
                      <td key={index} className="p-4 dark:text-gray-300">${paint.price}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {showProductSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold dark:text-white">Select Paint</h3>
                  <button 
                    onClick={() => setShowProductSelector(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                  {products.map((paint) => (
                    <div 
                      key={paint.id}
                      className="cursor-pointer bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => addPaint(paint)}
                    >
                      <img 
                        src={paint.image} 
                        alt={paint.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-medium dark:text-white">{paint.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{paint.brand}</p>
                      <p className="text-primary font-bold mt-1">${paint.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaintComparison;