import React from 'react';
import { platformStats } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, AlertCircle, ArrowRight } from 'lucide-react';

export default function PlatformInsights() {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Platform Insights</h2>
        <p className="text-slate-500 mt-1">Comparative analysis of major CLM platforms based on analyst feedback.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Market Share vs. Analyst Satisfaction</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" domain={[0, 5]} label={{ value: 'Satisfaction (0-5)', angle: 90, position: 'insideRight' }} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar yAxisId="left" dataKey="marketShare" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Market Share %" />
                <Bar yAxisId="right" dataKey="avgSatisfaction" fill="#10b981" radius={[4, 4, 0, 0]} name="Avg Satisfaction" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Takeaways</h3>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-1">Highest Satisfaction</h4>
              <p className="text-sm text-blue-800"><strong>nCino</strong> leads with 4.1/5, praised for its loan origination integration, despite core banking API issues.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-900 mb-1">Major Bottleneck</h4>
              <p className="text-sm text-red-800"><strong>Oracle KYC</strong> analysts report the highest TAT impact due to false positives in AML screening.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-900 mb-1">UI Friction</h4>
              <p className="text-sm text-amber-800"><strong>Pega CLM</strong> is powerful but requires excessive clicks for simple entity updates, frustrating retail analysts.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-4">Platform Deep Dive</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformStats.map(stat => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-bold text-slate-900">{stat.name}</h4>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-semibold text-sm">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                {stat.avgSatisfaction}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Estimated Market Share</p>
                <p className="text-lg font-medium text-slate-800">{stat.marketShare}%</p>
              </div>
              
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Top Analyst Complaint
                </p>
                <p className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded inline-block">
                  {stat.topIssue}
                </p>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              View All Feedback <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
