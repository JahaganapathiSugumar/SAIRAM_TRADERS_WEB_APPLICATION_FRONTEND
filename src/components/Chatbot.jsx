import { useState, useEffect, useCallback } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { FaMicrophone, FaComments, FaTimes } from 'react-icons/fa';

const CHATBASE_IFRAME_ID = "chatbase-iframe";
const CHATBASE_SCRIPT_ID = "_HAo-NfMtx3qZoNPflkDh";

const ChatbotIframe = () => (
  <iframe
    src="https://www.chatbase.co/chatbot-iframe/_HAo-NfMtx3qZoNPflkDh"
    width="100%"
    style={{ height: '100%', minHeight: '700px', border: 'none' }}
    frameBorder="0"
    title="Chatbot"
    allow="clipboard-write; microphone"
  />
);

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbaseReady, setIsChatbaseReady] = useState(false);
  const { isListening, transcript, isSupported, error, startListening } = useSpeechRecognition();

  // Function to send message to Chatbase iframe
  const sendMessage = useCallback((message) => {
    const iframe = document.getElementById(CHATBASE_IFRAME_ID);
    if (iframe && isChatbaseReady) {
      iframe.contentWindow.postMessage({ type: "user", message }, "*");
      setIsVisible(true);
    }
  }, [isChatbaseReady]);

  // Effect to handle transcript changes
  useEffect(() => {
    if (transcript) {
      sendMessage(transcript);
    }
  }, [transcript, sendMessage]);

  // Initialize Chatbase
  useEffect(() => {
    // Only add script if not already present
    if (!document.getElementById(CHATBASE_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = CHATBASE_SCRIPT_ID;
      script.async = true;
      script.onload = () => setIsChatbaseReady(true);
      document.body.appendChild(script);
    } else {
      setIsChatbaseReady(true);
    }
    return () => {
      // Optionally remove script on unmount
      // const script = document.getElementById(CHATBASE_SCRIPT_ID);
      // if (script) document.body.removeChild(script);
    };
  }, []);

  // Style for the iframe container
  const iframeStyle = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '380px',
    height: '600px',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s, transform 0.3s',
    opacity: isVisible ? '1' : '0',
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    pointerEvents: isVisible ? 'all' : 'none',
    zIndex: 999,
    background: 'white'
  };

  return (
    <>
      {/* Chatbot iframe */}
      <div style={iframeStyle}>
        <ChatbotIframe />
      </div>

      {/* Control buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-[1000]">
        {/* Microphone button */}
        {isSupported && (
          <button
            onClick={startListening}
            disabled={isListening}
            className={`p-3 rounded-full shadow-lg transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title={isListening ? 'Listening...' : 'Click to speak'}
          >
            <FaMicrophone className={isListening ? 'text-white' : 'text-gray-700'} />
          </button>
        )}

        {/* Toggle chatbot button */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-3 rounded-full shadow-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          title={isVisible ? 'Close Chatbot' : 'Open Chatbot'}
        >
          {isVisible ? <FaTimes /> : <FaComments />}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="fixed bottom-20 right-4 bg-red-100 text-red-700 p-3 rounded-lg shadow-lg max-w-xs z-[1001]">
          {error}
        </div>
      )}
    </>
  );
};

export default Chatbot;