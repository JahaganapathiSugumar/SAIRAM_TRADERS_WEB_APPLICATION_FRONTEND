import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFlask, FaPalette, FaCog, FaCheck, FaArrowRight } from 'react-icons/fa';

const ColorMixing = () => {
  const [selectedColor, setSelectedColor] = useState('#6A8CAF');
  const navigate = useNavigate();

  const handleGetColorMixed = () => {
    navigate('/contact', { 
      state: { 
        message: `I would like to request a custom color mixing for the color code: ${selectedColor}.`
      }
    });
  };

  const features = [
    {
      icon: <FaPalette className="text-4xl text-primary mb-4" />,
      title: "Precise Color Matching",
      description: "Our advanced spectrophotometer can match any color sample with 99.9% accuracy."
    },
    {
      icon: <FaFlask className="text-4xl text-primary mb-4" />,
      title: "Instant Mixing",
      description: "Watch as your custom color is created in minutes using our automated mixing system."
    },
    {
      icon: <FaCog className="text-4xl text-primary mb-4" />,
      title: "Quality Control",
      description: "Every batch is tested to ensure perfect color consistency and quality."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Bring Your Sample",
      description: "Bring any color sample - a fabric swatch, paint chip, or even a photo."
    },
    {
      number: "02",
      title: "Color Analysis",
      description: "Our machine analyzes the color using advanced spectrophotometer technology."
    },
    {
      number: "03",
      title: "Formula Creation",
      description: "The system creates a precise formula to match your color."
    },
    {
      number: "04",
      title: "Mixing & Testing",
      description: "We mix your custom color and test it for accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://i.postimg.cc/FKn0zdmW/wall-colour-shade-cards-7-4885-1.jpg')" 
        }}
      >
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Your Perfect Shade</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience our state-of-the-art color mixing technology to create any color you can imagine.
          </p>
          <a 
            href="#how-it-works" 
            className="btn btn-primary inline-flex items-center"
          >
            Learn How It Works <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Advanced Color Mixing Technology</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our computerized color mixing system ensures perfect accuracy and consistency every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-light dark:bg-gray-700 rounded-lg shadow-lg">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-light dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get your perfect custom color in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-full">
                  <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-primary">
                    <FaArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Preview Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Try Our Color Picker</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Choose a color to see how it might look. Visit our store to create this exact shade!
              </p>
            </div>

            <div className="bg-light dark:bg-gray-700 rounded-lg p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div 
                    className="w-full h-64 rounded-lg shadow-lg"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium dark:text-white mb-2">
                      Select Your Color
                    </label>
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm font-medium dark:text-white">Selected Color:</p>
                    <p className="font-mono text-lg dark:text-white">{selectedColor}</p>
                  </div>
                  <button 
                    onClick={handleGetColorMixed}
                    className="btn btn-primary w-full"
                  >
                    Get This Color Mixed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Custom Color?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our store to experience our color mixing technology in person and create your perfect shade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/visualizer" className="btn border-2 border-white hover:bg-white hover:text-primary">
              Try Color Visualizer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorMixing;