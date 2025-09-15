import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../context/ChatContext';

const ChatArea = () => {
  const { currentConversation, isLoading } = useChat();

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3>{currentConversation?.title || 'New Conversation'}</h3>
      </div>
      
      <MessageList 
        messages={currentConversation?.messages || []} 
        isLoading={isLoading}
      />
      
      <MessageInput />
    </div>
  );
};

export default ChatArea;