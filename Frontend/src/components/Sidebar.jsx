import React from 'react';
import { useChat } from '../context/ChatContext';
import { Plus, MessageCircle, Trash2 } from 'lucide-react';

const Sidebar = () => {
  const { 
    conversations, 
    currentConversation, 
    createNewConversation, 
    selectConversation,
    deleteConversation 
  } = useChat();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button 
          onClick={createNewConversation}
          className="new-chat-btn"
        >
          <Plus size={20} />
          New Conversation
        </button>
      </div>
      
      <div className="conversations-list">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className={`conversation-item ${
              currentConversation?.id === conversation.id ? 'active' : ''
            }`}
            onClick={() => selectConversation(conversation)}
          >
            <MessageCircle size={16} />
            <div className="conversation-info">
              <span className="conversation-title">{conversation.title}</span>
              <span className="conversation-date">
                {new Date(conversation.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button 
              className="delete-conversation"
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(conversation.id);
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        
        {conversations.length === 0 && (
          <div className="no-conversations">
            <p>No conversations yet</p>
            <p>Start your first chat!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;