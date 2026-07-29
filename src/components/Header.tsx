import React, { useState } from 'react';
import { CrestLogo } from './CrestLogo';
import { Student, ActiveTab, NotificationItem } from '../types';
import { 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  Monitor, 
  Search, 
  User, 
  LogOut, 
  Menu, 
  X,
  Code,
  ShieldCheck,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';

interface HeaderProps {
  student: Student;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean) => void;
  notifications: NotificationItem[];
  onLogout: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isOnline: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  isDeviceFrame,
  setIsDeviceFrame,
  notifications,
  onLogout,
  isAdmin,
  setIsAdmin,
  isOnline,
  searchQuery,
  setSearchQuery
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0D47A1] dark:bg-slate-900 text-white shadow-lg transition-colors duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0A3882] dark:bg-slate-950 text-[10px] sm:text-xs py-1 px-2.5 sm:px-4 border-b border-blue-800/50 flex flex-wrap items-center justify-between gap-1.5 max-w-full overflow-hidden">
        <div className="flex items-center gap-2 min-w-0 max-w-full overflow-hidden">
          <span className="flex items-center gap-1 text-amber-300 font-semibold truncate">
            <Sparkles className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {isAdmin ? 'Official JAM Faculty & Admin Portal' : 'Official JAM Student Portal v2.5'}
            </span>
          </span>
          <span className="hidden sm:inline-block text-blue-200 opacity-75">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-blue-100 flex-shrink-0">
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                <Wifi className="w-3 h-3 text-emerald-400" /> Firebase Cloud Sync
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                <WifiOff className="w-3 h-3" /> Offline Mode
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                <span>Faculty Administrator</span>
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-blue-200/80 font-semibold hidden sm:inline-block">
              Student Portal Access
            </span>
          )}

          <button
            onClick={() => setActiveTab('android-export')}
            className="hidden md:flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium text-[11px]"
          >
            <Code className="w-3 h-3 flex-shrink-0" /> Kotlin Source
          </button>
        </div>
      </div>

      {/* Tablet Nav Quick Strip (768px to 1023px) */}
      <div className="hidden md:flex lg:hidden bg-[#0A3882] dark:bg-slate-950 px-4 py-2 border-t border-blue-800/40 items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {(isAdmin ? [
            { id: 'admin' as ActiveTab, label: 'Admin Suite' },
            { id: 'announcements' as ActiveTab, label: 'Advisories' },
            { id: 'settings' as ActiveTab, label: 'Settings' }
          ] : [
            { id: 'home' as ActiveTab, label: 'Home' },
            { id: 'grades' as ActiveTab, label: 'Grades' },
            { id: 'schedule' as ActiveTab, label: 'Schedule' },
            { id: 'subjects' as ActiveTab, label: 'Subjects' },
            { id: 'assignments' as ActiveTab, label: 'Assignments' },
            { id: 'announcements' as ActiveTab, label: 'Messages' },
            { id: 'settings' as ActiveTab, label: 'Settings' }
          ]).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === item.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg bg-blue-800 text-amber-300"
            title="Toggle Dark/Light"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <div 
            onClick={() => setActiveTab(isAdmin ? 'admin' : 'profile')}
            className="flex items-center gap-1.5 bg-blue-900/80 px-2 py-1 rounded-full cursor-pointer text-[11px] font-bold text-white border border-blue-400/30"
          >
            <User className="w-3 h-3 text-amber-300" />
            <span className="truncate max-w-[100px]">{student.fullName.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}>
          <CrestLogo size="md" textColor="text-white" />
          <span className="hidden sm:inline-block text-blue-300 opacity-50 font-light">|</span>
          <p className="hidden md:block text-xs text-blue-200 font-bold tracking-wide">
            {isAdmin ? 'Faculty & Administrative Portal' : 'Pre-School to Senior High School'}
          </p>
        </div>

        {/* Desktop Controls & Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Global Quick Search Button */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search subjects, grades, announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-blue-900/60 text-xs text-white placeholder-blue-300/70 rounded-full pl-8 pr-4 py-1.5 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-amber-400 w-52 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-blue-300 absolute left-2.5 top-2.5" />
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-xl bg-blue-800/70 hover:bg-blue-700 text-white transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Student Avatar & Pill */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 bg-blue-900/80 dark:bg-slate-800 hover:bg-blue-950 p-1.5 pr-3 rounded-full cursor-pointer transition-all border border-blue-400/30"
          >
            {student.photoUrl ? (
              <img 
                src={student.photoUrl} 
                alt={student.fullName}
                className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-800 dark:bg-slate-700 border-2 border-amber-400/80 flex items-center justify-center text-amber-300">
                <User className="w-4 h-4" />
              </div>
            )}
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-tight">{student.fullName}</p>
              <p className="text-[10px] text-amber-300 font-medium">{student.gradeLevel} • {student.section}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-900/50 hover:bg-rose-700 text-rose-200 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile controls toggle */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2.5 min-w-[40px] min-h-[40px] rounded-xl bg-blue-800 text-white flex items-center justify-center active:scale-95 cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2.5 min-w-[40px] min-h-[40px] rounded-xl bg-blue-800 text-amber-300 flex items-center justify-center active:scale-95 cursor-pointer"
            aria-label="Toggle Navigation Drawer"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="lg:hidden bg-[#0A3882] dark:bg-slate-900 border-t border-blue-800/60 p-4 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center gap-3 p-3 bg-blue-900/80 rounded-2xl border border-blue-700/50">
            {student.photoUrl ? (
              <img src={student.photoUrl} alt={student.fullName} className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-800 dark:bg-slate-700 border-2 border-amber-400/80 flex items-center justify-center text-amber-300 flex-shrink-0">
                <User className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className="font-bold text-white text-sm">{student.fullName}</p>
              <p className="text-xs text-amber-300">{student.studentId} | {student.gradeLevel} - {student.section}</p>
            </div>
          </div>

          {/* Quick Navigation grid in mobile drawer */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {(isAdmin ? [
              { id: 'admin' as ActiveTab, label: '⚡ Faculty Admin Suite' },
              { id: 'announcements' as ActiveTab, label: 'Post Advisories' },
              { id: 'settings' as ActiveTab, label: 'Admin Settings' },
              { id: 'android-export' as ActiveTab, label: 'Kotlin Source Code' }
            ] : [
              { id: 'home' as ActiveTab, label: 'Dashboard' },
              { id: 'grades' as ActiveTab, label: 'Grades & Report Card' },
              { id: 'schedule' as ActiveTab, label: 'Class Schedule' },
              { id: 'subjects' as ActiveTab, label: 'Enrolled Subjects' },
              { id: 'assignments' as ActiveTab, label: 'Assignments' },
              { id: 'announcements' as ActiveTab, label: 'Announcements' },
              { id: 'attendance' as ActiveTab, label: 'Attendance Record' },
              { id: 'calendar' as ActiveTab, label: 'School Calendar' },
              { id: 'settings' as ActiveTab, label: 'App Settings' },
              { id: 'android-export' as ActiveTab, label: 'Kotlin Source Code' }
            ]).map((nav) => (
              <button
                key={nav.id}
                onClick={() => { setActiveTab(nav.id); setShowMobileMenu(false); }}
                className={`p-2.5 rounded-xl font-bold text-left transition-all cursor-pointer ${
                  activeTab === nav.id
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            {!isAdmin && (
              <button
                onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
                className="flex-1 bg-blue-800 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-300" /> Student Profile
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex-1 bg-rose-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
