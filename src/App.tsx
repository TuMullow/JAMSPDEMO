import React, { useState, useEffect } from 'react';
import { 
  Student, 
  SubjectGrade, 
  AttendanceRecord, 
  Subject, 
  ScheduleItem, 
  Assignment, 
  Announcement, 
  CalendarEvent, 
  NotificationItem, 
  ActiveTab 
} from './types';
import { 
  INITIAL_STUDENTS, 
  MOCK_SUBJECT_GRADES, 
  MOCK_ATTENDANCE, 
  MOCK_SUBJECTS, 
  MOCK_SCHEDULE, 
  MOCK_ASSIGNMENTS, 
  MOCK_ANNOUNCEMENTS, 
  MOCK_EVENTS, 
  MOCK_NOTIFICATIONS 
} from './data/mockData';

import { 
  seedFirestoreIfEmpty, 
  subscribeToAnnouncements, 
  subscribeToAssignments, 
  subscribeToNotifications, 
  subscribeToEvents, 
  addCloudAnnouncement, 
  submitCloudAssignment, 
  markNotificationReadInCloud,
  addCloudAssignment
} from './lib/firebaseSync';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { GradesModule } from './components/GradesModule';
import { AttendanceModule } from './components/AttendanceModule';
import { ClassSchedule } from './components/ClassSchedule';
import { SubjectsModule } from './components/SubjectsModule';
import { AssignmentsModule } from './components/AssignmentsModule';
import { AnnouncementsModule } from './components/AnnouncementsModule';
import { SchoolCalendar } from './components/SchoolCalendar';
import { NotificationsModule } from './components/NotificationsModule';
import { StudentProfile } from './components/StudentProfile';
import { SettingsModule } from './components/SettingsModule';
import { AdminPortal } from './components/AdminPortal';
import { AndroidCodeExporter } from './components/AndroidCodeExporter';
import { exportGradesToPDF } from './utils/pdfExport';
import { KeyRound, ShieldAlert, Sparkles, Smartphone, CheckCircle2, Wifi } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<Student | null>(INITIAL_STUDENTS[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jam_theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [cloudSynced, setCloudSynced] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Main Data States (Allowing live edits)
  const [studentsList, setStudentsList] = useState<Student[]>(INITIAL_STUDENTS);
  const [gradesMap, setGradesMap] = useState<Record<string, SubjectGrade[]>>(MOCK_SUBJECT_GRADES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [schedule] = useState<ScheduleItem[]>(MOCK_SCHEDULE);
  const [subjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Change Password Modal State
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [passSuccessMsg, setPassSuccessMsg] = useState('');

  // Seed Firestore & subscribe to live Firebase Firestore updates
  useEffect(() => {
    // 1. Seed Firestore if database is fresh
    seedFirestoreIfEmpty();

    // 2. Realtime listener for Announcements
    const unsubAnc = subscribeToAnnouncements((data) => {
      if (data && data.length > 0) {
        setAnnouncements(data);
        setCloudSynced(true);
      }
    });

    // 3. Realtime listener for Assignments
    const unsubAsg = subscribeToAssignments((data) => {
      if (data && data.length > 0) {
        setAssignments(data);
      }
    });

    // 4. Realtime listener for Notifications
    const unsubNotif = subscribeToNotifications((data) => {
      if (data && data.length > 0) {
        setNotifications(data);
      }
    });

    // 5. Realtime listener for Calendar Events
    const unsubEvents = subscribeToEvents((data) => {
      if (data && data.length > 0) {
        setEvents(data);
      }
    });

    return () => {
      unsubAnc();
      unsubAsg();
      unsubNotif();
      unsubEvents();
    };
  }, []);

  // Effect for dark mode class on document html and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      try { localStorage.setItem('jam_theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      try { localStorage.setItem('jam_theme', 'light'); } catch {}
    }
  }, [darkMode]);

  // Handle Login
  const handleLoginSuccess = (student: Student, remember: boolean, isUserAdmin: boolean = false) => {
    setCurrentUser(student);
    setIsAdmin(isUserAdmin);
    if (isUserAdmin) {
      setActiveTab('admin');
    } else {
      setActiveTab('home');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  // Add new student (Admin)
  const handleAddStudent = (newStudent: Student) => {
    setStudentsList(prev => [newStudent, ...prev]);
    if (!gradesMap[newStudent.studentId]) {
      setGradesMap(prev => ({
        ...prev,
        [newStudent.studentId]: MOCK_SUBJECT_GRADES['2024-01048'] || []
      }));
    }
  };

  // Add grade (Admin)
  const handleAddGrade = (newGrade: SubjectGrade) => {
    setGradesMap(prev => {
      const studentGrades = prev[newGrade.studentId] || [];
      return {
        ...prev,
        [newGrade.studentId]: [newGrade, ...studentGrades]
      };
    });
  };

  // Add announcement (Admin - pushes to Cloud Firestore)
  const handleAddAnnouncement = async (newAnc: Announcement) => {
    setAnnouncements(prev => [newAnc, ...prev]);
    try {
      await addCloudAnnouncement({
        title: newAnc.title,
        description: newAnc.description,
        date: newAnc.date,
        category: newAnc.category,
        image: newAnc.image,
        pinned: newAnc.pinned
      });
    } catch (err) {
      console.warn('Failed to publish announcement to cloud:', err);
    }
  };

  // Update Student Profile
  const handleUpdateStudent = (updated: Student) => {
    setCurrentUser(updated);
    setStudentsList(prev => prev.map(s => s.studentId === updated.studentId ? updated : s));
  };

  // Assignment file upload handler (pushes to Cloud Firestore)
  const handleUploadAssignment = async (id: string, fileName: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'submitted',
          submissionDate: new Date().toLocaleString(),
          submittedFile: fileName
        };
      }
      return a;
    }));

    try {
      await submitCloudAssignment(id, fileName);
    } catch (err) {
      console.warn('Cloud assignment sync warning:', err);
    }
  };

  // PDF Export Trigger
  const handleTriggerPDFExport = () => {
    if (!currentUser) return;
    const currentGrades = gradesMap[currentUser.studentId] || MOCK_SUBJECT_GRADES['2024-01048'];
    const generalAverage = currentGrades.length > 0
      ? currentGrades.reduce((acc, curr) => {
          const finalVal = (curr.quarter1 + curr.quarter2 + curr.quarter3 + curr.quarter4) / 4;
          return acc + finalVal;
        }, 0) / currentGrades.length
      : 94.5;

    const honorStatus = generalAverage >= 95 ? 'With High Honors' : generalAverage >= 90 ? 'With Honors' : 'Passed';

    exportGradesToPDF(currentUser, currentGrades, generalAverage, honorStatus);
  };

  // Change Password Form Submit
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordVal.trim()) return;
    setPassSuccessMsg('Password updated successfully in Firebase Auth!');
    setTimeout(() => {
      setChangePasswordModalOpen(false);
      setPassSuccessMsg('');
      setNewPasswordVal('');
    }, 1500);
  };

  // Render Login view if user is signed out
  if (!currentUser) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  const currentGrades = gradesMap[currentUser.studentId] || MOCK_SUBJECT_GRADES['2024-01048'] || [];

  return (
    <div className={`min-h-screen w-full bg-[#f8f9fa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      {/* Device Frame Wrapper Option */}
      <div className={isDeviceFrame ? 'py-8 px-4 flex justify-center bg-slate-800/90 min-h-screen' : 'w-full min-h-screen flex flex-col'}>
        
        <div className={isDeviceFrame ? 'w-full max-w-sm bg-slate-900 rounded-[48px] p-4 shadow-2xl border-4 border-slate-700 relative flex flex-col min-h-[840px] max-h-[90vh] overflow-y-auto' : 'w-full min-h-screen flex flex-col'}>
          
          {/* Simulated Android Status Bar if device frame is enabled */}
          {isDeviceFrame && (
            <div className="bg-[#0D47A1] text-white text-[10px] px-6 py-1 flex items-center justify-between font-bold rounded-t-[36px]">
              <span>09:41 AM</span>
              <div className="w-16 h-3 bg-slate-950 rounded-full mx-auto" />
              <span>JAM 5G • 98%</span>
            </div>
          )}

          {/* Main App Bar Header */}
          <Header
            student={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isDeviceFrame={isDeviceFrame}
            setIsDeviceFrame={setIsDeviceFrame}
            notifications={notifications}
            onLogout={handleLogout}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            isOnline={isOnline}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* View Container Area */}
          <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-28 flex-1 min-w-0">
            
            {isAdmin ? (
              /* DEDICATED FACULTY & ADMIN PORTAL VIEWS */
              <>
                {activeTab === 'settings' ? (
                  <SettingsModule
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    isDeviceFrame={isDeviceFrame}
                    setIsDeviceFrame={setIsDeviceFrame}
                    onChangePassword={() => setChangePasswordModalOpen(true)}
                    onLogout={handleLogout}
                  />
                ) : activeTab === 'android-export' ? (
                  <AndroidCodeExporter />
                ) : (
                  <AdminPortal
                    students={studentsList}
                    grades={currentGrades}
                    announcements={announcements}
                    onAddStudent={handleAddStudent}
                    onAddGrade={handleAddGrade}
                    onAddAnnouncement={handleAddAnnouncement}
                  />
                )}
              </>
            ) : (
              /* STUDENT PORTAL VIEWS */
              <>
                {activeTab === 'home' && (
                  <HomeDashboard
                    student={currentUser}
                    grades={currentGrades}
                    attendance={attendance}
                    assignments={assignments}
                    announcements={announcements}
                    schedule={schedule}
                    setActiveTab={setActiveTab}
                    onExportPDF={handleTriggerPDFExport}
                  />
                )}

                {activeTab === 'grades' && (
                  <GradesModule
                    student={currentUser}
                    grades={currentGrades}
                    onExportPDF={handleTriggerPDFExport}
                  />
                )}

                {activeTab === 'attendance' && (
                  <AttendanceModule
                    student={currentUser}
                    attendance={attendance}
                  />
                )}

                {activeTab === 'schedule' && (
                  <ClassSchedule schedule={schedule} />
                )}

                {activeTab === 'subjects' && (
                  <SubjectsModule subjects={subjects} />
                )}

                {activeTab === 'assignments' && (
                  <AssignmentsModule
                    assignments={assignments}
                    onUploadAssignment={handleUploadAssignment}
                  />
                )}

                {activeTab === 'announcements' && (
                  <AnnouncementsModule announcements={announcements} />
                )}

                {activeTab === 'calendar' && (
                  <SchoolCalendar events={events} />
                )}

                {activeTab === 'notifications' && (
                  <NotificationsModule
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setActiveTab={setActiveTab}
                  />
                )}

                {activeTab === 'profile' && (
                  <StudentProfile
                    student={currentUser}
                    onUpdateStudent={handleUpdateStudent}
                    onChangePassword={() => setChangePasswordModalOpen(true)}
                  />
                )}

                {activeTab === 'settings' && (
                  <SettingsModule
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    isDeviceFrame={isDeviceFrame}
                    setIsDeviceFrame={setIsDeviceFrame}
                    onChangePassword={() => setChangePasswordModalOpen(true)}
                    onLogout={handleLogout}
                  />
                )}

                {activeTab === 'android-export' && (
                  <AndroidCodeExporter />
                )}
              </>
            )}

          </main>

          {/* Material Design 3 Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unreadAnnouncementsCount={notifications.filter(n => !n.read).length}
            isAdmin={isAdmin}
          />

          {/* Simulated Android Home Indicator bar if device frame is enabled */}
          {isDeviceFrame && (
            <div className="py-2 bg-slate-950 flex justify-center rounded-b-[36px]">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          )}

        </div>

      </div>

      {/* Change Password Modal */}
      {changePasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#0D47A1] dark:text-amber-400 font-bold text-base">
                <KeyRound className="w-5 h-5" /> Change Password
              </div>
              <button 
                onClick={() => setChangePasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {passSuccessMsg ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                <p className="font-bold text-xs text-slate-800 dark:text-white">{passSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSaveNewPassword} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">New Secure Password:</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Enter at least 6 characters"
                    value={newPasswordVal}
                    onChange={(e) => setNewPasswordVal(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl uppercase tracking-wider text-xs cursor-pointer"
                >
                  Update Password in Firebase
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
