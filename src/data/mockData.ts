import { Student, SubjectGrade, AttendanceRecord, Subject, ScheduleItem, Assignment, Announcement, CalendarEvent, NotificationItem } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    studentId: '2025-00001',
    fullName: 'New Student',
    email: 'student@jehoshua.edu.ph',
    gradeLevel: 'Grade 10',
    section: 'Section A',
    adviser: 'To Be Assigned',
    schoolYear: '2025-2026',
    photoUrl: '',
    address: 'Marikina City, Metro Manila',
    contactNumber: '',
    guardian: '',
    guardianContact: '',
    birthdate: '2010-01-01',
    gender: 'Unspecified'
  },
  {
    studentId: '2024-01048',
    fullName: 'Gabriel E. Dela Cruz',
    email: 'gabriel.delacruz@jehoshua.edu.ph',
    gradeLevel: 'Grade 10',
    section: 'St. Thomas',
    adviser: 'Mrs. Maria Santos',
    schoolYear: '2025-2026',
    photoUrl: '',
    address: '124 Concepcion Uno, Marikina City, Metro Manila',
    contactNumber: '+63 917 890 1234',
    guardian: 'Roberto C. Dela Cruz',
    guardianContact: '+63 918 555 4321',
    birthdate: '2010-04-15',
    gender: 'Male'
  },
  {
    studentId: '2024-01049',
    fullName: 'Sophia Marie V. Reyes',
    email: 'sophia.reyes@jehoshua.edu.ph',
    gradeLevel: 'Grade 12',
    section: 'STEM - St. Jude',
    adviser: 'Engr. David Mendoza',
    schoolYear: '2025-2026',
    photoUrl: '',
    address: '45 Shoe Avenue, Sto. Niño, Marikina City',
    contactNumber: '+63 920 123 4567',
    guardian: 'Elena V. Reyes',
    guardianContact: '+63 922 888 9900',
    birthdate: '2008-09-22',
    gender: 'Female'
  }
];

export const MOCK_SUBJECT_GRADES: Record<string, SubjectGrade[]> = {
  '2025-00001': [],
  '2024-01048': [
    {
      id: 'g1',
      studentId: '2024-01048',
      subjectCode: 'ENG10',
      subjectName: 'English 10',
      quarter1: 93,
      quarter2: 94,
      quarter3: 95,
      quarter4: 93,
      units: 3,
      teacher: 'Mrs. Maria Santos'
    },
    {
      id: 'g2',
      studentId: '2024-01048',
      subjectCode: 'MATH10',
      subjectName: 'Mathematics 10',
      quarter1: 95,
      quarter2: 96,
      quarter3: 94,
      quarter4: 95,
      units: 3,
      teacher: 'Mr. Juan Dela Cruz'
    },
    {
      id: 'g3',
      studentId: '2024-01048',
      subjectCode: 'SCI10',
      subjectName: 'Science 10',
      quarter1: 94,
      quarter2: 93,
      quarter3: 95,
      quarter4: 94,
      units: 3,
      teacher: 'Dr. Ramon Ramos'
    },
    {
      id: 'g4',
      studentId: '2024-01048',
      subjectCode: 'FIL10',
      subjectName: 'Filipino 10',
      quarter1: 92,
      quarter2: 94,
      quarter3: 93,
      quarter4: 92,
      units: 3,
      teacher: 'Gng. Teresa Cruz'
    },
    {
      id: 'g5',
      studentId: '2024-01048',
      subjectCode: 'MAPEH10',
      subjectName: 'MAPEH 10',
      quarter1: 96,
      quarter2: 97,
      quarter3: 96,
      quarter4: 96,
      units: 3,
      teacher: 'Coach Robert Garcia'
    },
    {
      id: 'g6',
      studentId: '2024-01048',
      subjectCode: 'ESP10',
      subjectName: 'Edukasyon sa Pagpapakakatao 10',
      quarter1: 94,
      quarter2: 95,
      quarter3: 94,
      quarter4: 94,
      units: 2,
      teacher: 'Bro. Joseph Miller'
    },
    {
      id: 'g7',
      studentId: '2024-01048',
      subjectCode: 'COMP10',
      subjectName: 'Computer & Robotics 10',
      quarter1: 97,
      quarter2: 98,
      quarter3: 97,
      quarter4: 98,
      units: 2,
      teacher: 'Engr. David Mendoza'
    },
    {
      id: 'g8',
      studentId: '2024-01048',
      subjectCode: 'AP10',
      subjectName: 'Araling Panlipunan 10',
      quarter1: 93,
      quarter2: 94,
      quarter3: 93,
      quarter4: 94,
      units: 3,
      teacher: 'Sir Arthur Pendelton'
    }
  ]
};

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', studentId: '2024-01048', date: '2026-07-01', status: 'present', timeIn: '07:15 AM', timeOut: '04:30 PM' },
  { id: 'a2', studentId: '2024-01048', date: '2026-07-02', status: 'present', timeIn: '07:20 AM', timeOut: '04:30 PM' },
  { id: 'a3', studentId: '2024-01048', date: '2026-07-03', status: 'present', timeIn: '07:10 AM', timeOut: '04:30 PM' },
  { id: 'a4', studentId: '2024-01048', date: '2026-07-06', status: 'late', timeIn: '07:42 AM', timeOut: '04:30 PM', remarks: 'Heavy traffic at Gil Fernando Ave' },
  { id: 'a5', studentId: '2024-01048', date: '2026-07-07', status: 'present', timeIn: '07:18 AM', timeOut: '04:30 PM' },
  { id: 'a6', studentId: '2024-01048', date: '2026-07-08', status: 'present', timeIn: '07:12 AM', timeOut: '04:30 PM' },
  { id: 'a7', studentId: '2024-01048', date: '2026-07-09', status: 'excused', timeIn: '-', timeOut: '-', remarks: 'Dental appointment (Excuse Slip Submitted)' },
  { id: 'a8', studentId: '2024-01048', date: '2026-07-10', status: 'present', timeIn: '07:22 AM', timeOut: '04:30 PM' },
  { id: 'a9', studentId: '2024-01048', date: '2026-07-13', status: 'present', timeIn: '07:14 AM', timeOut: '04:30 PM' },
  { id: 'a10', studentId: '2024-01048', date: '2026-07-14', status: 'present', timeIn: '07:19 AM', timeOut: '04:30 PM' },
  { id: 'a11', studentId: '2024-01048', date: '2026-07-15', status: 'present', timeIn: '07:11 AM', timeOut: '04:30 PM' },
  { id: 'a12', studentId: '2024-01048', date: '2026-07-16', status: 'present', timeIn: '07:25 AM', timeOut: '04:30 PM' },
  { id: 'a13', studentId: '2024-01048', date: '2026-07-17', status: 'present', timeIn: '07:15 AM', timeOut: '04:30 PM' },
  { id: 'a14', studentId: '2024-01048', date: '2026-07-20', status: 'present', timeIn: '07:20 AM', timeOut: '04:30 PM' },
  { id: 'a15', studentId: '2024-01048', date: '2026-07-21', status: 'present', timeIn: '07:18 AM', timeOut: '04:30 PM' },
  { id: 'a16', studentId: '2024-01048', date: '2026-07-22', status: 'absent', timeIn: '-', timeOut: '-', remarks: 'Fever with Doctor Certificate' },
  { id: 'a17', studentId: '2024-01048', date: '2026-07-23', status: 'present', timeIn: '07:16 AM', timeOut: '04:30 PM' },
  { id: 'a18', studentId: '2024-01048', date: '2026-07-24', status: 'present', timeIn: '07:12 AM', timeOut: '04:30 PM' },
  { id: 'a19', studentId: '2024-01048', date: '2026-07-27', status: 'present', timeIn: '07:22 AM', timeOut: '04:30 PM' },
  { id: 'a20', studentId: '2024-01048', date: '2026-07-28', status: 'present', timeIn: '07:15 AM', timeOut: '04:30 PM' }
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    subjectCode: 'ENG10',
    subjectName: 'English 10 (World Literature)',
    teacher: 'Mrs. Maria Santos',
    teacherEmail: 'm.santos@jehoshua.edu.ph',
    room: 'Room 302',
    units: 3,
    description: 'An in-depth study of world literature, persuasive speeches, critical essays, and rhetorical analysis.',
    scheduleDays: 'Mon, Wed, Fri (07:30 AM - 08:30 AM)'
  },
  {
    subjectCode: 'MATH10',
    subjectName: 'Mathematics 10 (Polynomials & Circles)',
    teacher: 'Mr. Juan Dela Cruz',
    teacherEmail: 'j.delacruz@jehoshua.edu.ph',
    room: 'Math Lab 2',
    units: 3,
    description: 'Covers sequences, polynomial equations, circle theorems, coordinate geometry, and combinatorics.',
    scheduleDays: 'Mon, Tue, Thu (08:30 AM - 09:30 AM)'
  },
  {
    subjectCode: 'SCI10',
    subjectName: 'Science 10 (Plate Tectonics & Genetics)',
    teacher: 'Dr. Ramon Ramos',
    teacherEmail: 'r.ramos@jehoshua.edu.ph',
    room: 'Science Lab 1',
    units: 3,
    description: 'Explores plate tectonics, electromagnetic spectrum, endocrine system, DNA replication, and biodiversity.',
    scheduleDays: 'Mon, Wed, Fri (09:45 AM - 10:45 AM)'
  },
  {
    subjectCode: 'FIL10',
    subjectName: 'Filipino 10 (El Filibusterismo)',
    teacher: 'Gng. Teresa Cruz',
    teacherEmail: 't.cruz@jehoshua.edu.ph',
    room: 'Room 304',
    units: 3,
    description: 'Pagsusuri sa nobelang El Filibusterismo ni Dr. Jose Rizal at paglinang ng kasanayan sa debate.',
    scheduleDays: 'Tue, Thu, Fri (10:45 AM - 11:45 AM)'
  },
  {
    subjectCode: 'MAPEH10',
    subjectName: 'MAPEH 10 (Music, Arts, PE, Health)',
    teacher: 'Coach Robert Garcia',
    teacherEmail: 'r.garcia@jehoshua.edu.ph',
    room: 'Gym / AVR',
    units: 3,
    description: 'Focuses on 20th century music styles, modern art movements, lifestyle sports, and global health initiatives.',
    scheduleDays: 'Tue, Thu (01:00 PM - 02:30 PM)'
  },
  {
    subjectCode: 'ESP10',
    subjectName: 'Edukasyon sa Pagpapakakatao 10',
    teacher: 'Bro. Joseph Miller',
    teacherEmail: 'j.miller@jehoshua.edu.ph',
    room: 'Chapel Hall',
    units: 2,
    description: 'Ethical judgment, moral dignity, love for God, stewardship, and servant leadership in society.',
    scheduleDays: 'Wed (01:00 PM - 03:00 PM)'
  },
  {
    subjectCode: 'COMP10',
    subjectName: 'Computer & Robotics 10',
    teacher: 'Engr. David Mendoza',
    teacherEmail: 'd.mendoza@jehoshua.edu.ph',
    room: 'Tech Lab A',
    units: 2,
    description: 'Introduction to Python programming, basic microcontrollers, web technologies, and algorithm logic.',
    scheduleDays: 'Mon (01:00 PM - 03:00 PM)'
  },
  {
    subjectCode: 'AP10',
    subjectName: 'Araling Panlipunan 10 (mga Kontemporaryong Isyu)',
    teacher: 'Sir Arthur Pendelton',
    teacherEmail: 'a.pendelton@jehoshua.edu.ph',
    room: 'Room 305',
    units: 3,
    description: 'Pag-aaral ng mga isyung pangkapaligiran, ekonomiya, karapatang pantao, at pamamahala sa Pilipinas.',
    scheduleDays: 'Tue, Thu (02:30 PM - 03:30 PM)'
  }
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  // Monday
  { id: 's1', day: 'Monday', time: '07:30 AM - 08:30 AM', subjectCode: 'ENG10', subjectName: 'English 10', teacher: 'Mrs. Maria Santos', room: 'Room 302', color: 'bg-blue-600' },
  { id: 's2', day: 'Monday', time: '08:30 AM - 09:30 AM', subjectCode: 'MATH10', subjectName: 'Mathematics 10', teacher: 'Mr. Juan Dela Cruz', room: 'Math Lab 2', color: 'bg-amber-600' },
  { id: 's3', day: 'Monday', time: '09:45 AM - 10:45 AM', subjectCode: 'SCI10', subjectName: 'Science 10', teacher: 'Dr. Ramon Ramos', room: 'Science Lab 1', color: 'bg-emerald-600' },
  { id: 's4', day: 'Monday', time: '11:00 AM - 12:00 PM', subjectCode: 'AP10', subjectName: 'Araling Panlipunan 10', teacher: 'Sir Arthur Pendelton', room: 'Room 305', color: 'bg-purple-600' },
  { id: 's5', day: 'Monday', time: '01:00 PM - 03:00 PM', subjectCode: 'COMP10', subjectName: 'Computer & Robotics', teacher: 'Engr. David Mendoza', room: 'Tech Lab A', color: 'bg-indigo-600' },

  // Tuesday
  { id: 's6', day: 'Tuesday', time: '07:30 AM - 08:30 AM', subjectCode: 'FIL10', subjectName: 'Filipino 10', teacher: 'Gng. Teresa Cruz', room: 'Room 304', color: 'bg-rose-600' },
  { id: 's7', day: 'Tuesday', time: '08:30 AM - 09:30 AM', subjectCode: 'MATH10', subjectName: 'Mathematics 10', teacher: 'Mr. Juan Dela Cruz', room: 'Math Lab 2', color: 'bg-amber-600' },
  { id: 's8', day: 'Tuesday', time: '09:45 AM - 10:45 AM', subjectCode: 'ENG10', subjectName: 'English 10', teacher: 'Mrs. Maria Santos', room: 'Room 302', color: 'bg-blue-600' },
  { id: 's9', day: 'Tuesday', time: '01:00 PM - 02:30 PM', subjectCode: 'MAPEH10', subjectName: 'MAPEH 10', teacher: 'Coach Robert Garcia', room: 'Gymnasium', color: 'bg-teal-600' },

  // Wednesday
  { id: 's10', day: 'Wednesday', time: '07:30 AM - 08:30 AM', subjectCode: 'ENG10', subjectName: 'English 10', teacher: 'Mrs. Maria Santos', room: 'Room 302', color: 'bg-blue-600' },
  { id: 's11', day: 'Wednesday', time: '08:30 AM - 09:30 AM', subjectCode: 'SCI10', subjectName: 'Science 10', teacher: 'Dr. Ramon Ramos', room: 'Science Lab 1', color: 'bg-emerald-600' },
  { id: 's12', day: 'Wednesday', time: '09:45 AM - 10:45 AM', subjectCode: 'FIL10', subjectName: 'Filipino 10', teacher: 'Gng. Teresa Cruz', room: 'Room 304', color: 'bg-rose-600' },
  { id: 's13', day: 'Wednesday', time: '01:00 PM - 03:00 PM', subjectCode: 'ESP10', subjectName: 'ESP 10', teacher: 'Bro. Joseph Miller', room: 'Chapel Hall', color: 'bg-orange-600' },

  // Thursday
  { id: 's14', day: 'Thursday', time: '07:30 AM - 08:30 AM', subjectCode: 'MATH10', subjectName: 'Mathematics 10', teacher: 'Mr. Juan Dela Cruz', room: 'Math Lab 2', color: 'bg-amber-600' },
  { id: 's15', day: 'Thursday', time: '08:30 AM - 09:30 AM', subjectCode: 'SCI10', subjectName: 'Science 10', teacher: 'Dr. Ramon Ramos', room: 'Science Lab 1', color: 'bg-emerald-600' },
  { id: 's16', day: 'Thursday', time: '09:45 AM - 10:45 AM', subjectCode: 'AP10', subjectName: 'Araling Panlipunan 10', teacher: 'Sir Arthur Pendelton', room: 'Room 305', color: 'bg-purple-600' },
  { id: 's17', day: 'Thursday', time: '01:00 PM - 02:30 PM', subjectCode: 'MAPEH10', subjectName: 'MAPEH 10', teacher: 'Coach Robert Garcia', room: 'AVR Hall', color: 'bg-teal-600' },

  // Friday
  { id: 's18', day: 'Friday', time: '07:30 AM - 08:30 AM', subjectCode: 'ENG10', subjectName: 'English 10', teacher: 'Mrs. Maria Santos', room: 'Room 302', color: 'bg-blue-600' },
  { id: 's19', day: 'Friday', time: '08:30 AM - 09:30 AM', subjectCode: 'SCI10', subjectName: 'Science 10', teacher: 'Dr. Ramon Ramos', room: 'Science Lab 1', color: 'bg-emerald-600' },
  { id: 's20', day: 'Friday', time: '09:45 AM - 10:45 AM', subjectCode: 'FIL10', subjectName: 'Filipino 10', teacher: 'Gng. Teresa Cruz', room: 'Room 304', color: 'bg-rose-600' },
  { id: 's21', day: 'Friday', time: '01:00 PM - 03:00 PM', subjectCode: 'CLUB', subjectName: 'Student Club Activity / Homeroom', teacher: 'Mrs. Maria Santos', room: 'Auditorium', color: 'bg-sky-600' }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg1',
    title: 'World Literature Persuasive Essay',
    subject: 'English 10',
    description: 'Write a 750-word persuasive essay analyzing how classical Greek literature influences modern ethical dilemmas. Include 3 scholarly citations.',
    dueDate: '2026-08-05 11:59 PM',
    status: 'pending',
    points: 100,
    maxPoints: 100
  },
  {
    id: 'asg2',
    title: 'Polynomial Functions & Curve Sketching Worksheet',
    subject: 'Mathematics 10',
    description: 'Solve problems 1 to 15 on Chapter 4. Plot roots, synthetic division steps, and local extrema on graph paper.',
    dueDate: '2026-08-02 05:00 PM',
    status: 'pending',
    points: 50,
    maxPoints: 50
  },
  {
    id: 'asg3',
    title: 'Plate Tectonics & Seismic Wave Lab Report',
    subject: 'Science 10',
    description: 'Submit your compiled lab report on calculating epicenter distance using P-wave and S-wave time intervals.',
    dueDate: '2026-07-28 11:59 PM',
    status: 'submitted',
    submissionDate: '2026-07-27 08:15 PM',
    submittedFile: 'DelaCruz_Science_LabReport3.pdf',
    points: 98,
    maxPoints: 100,
    feedback: 'Excellent seismic travel time graph and clean error analysis! Excellent work.'
  },
  {
    id: 'asg4',
    title: 'Pagsusuri ng Kabanata 1-10 ng El Filibusterismo',
    subject: 'Filipino 10',
    description: 'Ibigay ang buod, simbolismo, at ugnayan ng mga kaganapan sa modernong lipunang Pilipino.',
    dueDate: '2026-07-25 11:59 PM',
    status: 'submitted',
    submissionDate: '2026-07-24 04:30 PM',
    submittedFile: 'DelaCruz_ElFili_Kabanata1-10.docx',
    points: 94,
    maxPoints: 100,
    feedback: 'Magaling ang paghahambing sa kontemporaryong usapin sa Marikina.'
  },
  {
    id: 'asg5',
    title: 'Python Array & Loop Algorithm Problem Set',
    subject: 'Computer & Robotics 10',
    description: 'Write Python script for student grade statistics system using arrays and function modules.',
    dueDate: '2026-07-20 08:00 PM',
    status: 'late',
    submissionDate: '2026-07-21 09:10 AM',
    submittedFile: 'grade_calculator.py',
    points: 88,
    maxPoints: 100,
    feedback: 'Submitted 13 hours late. 10% deduction applied, but code logic works perfectly.'
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc1',
    title: '🎉 15th Foundation Day & Cultural Festival Schedule',
    description: 'Jehoshua Academy of Marikina will celebrate its 15th Foundation Anniversary from August 18-20, 2026 with the theme: "Shining Light, Empowering Hearts, Building Future Leaders". Activities include Field Demonstration, Science Fair, Battle of the Bands, and Food Bazaar.',
    date: '2026-07-28',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    pinned: true,
    attachment: {
      name: 'JAM_15th_Foundation_Day_Program.pdf',
      url: '#',
      size: '2.4 MB'
    }
  },
  {
    id: 'anc2',
    title: '📝 1st Quarter Periodical Examination Guidelines & Advisory',
    description: 'All students are hereby advised that the 1st Quarter Examinations will be conducted on August 12-14, 2026. Please ensure your examination permits are cleared with the Registrar and Business Office by August 8.',
    date: '2026-07-26',
    category: 'Academic',
    pinned: true,
    attachment: {
      name: 'Q1_Exam_Coverage_and_Permit_Notice.pdf',
      url: '#',
      size: '1.1 MB'
    }
  },
  {
    id: 'anc3',
    title: '🚌 General PTA Assembly & Parent-Teacher Conference',
    description: 'We invite all parents and guardians to the 1st General PTA Assembly on Saturday, August 1, 2026, 9:00 AM at the JAM Gymnasium. Distribution of initial progress reports will follow in respective adviser rooms.',
    date: '2026-07-22',
    category: 'Administrative'
  },
  {
    id: 'anc4',
    title: '⛈️ Typhoon Advisory & Disaster Preparedness Protocol',
    description: 'In cases of signal #1 or heavy rainfall advisories from PAGASA, online asynchronous modules will automatically be uploaded on the Student Portal by 7:00 AM. Stay safe and monitor official portal advisories.',
    date: '2026-07-18',
    category: 'Emergency'
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'First General PTA Meeting',
    date: '2026-08-01',
    type: 'PTA Meeting',
    description: 'General Assembly at Gymnasium followed by distribution of initial student feedback slips.',
    location: 'JAM Gymnasium'
  },
  {
    id: 'e2',
    title: '1st Quarter Periodical Examinations',
    date: '2026-08-12',
    endDate: '2026-08-14',
    type: 'Exam',
    description: 'Comprehensive 1st Quarter exams across all subjects.',
    location: 'Respective Classrooms'
  },
  {
    id: 'e3',
    title: '15th Grand Foundation Day Celebration',
    date: '2026-08-18',
    endDate: '2026-08-20',
    type: 'Foundation Day',
    description: 'Parade, Field Mass, Cultural Competitions, Booths, and Alumni Homecoming.',
    location: 'School Grounds & Quadrangle'
  },
  {
    id: 'e4',
    title: 'Ninoy Aquino Day (National Special Non-Working Holiday)',
    date: '2026-08-21',
    type: 'Holiday',
    description: 'No classes in observance of Ninoy Aquino Day.',
    location: 'Nationwide'
  },
  {
    id: 'e5',
    title: 'National Heroes Day',
    date: '2026-08-31',
    type: 'Holiday',
    description: 'Regular holiday - No classes and office transactions.',
    location: 'Nationwide'
  },
  {
    id: 'e6',
    title: 'Annual Intramural Games',
    date: '2026-09-15',
    endDate: '2026-09-18',
    type: 'Intramurals',
    description: 'Inter-color sports tournament: Basketball, Volleyball, Chess, Badminton, Esports.',
    location: 'Sports Complex'
  },
  {
    id: 'e7',
    title: 'Mid-Year Academic Recognition Day',
    date: '2026-10-24',
    type: 'Recognition',
    description: 'Awarding ceremony for Quarter 1 & 2 Honor Roll Students.',
    location: 'JAM Auditorium'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Grade Posted: Science 10',
    message: 'Dr. Ramon Ramos posted your Quarter 3 grade for Science 10 (95 - Passed).',
    date: '10 minutes ago',
    type: 'grade',
    read: false,
    linkTab: 'grades'
  },
  {
    id: 'n2',
    title: 'New Assignment: English 10 Essay',
    message: 'Mrs. Maria Santos published a new assignment: "World Literature Persuasive Essay". Due Aug 5.',
    date: '2 hours ago',
    type: 'assignment',
    read: false,
    linkTab: 'assignments'
  },
  {
    id: 'n3',
    title: 'Important Announcement: 15th Foundation Day',
    message: 'Program schedule and bazaar mechanics for the upcoming Foundation Week have been posted.',
    date: '1 day ago',
    type: 'announcement',
    read: true,
    linkTab: 'announcements'
  },
  {
    id: 'n4',
    title: 'Upcoming Exam Alert',
    message: '1st Quarter Periodical Examinations scheduled on August 12-14, 2026. Prepare exam permits.',
    date: '3 days ago',
    type: 'event',
    read: true,
    linkTab: 'calendar'
  }
];
