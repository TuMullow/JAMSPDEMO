import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Tag, 
  Sparkles,
  Award,
  Flag
} from 'lucide-react';

interface SchoolCalendarProps {
  events: CalendarEvent[];
}

export const SchoolCalendar: React.FC<SchoolCalendarProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const categories = ['ALL', 'Exam', 'Foundation Day', 'Holiday', 'PTA Meeting', 'Intramurals', 'Recognition'];

  const filteredEvents = events.filter(e => {
    if (selectedCategory === 'ALL') return true;
    return e.type === selectedCategory;
  });

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'Exam': return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'Foundation Day': return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300';
      case 'Holiday': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      case 'PTA Meeting': return 'bg-blue-100 text-[#0D47A1] dark:bg-blue-950 dark:text-blue-300';
      case 'Intramurals': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">
            <Calendar className="w-4 h-4" /> Academic Calendar S.Y. 2025-2026
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            School Events & Examination Schedules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official calendar of holidays, foundation week, examinations, and PTA assemblies
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            {cat === 'ALL' ? 'All Events' : cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((evt) => (
          <div 
            key={evt.id}
            onClick={() => setSelectedEvent(evt)}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${getBadgeStyle(evt.type)}`}>
                  {evt.type}
                </span>

                <span className="text-xs font-black text-[#0D47A1] dark:text-amber-400">
                  {evt.date} {evt.endDate ? `to ${evt.endDate}` : ''}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                {evt.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {evt.description}
              </p>
            </div>

            {evt.location && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold">{evt.location}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${getBadgeStyle(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-1">{selectedEvent.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Scheduled Date:</strong> {selectedEvent.date} {selectedEvent.endDate ? `to ${selectedEvent.endDate}` : ''}</p>
              {selectedEvent.location && <p><strong>Venue:</strong> {selectedEvent.location}</p>}
              <p><strong>Event Details:</strong> {selectedEvent.description}</p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => alert("Added reminder to your personal school calendar!")}
                className="flex-1 bg-teal-600 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> Add Reminder
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold px-4 py-2.5 rounded-2xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
