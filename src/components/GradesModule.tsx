import React, { useState } from 'react';
import { Student, SubjectGrade } from '../types';
import { 
  Award, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  Sparkles, 
  BookOpen, 
  TrendingUp,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

interface GradesModuleProps {
  student: Student;
  grades: SubjectGrade[];
  onExportPDF: () => void;
}

export const GradesModule: React.FC<GradesModuleProps> = ({
  student,
  grades,
  onExportPDF
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Custom Simulator state
  const [simTargetAverage, setSimTargetAverage] = useState<number>(95);

  // Filtered grades
  const filteredGrades = grades.filter(g => 
    g.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute Overall General Average across all 4 quarters
  const generalAverage = grades.length > 0
    ? grades.reduce((acc, curr) => {
        const finalVal = (curr.quarter1 + curr.quarter2 + curr.quarter3 + curr.quarter4) / 4;
        return acc + finalVal;
      }, 0) / grades.length
    : 0;

  // Compute Quarter Specific Average
  const getQuarterAverage = (quarterKey: 'quarter1' | 'quarter2' | 'quarter3' | 'quarter4') => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g[quarterKey], 0);
    return sum / grades.length;
  };

  const getHonorStatus = (avg: number) => {
    if (grades.length === 0 || avg === 0) return 'Pending Evaluation';
    if (avg >= 98) return 'With Highest Honors (Summa Cum Laude Track)';
    if (avg >= 95) return 'With High Honors';
    if (avg >= 90) return 'With Honors';
    if (avg >= 75) return 'Passed / Good Standing';
    return 'Under Academic Review';
  };

  const honorStatus = getHonorStatus(generalAverage);

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Module Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0D47A1] dark:text-amber-400 uppercase tracking-widest mb-1">
            <Award className="w-4 h-4" /> Academic Performance Ledger
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Official Report Card & Subject Grades
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            S.Y. {student.schoolYear} • {student.gradeLevel} - {student.section}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full sm:w-auto justify-center bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-[#0D47A1] dark:text-amber-400 font-extrabold px-4 py-3 sm:py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-all border border-blue-200 dark:border-slate-700 cursor-pointer active:scale-95"
          >
            <Calculator className="w-4 h-4 flex-shrink-0" />
            <span>{showCalculator ? 'Hide Target Simulator' : 'Grade Target Calculator'}</span>
          </button>

          <button
            onClick={onExportPDF}
            className="w-full sm:w-auto justify-center bg-[#0D47A1] hover:bg-blue-900 text-white font-extrabold px-5 py-3 sm:py-2.5 rounded-2xl shadow-lg hover:shadow-xl text-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400 flex-shrink-0" /> 
            <span>Export Grades PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* General Average */}
        <div className="bg-gradient-to-br from-[#0D47A1] to-blue-900 text-white p-6 rounded-3xl shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4">
            <Award className="w-32 h-32 text-white" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">General Average (GWA)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{generalAverage.toFixed(2)}%</span>
            <span className="text-xs text-blue-200 font-semibold">/ 100.00%</span>
          </div>
          <p className="text-xs text-blue-100">All 4 Quarters Combined</p>
        </div>

        {/* Honor Distinction */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-6 rounded-3xl shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-15 -mr-4 -mb-4">
            <Sparkles className="w-32 h-32 text-slate-950" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-900 block">Honor Standing</span>
          <span className="text-xl font-black block leading-snug">{honorStatus}</span>
          <p className="text-xs font-semibold text-slate-900/80">Jehoshua Academy Dean's Roll</p>
        </div>

        {/* Academic Standing */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-6 rounded-3xl shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4">
            <FileCheck2 className="w-32 h-32 text-white" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">Academic Standing</span>
          <span className="text-2xl font-black block">In Good Standing</span>
          <p className="text-xs text-emerald-100">Zero Failed Units • Eligible for Re-enrollment</p>
        </div>
      </div>

      {/* Grade Simulator Modal/Panel */}
      {showCalculator && (
        <div className="bg-amber-50 dark:bg-slate-800/90 rounded-3xl p-6 border-2 border-amber-400 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
              <Calculator className="w-5 h-5" />
              Interactive Grade Target Simulator
            </div>
            <button 
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300">
            Simulate what score you need in upcoming Q4 finals to reach your desired General Average target:
          </p>

          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Set Target Average (%):</label>
            <input 
              type="range" 
              min="85" 
              max="99" 
              value={simTargetAverage} 
              onChange={(e) => setSimTargetAverage(Number(e.target.value))}
              className="accent-[#0D47A1] cursor-pointer"
            />
            <span className="font-black text-[#0D47A1] dark:text-amber-400 text-base">{simTargetAverage}%</span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-bold">
              To reach <span className="text-amber-600 font-black">{simTargetAverage}% General Average</span>:
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              You need an average score of <span className="font-bold text-emerald-600">{(simTargetAverage + 0.5).toFixed(1)}%</span> across Q4 exam outputs.
            </p>
          </div>
        </div>
      )}

      {/* Quarter Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Quarter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuarter(q)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedQuarter === q
                  ? 'bg-[#0D47A1] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {q === 'ALL' ? 'All Quarters' : `${q} Grades`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search subject or teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 rounded-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Grades Table / Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filteredGrades.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-[#0D47A1] dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Subject Grades Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No grade records are available for this student account yet. Quarter scores will be reflected as soon as subject faculty finalize evaluation.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Phone View (< 768px): Card Grid */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filteredGrades.map((g) => {
            const finalGrade = Math.round((g.quarter1 + g.quarter2 + g.quarter3 + g.quarter4) / 4);
            const isPassed = finalGrade >= 75;

            return (
              <div key={g.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      {g.subjectCode} • {g.units}.0 Units
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1 leading-snug">
                      {g.subjectName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.teacher}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-base font-black text-[#0D47A1] dark:text-amber-400 block">
                      {finalGrade}%
                    </span>
                    {isPassed ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-extrabold text-[9px] uppercase">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-full font-extrabold text-[9px] uppercase">
                        <XCircle className="w-3 h-3 text-rose-600" /> Failed
                      </span>
                    )}
                  </div>
                </div>

                {/* Quarter Breakdown Chips */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <div className={`p-1.5 rounded-xl border ${selectedQuarter === 'Q1' || selectedQuarter === 'ALL' ? 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                    <span className="text-slate-400 font-bold block text-[9px]">Q1</span>
                    <span className="font-black text-slate-900 dark:text-white">{g.quarter1}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl border ${selectedQuarter === 'Q2' || selectedQuarter === 'ALL' ? 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                    <span className="text-slate-400 font-bold block text-[9px]">Q2</span>
                    <span className="font-black text-slate-900 dark:text-white">{g.quarter2}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl border ${selectedQuarter === 'Q3' || selectedQuarter === 'ALL' ? 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                    <span className="text-slate-400 font-bold block text-[9px]">Q3</span>
                    <span className="font-black text-slate-900 dark:text-white">{g.quarter3}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl border ${selectedQuarter === 'Q4' || selectedQuarter === 'ALL' ? 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                    <span className="text-slate-400 font-bold block text-[9px]">Q4</span>
                    <span className="font-black text-slate-900 dark:text-white">{g.quarter4}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop View (>= 768px): Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0D47A1] text-white font-extrabold uppercase tracking-wider text-[11px]">
                <th className="p-4 pl-6">Subject Code & Title</th>
                <th className="p-4 text-center">Teacher</th>
                <th className="p-4 text-center">Units</th>
                <th className={`p-4 text-center ${selectedQuarter === 'Q1' || selectedQuarter === 'ALL' ? 'bg-blue-900' : ''}`}>1st Qtr</th>
                <th className={`p-4 text-center ${selectedQuarter === 'Q2' || selectedQuarter === 'ALL' ? 'bg-blue-900' : ''}`}>2nd Qtr</th>
                <th className={`p-4 text-center ${selectedQuarter === 'Q3' || selectedQuarter === 'ALL' ? 'bg-blue-900' : ''}`}>3rd Qtr</th>
                <th className={`p-4 text-center ${selectedQuarter === 'Q4' || selectedQuarter === 'ALL' ? 'bg-blue-900' : ''}`}>4th Qtr</th>
                <th className="p-4 text-center font-black">Final Grade</th>
                <th className="p-4 text-center pr-6">Remarks</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredGrades.map((g) => {
                const finalGrade = Math.round((g.quarter1 + g.quarter2 + g.quarter3 + g.quarter4) / 4);
                const isPassed = finalGrade >= 75;

                return (
                  <tr 
                    key={g.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    {/* Subject Name */}
                    <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0D47A1] dark:bg-amber-400" />
                        <div>
                          <p className="font-extrabold text-xs text-slate-900 dark:text-white">{g.subjectName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{g.subjectCode}</p>
                        </div>
                      </div>
                    </td>

                    {/* Teacher */}
                    <td className="p-4 text-center text-slate-600 dark:text-slate-300 font-medium">
                      {g.teacher}
                    </td>

                    {/* Units */}
                    <td className="p-4 text-center font-bold text-slate-500">
                      {g.units}.0
                    </td>

                    {/* Q1 */}
                    <td className="p-4 text-center font-extrabold text-slate-800 dark:text-slate-200">
                      {g.quarter1}
                    </td>

                    {/* Q2 */}
                    <td className="p-4 text-center font-extrabold text-slate-800 dark:text-slate-200">
                      {g.quarter2}
                    </td>

                    {/* Q3 */}
                    <td className="p-4 text-center font-extrabold text-slate-800 dark:text-slate-200">
                      {g.quarter3}
                    </td>

                    {/* Q4 */}
                    <td className="p-4 text-center font-extrabold text-slate-800 dark:text-slate-200">
                      {g.quarter4}
                    </td>

                    {/* Final Grade */}
                    <td className="p-4 text-center text-sm font-black text-[#0D47A1] dark:text-amber-400 bg-blue-50/50 dark:bg-slate-800/40">
                      {finalGrade}%
                    </td>

                    {/* Remarks Tag */}
                    <td className="p-4 text-center pr-6">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-black text-[10px] uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-3 py-1 rounded-full font-black text-[10px] uppercase">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Failed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quarter Averages Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <span>Quarter 1 Avg: <strong className="text-slate-900 dark:text-white">{getQuarterAverage('quarter1').toFixed(1)}%</strong></span>
            <span>Quarter 2 Avg: <strong className="text-slate-900 dark:text-white">{getQuarterAverage('quarter2').toFixed(1)}%</strong></span>
            <span>Quarter 3 Avg: <strong className="text-slate-900 dark:text-white">{getQuarterAverage('quarter3').toFixed(1)}%</strong></span>
            <span>Quarter 4 Avg: <strong className="text-slate-900 dark:text-white">{getQuarterAverage('quarter4').toFixed(1)}%</strong></span>
          </div>

          <span className="text-slate-400 text-[11px]">
            * Official report cards verified by Registrar's Office
          </span>
        </div>
      </>
    )}
  </div>

    </div>
  );
};
