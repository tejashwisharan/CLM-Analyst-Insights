import React from 'react';
import { Lightbulb, CheckCircle, ArrowRight, Zap, ShieldCheck, Database } from 'lucide-react';

export default function Recommendations() {
  const recommendations = [
    {
      id: 1,
      title: 'AI-Powered Alert Triage & Discounting',
      icon: Zap,
      addresses: 'False Positives (AML/Sanctions)',
      impact: 'High',
      tatReduction: '40-60 mins/case',
      description: 'Implement a machine learning layer that pre-scores sanctions and AML alerts based on historical discounting patterns. It should automatically close low-confidence fuzzy matches (e.g., common names without DOB/Nationality matches) and provide a confidence score for human review.',
      capabilities: [
        'Natural Language Processing for Adverse Media',
        'Historical Decision Pattern Matching',
        'Automated Whitelisting for frequent false positives'
      ]
    },
    {
      id: 2,
      title: 'Client-Facing Secure Document Portal',
      icon: ShieldCheck,
      addresses: 'Manual Document Collection',
      impact: 'High',
      tatReduction: 'Days/Weeks of elapsed time',
      description: 'Replace email-based document chasing with a secure, white-labeled portal where clients can upload IDs, proof of address, and corporate structure documents directly into the CLM case. Include automated OCR to pre-fill data upon upload.',
      capabilities: [
        'Secure Drop-Zone with Virus Scanning',
        'Automated Expiry Chasers via Email/SMS',
        'Real-time OCR Data Extraction'
      ]
    },
    {
      id: 3,
      title: 'Unified API Gateway for Legacy Systems',
      icon: Database,
      addresses: 'Siloed Data / Integration Issues',
      impact: 'Medium',
      tatReduction: '20-30 mins/case',
      description: 'Develop a robust middleware layer (e.g., using Kafka or MuleSoft) to act as a single source of truth between the CLM platform, core banking systems, and transaction monitoring tools. Eliminate dual-keying by ensuring bi-directional sync.',
      capabilities: [
        'Event-Driven Architecture (Real-time sync)',
        'Single Pane of Glass Dashboard',
        'Automated Data Reconciliation'
      ]
    },
    {
      id: 4,
      title: 'Dynamic UBO Visualizer with Registry Integration',
      icon: Lightbulb,
      addresses: 'Complex UBO Unwrapping',
      impact: 'Medium',
      tatReduction: '30-45 mins/case',
      description: 'Integrate directly with premium corporate registries (e.g., Dun & Bradstreet, Companies House) to automatically pull and visualize complex corporate hierarchies. Include a drag-and-drop interface to manually adjust trust structures.',
      capabilities: [
        'Automated Ultimate Ownership % Calculation',
        'Circular Ownership Detection',
        'One-click Registry Data Import'
      ]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Strategic Recommendations</h2>
        <p className="text-slate-500 mt-1">Suggested capabilities to build based on global analyst feedback and pain points.</p>
      </header>

      <div className="space-y-6">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div key={rec.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{rec.title}</h3>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {rec.description}
                    </p>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Required Capabilities to Build:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {rec.capabilities.map((cap, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:w-72 bg-slate-50 p-5 rounded-xl border border-slate-100 shrink-0">
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Addresses Pain Point</p>
                      <p className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded inline-block">
                        {rec.addresses}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Business Impact</p>
                      <p className="text-sm font-medium text-slate-900">
                        {rec.impact} Priority
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Expected TAT Reduction</p>
                      <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" /> {rec.tatReduction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
