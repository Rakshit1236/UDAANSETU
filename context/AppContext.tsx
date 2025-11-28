import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Internship, LogbookEntry, Notification, Student, UserRole, Application } from '../types';
import { MOCK_USER, MOCK_INTERNSHIPS, MOCK_LOGBOOK, MOCK_NOTIFICATIONS, MOCK_STUDENTS } from '../constants';

// Initial Mock Applications
const MOCK_APPLICATIONS: Application[] = [
  { id: 'a1', internshipId: '1', studentId: 's1', status: 'Shortlisted', appliedDate: '2023-10-20', studentName: 'Aditi Sharma', studentAvatar: 'https://ui-avatars.com/api/?name=Aditi+Sharma', studentGpa: 9.2, jobTitle: 'Frontend Developer Intern' },
  { id: 'a2', internshipId: '2', studentId: 's2', status: 'Applied', appliedDate: '2023-10-22', studentName: 'Rahul Verma', studentAvatar: 'https://ui-avatars.com/api/?name=Rahul+Verma', studentGpa: 8.5, jobTitle: 'Data Science Intern' },
  { id: 'a3', internshipId: '1', studentId: 's5', status: 'Applied', appliedDate: '2023-10-23', studentName: 'Sneha Gupta', studentAvatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta', studentGpa: 9.5, jobTitle: 'Frontend Developer Intern' },
];

interface AppContextType {
  user: User | null;
  internships: Internship[];
  logbookEntries: LogbookEntry[];
  notifications: Notification[];
  students: Student[];
  applications: Application[];
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addLogEntry: (entry: LogbookEntry) => void;
  applyForInternship: (internshipId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  postInternship: (internship: Internship) => void;
  updateStudentStatus: (id: string, status: 'Placed' | 'Interning' | 'Seeking') => void;
  updateApplicationStatus: (appId: string, status: 'Shortlisted' | 'Rejected' | 'Accepted') => void;
  addStudent: (student: Student) => void;
  approveLogbookEntry: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [internships, setInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>(MOCK_LOGBOOK);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);

  const login = (role: UserRole, name?: string) => {
    const newUser = { 
      ...MOCK_USER, 
      role, 
      name: name || MOCK_USER.name,
      // If logging in as college/industry, ensure ID doesn't clash with student ID for logic checks
      id: role === 'student' ? 's1' : 'admin1' 
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addLogEntry = (entry: LogbookEntry) => {
    setLogbookEntries([entry, ...logbookEntries]);
    // Notify student instantly (simulation)
    const newNotif: Notification = {
      id: `n${Date.now()}`,
      title: 'Log Entry Submitted',
      message: `Your entry for ${entry.date} is pending approval.`,
      date: 'Just now',
      read: false,
      type: 'info'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const approveLogbookEntry = (id: string) => {
    setLogbookEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, status: 'Approved' } : entry
    ));
  };

  const applyForInternship = (internshipId: string) => {
    const internship = internships.find(i => i.id === internshipId);
    if (!internship || !user) return;

    // Create new application
    const newApp: Application = {
      id: `a${Date.now()}`,
      internshipId,
      studentId: user.id,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      studentName: user.name,
      studentAvatar: user.avatar,
      jobTitle: internship.title
    };

    setApplications([newApp, ...applications]);

    // Update internship applicant count
    setInternships(prev => prev.map(i => 
      i.id === internshipId ? { ...i, applicants: i.applicants + 1 } : i
    ));

    // Add a notification for the user
    const newNotif: Notification = {
      id: `n${Date.now()}`,
      title: 'Application Sent',
      message: `You successfully applied for ${internship.title} at ${internship.company}.`,
      date: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const postInternship = (internship: Internship) => {
    setInternships([internship, ...internships]);
    const newNotif: Notification = {
      id: `n${Date.now()}`,
      title: 'Job Posted Successfully',
      message: `${internship.title} is now live.`,
      date: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const updateStudentStatus = (id: string, status: 'Placed' | 'Interning' | 'Seeking') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const addStudent = (student: Student) => {
    setStudents([student, ...students]);
  };

  const updateApplicationStatus = (appId: string, status: 'Shortlisted' | 'Rejected' | 'Accepted') => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status } : app
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      internships,
      logbookEntries,
      notifications,
      students,
      applications,
      login,
      logout,
      updateUserProfile,
      addLogEntry,
      applyForInternship,
      markNotificationRead,
      markAllNotificationsRead,
      postInternship,
      updateStudentStatus,
      updateApplicationStatus,
      addStudent,
      approveLogbookEntry
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
