import { useState, useEffect } from 'react';

const LocationGreeting = () => {
  const [location, setLocation] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // First try geolocation API
        if ('geolocation' in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocation(data.city || 'your city');
        } else {
          // Fallback to IP-based location
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          setLocation(data.city || 'your city');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setLocation('your city');
      } finally {
        // Show the greeting with animation after location is set
        setIsVisible(true);
        
        // Hide the greeting after 10 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 10000);
      }
    };

    getLocation();
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 bg-primary text-white py-3 px-4 transform transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } z-50`}
    >
      <div className="container-custom flex justify-between items-center">
        <p className="text-lg">
          Hi there from {location} 👋 Looking for home paint ideas?
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LocationGreeting;