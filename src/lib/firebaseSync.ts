import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Announcement, Assignment, NotificationItem, CalendarEvent, Student } from '../types';
import { 
  MOCK_ANNOUNCEMENTS, 
  MOCK_ASSIGNMENTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_EVENTS, 
  INITIAL_STUDENTS 
} from '../data/mockData';

// Collection references
const ANNOUNCEMENTS_COL = 'announcements';
const ASSIGNMENTS_COL = 'assignments';
const NOTIFICATIONS_COL = 'notifications';
const EVENTS_COL = 'events';
const STUDENTS_COL = 'students';

/**
 * Seeds initial mock data into Firestore if collections are empty
 */
export async function seedFirestoreIfEmpty() {
  try {
    const ancSnap = await getDocs(collection(db, ANNOUNCEMENTS_COL));
    if (ancSnap.empty) {
      console.log('Seeding initial announcements to Firestore...');
      for (const anc of MOCK_ANNOUNCEMENTS) {
        await setDoc(doc(db, ANNOUNCEMENTS_COL, anc.id), {
          ...anc,
          createdAt: new Date().toISOString()
        });
      }
    }

    const asgSnap = await getDocs(collection(db, ASSIGNMENTS_COL));
    if (asgSnap.empty) {
      console.log('Seeding initial assignments to Firestore...');
      for (const asg of MOCK_ASSIGNMENTS) {
        await setDoc(doc(db, ASSIGNMENTS_COL, asg.id), {
          ...asg,
          createdAt: new Date().toISOString()
        });
      }
    }

    const notifSnap = await getDocs(collection(db, NOTIFICATIONS_COL));
    if (notifSnap.empty) {
      console.log('Seeding initial notifications to Firestore...');
      for (const n of MOCK_NOTIFICATIONS) {
        await setDoc(doc(db, NOTIFICATIONS_COL, n.id), {
          ...n,
          createdAt: new Date().toISOString()
        });
      }
    }

    const eventsSnap = await getDocs(collection(db, EVENTS_COL));
    if (eventsSnap.empty) {
      console.log('Seeding initial calendar events to Firestore...');
      for (const e of MOCK_EVENTS) {
        await setDoc(doc(db, EVENTS_COL, e.id), {
          ...e,
          createdAt: new Date().toISOString()
        });
      }
    }

    const stdSnap = await getDocs(collection(db, STUDENTS_COL));
    if (stdSnap.empty) {
      console.log('Seeding initial student profiles to Firestore...');
      for (const std of INITIAL_STUDENTS) {
        await setDoc(doc(db, STUDENTS_COL, std.studentId), {
          ...std,
          updatedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.warn('Firestore seed warning (will use offline fallback):', err);
  }
}

/**
 * Realtime listener for Announcements
 */
export function subscribeToAnnouncements(callback: (data: Announcement[]) => void) {
  const colRef = collection(db, ANNOUNCEMENTS_COL);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Announcement[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as Announcement[];

      // Sort pinned first, then by date descending
      items.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      callback(items);
    },
    (error) => {
      console.warn('Announcements snapshot error:', error);
      callback(MOCK_ANNOUNCEMENTS);
    }
  );
}

/**
 * Realtime listener for Assignments
 */
export function subscribeToAssignments(callback: (data: Assignment[]) => void) {
  const colRef = collection(db, ASSIGNMENTS_COL);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Assignment[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as Assignment[];
      callback(items);
    },
    (error) => {
      console.warn('Assignments snapshot error:', error);
      callback(MOCK_ASSIGNMENTS);
    }
  );
}

/**
 * Realtime listener for Notifications
 */
export function subscribeToNotifications(callback: (data: NotificationItem[]) => void) {
  const colRef = collection(db, NOTIFICATIONS_COL);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: NotificationItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as NotificationItem[];
      callback(items);
    },
    (error) => {
      console.warn('Notifications snapshot error:', error);
      callback(MOCK_NOTIFICATIONS);
    }
  );
}

/**
 * Realtime listener for Events
 */
export function subscribeToEvents(callback: (data: CalendarEvent[]) => void) {
  const colRef = collection(db, EVENTS_COL);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: CalendarEvent[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as CalendarEvent[];
      callback(items);
    },
    (error) => {
      console.warn('Events snapshot error:', error);
      callback(MOCK_EVENTS);
    }
  );
}

/**
 * Publish a new announcement to Cloud Firestore (Triggers live update across all devices)
 */
export async function addCloudAnnouncement(anc: Omit<Announcement, 'id'>) {
  const newId = 'anc_' + Date.now();
  await setDoc(doc(db, ANNOUNCEMENTS_COL, newId), {
    ...anc,
    id: newId,
    createdAt: new Date().toISOString()
  });

  // Also publish a realtime notification for everyone
  await addCloudNotification({
    title: `📢 ${anc.title}`,
    message: anc.description.substring(0, 120) + '...',
    date: 'Just now',
    type: 'announcement',
    read: false,
    linkTab: 'announcements'
  });
}

/**
 * Submit an assignment to Cloud Firestore
 */
export async function submitCloudAssignment(
  assignmentId: string, 
  submissionFile: string
) {
  const docRef = doc(db, ASSIGNMENTS_COL, assignmentId);
  await updateDoc(docRef, {
    status: 'submitted',
    submittedFile: submissionFile,
    submissionDate: new Date().toLocaleString()
  });

  await addCloudNotification({
    title: '✅ Assignment Submitted Online',
    message: `Your file "${submissionFile}" was securely uploaded to cloud records.`,
    date: 'Just now',
    type: 'assignment',
    read: false,
    linkTab: 'assignments'
  });
}

/**
 * Push a cloud notification
 */
export async function addCloudNotification(notif: Omit<NotificationItem, 'id'>) {
  const newId = 'n_' + Date.now();
  await setDoc(doc(db, NOTIFICATIONS_COL, newId), {
    ...notif,
    id: newId,
    createdAt: new Date().toISOString()
  });
}

/**
 * Mark notification as read
 */
export async function markNotificationReadInCloud(notificationId: string) {
  try {
    const docRef = doc(db, NOTIFICATIONS_COL, notificationId);
    await updateDoc(docRef, { read: true });
  } catch (err) {
    console.warn('Could not update notification read status in cloud:', err);
  }
}

/**
 * Create a new assignment online
 */
export async function addCloudAssignment(asg: Omit<Assignment, 'id'>) {
  const newId = 'asg_' + Date.now();
  await setDoc(doc(db, ASSIGNMENTS_COL, newId), {
    ...asg,
    id: newId,
    createdAt: new Date().toISOString()
  });

  await addCloudNotification({
    title: `📝 New Assignment: ${asg.title}`,
    message: `Due on ${asg.dueDate}. Total Points: ${asg.maxPoints}`,
    date: 'Just now',
    type: 'assignment',
    read: false,
    linkTab: 'assignments'
  });
}
