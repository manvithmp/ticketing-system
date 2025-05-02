import React from 'react';

const ChatWindow = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      zIndex: 1000
    }}>
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        Hubly
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ 
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Introduction Yourself
        </div>
        
        <div style={{ 
          marginBottom: '12px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          Your name
        </div>
        <div style={{ 
          marginBottom: '16px',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          Your name
        </div>
        
        <div style={{ 
          marginBottom: '12px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          Your Phone
        </div>
        <div style={{ 
          marginBottom: '16px',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          +1 (000) 000-0000
        </div>
        
        <div style={{ 
          marginBottom: '12px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          Your Email
        </div>
        <div style={{ 
          marginBottom: '16px',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          example@gmail.com
        </div>
        
        <div style={{ 
          marginBottom: '16px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Thank You!
        </div>
      </div>
      
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
      }}>
        <input 
          type="text" 
          placeholder="Write a message"
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ced4da',
            fontSize: '14px'
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
