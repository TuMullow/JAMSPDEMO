import React, { useState } from 'react';
import { 
  Settings, 
  Lock, 
  Bell, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Info, 
  LogOut, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Database
} from 'lucide-react';

interface SettingsModuleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isDeviceFrame?: boolean;
  setIsDeviceFrame?: (val: boolean) => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  darkMode,
  setDarkMode,
  isDeviceFrame = false,
  setIsDeviceFrame,
  onChangePassword,
  onLogout
}) => {
  const [notifyGrades, setNotifyGrades] = useState(true);
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(true);
  const [offlineCaching, setOfflineCaching] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4" /> Preferences & System Config
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Portal Application Settings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize notifications, theme, security, and offline data caching
          </p>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Security & Password */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" /> Account Security
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div>
              <p className="font-bold text-xs text-slate-900 dark:text-white">Account Password</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Update your Firebase authentication credentials</p>
            </div>
            <button
              onClick={onChangePassword}
              className="bg-[#0D47A1] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Change Password
            </button>
          </div>
        </div>

        {/* Notifications Config */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" /> FCM Push Notification Preferences
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Grade Posting Alerts</p>
                <p className="text-[11px] text-slate-400">Receive instant push notifications when teachers publish Q1-Q4 marks</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyGrades} 
                onChange={(e) => setNotifyGrades(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D47A1]"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Assignment Due Reminders</p>
                <p className="text-[11px] text-slate-400">Get notified 24 hours before homework submission deadlines</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyAssignments} 
                onChange={(e) => setNotifyAssignments(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D47A1]"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">School Advisories & Bulletins</p>
                <p className="text-[11px] text-slate-400">Principal announcements and holiday suspensions</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyAnnouncements} 
                onChange={(e) => setNotifyAnnouncements(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D47A1]"
              />
            </div>
          </div>
        </div>

        {/* Display & Offline Storage */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-500" /> Display & Storage
          </h3>

          <div className="space-y-2 text-xs">
            {setIsDeviceFrame && (
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Simulate Android Phone Frame</p>
                    <p className="text-[11px] text-slate-400">Renders portal inside a mobile device mockup (for testing)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDeviceFrame(!isDeviceFrame)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isDeviceFrame ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {isDeviceFrame ? 'Frame Active' : 'Responsive Full'}
                </button>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Offline Room / Local Caching</p>
                  <p className="text-[11px] text-slate-400">Save previously viewed grades & schedule for offline viewing</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={offlineCaching} 
                onChange={(e) => setOfflineCaching(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D47A1]"
              />
            </div>
          </div>
        </div>

        {/* About & Logout Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setShowAboutModal(true)}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" /> About JEHOSHUA ACADEMY
          </button>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" /> Sign Out of Student Account
          </button>
        </div>

      </div>

      {/* About App Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base text-[#0D47A1] dark:text-amber-400">
                JEHOSHUA ACADEMY OF MARIKINA
              </h3>
              <button 
                onClick={() => setShowAboutModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>
                <strong>Core Philosophy:</strong> <em className="not-italic font-bold text-[#0D47A1] dark:text-amber-400">INTEGRATED | RESPONSIVE | SUSTAINABLE</em>
              </p>
              <p>
                <strong>Academic Scope:</strong> Local private educational institution offering programs from <strong>Pre-School to Senior High School</strong>.
              </p>
              <p>
                <strong>Location:</strong> Concepcion Uno, Marikina City, Metro Manila, Philippines.
              </p>
              <p>
                <strong>Application Version:</strong> v2.5.0 (Material Design 3 & Android Jetpack Compose Architecture Ready)
              </p>
              <p>
                <strong>Backend Engine:</strong> Powered by Firebase Authentication, Cloud Firestore, Firebase Storage, and FCM.
              </p>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full bg-[#0D47A1] text-white font-bold py-2.5 rounded-2xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
