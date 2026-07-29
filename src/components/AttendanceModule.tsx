import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface AttendanceModuleProps {
  student: Student;
  attendance: AttendanceRecord[];
}

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({
  student,
  attendance
}) => {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [currentMonth, setCurrentMonth] = useState('July 2026');

  // Stats
  const totalDays = attendance.length;
  const presentDays = attendance.filter(a => a.status === 'present').length;
  const absentDays = attendance.filter(a => a.status === 'absent').length;
  const lateDays = attendance.filter(a => a.status === 'late').length;
  const excusedDays = attendance.filter(a => a.status === 'excused').length;

  const attendancePercentage = totalDays > 0 
    ? Math.round(((presentDays + excusedDays) / totalDays) * 100) 
    : 100;

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
            <CheckCircle className="w-4 h-4" /> Attendance Tracker & Logbook
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Daily School Attendance Summary
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time gate time-in records via JAM Smart RFID System
          </p>
        </div>

        <div className="text-right">
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{attendancePercentage}%</span>
          <p className="text-[10px] uppercase font-bold text-slate-400">Overall Attendance</p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Present */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-3xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 block">Present Days</span>
            <span className="text-3xl font-black text-emerald-800 dark:text-emerald-200">{presentDays}</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">On-time entries</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-80" />
        </div>

        {/* Absent */}
        <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-3xl border border-rose-200 dark:border-rose-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-rose-700 dark:text-rose-300 block">Absent Days</span>
            <span className="text-3xl font-black text-rose-800 dark:text-rose-200">{absentDays}</span>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-0.5">Unexcused</p>
          </div>
          <XCircle className="w-8 h-8 text-rose-500 opacity-80" />
        </div>

        {/* Late */}
        <div className="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-3xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 block">Late Arrivals</span>
            <span className="text-3xl font-black text-amber-800 dark:text-amber-200">{lateDays}</span>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">After 7:30 AM</p>
          </div>
          <Clock className="w-8 h-8 text-amber-500 opacity-80" />
        </div>

        {/* Excused */}
        <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-3xl border border-blue-200 dark:border-blue-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300 block">Excused Absences</span>
            <span className="text-3xl font-black text-blue-800 dark:text-blue-200">{excusedDays}</span>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">Medical / Slip</p>
          </div>
          <FileText className="w-8 h-8 text-blue-500 opacity-80" />
        </div>

      </div>

      {/* Monthly Attendance Log Table & Details Drawer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden space-y-4 p-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0D47A1] dark:text-amber-400" />
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Daily Gate Attendance Logbook ({currentMonth})
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Late</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Excused</span>
          </div>
        </div>

        {attendance.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs font-semibold bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Clock className="w-8 h-8 text-slate-400 mx-auto opacity-60" />
            <p className="font-bold text-slate-700 dark:text-slate-200">No Attendance Records Found</p>
            <p className="text-[11px] max-w-sm mx-auto">
              No daily gate RFID logs have been recorded for S.Y. 2025-2026 yet. RFID reader entry logs will automatically populate here upon campus tap-in.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendance.map((rec) => {
            const statusColors = {
              present: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
              absent: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
              late: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
              excused: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300'
            };

            return (
              <div 
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{rec.date}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${statusColors[rec.status]}`}>
                      {rec.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Time In: <strong className="text-slate-800 dark:text-slate-200">{rec.timeIn}</strong> | Time Out: <strong className="text-slate-800 dark:text-slate-200">{rec.timeOut}</strong>
                  </p>

                  {rec.remarks && (
                    <p className="text-[11px] text-amber-700 dark:text-amber-300 italic">
                      Note: {rec.remarks}
                    </p>
                  )}
                </div>

                <Info className="w-4 h-4 text-slate-400 hover:text-[#0D47A1]" />
              </div>
            );
          })}
        </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Attendance Record Detail</h4>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Date:</strong> {selectedRecord.date}</p>
              <p><strong>Status:</strong> <span className="uppercase font-bold text-[#0D47A1]">{selectedRecord.status}</span></p>
              <p><strong>Gate Time In:</strong> {selectedRecord.timeIn}</p>
              <p><strong>Gate Time Out:</strong> {selectedRecord.timeOut}</p>
              {selectedRecord.remarks && (
                <p><strong>Adviser Remarks:</strong> {selectedRecord.remarks}</p>
              )}
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full bg-[#0D47A1] text-white font-bold py-2 rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
