import React from 'react';
import { User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'} ${message.error ? 'error' : ''}`}>
      <div className="message-avatar">
        {isUser ? (
          <User size={20} />
        ) : (
          <span>🤖</span>
        )}
      </div>
      
      <div className="message-content">
        {message.image && (
          <div className="message-image">
            <img src={message.image} alt="Uploaded content" />
          </div>
        )}
        <div className="message-text">
          {message.content}
        </div>
        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;