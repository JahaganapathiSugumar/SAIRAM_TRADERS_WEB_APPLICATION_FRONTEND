import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductCatalog from './pages/ProductCatalog'
import ColorVisualizer from './pages/ColorVisualizer'
import Contact from './pages/Contact'
import PaintCalculator from './pages/PaintCalculator'
import ColorMixing from './pages/ColorMixing'
import { useContext, useState } from 'react'
import { ThemeContext } from './context/ThemeContext'
import { FaComments, FaTimes } from 'react-icons/fa'

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/visualizer" element={<ColorVisualizer />} />
          <Route path="/calculator" element={<PaintCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/color-mixing" element={<ColorMixing />} />
        </Routes>
      </main>
      <Footer />
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[1001] bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        title={showChatbot ? 'Close Chatbot' : 'Chat with us'}
      >
        {showChatbot ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>
      {showChatbot && (
        <div
          className="fixed bottom-20 right-6 z-[1000] bg-white rounded-lg shadow-lg"
          style={{ width: 380, height: 600 }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/_HAo-NfMtx3qZoNPflkDh"
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '10px' }}
            frameBorder="0"
            title="Chatbot"
            allow="clipboard-write; microphone"
          />
        </div>
      )}
    </div>
  )
}

export default App