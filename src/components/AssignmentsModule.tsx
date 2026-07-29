import React, { useState } from 'react';
import { Assignment } from '../types';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Paperclip, 
  Send, 
  Sparkles,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface AssignmentsModuleProps {
  assignments: Assignment[];
  onUploadAssignment: (id: string, fileName: string) => void;
}

export const AssignmentsModule: React.FC<AssignmentsModuleProps> = ({
  assignments,
  onUploadAssignment
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted' | 'late'>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filtered = assignments.filter(a => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setIsUploading(true);
    setTimeout(() => {
      const fileName = uploadFile ? uploadFile.name : `Assignment_${selectedAssignment.id}_Submission.pdf`;
      onUploadAssignment(selectedAssignment.id, fileName);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setSelectedAssignment(null);
        setUploadSuccess(false);
        setUploadFile(null);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
            <FileText className="w-4 h-4" /> Homework & Project Submissions
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Academic Assignments Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit lab reports, essays, and worksheets securely to subject teachers
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-start gap-2 overflow-x-auto scrollbar-none">
        {(['all', 'pending', 'submitted', 'late'] as const).map((st) => {
          const count = assignments.filter(a => st === 'all' || a.status === st).length;
          const statusLabels = {
            all: 'All Tasks',
            pending: 'Pending (Orange)',
            submitted: 'Submitted (Green)',
            late: 'Overdue / Late (Red)'
          };

          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                filterStatus === st
                  ? 'bg-[#0D47A1] text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              <span className="capitalize">{statusLabels[st]}</span>
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px]">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filtered.map((asg) => {
          const statusStyles = {
            submitted: {
              badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
              label: 'Submitted (Green)',
              icon: CheckCircle
            },
            pending: {
              badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
              label: 'Pending (Orange)',
              icon: Clock
            },
            late: {
              badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
              label: 'Late Submission (Red)',
              icon: AlertTriangle
            }
          };

          const currentStyle = statusStyles[asg.status];
          const StatusIcon = currentStyle.icon;

          return (
            <div 
              key={asg.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-800 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 px-3 py-1 rounded-full">
                    {asg.subject}
                  </span>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border flex items-center gap-1 ${currentStyle.badge}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {currentStyle.label}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    Due: <strong className="text-slate-800 dark:text-slate-200">{asg.dueDate}</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              {/* Feedback or submitted info */}
              {asg.submittedFile && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Paperclip className="w-4 h-4" /> Attached File: {asg.submittedFile}
                    </span>
                    <span className="text-[10px] text-slate-400">Score: {asg.points} / {asg.maxPoints} pts</span>
                  </div>
                  {asg.feedback && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Teacher Comment: "{asg.feedback}"
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-extrabold text-[#0D47A1] dark:text-amber-400">
                  Maximum Points: {asg.maxPoints} pts
                </span>

                <button
                  onClick={() => setSelectedAssignment(asg)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all ${
                    asg.status === 'submitted'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      : 'bg-[#0D47A1] hover:bg-blue-900 text-white'
                  }`}
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  {asg.status === 'submitted' ? 'Re-upload / Update File' : 'Submit Assignment'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500">{selectedAssignment.subject}</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedAssignment.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedAssignment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {uploadSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Assignment Submitted Successfully!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your work has been timestamped and encrypted in Firebase Storage.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulatedSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Upload your completed work file (.PDF, .DOCX, .ZIP, or .PY up to 25MB):
                </p>

                {/* Dropzone */}
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#0D47A1] rounded-2xl p-6 text-center space-y-2 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                  <Upload className="w-8 h-8 text-[#0D47A1] dark:text-amber-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {uploadFile ? uploadFile.name : 'Drag & drop file here or click to select'}
                  </p>
                  <p className="text-[10px] text-slate-400">Supported formats: PDF, DOCX, ZIP, PY</p>

                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <label
                    htmlFor="file-upload-input"
                    className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-[11px] font-bold px-3 py-1 rounded-xl cursor-pointer mt-1"
                  >
                    Browse Local Files
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 bg-[#0D47A1] hover:bg-blue-900 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading to Firebase...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" /> Submit Assignment Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
