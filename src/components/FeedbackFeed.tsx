import React, { useState } from 'react';
import { mockFeedback, majorPlatforms, painPointCategories } from '../data/mockData';
import { Search, Filter, ThumbsUp, ThumbsDown, MessageCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FeedbackFeed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const toggleComments = (id: string) => {
    setExpandedComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFeedback = mockFeedback.filter(fb => {
    const matchesSearch = fb.feedbackText.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fb.proposedSolution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'All' || fb.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Analyst Feedback Feed</h2>
          <p className="text-slate-500 mt-1">Showing {filteredFeedback.length} real-world pain points and solutions from the frontlines.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          Submit Feedback
        </button>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search feedback or solutions..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="All">All Platforms</option>
            {majorPlatforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {filteredFeedback.map((fb) => (
          <div key={fb.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {fb.analystRole.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{fb.analystRole}</h4>
                    <p className="text-xs text-slate-500">{fb.institutionType} • {fb.country} • {fb.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                    {fb.platform}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200">
                    {fb.kycType}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded mb-2">
                  Pain Point: {fb.painPointCategory}
                </span>
                <p className="text-slate-800 leading-relaxed">{fb.feedbackText}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-semibold text-emerald-800 mb-1 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" /> Proposed Solution
                </h5>
                <p className="text-emerald-900 text-sm">{fb.proposedSolution}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" /> 24
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                    <ThumbsDown className="w-4 h-4" /> 2
                  </button>
                  <button 
                    onClick={() => toggleComments(fb.id)}
                    className="flex items-center gap-1 hover:text-slate-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> {fb.comments?.length || 0} Comments
                  </button>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded">
                  <Clock className="w-4 h-4" />
                  +{fb.tatImpactMinutes} min TAT impact
                </div>
              </div>

              {/* Comments Section */}
              {expandedComments.has(fb.id) && fb.comments && fb.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  {fb.comments.map(comment => (
                    <div key={comment.id} className="bg-slate-50 p-3 rounded-lg text-sm border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-700">{comment.authorRole}</span>
                        <span className="text-slate-400 text-xs">• {comment.date}</span>
                      </div>
                      <p className="text-slate-600">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {expandedComments.has(fb.id) && (!fb.comments || fb.comments.length === 0) && (
                <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500 italic">
                  No comments yet.
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredFeedback.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No feedback found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

// Need to import CheckCircle for the solution box
import { CheckCircle2 as CheckCircleIcon } from 'lucide-react';
