import React from 'react';
import { mockFeedback, painPointCategories } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Clock, Activity } from 'lucide-react';

export default function Insights() {
  // Calculate volume by category
  const volumeData = painPointCategories.map(category => ({
    name: category,
    volume: mockFeedback.filter(f => f.painPointCategory === category).length
  })).sort((a, b) => b.volume - a.volume);

  // Calculate average TAT impact by category
  const tatData = painPointCategories.map(category => {
    const feedbacks = mockFeedback.filter(f => f.painPointCategory === category);
    const avgTat = feedbacks.length > 0 
      ? Math.round(feedbacks.reduce((acc, curr) => acc + curr.tatImpactMinutes, 0) / feedbacks.length)
      : 0;
    return {
      name: category,
      avgTat
    };
  }).sort((a, b) => b.avgTat - a.avgTat);

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981'];

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Deep Insights</h2>
        <p className="text-slate-500 mt-1">Analyze the types, volume, and severity of problems reported by analysts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Volume Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-slate-800">Problem Volume by Category</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={180} tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                  {volumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TAT Impact Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-slate-800">Average TAT Impact (Minutes)</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tatData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={180} tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="avgTat" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Insights Summary */}
      <div className="bg-slate-900 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold">Critical Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Highest Volume</h4>
            <p className="text-lg font-medium">{volumeData[0]?.name}</p>
            <p className="text-sm text-slate-400 mt-2">Accounts for {Math.round((volumeData[0]?.volume / mockFeedback.length) * 100)}% of all reported issues.</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Most Time Consuming</h4>
            <p className="text-lg font-medium">{tatData[0]?.name}</p>
            <p className="text-sm text-slate-400 mt-2">Wastes an average of {tatData[0]?.avgTat} minutes per case.</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Systemic Risk</h4>
            <p className="text-lg font-medium">Siloed Data / Integration Issues</p>
            <p className="text-sm text-slate-400 mt-2">Consistently reported across almost all major platforms, indicating an industry-wide middleware gap.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
