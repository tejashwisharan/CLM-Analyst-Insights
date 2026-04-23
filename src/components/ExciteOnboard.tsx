import React from 'react';
import { Target, Landmark, Shield, Coins, CreditCard, Gamepad2, Home, TrendingUp, DollarSign, ArrowUpRight, Zap, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ExciteOnboard() {
  const opportunities = [
    {
      vertical: 'Investment Banking & Capital',
      icon: Landmark,
      riskLevel: 'High',
      riskProfile: 'Complex Institutional ESG & UBO Risk',
      kycDrivers: 'Complex UBO unwrapping, cross-border Enhanced Due Diligence (EDD), and identifying shadow banking structures.',
      exciteFit: 'Excite Onboard\'s dynamic entity resolution and automated global registry integrations uniquely untangle shell companies and offshore trusts in real-time.',
      tam: '$850M',
      dealSize: '$500K - $1.5M',
      growth: '+12%'
    },
    {
      vertical: 'Insurance (Life & Annuities)',
      icon: Shield,
      riskLevel: 'Medium-High',
      riskProfile: 'Premium Laundering & Beneficiary Fraud',
      kycDrivers: 'Verification of ultimate beneficiaries, preventing laundering via overpaid policy premiums, and deep source of wealth verification.',
      exciteFit: 'Seamless document extraction combined with continuous, automated beneficiary screening against evolving global watchlists and PEP databases.',
      tam: '$620M',
      dealSize: '$250K - $750K',
      growth: '+8%'
    },
    {
      vertical: 'Crypto Exchanges & VASPs',
      icon: Coins,
      riskLevel: 'Critical',
      riskProfile: 'High Anonymity & Cross-Border Transfer',
      kycDrivers: 'Travel Rule compliance, instant high-volume retail onboarding, and integration with blockchain forensics for source of funds.',
      exciteFit: 'API-first onboarding architecture capable of instant biometric verification and real-time AI-driven risk scoring during extreme market volatility.',
      tam: '$1.2B',
      dealSize: '$300K - $2M',
      growth: '+24%'
    },
    {
      vertical: 'Payment Service Providers (Fintech)',
      icon: CreditCard,
      riskLevel: 'High',
      riskProfile: 'Micro-Structuring & Merchant Fraud',
      kycDrivers: 'Frictionless Merchant Onboarding (KYB), rapid geographic scaling, and continuous monitoring to prevent transaction aggregation laundering.',
      exciteFit: 'Highly scalable risk-tiering workflows that straight-through process (STP) low-risk merchants while routing complex KYB reviews to specialized teams.',
      tam: '$950M',
      dealSize: '$200K - $1M',
      growth: '+18%'
    },
    {
      vertical: 'Gaming, Betting & Casinos',
      icon: Gamepad2,
      riskLevel: 'High',
      riskProfile: 'Cash-Intensive VIP Placement',
      kycDrivers: 'Rapid VIP player onboarding, immediate source of funds verification, and continual sanctions screening on large fiat/crypto deposits.',
      exciteFit: 'Mobile-first ID document extraction and facial liveness checks for instant, secure player verification balancing UX with strict AML compliance.',
      tam: '$400M',
      dealSize: '$100K - $400K',
      growth: '+15%'
    },
    {
      vertical: 'High-Value Real Estate',
      icon: Home,
      riskLevel: 'High',
      riskProfile: 'Illicit Wealth Parking via Shells',
      kycDrivers: 'Identifying foreign PEPs, unwrapping anonymous LLCs purchasing luxury properties in cash, and verifying complex source of wealth.',
      exciteFit: 'Deep UBO visualization tools and native integration with premium corporate registries to investigate the true human controllers of property-buying entities.',
      tam: '$350M',
      dealSize: '$50K - $250K',
      growth: '+10%'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Target className="w-8 h-8 text-indigo-600" />
          Excite Onboard (NICE Actimize) Opportunities
        </h2>
        <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed">
          Beyond traditional retail banking, identifying high-value verticals where KYC/AML is mandated to prevent money laundering and fraud. These represent strategic deployment opportunities for Excite Onboard based on market risk profiles and monetary value.
        </p>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-900 p-6 rounded-xl border border-indigo-800 text-white shadow-md">
          <h4 className="text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Global Expansion TAM
          </h4>
          <p className="text-4xl font-bold">$4.37B</p>
          <p className="text-sm text-indigo-400 mt-2">Combined addressable market across all alternative verticals by 2028.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Top Growth Vertical
          </h4>
          <p className="text-3xl font-bold text-slate-900">Crypto & VASPs</p>
          <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> +24% YoY Growth Demand
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Zap className="w-32 h-32" />
          </div>
          <h4 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" /> Excite Core Advantage
          </h4>
          <p className="text-xl font-bold text-slate-900 leading-tight">Complex Entity Resolution</p>
          <p className="text-sm text-slate-500 mt-2">The primary differentiator unlocking non-banking institutional markets.</p>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {opportunities.map((opp, idx) => {
          const Icon = opp.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{opp.vertical}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        opp.riskLevel === 'Critical' ? "bg-red-100 text-red-700 border border-red-200" :
                        opp.riskLevel === 'High' ? "bg-orange-100 text-orange-700 border border-orange-200" :
                        "bg-amber-100 text-amber-700 border border-amber-200"
                      )}>
                        {opp.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 space-y-5">
                <div>
                  <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Money Laundering / Fraud Profile</dt>
                  <dd className="text-sm font-medium text-slate-900">{opp.riskProfile}</dd>
                </div>
                
                <div>
                  <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Specific KYC Drivers</dt>
                  <dd className="text-sm text-slate-600 leading-relaxed">{opp.kycDrivers}</dd>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <dt className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Why Excite Onboard?
                  </dt>
                  <dd className="text-sm text-indigo-900 leading-relaxed font-medium">{opp.exciteFit}</dd>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-3 divide-x divide-slate-200">
                <div className="px-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Segment TAM</p>
                  <p className="text-sm font-bold text-slate-900">{opp.tam}</p>
                </div>
                <div className="px-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Est. Deal Size</p>
                  <p className="text-sm font-bold text-emerald-600">{opp.dealSize}</p>
                </div>
                <div className="px-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">YoY Growth</p>
                  <div className="flex items-center justify-center gap-0.5 text-sm font-bold text-blue-600">
                    <TrendingUp className="w-3.5 h-3.5" /> {opp.growth}
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
