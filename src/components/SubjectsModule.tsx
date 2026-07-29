import React, { useState } from 'react';
import { Subject } from '../types';
import { 
  BookOpen, 
  User, 
  MapPin, 
  Layers, 
  Mail, 
  Info, 
  Calendar,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';

interface SubjectsModuleProps {
  subjects: Subject[];
}

export const SubjectsModule: React.FC<SubjectsModuleProps> = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4" /> Curriculum & Coursework
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Enrolled Academic Subjects ({subjects.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Academic Load: 22 Units • K-12 Curriculum Compliant
          </p>
        </div>
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div 
            key={sub.subjectCode}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-800 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-amber-400 px-3 py-1 rounded-full border border-indigo-200 dark:border-slate-700">
                  {sub.subjectCode}
                </span>

                <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {sub.units}.0 Units
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                {sub.subjectName}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {sub.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" />
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate">{sub.teacher}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">{sub.room}</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[11px] font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> {sub.scheduleDays}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedSubject(sub)}
                  className="flex-1 bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-amber-300" /> Course Syllabus & Materials
                </button>

                <a
                  href={`mailto:${sub.teacherEmail}`}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl transition-all"
                  title="Contact Teacher via Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Syllabus Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-amber-400">
                  {selectedSubject.subjectCode} • {selectedSubject.units} Units
                </span>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  {selectedSubject.subjectName}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedSubject(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Course Description:</strong> {selectedSubject.description}</p>
              <p><strong>Instructor:</strong> {selectedSubject.teacher} ({selectedSubject.teacherEmail})</p>
              <p><strong>Classroom Venue:</strong> {selectedSubject.room}</p>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" /> Available Digital Learning Modules:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Module 1: Fundamental Concepts & Key Terminologies.pdf (3.2 MB)</li>
                  <li>Module 2: Analytical Practice Problems & Solution Keys.pdf (4.1 MB)</li>
                  <li>Module 3: Midterm Review Notes & Discussion Prompts.pdf (2.8 MB)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => alert("Downloading all Courseware PDF Zip...")}
                className="flex-1 bg-amber-400 text-slate-950 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download All Modules
              </button>
              <button
                onClick={() => setSelectedSubject(null)}
                className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold px-4 py-2.5 rounded-2xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
