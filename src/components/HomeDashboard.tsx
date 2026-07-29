import React from 'react';
import { CrestLogo } from './CrestLogo';
import { Student, ActiveTab, SubjectGrade, AttendanceRecord, Assignment, Announcement, ScheduleItem } from '../types';
import { 
  Award, 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  Megaphone, 
  Bell, 
  User, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  GraduationCap, 
  Download,
  Code,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface HomeDashboardProps {
  student: Student;
  grades: SubjectGrade[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  announcements: Announcement[];
  schedule: ScheduleItem[];
  setActiveTab: (tab: ActiveTab) => void;
  onExportPDF: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  student,
  grades,
  attendance,
  assignments,
  announcements,
  schedule,
  setActiveTab,
  onExportPDF
}) => {
  // Calculate General Average
  const totalAverage = grades.length > 0
    ? grades.reduce((acc, curr) => {
        const finalVal = (curr.quarter1 + curr.quarter2 + curr.quarter3 + curr.quarter4) / 4;
        return acc + finalVal;
      }, 0) / grades.length
    : 0;

  // Calculate Attendance Percentage
  const presentCount = attendance.filter(a => a.status === 'present' || a.status === 'excused').length;
  const attendancePercentage = attendance.length > 0 
    ? Math.round((presentCount / attendance.length) * 100) 
    : 100;

  // Pending assignments count
  const pendingAssignments = assignments.filter(a => a.status === 'pending');

  // Filter today's schedule (e.g. Monday schedule by default for demo)
  const todaySchedule = schedule.filter(s => s.day === 'Monday');

  const quickActions = [
    { id: 'grades' as ActiveTab, title: 'View Grades', icon: Award, color: 'bg-blue-600 text-white', badge: `${totalAverage.toFixed(1)}%` },
    { id: 'attendance' as ActiveTab, title: 'Attendance', icon: CheckCircle, color: 'bg-emerald-600 text-white', badge: `${attendancePercentage}%` },
    { id: 'schedule' as ActiveTab, title: 'Class Schedule', icon: Clock, color: 'bg-[#0D47A1] text-white', badge: 'Weekly' },
    { id: 'subjects' as ActiveTab, title: 'Subjects', icon: BookOpen, color: 'bg-indigo-600 text-white', badge: `${grades.length} Enrolled` },
    { id: 'assignments' as ActiveTab, title: 'Assignments', icon: FileText, color: 'bg-amber-500 text-slate-950', badge: `${pendingAssignments.length} Due` },
    { id: 'announcements' as ActiveTab, title: 'Announcements', icon: Megaphone, color: 'bg-rose-600 text-white', badge: 'Latest' },
    { id: 'calendar' as ActiveTab, title: 'School Calendar', icon: Calendar, color: 'bg-teal-600 text-white', badge: 'Events' },
    { id: 'notifications' as ActiveTab, title: 'Notifications', icon: Bell, color: 'bg-purple-600 text-white', badge: 'Alerts' },
    { id: 'profile' as ActiveTab, title: 'Student Profile', icon: User, color: 'bg-slate-700 text-white', badge: 'Info' },
    { id: 'android-export' as ActiveTab, title: 'Kotlin Source Code', icon: Code, color: 'bg-amber-400 text-slate-950', badge: 'Android' }
  ];

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0D47A1] via-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              S.Y. {student.schoolYear} • Pre-School to Senior High School
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome, <span className="text-amber-300">{student.fullName}</span>!
            </h2>

            <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Have a fruitful academic day at Jehoshua Academy of Marikina. Serving students from Pre-School to Senior High School with integrated, responsive, and sustainable education.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
            <button
              onClick={onExportPDF}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-3 sm:py-2.5 rounded-2xl shadow-md text-xs flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 flex-shrink-0" /> 
              <span>Download Report Card PDF</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className="w-full bg-blue-800/80 hover:bg-blue-700 text-white font-extrabold px-4 py-3 sm:py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 border border-blue-500/30 transition-all cursor-pointer active:scale-95"
            >
              <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" /> 
              <span>Today's Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Information Card & Honor Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Info Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {student.photoUrl ? (
            <img 
              src={student.photoUrl} 
              alt={student.fullName} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#0D47A1] dark:border-amber-400 shadow-lg flex-shrink-0" 
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-50 dark:bg-slate-800 border-4 border-[#0D47A1] dark:border-amber-400 shadow-lg flex-shrink-0 flex flex-col items-center justify-center text-[#0D47A1] dark:text-amber-300">
              <User className="w-10 h-10 sm:w-12 sm:h-12" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider mt-1 text-slate-500 dark:text-slate-400">Student</span>
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                  {student.fullName}
                </h3>
                <p className="text-xs font-bold text-[#0D47A1] dark:text-amber-400">
                  Student ID: {student.studentId}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full self-center sm:self-auto">
                <GraduationCap className="w-4 h-4" />
                {totalAverage >= 95 ? 'With High Honors' : totalAverage >= 90 ? 'With Honors' : 'Passed'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Grade Level</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{student.gradeLevel}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Section</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{student.section}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Class Adviser</span>
                <span className="font-extrabold text-slate-900 dark:text-white truncate block">{student.adviser}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Academic Performance Pill */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" />
              Academic Overview
            </h4>
            <span className="text-xs text-slate-400">Quarter 1 - 4</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-slate-800/80 rounded-2xl border border-blue-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block">General Average</span>
              <span className="text-2xl font-black text-[#0D47A1] dark:text-amber-400">{totalAverage.toFixed(2)}%</span>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-slate-800/80 rounded-2xl border border-emerald-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block">Attendance Rate</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{attendancePercentage}%</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('grades')}
            className="w-full text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-800 py-2 rounded-xl transition-all flex items-center justify-center gap-1 border border-blue-200 dark:border-slate-700"
          >
            <span>View Full Report Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dashboard Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="font-black text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Dashboard Quick Modules
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 p-4 rounded-3xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all text-left flex flex-col justify-between h-32 group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2.5 rounded-2xl ${action.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                    {action.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0D47A1] dark:group-hover:text-amber-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">Tap to access</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Today's Schedule & Pending Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Schedule Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" />
              Monday Schedule
            </h3>
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              Full Week <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todaySchedule.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-10 rounded-full ${item.color}`} />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.subjectName}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.teacher} • {item.room}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Pending Assignments ({pendingAssignments.length})
            </h3>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              All Assignments <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingAssignments.map((asg) => (
              <div 
                key={asg.id}
                className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                      {asg.subject}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-xs">
                      {asg.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {asg.description}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 block">
                    Due: {asg.dueDate}
                  </span>
                  <button
                    onClick={() => setActiveTab('assignments')}
                    className="mt-1 text-[10px] font-bold bg-[#0D47A1] text-white px-2.5 py-1 rounded-lg hover:bg-blue-800 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Latest Announcements Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-rose-500" />
            Latest School Announcements
          </h3>
          <button
            onClick={() => setActiveTab('announcements')}
            className="text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.slice(0, 2).map((anc) => (
            <div 
              key={anc.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#0D47A1] dark:bg-blue-900/60 dark:text-blue-300">
                    {anc.category}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">{anc.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {anc.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                  {anc.description}
                </p>
              </div>

              {anc.attachment && (
                <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  <Download className="w-3.5 h-3.5" />
                  <span>Attachment: {anc.attachment.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
