import React from 'react';
import { ActiveTab } from '../types';
import { Home, Award, Megaphone, User, Clock, ShieldCheck, UserPlus, Database, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unreadAnnouncementsCount?: number;
  isAdmin?: boolean;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  unreadAnnouncementsCount = 0,
  isAdmin = false
}) => {
  const studentNavItems: NavItem[] = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'grades' as ActiveTab, label: 'Grades', icon: Award },
    { id: 'schedule' as ActiveTab, label: 'Schedule', icon: Clock },
    { id: 'announcements' as ActiveTab, label: 'Messages', icon: Megaphone, badge: unreadAnnouncementsCount },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User }
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin' as ActiveTab, label: 'Admin Suite', icon: ShieldCheck },
    { id: 'announcements' as ActiveTab, label: 'Advisories', icon: Megaphone },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings }
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl px-2 sm:px-4 py-1.5 transition-colors duration-300 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="max-w-md md:max-w-2xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
                isActive 
                  ? 'text-[#0D47A1] dark:text-amber-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-blue-100 dark:bg-slate-800 shadow-sm' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] scale-105' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-semibold leading-none">{item.label}</span>
              
              {isActive && (
                <div className="w-1.5 h-1.5 bg-[#0D47A1] dark:bg-amber-400 rounded-full mt-0.5 animate-pulse" />
              )}

              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute top-0.5 right-2 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-sm animate-bounce">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
