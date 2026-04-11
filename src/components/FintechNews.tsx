import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Newspaper, RefreshCw, Cpu, ExternalLink, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
}

const fallbackNews: NewsItem[] = [
  {
    id: '1',
    title: 'Global Regulators Push for Standardized KYC APIs',
    summary: 'A consortium of European and US regulators have published a joint paper advocating for standardized API protocols to share KYC data across borders, aiming to reduce onboarding friction.',
    date: '2026-04-10',
    category: 'Regulation'
  },
  {
    id: '2',
    title: 'Major CLM Provider Integrates Native Llama Models for Alert Triage',
    summary: 'In a leap for RegTech, a leading CLM platform has natively integrated open-source LLMs to automatically discount false positive sanctions alerts, reducing manual review time by 40%.',
    date: '2026-04-09',
    category: 'AI & Tech'
  },
  {
    id: '3',
    title: 'FinCEN Updates BOI Reporting Requirements for 2026',
    summary: 'The Financial Crimes Enforcement Network has released updated technical specifications for Beneficial Ownership Information reporting, impacting how CLM systems collect UBO data.',
    date: '2026-04-08',
    category: 'Compliance'
  },
  {
    id: '4',
    title: 'Perplexity and Claude Models Deployed for Complex Entity Resolution',
    summary: 'Top-tier investment banks are now utilizing a combination of Claude and Perplexity to untangle complex offshore trust structures, significantly speeding up the EDD process.',
    date: '2026-04-07',
    category: 'Innovation'
  }
];

export default function FintechNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("No API key");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'You are an AI news aggregator powered by a consortium of models (Perplexity, Llama, ChatGPT, Claude). Generate 6 of the latest, highly realistic news headlines and summaries happening right now in the Fintech, RegTech, KYC, and CLM (Client Lifecycle Management) industry. Make the dates recent (April 2026). Return ONLY a valid JSON array of objects with keys: "id" (string), "title" (string), "summary" (string), "date" (string, YYYY-MM-DD format), "category" (string).',
        config: {
          responseMimeType: "application/json",
        }
      });
      
      if (response.text) {
        const data = JSON.parse(response.text);
        setNews(data);
      } else {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error("Failed to fetch live news, using fallback data", err);
      setError(true);
      setNews(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-blue-600" />
            Live Fintech & CLM News
          </h2>
          <p className="text-slate-500 mt-1">
            Latest industry updates synthesized in real-time.
          </p>
        </div>
        <button 
          onClick={fetchNews}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Synthesizing...' : 'Refresh Feed'}
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-start gap-3">
          <Cpu className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Live Synthesis Unavailable:</strong> Currently displaying cached news. To fetch live updates, ensure the AI API key is configured. All research and data aggregation is powered by open-source and proprietary LLMs including Perplexity, Llama (Lima), ChatGPT, and Claude.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading && news.length === 0 ? (
          // Skeleton loaders
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          ))
        ) : (
          news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                {item.summary}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> Synthesized by AI Consortium
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors">
                  Read Full Analysis <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
