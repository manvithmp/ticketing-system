import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import './datapage.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Data = () => {
  const [analytics, setAnalytics] = useState({
    missedChats: [],
    avgReplyTime: '',
    resolvedPercentage: 0,
    totalChats: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="data-wrapper">
      <Sidebar />
      <div className="data-page">
        <h2 className="page-title">Analytics</h2>

        <div className="section">
          <h3 className="section-title green">Missed Chats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.missedChats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '5px', color: '#fff' }} />
              <Line
                type="monotone"
                dataKey="chats"
                stroke="#00cc00"
                strokeWidth={3}
                dot={{ r: 5, stroke: '#000', strokeWidth: 1.5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="reply-time-section">
          <h3 className="section-title green">Average Reply time</h3>
          <p className="description">
            For highest customer satisfaction rates you should aim to reply to an incoming customer’s message in 15 seconds or less.
            Quick responses will get you more conversations, help you earn customers’ trust and make more sales.
          </p>
          <div className="reply-time-value">{analytics.avgReplyTime}</div>
        </div>

        <div className="resolved-tickets-section">
          <div>
            <h3 className="section-title green">Resolved Tickets</h3>
            <p className="description">
              A callback system on a website, as well as proactive invitations, help to attract even more customers.
              A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.
            </p>
          </div>
          <div className="circle-progress">
            <svg viewBox="0 0 36 36" className="circular-chart green">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="2"
              />
              <path
                className="circle"
                strokeDasharray={`${analytics.resolvedPercentage}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00cc00"
                strokeWidth="2.5"
              />
              <text x="18" y="20.35" className="percentage" textAnchor="middle">
                {analytics.resolvedPercentage}%
              </text>
            </svg>
          </div>
        </div>

        <div className="total-chats">
          <h3 className="section-title">Total Chats</h3>
          <p className="description">This metric shows the total number of chats for all channels for the selected period</p>
          <div className="total-value green">{analytics.totalChats} Chats</div>
        </div>
      </div>
    </div>
  );
};

export default Data;
