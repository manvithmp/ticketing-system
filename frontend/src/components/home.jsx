// src/Home.jsx
import React, { useState } from 'react';
import './Home.css';
import ChatWindow from '../components/chatwindow';
import ChatIcon from '../components/ChatIcon';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <span className="home-logo">Hubly</span>
        <div className="home-buttons">
          <a href="/login" className="home-button login">Login</a>
          <a href="/signup" className="home-button signup">Sign Up</a>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-title">Grow Your Business Faster with Hubly CRM</h1>
        <p className="home-subtext">
          Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.
        </p>
        <div className="home-cta">
          <a href="/signup" className="btn primary">Get Started</a>
          <a href="#video" className="btn outline">Watch Video</a>
        </div>
      </section>

      {/* Logo Banner */}
      <section className="logo-banner">
        <span className="logo">Adobe</span>
        <span className="logo">Elastic</span>
        <span className="logo">Opendoor</span>
        <span className="logo">Airtable</span>
        <span className="logo">Framer</span>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">At its core, Hubly is a robust CRM solution.</h2>
        <p className="section-subtext">
          Hubly helps businesses streamline customer interactions, track leads, and automate tasks—
          saving you time and maximizing revenue. Whether you're a startup or an enterprise, Hubly adapts
          to your needs, giving you the tools to scale efficiently.
        </p>
        <div className="features-grid">
          <div className="features-text">
            <h3>Multiple Platforms Together!</h3>
            <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
            <h3>Capture</h3>
            <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
            <h3>Nurture</h3>
            <p>Communicate and convert leads with built-in tools like SMS, email, drip campaigns, and reminders.</p>
            <h3>Close</h3>
            <p>Turn those nurtured leads into paying clients with pipeline tracking and reporting dashboards.</p>
          </div>
          <div className="features-image">
            <div className="funnel-placeholder">[ Funnel Diagram ]</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2 className="section-title">We have plans for everyone!</h2>
        <p className="section-subtext">
          We started with a strong foundation, then simply built all of the sales and marketing tools
          ALL businesses need under one platform.
        </p>
        <div className="pricing-cards">
          <div className="card">
            <h3>STARTER</h3>
            <p>Best for local businesses needing to improve their online reputation.</p>
            <h4>$199 <span style={{ fontSize: '1rem' }}>/monthly</span></h4>
            <ul>
              <li>✔️ Unlimited Users</li>
              <li>✔️ GMB Messaging</li>
              <li>✔️ Reputation Management</li>
              <li>✔️ GMB Call Tracking</li>
              <li>✔️ 24/7 Award Winning Support</li>
            </ul>
            <a href="/signup" className="btn outline">Sign up for Starter</a>
          </div>
          <div className="card">
            <h3>GROW</h3>
            <p>Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</p>
            <h4>$399 <span style={{ fontSize: '1rem' }}>/monthly</span></h4>
            <ul>
              <li>✔️ Pipeline Management</li>
              <li>✔️ Marketing Automation</li>
              <li>✔️ Live Call Transfer</li>
              <li>✔️ Embed-able Form Builder</li>
              <li>✔️ Reputation Management</li>
              <li>✔️ 24/7 Award Winning Support</li>
            </ul>
            <a href="/signup" className="btn outline">Sign up for Grow</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Hubly</div>
        <div className="footer-columns">
          <div>
            <h4>Product</h4>
            <ul>
              <li>Universal checkout</li>
              <li>Payment workflows</li>
              <li>Observability</li>
              <li>UpliftAI</li>
              <li>Apps & integrations</li>
            </ul>
          </div>
          <div>
            <h4>Why Primer</h4>
            <ul>
              <li>Expand to new markets</li>
              <li>Boost payment success</li>
              <li>Improve conversion rates</li>
              <li>Reduce payments fraud</li>
              <li>Recover revenue</li>
            </ul>
          </div>
          <div>
            <h4>Developers</h4>
            <ul>
              <li>Primer Docs</li>
              <li>API Reference</li>
              <li>Payment methods guide</li>
              <li>Service status</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Success stories</li>
              <li>News room</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="footer-socials">
          © 2025 Hubly. All rights reserved.
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        {isChatOpen && <ChatWindow />}
        <div onClick={() => setIsChatOpen(!isChatOpen)}>
          <ChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Home;