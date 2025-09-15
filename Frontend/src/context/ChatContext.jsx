import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load conversations from localStorage
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        setCurrentConversation(parsed[0]);
      }
    }
  }, []);

  const saveConversations = (convs) => {
    localStorage.setItem('conversations', JSON.stringify(convs));
  };

  const createNewConversation = () => {
    const newConv = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    const updatedConversations = [newConv, ...conversations];
    setConversations(updatedConversations);
    setCurrentConversation(newConv);
    saveConversations(updatedConversations);
  };

  //const sendMessage = async (message, image = null) => {
  //  if (!currentConversation) {
  //    createNewConversation();
  //    return;
  //  }

  //  const userMessage = {
  //    id: Date.now().toString(),
  //    role: 'user',
  //    content: message,
  //    image: image,
  //    timestamp: new Date().toISOString()
  //  };

  //  // Update current conversation with user message
  //  const updatedConversation = {
  //    ...currentConversation,
  //    messages: [...currentConversation.messages, userMessage],
  //    title: currentConversation.messages.length === 0 ? message.slice(0, 30) + '...' : currentConversation.title
  //  };

  //  setCurrentConversation(updatedConversation);
  //  setIsLoading(true);

  //  const formData = new FormData();
  //  if (message.trim()) formData.append("message", message);
  //  if (image) formData.append("image", image); // Use 'image' parameter instead of 'selectedImage'
  //  //formData.append("conversation_id", currentConversation.id);
    
  //  try {
  //    const res = await fetch("http://localhost:3000/api/v1/users/response", {
  //      method: "POST",
  //      headers: {
  //        'Authorization': `Bearer ${localStorage.getItem('token')}`
  //        // Remove 'Content-Type' header when using FormData - let browser set it
  //      },
  //      body: formData
  //    });
      
  //    const aiResponse = await res.json(); // Use 'res' instead of 'response'
      
  //    // Extract the solution from your backend response structure
  //    // Your response: {statusCode: 200, data: {solution: "..."}, message: '...', success: true}
  //    const botMessage = {
  //      id: (Date.now() + 1).toString(),
  //      role: 'assistant',
  //      content: aiResponse.data?.solution || aiResponse.solution || 'No response from AI',
  //      timestamp: new Date().toISOString()
  //    };

  //    const finalConversation = {
  //      ...updatedConversation,
  //      messages: [...updatedConversation.messages, botMessage]
  //    };

  //    setCurrentConversation(finalConversation);
      
  //    // Update conversations list
  //    const updatedConversations = conversations.map(conv => 
  //      conv.id === currentConversation.id ? finalConversation : conv
  //    );
  //    setConversations(updatedConversations);
  //    saveConversations(updatedConversations);

  //  } catch (error) {
  //    console.error('Error sending message:', error);
  //    // Add error message
  //    const errorMessage = {
  //      id: (Date.now() + 1).toString(),
  //      role: 'assistant',
  //      content: 'Sorry, I encountered an error processing your request. Please try again.',
  //      timestamp: new Date().toISOString(),
  //      error: true
  //    };

  //    const finalConversation = {
  //      ...updatedConversation,
  //      messages: [...updatedConversation.messages, errorMessage]
  //    };

  //    setCurrentConversation(finalConversation);
  //  } finally {
  //    setIsLoading(false);
  //  }
  //};

const sendMessage = async (message, imageFile = null) => {
  if (!currentConversation) {
    createNewConversation();
    return;
  }

  const userMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: message,
    image: imageFile ? URL.createObjectURL(imageFile) : null, // Create preview URL for display
    timestamp: new Date().toISOString()
  };

  // Update current conversation with user message
  const updatedConversation = {
    ...currentConversation,
    messages: [...currentConversation.messages, userMessage],
    title: currentConversation.messages.length === 0 ? message.slice(0, 30) + '...' : currentConversation.title
  };

  setCurrentConversation(updatedConversation);
  setIsLoading(true);

  const formData = new FormData();
  if (message.trim()) formData.append("message", message);
  if (imageFile) formData.append("image", imageFile); // Append the actual File object

  try {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(2000);
    const res = await fetch("http://localhost:3000/api/v1/users/response", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
   
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const aiResponse = await res.json();
    console.log('Backend response:', aiResponse); // Add this for debugging
    
    const botMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse.data?.solution || aiResponse.solution || 'No response from AI',
      timestamp: new Date().toISOString()
    };

    const finalConversation = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, botMessage]
    };

    setCurrentConversation(finalConversation);
    
    // Update conversations list
    const updatedConversations = conversations.map(conv => 
      conv.id === currentConversation.id ? finalConversation : conv
    );
    setConversations(updatedConversations);
    saveConversations(updatedConversations);

  } catch (error) {
    console.error('Error sending message:', error);
    console.error('Error details:', error.message); // Add more detailed error logging
    
    const errorMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Sorry, I encountered an error processing your request. Please try again.',
      timestamp: new Date().toISOString(),
      error: true
    };

    const finalConversation = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, errorMessage]
    };

    setCurrentConversation(finalConversation);
  } finally {
    setIsLoading(false);
  }
};
  const selectConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const deleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(updatedConversations[0] || null);
    }
  };

  const value = {
    conversations,
    currentConversation,
    isLoading,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};































// ===================================
// ChatContext.jsx - Updated sendMessage function
// ===================================
