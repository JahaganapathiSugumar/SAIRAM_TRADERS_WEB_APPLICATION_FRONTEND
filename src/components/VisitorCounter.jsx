import { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          // Instead of throwing an error, we'll set a default value
          console.warn('Visitor count API not available, using default value');
          setVisitorCount(1);
          return;
        }
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.warn('Error fetching visitor count:', error);
        // Set a default value instead of showing an error
        setVisitorCount(1);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <FaUsers className="text-primary" />
      <span className="font-semibold">{visitorCount}</span>
      <span className="text-gray-600 text-sm">Visitors</span>
    </div>
  );
};

export default VisitorCounter;