import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Chatbot from '../Chatbot/Chatbot';
import './FloatingChatbot.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating chatbot icon */}
      {!isOpen && (
        <button
          className={`floating-chatbot-icon ${colorMode}`}
          onClick={toggleChatbot}
          aria-label="Open chatbot"
          title="Textbook Assistant"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9 17L7 15L8.41 13.59L9.5 14.67L11.09 13.09L13 15L9 17ZM14.5 14.09L12.91 12.5L15 10.41L16.59 12L14.5 14.09ZM12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Chatbot modal/popup */}
      {isOpen && (
        <div className="floating-chatbot-overlay">
          <div className={`floating-chatbot-container ${colorMode}`}>
            <div className="floating-chatbot-header">
              <h3>Textbook Assistant</h3>
              <button
                className="close-button"
                onClick={toggleChatbot}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            <div className="chatbot-wrapper">
              <Chatbot apiEndpoint={process.env.REACT_APP_API_ENDPOINT || '/api/query'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;