import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { LanguageContext } from '../context/LanguageContext';

const Contact = () => {
  const location = useLocation();
  const initialMessage = location.state?.message || '';
  const { translations } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialMessage
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('https://sairam-traders-web-application-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);

    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{translations.contactUs}</h1>
          <p className="text-xl">{translations.getInTouch}</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{translations.getInTouch}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{translations.phone}</h3>
                  <p className="text-gray-600 dark:text-gray-300">+91 6380057594</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translations.monSatHours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{translations.email}</h3>
                  <p className="text-gray-600 dark:text-gray-300">sairamtradersgobi@gmail.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translations.respondWithin}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{translations.location}</h3>
                  <p className="text-gray-600 dark:text-gray-300">10 Sathy Road, Karattadipalayam, Gobi</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translations.visitShowroom}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{translations.whatsapp}</h3>
                  <p className="text-gray-600 dark:text-gray-300">+91 6380057594</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translations.chatInstantly}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{translations.findUs}</h2>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.2896761736087!2d77.4432013!3d11.0997983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907e78ae7013f%3A0x27c1b47941d63da4!2sSathy%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1624451234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">{translations.sendMessage}</h2>
              {status.submitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheckCircle className="mr-2" />
                  {translations.thankYouMessage}
                </div>
              )}
              {status.error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  {status.error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200 ${
                    status.submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status.submitting ? translations.sending : translations.sendMessageBtn}
                </button>
              </form>
            </div>

            {/* Business Hours */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{translations.businessHours}</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">{translations.mondayFriday}</span>
                  <span className="font-medium dark:text-white">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">{translations.saturday}</span>
                  <span className="font-medium dark:text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">{translations.sunday}</span>
                  <span className="font-medium text-red-500">{translations.closed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;