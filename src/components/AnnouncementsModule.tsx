import React, { useState } from 'react';
import { Announcement } from '../types';
import { 
  Megaphone, 
  Search, 
  Download, 
  Pin, 
  Calendar, 
  FileText, 
  Share2, 
  Sparkles,
  AlertOctagon
} from 'lucide-react';

interface AnnouncementsModuleProps {
  announcements: Announcement[];
}

export const AnnouncementsModule: React.FC<AnnouncementsModuleProps> = ({ announcements }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter(anc => {
    const matchCat = selectedCategory === 'ALL' || anc.category === selectedCategory;
    const matchQuery = anc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      anc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1">
            <Megaphone className="w-4 h-4" /> Official School Bulletins
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Announcements & School Advisories
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official communications from the Office of the Principal and Student Affairs
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['ALL', 'Academic', 'Events', 'Administrative', 'Emergency'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Advisories' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search bulletins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 rounded-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filtered.map((anc) => (
          <div 
            key={anc.id}
            className={`bg-white dark:bg-slate-900 rounded-3xl shadow-md border overflow-hidden transition-all ${
              anc.pinned 
                ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20' 
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Optional Banner Image */}
            {Boolean(anc.image) && (
              <div className="h-48 sm:h-64 w-full overflow-hidden relative">
                <img 
                  src={anc.image} 
                  alt={anc.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Posted on {anc.date}
                </div>
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                    anc.category === 'Emergency'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-blue-100 text-[#0D47A1] dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {anc.category}
                  </span>

                  {anc.pinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                      <Pin className="w-3 h-3 text-amber-600 fill-amber-600" /> Pinned Advisory
                    </span>
                  )}
                </div>

                {!anc.image && (
                  <span className="text-xs font-medium text-slate-400">{anc.date}</span>
                )}
              </div>

              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white leading-snug">
                {anc.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {anc.description}
              </p>

              {/* Attachment link if exists */}
              {anc.attachment && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{anc.attachment.name}</p>
                      <p className="text-[10px] text-slate-400">{anc.attachment.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading attachment: ${anc.attachment?.name}`)}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
