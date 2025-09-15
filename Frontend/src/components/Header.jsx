import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Sprout className="logo-icon" />
          <span className="logo-text">FarmAI Assistant</span>
        </Link>
        
        {user && (
          <div className="header-actions">
            <Link to="/profile" className="profile-link">
              <User size={20} />
              <span>{user.name}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;