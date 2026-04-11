import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { mockFeedback, painPointCategories } from '../data/mockData';
import { Clock, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function Dashboard() {
  // Calculate metrics
  const totalFeedback = mockFeedback.length;
  const avgTatImpact = Math.round(mockFeedback.reduce((acc, curr) => acc + curr.tatImpactMinutes, 0) / totalFeedback);
  
  // Prepare chart data
  const painPointData = painPointCategories.map(category => ({
    name: category,
    count: mockFeedback.filter(f => f.painPointCategory === category).length
  })).filter(d => d.count > 0).sort((a, b) => b.count - a.count);

  const platformData = mockFeedback.reduce((acc, curr) => {
    const existing = acc.find(p => p.name === curr.platform);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: curr.platform, count: 1 });
    }
    return acc;
  }, [] as {name: string, count: number}[]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Global Dashboard</h2>
        <p className="text-slate-500 mt-1">Aggregated insights from CLM & KYC analysts worldwide.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Feedback</p>
            <p className="text-2xl font-bold text-slate-900">{totalFeedback}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Avg TAT Wasted/Case</p>
            <p className="text-2xl font-bold text-slate-900">{avgTatImpact} min</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Top Pain Point</p>
            <p className="text-lg font-bold text-slate-900 leading-tight truncate" title={painPointData[0]?.name}>
              {painPointData[0]?.name || 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Potential TAT Reduction</p>
            <p className="text-2xl font-bold text-slate-900">24%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Pain Points Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={painPointData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Feedback by Platform</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import MessageSquare for the first KPI card
import { MessageSquare } from 'lucide-react';
