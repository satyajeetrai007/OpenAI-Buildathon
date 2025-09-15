import React from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { useChat } from '../context/ChatContext';

const Chat = () => {
  const { currentConversation } = useChat();

  return (
    <div className="chat-container">
      <Sidebar />
      <div className="chat-main">
        {currentConversation ? (
          <ChatArea />
        ) : (
          <div className="welcome-screen">
            <h2>Welcome to FarmAI Assistant</h2>
            <p>Start a new conversation to get expert farming advice</p>
            <div className="welcome-features">
              <div className="welcome-feature">
                <span className="feature-emoji">🌾</span>
                <h4>Crop Guidance</h4>
                <p>Get personalized advice for your crops</p>
              </div>
              <div className="welcome-feature">
                <span className="feature-emoji">🔍</span>
                <h4>Disease Detection</h4>
                <p>Upload images for plant disease analysis</p>
              </div>
              <div className="welcome-feature">
                <span className="feature-emoji">💬</span>
                <h4>Voice Input</h4>
                <p>Ask questions using your voice</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;