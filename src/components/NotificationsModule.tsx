import React, { useState } from 'react';
import { NotificationItem, ActiveTab } from '../types';
import { 
  Bell, 
  CheckCheck, 
  Award, 
  FileText, 
  Megaphone, 
  Calendar, 
  AlertTriangle,
  Send,
  Sparkles
} from 'lucide-react';

interface NotificationsModuleProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  setActiveTab: (tab: ActiveTab) => void;
}

export const NotificationsModule: React.FC<NotificationsModuleProps> = ({
  notifications,
  setNotifications,
  setActiveTab
}) => {
  const [filterUnread, setFilterUnread] = useState(false);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSimulateFCMNotification = () => {
    const newFcm: NotificationItem = {
      id: `n_${Date.now()}`,
      title: '⚡ FCM Push: Emergency Advisory',
      message: 'Office of Student Affairs issued an update regarding online submission extensions for Foundation Week.',
      date: 'Just now',
      type: 'emergency',
      read: false,
      linkTab: 'announcements'
    };
    setNotifications(prev => [newFcm, ...prev]);
  };

  const filtered = notifications.filter(n => filterUnread ? !n.read : true);

  const getIcon = (type: string) => {
    switch (type) {
      case 'grade': return Award;
      case 'assignment': return FileText;
      case 'announcement': return Megaphone;
      case 'event': return Calendar;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
            <Bell className="w-4 h-4" /> Firebase Cloud Messaging (FCM) Push Feed
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Real-Time Notifications & Alerts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Instant advisories on grades, homework due dates, and school alerts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleSimulateFCMNotification}
            className="w-full sm:w-auto justify-center bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-extrabold px-3.5 py-3 sm:py-2 rounded-2xl text-xs flex items-center gap-1.5 border border-purple-200 dark:border-slate-700 cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Simulate FCM Push Alert</span>
          </button>

          <button
            onClick={handleMarkAllRead}
            className="w-full sm:w-auto justify-center bg-[#0D47A1] hover:bg-blue-900 text-white font-extrabold px-4 py-3 sm:py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
          >
            <CheckCheck className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
          <input 
            type="checkbox" 
            checked={filterUnread} 
            onChange={(e) => setFilterUnread(e.target.checked)} 
            className="rounded text-[#0D47A1]"
          />
          Show Unread Only ({notifications.filter(n => !n.read).length})
        </label>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => {
          const Icon = getIcon(n.type);
          return (
            <div 
              key={n.id}
              onClick={() => {
                setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                if (n.linkTab) setActiveTab(n.linkTab as ActiveTab);
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                !n.read 
                  ? 'bg-purple-50/60 dark:bg-slate-800/90 border-purple-300 dark:border-purple-600 shadow-md' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className={`p-3 rounded-2xl ${
                n.type === 'emergency' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-[#0D47A1] text-white'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    {n.title}
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    )}
                  </h4>
                  <span className="text-[10px] font-medium text-slate-400">{n.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
