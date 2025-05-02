// src/components/ChatIcon.jsx
import React from 'react';

const ChatIcon = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50px',
      height: '50px',
      backgroundColor: '#0B3F89',
      borderRadius: '50%',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}>
      <span style={{ marginTop: '-2px' }}></span>
    </div>
  );
};

export default ChatIcon;