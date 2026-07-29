import React, { useState } from 'react';
import { Student } from '../types';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Edit3, 
  Lock, 
  Camera, 
  CheckCircle2,
  Users
} from 'lucide-react';

interface StudentProfileProps {
  student: Student;
  onUpdateStudent: (updated: Student) => void;
  onChangePassword: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onUpdateStudent,
  onChangePassword
}) => {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [address, setAddress] = useState(student.address);
  const [contactNumber, setContactNumber] = useState(student.contactNumber);
  const [guardianContact, setGuardianContact] = useState(student.guardianContact);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudent({
      ...student,
      address,
      contactNumber,
      guardianContact
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setIsEditingContact(false);
      setSavedSuccess(false);
    }, 1200);
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
  ];

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-[#0D47A1] via-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          
          <div className="relative group">
            {student.photoUrl ? (
              <img 
                src={student.photoUrl} 
                alt={student.fullName} 
                className="w-28 h-28 rounded-3xl object-cover border-4 border-amber-400 shadow-xl" 
              />
            ) : (
              <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center text-amber-300">
                <User className="w-12 h-12" />
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 text-blue-200">No Photo</span>
              </div>
            )}
            <button
              onClick={() => {
                onUpdateStudent({ ...student, photoUrl: student.photoUrl ? '' : '' });
              }}
              className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 p-2 rounded-xl shadow-lg transition-transform cursor-pointer"
              title="Profile Blank"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1 flex-1">
            <span className="bg-amber-400/20 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
              Active Enrolled Student
            </span>
            <h2 className="text-2xl font-black text-white">{student.fullName}</h2>
            <p className="text-xs text-blue-200">
              ID: <strong className="text-white">{student.studentId}</strong> • {student.gradeLevel} ({student.section})
            </p>
            <p className="text-xs text-amber-300 font-medium">Adviser: {student.adviser}</p>
          </div>

          <button
            onClick={onChangePassword}
            className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-4 py-3 sm:py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Info Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" /> Personal Details
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Full Name</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.fullName}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Student Number</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.studentId}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Birthdate</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.birthdate}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Gender</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.gender}</span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-400 font-medium">School Email</span>
              <span className="font-bold text-[#0D47A1] dark:text-amber-400">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Contact & Guardian Info Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Address & Guardian Details
            </h3>

            <button
              onClick={() => setIsEditingContact(!isEditingContact)}
              className="text-xs font-bold text-[#0D47A1] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> {isEditingContact ? 'Cancel' : 'Edit Contact'}
            </button>
          </div>

          {isEditingContact ? (
            <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Residential Address:</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Student Contact Mobile:</label>
                <input 
                  type="text" 
                  value={contactNumber} 
                  onChange={(e) => setContactNumber(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Guardian Emergency Contact:</label>
                <input 
                  type="text" 
                  value={guardianContact} 
                  onChange={(e) => setGuardianContact(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0D47A1] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                {savedSuccess ? 'Changes Saved!' : 'Save Updated Details'}
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="py-1.5 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 font-medium block">Parent / Legal Guardian</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{student.guardian}</span>
              </div>

              <div className="py-1.5 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 font-medium block">Guardian Contact Number</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{student.guardianContact}</span>
              </div>

              <div className="py-1.5 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 font-medium block">Student Mobile</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{student.contactNumber}</span>
              </div>

              <div className="py-1.5">
                <span className="text-slate-400 font-medium block">Residential Address</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{student.address}</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
