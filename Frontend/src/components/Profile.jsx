import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <User size={60} />
            )}
          </div>
          <h2>{user.name}</h2>
        </div>
        
        <div className="profile-info">
          <div className="info-item">
            <Mail size={20} />
            <span>{user.email}</span>
          </div>
          
          <div className="info-item">
            <Calendar size={20} />
            <span>Member since {new Date().getFullYear()}</span>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat">
            <h4>Conversations</h4>
            <span>{JSON.parse(localStorage.getItem('conversations') || '[]').length}</span>
          </div>
          
          <div className="stat">
            <h4>Messages</h4>
            <span>
              {JSON.parse(localStorage.getItem('conversations') || '[]')
                .reduce((total, conv) => total + conv.messages.length, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;