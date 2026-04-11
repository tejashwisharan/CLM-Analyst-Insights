import React, { useState } from 'react';
import { regulatoryChanges } from '../data/mockData';
import { Scale, Globe, Calendar, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RegulatoryTimeline() {
  const [selectedImpact, setSelectedImpact] = useState<string>('All');

  const filteredRegulations = regulatoryChanges.filter(reg => 
    selectedImpact === 'All' || reg.clmImpact === selectedImpact
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Regulatory Changes Timeline</h2>
          <p className="text-slate-500 mt-1">Year-wise global regulations and their impact on the CLM domain.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm font-medium text-slate-500 px-2">Filter Impact:</span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(impact => (
            <button
              key={impact}
              onClick={() => setSelectedImpact(impact)}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                selectedImpact === impact 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {impact}
            </button>
          ))}
        </div>
      </header>

      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-12 pb-12">
        {filteredRegulations.map((reg) => (
          <div key={reg.id} className="relative pl-8 md:pl-12">
            {/* Timeline dot */}
            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-blue-500 shadow-sm" />
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4" />
                        {reg.year}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        <Globe className="w-4 h-4" />
                        {reg.region}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-slate-400" />
                      {reg.regulation}
                    </h3>
                  </div>
                  
                  <div className="shrink-0">
                    <span className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-bold border flex items-center gap-1.5",
                      getImpactColor(reg.clmImpact)
                    )}>
                      {reg.clmImpact === 'Critical' || reg.clmImpact === 'High' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                      {reg.clmImpact} CLM Impact
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {reg.description}
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    How this impacts CLM Systems
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {reg.impactDetails}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredRegulations.length === 0 && (
          <div className="pl-12 py-8 text-slate-500 italic">
            No regulatory changes found matching this impact level.
          </div>
        )}
      </div>
    </div>
  );
}
