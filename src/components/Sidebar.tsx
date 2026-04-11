import React from 'react';
import { LayoutDashboard, MessageSquare, BarChart3, Settings, Globe, PieChart, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Global Dashboard', icon: LayoutDashboard },
    { id: 'feed', label: 'Analyst Feedback', icon: MessageSquare },
    { id: 'platforms', label: 'Platform Insights', icon: BarChart3 },
    { id: 'insights', label: 'Deep Insights', icon: PieChart },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 text-white">
        <Globe className="w-8 h-8 text-blue-500" />
        <h1 className="font-bold text-lg leading-tight">CLM Analyst<br/>Insights</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>
    </div>
  );
}
