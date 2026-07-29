import React, { useState } from 'react';
import { Student, SubjectGrade, Announcement } from '../types';
import { 
  ShieldCheck, 
  UserPlus, 
  FileEdit, 
  Megaphone, 
  Calendar, 
  Database, 
  Plus, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminPortalProps {
  students: Student[];
  grades: SubjectGrade[];
  announcements: Announcement[];
  onAddStudent: (newStudent: Student) => void;
  onAddGrade: (newGrade: SubjectGrade) => void;
  onAddAnnouncement: (newAnc: Announcement) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  students,
  grades,
  announcements,
  onAddStudent,
  onAddGrade,
  onAddAnnouncement
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'students' | 'grades' | 'announcements' | 'firestore'>('students');

  // New Student Form
  const [newId, setNewId] = useState('2024-01050');
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('Grade 10');
  const [newSection, setNewSection] = useState('St. Thomas');

  // New Grade Form
  const [gradeStudentId, setGradeStudentId] = useState(students[0]?.studentId || '');
  const [subjectName, setSubjectName] = useState('Advanced Robotics');
  const [q1, setQ1] = useState(95);
  const [q2, setQ2] = useState(96);
  const [q3, setQ3] = useState(94);
  const [q4, setQ4] = useState(95);

  // New Announcement Form
  const [ancTitle, setAncTitle] = useState('');
  const [ancDesc, setAncDesc] = useState('');
  const [ancCategory, setAncCategory] = useState<'Academic' | 'Events' | 'Administrative' | 'Emergency'>('Academic');

  const [formSuccess, setFormSuccess] = useState('');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: Student = {
      studentId: newId,
      fullName: newName,
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@jehoshua.edu.ph`,
      gradeLevel: newGrade,
      section: newSection,
      adviser: 'Mrs. Maria Santos',
      schoolYear: '2025-2026',
      photoUrl: '',
      address: 'Marikina City',
      contactNumber: '+63 917 000 0000',
      guardian: 'Parent Guardian',
      guardianContact: '+63 918 000 0000',
      birthdate: '2010-01-01',
      gender: 'Male'
    };

    onAddStudent(created);
    setFormSuccess(`Student ${newName} added to Cloud Firestore!`);
    setNewName('');
    setTimeout(() => setFormSuccess(''), 2500);
  };

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SubjectGrade = {
      id: `g_${Date.now()}`,
      studentId: gradeStudentId,
      subjectCode: subjectName.substring(0, 4).toUpperCase() + '10',
      subjectName,
      quarter1: q1,
      quarter2: q2,
      quarter3: q3,
      quarter4: q4,
      units: 3,
      teacher: 'Admin Faculty'
    };

    onAddGrade(created);
    setFormSuccess(`Grade record for ${subjectName} posted!`);
    setTimeout(() => setFormSuccess(''), 2500);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancTitle.trim()) return;

    const created: Announcement = {
      id: `anc_${Date.now()}`,
      title: ancTitle,
      description: ancDesc,
      date: new Date().toISOString().split('T')[0],
      category: ancCategory,
      pinned: true
    };

    onAddAnnouncement(created);
    setFormSuccess(`Announcement "${ancTitle}" published to all students!`);
    setAncTitle('');
    setAncDesc('');
    setTimeout(() => setFormSuccess(''), 2500);
  };

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-3xl p-6 shadow-md flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-1">
            <ShieldCheck className="w-4 h-4" /> Admin & Faculty Management Suite
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            JEHOSHUA ACADEMY School Administration
          </h2>
          <p className="text-xs font-semibold text-slate-900/80">
            Manage student rosters, grades, advisories, and Firestore backend rules
          </p>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-start gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveAdminTab('students')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'students' ? 'bg-[#0D47A1] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <UserPlus className="w-4 h-4" /> Students Roster
        </button>

        <button
          onClick={() => setActiveAdminTab('grades')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'grades' ? 'bg-[#0D47A1] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <FileEdit className="w-4 h-4" /> Input Grades
        </button>

        <button
          onClick={() => setActiveAdminTab('announcements')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'announcements' ? 'bg-[#0D47A1] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Megaphone className="w-4 h-4" /> Post Advisory
        </button>

        <button
          onClick={() => setActiveAdminTab('firestore')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'firestore' ? 'bg-[#0D47A1] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Database className="w-4 h-4" /> Firestore Schema
        </button>
      </div>

      {formSuccess && (
        <div className="bg-emerald-100 text-emerald-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{formSuccess}</span>
        </div>
      )}

      {/* Tab 1: Students */}
      {activeAdminTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#0D47A1] dark:text-amber-400" /> Enroll New Student Record
            </h3>

            <form onSubmit={handleCreateStudent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Student ID:</label>
                <input 
                  type="text" 
                  value={newId} 
                  onChange={(e) => setNewId(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Full Name:</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Maria Teresa Santos"
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Grade Level:</label>
                <select 
                  value={newGrade} 
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
                >
                  <option>Grade 10</option>
                  <option>Grade 11 STEM</option>
                  <option>Grade 12 STEM</option>
                  <option>Grade 12 ABM</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" /> Save Student
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Enrolled Students Collection ({students.length})</h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {students.map((s) => (
                <div key={s.studentId} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{s.fullName}</span>
                    <span className="text-slate-400 ml-2">({s.studentId})</span>
                  </div>
                  <span className="text-slate-500 font-semibold">{s.gradeLevel} - {s.section}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Grades */}
      {activeAdminTab === 'grades' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#0D47A1] dark:text-amber-400" /> Faculty Quarter Marks Encoder
          </h3>

          <form onSubmit={handleCreateGrade} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Target Student ID:</label>
                <select 
                  value={gradeStudentId} 
                  onChange={(e) => setGradeStudentId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
                >
                  {students.map(s => (
                    <option key={s.studentId} value={s.studentId}>
                      {s.fullName} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Subject Name:</label>
                <input 
                  type="text" 
                  required
                  value={subjectName} 
                  onChange={(e) => setSubjectName(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Q1 Mark:</label>
                <input type="number" value={q1} onChange={(e) => setQ1(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-center font-bold" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Q2 Mark:</label>
                <input type="number" value={q2} onChange={(e) => setQ2(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-center font-bold" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Q3 Mark:</label>
                <input type="number" value={q3} onChange={(e) => setQ3(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-center font-bold" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Q4 Mark:</label>
                <input type="number" value={q4} onChange={(e) => setQ4(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-center font-bold" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Commit Subject Grade to Firestore
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Post Advisory */}
      {activeAdminTab === 'announcements' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-rose-500" /> Broadcast School Advisory
          </h3>

          <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Advisory Title:</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Schedule for Intramurals Opening Ceremony"
                value={ancTitle} 
                onChange={(e) => setAncTitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Category:</label>
              <select 
                value={ancCategory}
                onChange={(e) => setAncCategory(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-bold"
              >
                <option value="Academic">Academic</option>
                <option value="Events">Events</option>
                <option value="Administrative">Administrative</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Detailed Message Body:</label>
              <textarea 
                rows={3}
                value={ancDesc} 
                onChange={(e) => setAncDesc(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Publish Broadcast Advisory
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Firestore Security Schema */}
      {activeAdminTab === 'firestore' && (
        <div className="bg-slate-950 text-slate-200 p-4 sm:p-6 rounded-3xl shadow-md border border-slate-800 font-mono text-xs space-y-4 max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-3">
            <span>firestore.rules (Security Architecture)</span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">Role-Based Access Control</span>
          </div>

          <pre className="overflow-x-auto text-[11px] leading-relaxed text-blue-300 whitespace-pre-wrap break-words max-w-full">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper check
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(studentId) {
      return isAuthenticated() && request.auth.uid == studentId;
    }

    match /Students/{studentId} {
      allow read: if isAuthenticated();
      allow write: if request.auth.token.admin == true;
    }

    match /Grades/{gradeId} {
      allow read: if isAuthenticated() && resource.data.studentId == request.auth.uid;
      allow write: if request.auth.token.role == 'Faculty';
    }

    match /Attendance/{attendanceId} {
      allow read: if isAuthenticated() && resource.data.studentId == request.auth.uid;
    }
  }
}`}
          </pre>
        </div>
      )}

    </div>
  );
};
