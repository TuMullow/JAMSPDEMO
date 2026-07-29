import React, { useState } from 'react';
import { CrestLogo } from './CrestLogo';
import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/mockData';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  KeyRound,
  GraduationCap
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (student: Student, remember: boolean, isAdmin?: boolean) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Student Form State
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  
  // Admin Form State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!studentId.trim() || !password.trim()) {
      setErrorMessage('Please enter both your Student ID and Password.');
      return;
    }

    setIsLoading(true);

    // Simulate Firebase Authentication & Firestore Student Lookup
    setTimeout(() => {
      const foundStudent = INITIAL_STUDENTS.find(
        s => s.studentId.toLowerCase() === studentId.trim().toLowerCase()
      );

      if (foundStudent || password === 'password123') {
        const studentToLogin = foundStudent || {
          ...INITIAL_STUDENTS[0],
          studentId: studentId.trim()
        };
        setIsLoading(false);
        onLoginSuccess(studentToLogin, rememberMe, false);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid Student ID or Password. Please try again or use Demo Credentials.');
      }
    }, 900);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!adminUsername.trim() || !adminPassword.trim()) {
      setErrorMessage('Please enter your Faculty ID/Email and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const adminUser: Student = {
        studentId: 'ADMIN-2024-001',
        fullName: 'Dr. Maria Santos',
        email: adminUsername.trim(),
        gradeLevel: 'Faculty Lead',
        section: 'Administration',
        adviser: 'School Principal',
        schoolYear: '2025-2026',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        address: 'Marikina City',
        contactNumber: '+63 917 888 9999',
        guardian: 'N/A',
        guardianContact: 'N/A',
        birthdate: '1980-05-15',
        gender: 'Female'
      };
      onLoginSuccess(adminUser, rememberMe, true);
    }, 900);
  };

  const handleQuickDemoSelect = (demoStudent: Student) => {
    setStudentId(demoStudent.studentId);
    setPassword('password123');
    setErrorMessage('');
  };

  const handleQuickAdminDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const adminUser: Student = {
        studentId: 'ADMIN-2024-001',
        fullName: 'Dr. Maria Santos',
        email: 'm.santos.principal@jehoshua.edu.ph',
        gradeLevel: 'Faculty Lead',
        section: 'Administration',
        adviser: 'School Principal',
        schoolYear: '2025-2026',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        address: 'Marikina City',
        contactNumber: '+63 917 888 9999',
        guardian: 'N/A',
        guardianContact: 'N/A',
        birthdate: '1980-05-15',
        gender: 'Female'
      };
      onLoginSuccess(adminUser, true, true);
    }, 700);
  };

  const handleSendResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetEmailSent(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setResetEmailSent(false);
      setResetEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Decorative Gradient Spheres */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 z-10">
        
        {/* Header Branding Panel */}
        <div className={`text-white p-8 text-center relative overflow-hidden transition-colors duration-300 ${
          isAdminMode ? 'bg-slate-900 dark:bg-slate-950 border-b border-amber-500/30' : 'bg-[#0D47A1] dark:bg-slate-950'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -mr-10 -mt-10 blur-xl" />
          
          <h2 className="font-black text-xl tracking-tight uppercase leading-tight text-white mt-1">
            JEHOSHUA ACADEMY OF MARIKINA
          </h2>
          <p className="text-amber-400 font-extrabold text-[11px] tracking-widest uppercase mt-1">
            {isAdminMode ? 'FACULTY & ADMINISTRATIVE PORTAL' : 'PRE-SCHOOL TO SENIOR HIGH SCHOOL'}
          </p>
          <div className="mt-3 inline-block bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-blue-100 border border-white/20 uppercase">
            {isAdminMode ? 'RESTRICTED PERSONNEL ACCESS' : 'INTEGRATED | RESPONSIVE | SUSTAINABLE'}
          </div>
        </div>

        {/* Login Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {errorMessage && (
            <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 p-3 rounded-2xl text-xs flex items-center gap-2.5 animate-shake">
              <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isAdminMode ? (
            /* ADMIN LOGIN FORM */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 p-3 rounded-2xl text-[11px] font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Authorized Faculty & Administrator Authentication</span>
              </div>

              {/* Admin Username/Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Faculty Email / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. admin@jehoshua.edu.ph"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 pl-11 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] dark:focus:ring-amber-400 transition-all"
                  />
                  <UserCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Admin Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Admin Security Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter security key"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 pl-11 pr-11 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] dark:focus:ring-amber-400 transition-all"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Admin Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm uppercase tracking-wider group disabled:opacity-75 cursor-pointer mt-2 border border-slate-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating Admin...</span>
                  </div>
                ) : (
                  <>
                    <span>Authenticate Faculty Access</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Quick Demo Admin Sign In */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickAdminDemo}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Demo Sign In as Principal (Dr. Maria Santos)</span>
                </button>
              </div>

              {/* Discrete Return to Student Login Link */}
              <div className="pt-3 text-center border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminMode(false);
                    setErrorMessage('');
                  }}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  ← Return to Student Portal Login
                </button>
              </div>
            </form>
          ) : (
            /* STUDENT LOGIN FORM */
            <form onSubmit={handleStudentLogin} className="space-y-4">
              {/* Student ID Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Student ID Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024-01048"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 pl-11 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] dark:focus:ring-amber-400 transition-all"
                  />
                  <UserCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 pl-11 pr-11 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] dark:focus:ring-amber-400 transition-all"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0D47A1] focus:ring-[#0D47A1] border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Remember my login on this device
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0D47A1] hover:bg-[#093375] text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm uppercase tracking-wider group disabled:opacity-75 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating with Firebase...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Demo Login Quick Selector (Student) */}
          {!isAdminMode && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Demo Student Accounts (One-Click Test Login):
              </p>

              <div className="grid grid-cols-1 gap-2">
                {INITIAL_STUDENTS.map((s) => (
                  <button
                    key={s.studentId}
                    type="button"
                    onClick={() => handleQuickDemoSelect(s)}
                    className={`text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      studentId === s.studentId 
                        ? 'bg-blue-50 dark:bg-slate-800 border-[#0D47A1] dark:border-amber-400' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {s.photoUrl ? (
                        <img src={s.photoUrl} alt={s.fullName} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <UserCheck className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{s.fullName}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{s.studentId} • {s.gradeLevel} ({s.section})</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#0D47A1] dark:text-amber-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg shadow-xs">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Discrete Footer info with Faculty Access link */}
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Firebase Auth & Firestore</span>
          {!isAdminMode && (
            <button
              type="button"
              onClick={() => {
                setIsAdminMode(true);
                setErrorMessage('');
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              title="Discrete Administrative Portal Access"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Faculty Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#0D47A1] dark:text-amber-400 font-bold text-base">
                <KeyRound className="w-5 h-5" />
                Reset Password
              </div>
              <button 
                onClick={() => setForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {resetEmailSent ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Password Reset Email Sent!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instructions have been dispatched to your school email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendResetPassword} className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Enter your official school email or Student ID to receive password reset verification:
                </p>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@jehoshua.edu.ph"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0D47A1] hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
