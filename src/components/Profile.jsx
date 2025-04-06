import { useEffect, useState } from 'react';
import { FaUserEdit, FaCog, FaPlus, FaImages } from 'react-icons/fa';

function Profile() {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          name: parsedUser.name || 'User',
          email: parsedUser.email || '',
          joined: parsedUser.joined || 'January 2024',
          bio: parsedUser.bio || 'Loves creativity and community!',
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const styles = {
    outerWrapper: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f3f4f6, #e2e8f0)',
      fontFamily: `'Inter', sans-serif`,
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      textAlign: 'center',
      position: 'relative',
    },
    avatar: {
      backgroundColor: '#e60023',
      width: '130px',
      height: '130px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '3rem',
      color: '#fff',
      margin: '0 auto 20px auto',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      transition: 'transform 0.3s ease-in-out',
    },
    avatarHover: {
      transform: 'scale(1.05)',
    },
    name: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#111',
      marginBottom: '4px',
    },
    email: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '10px',
    },
    bio: {
      fontSize: '0.95rem',
      color: '#444',
      fontStyle: 'italic',
      marginBottom: '20px',
    },
    stats: {
      fontSize: '0.95rem',
      color: '#777',
      marginBottom: '8px',
    },
    joined: {
      fontSize: '0.85rem',
      color: '#aaa',
    },
    divider: {
      width: '50px',
      height: '3px',
      backgroundColor: '#e60023',
      borderRadius: '2px',
      margin: '14px auto',
    },
    topRight: {
      position: 'absolute',
      top: '18px',
      right: '18px',
      display: 'flex',
      gap: '12px',
      fontSize: '1.1rem',
      color: '#333',
      cursor: 'pointer',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      margin: '24px 0',
    },
    actionButton: {
      backgroundColor: '#e60023',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(230, 0, 35, 0.2)',
    },
    actionButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(230, 0, 35, 0.3)',
    },
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.card}>
        <div style={styles.topRight}>
          <FaUserEdit title="Edit Profile" onClick={() => console.log("Edit profile clicked")} />
          <FaCog title="Settings" onClick={() => console.log("Settings clicked")} />
        </div>

        <div
          style={styles.avatar}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = styles.avatarHover.transform)
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
        >
          {userData.name[0]?.toUpperCase() || 'U'}
        </div>

        <div style={styles.name}>{userData.name}</div>
        <div style={styles.email}>{userData.email}</div>
        <div style={styles.bio}>{userData.bio}</div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.actionButtonHover.transform;
              e.currentTarget.style.boxShadow = styles.actionButtonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = styles.actionButton.boxShadow;
            }}
            onClick={() => console.log("Create Post clicked")}
          >
            <FaPlus /> Create Post
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.actionButtonHover.transform;
              e.currentTarget.style.boxShadow = styles.actionButtonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = styles.actionButton.boxShadow;
            }}
            onClick={() => console.log("View Posts clicked")}
          >
            <FaImages /> View Posts
          </button>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.stats}>
          <strong>179</strong> followers · <strong>0</strong> following
        </div>
        <div style={styles.joined}>Joined {userData.joined}</div>
      </div>
    </div>
  );
}

export default Profile;