export interface Student {
  studentId: string;
  fullName: string;
  email: string;
  gradeLevel: string;
  section: string;
  adviser: string;
  schoolYear: string;
  photoUrl: string;
  address: string;
  contactNumber: string;
  guardian: string;
  guardianContact: string;
  birthdate: string;
  gender: string;
}

export interface SubjectGrade {
  id: string;
  studentId: string;
  subjectCode: string;
  subjectName: string;
  quarter1: number;
  quarter2: number;
  quarter3: number;
  quarter4: number;
  units: number;
  teacher: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

export interface Subject {
  subjectCode: string;
  subjectName: string;
  teacher: string;
  teacherEmail: string;
  room: string;
  units: number;
  description: string;
  scheduleDays: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subjectCode: string;
  subjectName: string;
  teacher: string;
  room: string;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'submitted' | 'pending' | 'late';
  submissionDate?: string;
  submittedFile?: string;
  points: number;
  maxPoints: number;
  feedback?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Academic' | 'Events' | 'Administrative' | 'Emergency';
  image?: string;
  attachment?: {
    name: string;
    url: string;
    size: string;
  };
  pinned?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  type: 'Holiday' | 'Exam' | 'Foundation Day' | 'PTA Meeting' | 'Recognition' | 'Graduation' | 'Intramurals' | 'Event';
  description: string;
  location?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'grade' | 'assignment' | 'announcement' | 'event' | 'emergency';
  read: boolean;
  linkTab?: string;
}

export type ActiveTab = 
  | 'home' 
  | 'grades' 
  | 'attendance' 
  | 'schedule' 
  | 'subjects' 
  | 'assignments' 
  | 'announcements' 
  | 'calendar' 
  | 'notifications' 
  | 'profile' 
  | 'settings' 
  | 'admin' 
  | 'android-export';
