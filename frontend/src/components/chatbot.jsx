import React, { useState } from 'react';
import Sidebar from './sidebar';
import './Chatbot.css';


const Chatbot = () => {
  const [headerColor, setHeaderColor] = useState('#33475B');
  const [backgroundColor, setBackgroundColor] = useState('#EEEEEE');
  const [messages, setMessages] = useState({
    greeting: 'How can I help you?',
    subGreeting: 'Ask me anything!'
  });
  const [form, setForm] = useState({
    name: 'Your name',
    phone: '+1 (000) 000-0000',
    email: 'example@gmail.com'
  });
  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Want to chat about Hubly? I’m a chatbot here to help you find your way."
  );
  const [missedChatTimer, setMissedChatTimer] = useState({
    hour: '00',
    minute: '10',
    second: '00'
  });

  const handleSave = () => {
    console.log('Saved Settings:', {
      headerColor, backgroundColor, messages, form, welcomeMessage, missedChatTimer
    });
  };

  return (
    <div className="chatbot-wrapper">
      <Sidebar />

      <div className="chatbot-content">
        {/* Left Side - Chatbot Preview */}
        <div className="chatbot-left">
          <div className="chatbot-box" style={{ backgroundColor: backgroundColor }}>
            <div className="chatbot-header" style={{ backgroundColor: headerColor }}>
            <img src="/Ellipse 6.png" alt="Bot" />
              <span>Hubly</span>
            </div>
            <div className="chatbot-body">
              <p>{messages.greeting}</p>
              <p>{messages.subGreeting}</p>
            </div>
            <div className="chatbot-form">
              <p>Introduction Yourself</p>
              <input type="text" value={form.name} disabled />
              <input type="text" value={form.phone} disabled />
              <input type="email" value={form.email} disabled />
              <button>Thank You!</button>
            </div>
            <div className="chatbot-footer">
              <input type="text" placeholder="Write a message..." disabled />
              <button>&#10148;</button>
            </div>
          </div>

          <div className="chatbot-welcome">
          <img src="/Ellipse 6.png" alt="Bot" />
            <div className="welcome-text">{welcomeMessage}</div>
          </div>
        </div>

        {/* Right Side - Customization Panel */}
        <div className="chatbot-right">
          <div className="settings-card">
            <h4>Header Color</h4>
            <div className="color-palette">
              <div className="color-swatch white" onClick={() => setHeaderColor('#ffffff')}></div>
              <div className="color-swatch black" onClick={() => setHeaderColor('#000000')}></div>
              <div className="color-swatch blue" onClick={() => setHeaderColor('#33475B')}></div>
            </div>
            <input type="text" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
          </div>

          <div className="settings-card">
            <h4>Custom Background Color</h4>
            <div className="color-palette">
              <div className="color-swatch white" onClick={() => setBackgroundColor('#ffffff')}></div>
              <div className="color-swatch black" onClick={() => setBackgroundColor('#000000')}></div>
              <div className="color-swatch grey" onClick={() => setBackgroundColor('#EEEEEE')}></div>
            </div>
            <input type="text" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          </div>

          <div className="settings-card">
            <h4>Customize Message</h4>
            <input type="text" value={messages.greeting} onChange={(e) => setMessages({ ...messages, greeting: e.target.value })} />
            <input type="text" value={messages.subGreeting} onChange={(e) => setMessages({ ...messages, subGreeting: e.target.value })} />
          </div>

          <div className="settings-card">
            <h4>Introduction Form</h4>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="settings-card">
            <h4>Welcome Message</h4>
            <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} />
          </div>

          <div className="settings-card">
            <h4>Missed Chat Timer</h4>
            <div className="timer-fields">
              <input type="text" value={missedChatTimer.hour} onChange={(e) => setMissedChatTimer({ ...missedChatTimer, hour: e.target.value })} />
              <span>:</span>
              <input type="text" value={missedChatTimer.minute} onChange={(e) => setMissedChatTimer({ ...missedChatTimer, minute: e.target.value })} />
              <span>:</span>
              <input type="text" value={missedChatTimer.second} onChange={(e) => setMissedChatTimer({ ...missedChatTimer, second: e.target.value })} />
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
