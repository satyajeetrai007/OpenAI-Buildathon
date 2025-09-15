//import React, { useState, useRef } from 'react';
//import { useChat } from '../context/ChatContext';
//import { Send, Image, Mic, MicOff } from 'lucide-react';

//const MessageInput = () => {
//  const [message, setMessage] = useState('');
//  const [selectedImage, setSelectedImage] = useState(null);
//  const [isRecording, setIsRecording] = useState(false);
//  const [recognition, setRecognition] = useState(null);
//  const fileInputRef = useRef(null);
//  const { sendMessage, isLoading } = useChat();

//  // Initialize speech recognition
//  React.useEffect(() => {
//    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//      const recognitionInstance = new SpeechRecognition();
      
//      recognitionInstance.continuous = true;
//      recognitionInstance.interimResults = true;
//      recognitionInstance.lang = 'en-US';

//      recognitionInstance.onresult = (event) => {
//        let finalTranscript = '';
//        for (let i = event.resultIndex; i < event.results.length; i++) {
//          if (event.results[i].isFinal) {
//            finalTranscript += event.results[i][0].transcript;
//          }
//        }
//        if (finalTranscript) { 
//          setMessage(prev => prev + ' ' + finalTranscript);
//        }
//      };

//      recognitionInstance.onend = () => {
//        setIsRecording(false);
//      };

//      setRecognition(recognitionInstance);
//    }
//  }, []);

//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    if (!message.trim() && !selectedImage) return;
    
//    await sendMessage(message, selectedImage);

//  setMessage("");
//  setSelectedImage(null);
//  fileInputRef.current.value = "";
//};

//  const handleImageUpload = (e) => {
//    const file = e.target.files[0];
//    if (file) {
//      const reader = new FileReader();
//      reader.onload = (e) => {
//        setSelectedImage(e.target.result);
//      };
//      reader.readAsDataURL(file);
//    }
//  };

//  const toggleRecording = () => {
//    if (!recognition) {
//      alert('Speech recognition not supported in this browser');
//      return;
//    }

//    if (isRecording) {
//      recognition.stop();
//      setIsRecording(false);
//    } else {
//      recognition.start();
//      setIsRecording(true);
//    }
//  };

//  const removeImage = () => {
//    setSelectedImage(null);
//    fileInputRef.current.value = '';
//  };

//  return (
//    <div className="message-input-container">
//      {selectedImage && (
//        <div className="image-preview">
//          <img src={selectedImage} alt="Preview" />
//          <button onClick={removeImage} className="remove-image">×</button>
//        </div>
//      )}
      
//      <form onSubmit={handleSubmit} className="message-input-form">
//        <div className="input-actions">
//          <input
//            type="file"
//            ref={fileInputRef}
//            onChange={handleImageUpload}
//            accept="image/*"
//            style={{ display: 'none' }}
//          />
          
//          <button
//            type="button"
//            onClick={() => fileInputRef.current.click()}
//            className="action-btn image-btn"
//            title="Upload image"
//          >
//            <Image size={20} />
//          </button>
          
//          <button
//            type="button"
//            onClick={toggleRecording}
//            className={`action-btn voice-btn ${isRecording ? 'recording' : ''}`}
//            title={isRecording ? "Stop recording" : "Start voice input"}
//          >
//            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
//          </button>
//        </div>
        
//        <input
//          type="text"
//          value={message}
//          onChange={(e) => setMessage(e.target.value)}
//          placeholder="Ask about crops, livestock, or farming practices..."
//          className="message-input"
//          disabled={isLoading}
//        />
        
//        <button
//          type="submit"
//          disabled={(!message.trim() && !selectedImage) || isLoading}
//          className="send-btn"
//        >
//          <Send size={20} />
//        </button>
//      </form>
//    </div>
//  );
//};

//export default MessageInput;


































// MessageInput.jsx - Updated handleImageUpload function
import React, { useState, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { Send, Image, Mic, MicOff } from 'lucide-react';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Store actual file
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isLoading } = useChat();

  // Initialize speech recognition
  React.useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) { 
          setMessage(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedImageFile) return;
    
    // Pass the actual file object instead of base64 string
    await sendMessage(message, selectedImageFile);

    setMessage("");
    setSelectedImage(null);
    setSelectedImageFile(null);
    fileInputRef.current.value = "";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual file for sending to backend
      setSelectedImageFile(file);
      
      // Create preview URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedImageFile(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="message-input-container">
      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Preview" />
          <button onClick={removeImage} className="remove-image">×</button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="action-btn image-btn"
            title="Upload image"
          >
            <Image size={20} />
          </button>
          
          <button
            type="button"
            onClick={toggleRecording}
            className={`action-btn voice-btn ${isRecording ? 'recording' : ''}`}
            title={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about crops, livestock, or farming practices..."
          className="message-input"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={(!message.trim() && !selectedImageFile) || isLoading}
          className="send-btn"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
