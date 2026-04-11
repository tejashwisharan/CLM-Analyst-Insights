import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeedbackFeed from './components/FeedbackFeed';
import PlatformInsights from './components/PlatformInsights';
import Insights from './components/Insights';
import Recommendations from './components/Recommendations';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-full overflow-hidden">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'feed' && <FeedbackFeed />}
        {activeTab === 'platforms' && <PlatformInsights />}
        {activeTab === 'insights' && <Insights />}
        {activeTab === 'recommendations' && <Recommendations />}
      </main>
    </div>
  );
}
