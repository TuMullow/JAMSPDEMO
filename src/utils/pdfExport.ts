import { jsPDF } from 'jspdf';
import { Student, SubjectGrade } from '../types';

export function exportGradesToPDF(student: Student, grades: SubjectGrade[], generalAverage: number, honorStatus: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner - Royal Blue (#0D47A1)
  doc.setFillColor(13, 71, 161);
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Gold accent bar (#FFC107)
  doc.setFillColor(255, 193, 7);
  doc.rect(0, 32, pageWidth, 2.5, 'F');

  // School Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('JEHOSHUA ACADEMY OF MARIKINA', pageWidth / 2, 12, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Pre-School to Senior High School | Concepcion Uno, Marikina City', pageWidth / 2, 18, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL STUDENT REPORT CARD & ACADEMIC TRANSCRIPT', pageWidth / 2, 25, { align: 'center' });

  // Student Info Box
  doc.setTextColor(30, 41, 59);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 40, pageWidth - 28, 36, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student Name:`, 18, 48);
  doc.setFont('helvetica', 'normal');
  doc.text(student.fullName, 45, 48);

  doc.setFont('helvetica', 'bold');
  doc.text(`Student ID:`, 120, 48);
  doc.setFont('helvetica', 'normal');
  doc.text(student.studentId, 142, 48);

  doc.setFont('helvetica', 'bold');
  doc.text(`Grade & Section:`, 18, 56);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.gradeLevel} - ${student.section}`, 45, 56);

  doc.setFont('helvetica', 'bold');
  doc.text(`School Year:`, 120, 56);
  doc.setFont('helvetica', 'normal');
  doc.text(student.schoolYear, 142, 56);

  doc.setFont('helvetica', 'bold');
  doc.text(`Class Adviser:`, 18, 64);
  doc.setFont('helvetica', 'normal');
  doc.text(student.adviser, 45, 64);

  doc.setFont('helvetica', 'bold');
  doc.text(`Academic Standing:`, 120, 64);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Green
  doc.text(`Passed / In Good Standing`, 152, 64);

  // Table Header
  const startY = 84;
  doc.setFillColor(13, 71, 161);
  doc.rect(14, startY, pageWidth - 28, 9, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');

  doc.text('Subject Name', 18, startY + 6);
  doc.text('Q1', 110, startY + 6, { align: 'center' });
  doc.text('Q2', 123, startY + 6, { align: 'center' });
  doc.text('Q3', 136, startY + 6, { align: 'center' });
  doc.text('Q4', 149, startY + 6, { align: 'center' });
  doc.text('Final', 165, startY + 6, { align: 'center' });
  doc.text('Remarks', 185, startY + 6, { align: 'center' });

  // Rows
  let currentY = startY + 9;
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');

  grades.forEach((g, idx) => {
    const finalVal = Math.round((g.quarter1 + g.quarter2 + g.quarter3 + g.quarter4) / 4);
    const isPassed = finalVal >= 75;

    if (idx % 2 === 1) {
      doc.setFillColor(241, 245, 249);
      doc.rect(14, currentY, pageWidth - 28, 8, 'F');
    }

    doc.text(g.subjectName, 18, currentY + 5.5);
    doc.text(g.quarter1.toString(), 110, currentY + 5.5, { align: 'center' });
    doc.text(g.quarter2.toString(), 123, currentY + 5.5, { align: 'center' });
    doc.text(g.quarter3.toString(), 136, currentY + 5.5, { align: 'center' });
    doc.text(g.quarter4.toString(), 149, currentY + 5.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.text(finalVal.toString(), 165, currentY + 5.5, { align: 'center' });

    if (isPassed) {
      doc.setTextColor(16, 185, 129);
      doc.text('Passed', 185, currentY + 5.5, { align: 'center' });
    } else {
      doc.setTextColor(239, 68, 68);
      doc.text('Failed', 185, currentY + 5.5, { align: 'center' });
    }

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    currentY += 8;
  });

  // Summary Footer Box
  currentY += 6;
  doc.setFillColor(254, 252, 232); // Gold tint
  doc.setDrawColor(253, 224, 71);
  doc.roundedRect(14, currentY, pageWidth - 28, 22, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(13, 71, 161);
  doc.text(`General Average: ${generalAverage.toFixed(2)}%`, 20, currentY + 9);

  doc.setTextColor(180, 83, 9);
  doc.text(`Honor Distinction: ${honorStatus}`, 20, currentY + 16);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Report Generated On: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 120, currentY + 9);
  doc.text(`Verification Code: JAM-REG-${Math.floor(100000 + Math.random() * 900000)}`, 120, currentY + 16);

  // Signatures Area
  const sigY = currentY + 32;
  doc.setDrawColor(203, 213, 225);
  doc.line(24, sigY, 74, sigY);
  doc.line(136, sigY, 186, sigY);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text(student.adviser, 49, sigY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Class Adviser Signature', 49, sigY + 9, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.text('Dr. Evelyn M. Santos, Ed.D.', 161, sigY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('School Principal / Registrar', 161, sigY + 9, { align: 'center' });

  // Page Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('JEHOSHUA ACADEMY OF MARIKINA • INTEGRATED | RESPONSIVE | SUSTAINABLE • Official Student Portal Document', pageWidth / 2, 287, { align: 'center' });

  doc.save(`${student.studentId}_Grades_ReportCard_${student.schoolYear.replace('-', '_')}.pdf`);
}
