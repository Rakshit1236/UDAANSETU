import React from 'react';

export type UserRole = 'student' | 'college' | 'industry' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  phone?: string;
  department?: string;
  bio?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  stipend: string;
  status: 'Open' | 'Closed';
  applicants: number;
  postedDate: string;
  description: string;
  skills: string[];
  duration: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Accepted';
  appliedDate: string;
  studentName?: string; // Denormalized for easier display
  studentAvatar?: string;
  studentGpa?: number;
  jobTitle?: string;
}

export interface LogbookEntry {
  id: string;
  date: string;
  activity: string;
  skills_learned: string[];
  hours: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
  mediaUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  gpa: number;
  status: 'Placed' | 'Interning' | 'Seeking';
  skills: string[];
  company?: string; // If placed or interning
  avatar?: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<any>;
}
