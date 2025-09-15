import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, Mail } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google login - replace with actual Google Auth implementation
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'John Farmer',
        email: 'john.farmer@example.com',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
      };
      
      login(mockUser);
      setIsLoading(false);
      navigate('/chat');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Sprout className="login-logo" />
          <h1>FarmAI Assistant</h1>
          <p>Your intelligent farming companion</p>
        </div>
        
        <div className="login-content">
          <h2>Welcome Back</h2>
          <p>Sign in to continue your farming conversations</p>
          
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="google-login-btn"
          >
            <Mail size={20} />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
          
          <div className="login-features">
            <div className="feature">
              <h4>🌱 Crop Management</h4>
              <p>Get expert advice on crop care and management</p>
            </div>
            <div className="feature">
              <h4>🐄 Livestock Support</h4>
              <p>Receive guidance on animal health and care</p>
            </div>
            <div className="feature">
              <h4>📸 Image Analysis</h4>
              <p>Upload photos for disease detection and analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;