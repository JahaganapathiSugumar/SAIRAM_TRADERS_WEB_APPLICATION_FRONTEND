import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFlask, FaPalette, FaCog, FaCheck, FaArrowRight } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';

const ColorMixing = () => {
  const [selectedColor, setSelectedColor] = useState('#6A8CAF');
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  const handleGetColorMixed = () => {
    navigate('/contact', { 
      state: { 
        message: `${translations.getColorMixed} ${selectedColor}.`
      }
    });
  };

  const features = [
    {
      icon: <FaPalette className="text-4xl text-primary mb-4" />,
      title: translations.preciseMatching,
      description: translations.preciseMatchingDesc
    },
    {
      icon: <FaFlask className="text-4xl text-primary mb-4" />,
      title: translations.instantMixing,
      description: translations.instantMixingDesc
    },
    {
      icon: <FaCog className="text-4xl text-primary mb-4" />,
      title: translations.qualityControl,
      description: translations.qualityControlDesc
    }
  ];

  const steps = [
    {
      number: "01",
      title: translations.bringYourSample,
      description: translations.bringYourSampleDesc
    },
    {
      number: "02",
      title: translations.colorAnalysis,
      description: translations.colorAnalysisDesc
    },
    {
      number: "03",
      title: translations.formulaCreation,
      description: translations.formulaCreationDesc
    },
    {
      number: "04",
      title: translations.mixingTesting,
      description: translations.mixingTestingDesc
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{translations.createPerfectShade}</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {translations.colorMixingDesc}
          </p>
          <a 
            href="#how-it-works" 
            className="btn btn-primary inline-flex items-center"
          >
            {translations.learnHow} <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{translations.advancedMixing}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {translations.advancedMixingDesc}
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
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{translations.howItWorks}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {translations.howItWorksDesc}
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
              <h2 className="text-3xl font-bold mb-4 dark:text-white">{translations.tryColorPicker}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {translations.colorMixingDesc}
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
                      {translations.selectColor}
                    </label>
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm font-medium dark:text-white">{translations.selectedColor}</p>
                    <p className="font-mono text-lg dark:text-white">{selectedColor}</p>
                  </div>
                  <button 
                    onClick={handleGetColorMixed}
                    className="btn btn-primary w-full"
                  >
                    {translations.getColorMixed}
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
          <h2 className="text-3xl font-bold mb-4">{translations.readyToCreate}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {translations.ctaColorMixing}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              {translations.contactUs}
            </Link>
            <Link to="/visualizer" className="btn border-2 border-white hover:bg-white hover:text-primary">
              {translations.tryVisualizer}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorMixing;