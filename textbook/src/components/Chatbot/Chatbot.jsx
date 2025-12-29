import React, { useState, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './Chatbot.css';

const Chatbot = ({ apiEndpoint = '/api/query' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const { colorMode } = useColorMode();

  // Function to get selected text from the page
  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText && selectedText.length > 0) {
        setSelectedText(selectedText);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare the request based on whether we have selected text
      const requestBody = {
        query: userInput,
        query_type: selectedText ? 'selected_text' : 'full_book'
      };

      if (selectedText) {
        requestBody.selected_text = selectedText;
      }

      const response = await fetch(`${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        sources: data.sources,
        confidence: data.confidence
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedText('');
  };

  return (
    <div className={`chatbot-container ${colorMode}`}>
      <div className="chatbot-header">
        <h3>Textbook Assistant</h3>
        <button onClick={clearChat} className="clear-chat-button">
          Clear Chat
        </button>
      </div>
      
      {selectedText && (
        <div className="selected-text-indicator">
          <strong>Using selected text:</strong> {selectedText.substring(0, 100)}...
        </div>
      )}
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Hello! I'm your textbook assistant. Ask me questions about the content you're reading.</p>
            <p>Tip: You can select text on the page and ask questions specifically about that text.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {message.sender === 'bot' && message.isError ? (
                  <span className="error-message">{message.text}</span>
                ) : (
                  <span>{message.text}</span>
                )}
                
                {message.sender === 'bot' && message.sources && message.sources.length > 0 && (
                  <div className="sources">
                    <details>
                      <summary>Sources</summary>
                      <ul>
                        {message.sources.map((source, index) => (
                          <li key={index}>
                            <span className="chapter">{source.chapter}</span> &gt; <span className="section">{source.section}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                )}
                
                {message.sender === 'bot' && message.confidence !== undefined && (
                  <div className="confidence">
                    <small>Confidence: {(message.confidence * 100).toFixed(1)}%</small>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the textbook content..."
          rows="2"
          disabled={isLoading}
          className="chat-input"
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()} className="send-button">
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;