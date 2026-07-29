import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { 
  Clock, 
  MapPin, 
  UserCheck, 
  Calendar, 
  Download, 
  Sparkles, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface ClassScheduleProps {
  schedule: ScheduleItem[];
}

export const ClassSchedule: React.FC<ClassScheduleProps> = ({ schedule }) => {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const daySchedule = schedule.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0D47A1] dark:text-amber-400 uppercase tracking-widest mb-1">
            <Clock className="w-4 h-4" /> Weekly Timetable
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Enrolled Class & Subject Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Grade 10 - St. Thomas • S.Y. 2025-2026 Integrated Schedule
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'daily'
                  ? 'bg-[#0D47A1] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'weekly'
                  ? 'bg-[#0D47A1] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Weekly Grid
            </button>
          </div>

          <button 
            onClick={() => alert("Class Schedule file generated! Saved to downloads.")}
            className="w-full sm:w-auto justify-center bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-[#0D47A1] dark:text-amber-400 font-extrabold px-4 py-3 sm:py-2.5 rounded-2xl text-xs flex items-center gap-2 border border-blue-200 dark:border-slate-700 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 flex-shrink-0" /> 
            <span>Export Schedule</span>
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        <>
          {/* Day Tabs */}
          <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`flex-1 min-w-[90px] py-3 px-3 rounded-2xl font-black text-xs transition-all flex flex-col items-center gap-1 cursor-pointer active:scale-95 ${
                  selectedDay === d
                    ? 'bg-[#0D47A1] text-white shadow-md scale-102'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                <span>{d}</span>
                <span className="text-[10px] opacity-75 font-medium">
                  {schedule.filter(s => s.day === d).length} Classes
                </span>
              </button>
            ))}
          </div>

          {/* Schedule Items Timeline */}
          <div className="space-y-4">
            {daySchedule.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <Calendar className="w-12 h-12 mx-auto text-slate-300" />
                <p className="font-bold text-sm text-slate-600 dark:text-slate-300">No classes scheduled for {selectedDay}</p>
                <p className="text-xs">Enjoy your study break or club activity day.</p>
              </div>
            ) : (
              daySchedule.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl text-white font-black text-xs flex flex-col items-center justify-center min-w-[75px] ${item.color} shadow-sm`}>
                      <BookOpen className="w-5 h-5 mb-1" />
                      <span>{item.subjectCode}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-800 text-[#0D47A1] dark:text-amber-400 border border-blue-200 dark:border-slate-700">
                        {item.subjectCode}
                      </span>
                      <h3 className="font-black text-base text-slate-900 dark:text-white leading-snug">
                        {item.subjectName}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-[#0D47A1] dark:text-amber-400" />
                          {item.teacher}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {item.room}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-right flex-shrink-0 flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Class Duration</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      {item.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* Weekly Full Grid View for Tablet / Desktop */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {days.map((d) => {
            const list = schedule.filter(s => s.day === d);
            return (
              <div key={d} className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <h3 className="font-black text-sm text-[#0D47A1] dark:text-amber-400 uppercase tracking-wide">{d}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
                      {list.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {list.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                        <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-300 block">{item.subjectCode}</span>
                        <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">{item.subjectName}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.time}</p>
                        <p className="text-[10px] font-bold text-rose-500">{item.room}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
