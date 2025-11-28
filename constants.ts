import { Internship, LogbookEntry, User, Notification, Student } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Aditi Sharma',
  role: 'student',
  email: 'aditi.s@college.edu',
  avatar: 'https://ui-avatars.com/api/?name=Aditi+Sharma&background=0D8ABC&color=fff',
  phone: '+91 98765 43210',
  department: 'Computer Science',
  bio: 'Final year CS student passionate about Frontend Development and AI.'
};

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechFlow Solutions',
    logo: 'https://ui-avatars.com/api/?name=TF&background=1976D2&color=fff',
    location: 'Bangalore (Hybrid)',
    type: 'Hybrid',
    stipend: '₹15,000/mo',
    status: 'Open',
    applicants: 45,
    postedDate: '2 days ago',
    duration: '6 Months',
    description: 'We are looking for a passionate Frontend Developer Intern to join our team. You will be working with React, TypeScript, and Tailwind CSS to build modern web applications.',
    skills: ['React', 'TypeScript', 'Tailwind', 'Git']
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataMinds Analytics',
    logo: 'https://ui-avatars.com/api/?name=DM&background=48C78E&color=fff',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹20,000/mo',
    status: 'Open',
    applicants: 120,
    postedDate: '1 week ago',
    duration: '3 Months',
    description: 'Join our data team to analyze large datasets and build predictive models. Proficiency in Python and SQL is required.',
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning']
  },
  {
    id: '3',
    title: 'UX/UI Design Intern',
    company: 'Creative Studios',
    logo: 'https://ui-avatars.com/api/?name=CS&background=9C27B0&color=fff',
    location: 'Mumbai',
    type: 'On-site',
    stipend: '₹12,000/mo',
    status: 'Closed',
    applicants: 30,
    postedDate: '3 weeks ago',
    duration: '6 Months',
    description: 'Work closely with our product team to design beautiful and intuitive user interfaces. Experience with Figma is a must.',
    skills: ['Figma', 'Prototyping', 'User Research']
  },
  {
    id: '4',
    title: 'Backend Engineer Intern',
    company: 'ServerLess Inc.',
    logo: 'https://ui-avatars.com/api/?name=SL&background=FF5722&color=fff',
    location: 'Gurgaon',
    type: 'On-site',
    stipend: '₹25,000/mo',
    status: 'Open',
    applicants: 89,
    postedDate: 'Just now',
    duration: '6 Months',
    description: 'Help us scale our backend infrastructure. You will work with Node.js, Express, and MongoDB.',
    skills: ['Node.js', 'MongoDB', 'AWS', 'API Design']
  },
  {
    id: '5',
    title: 'Mobile App Developer',
    company: 'AppWorks',
    logo: 'https://ui-avatars.com/api/?name=AW&background=E91E63&color=fff',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹18,000/mo',
    status: 'Open',
    applicants: 56,
    postedDate: '4 days ago',
    duration: '4 Months',
    description: 'Develop cross-platform mobile applications using Flutter.',
    skills: ['Flutter', 'Dart', 'Firebase']
  }
];

export const MOCK_LOGBOOK: LogbookEntry[] = [
  {
    id: 'l1',
    date: '2023-10-24',
    activity: 'Implemented login authentication using JWT tokens.',
    skills_learned: ['React', 'JWT', 'Security'],
    hours: 6,
    status: 'Approved',
    feedback: 'Great progress on security practices. Make sure to handle token expiration gracefully.',
    mediaUrl: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 'l2',
    date: '2023-10-25',
    activity: 'Designed the dashboard layout using Tailwind CSS.',
    skills_learned: ['CSS', 'Responsive Design', 'Tailwind'],
    hours: 5,
    status: 'Pending'
  },
  {
    id: 'l3',
    date: '2023-10-26',
    activity: 'Fixed bugs in the user profile update API.',
    skills_learned: ['Debugging', 'API', 'Backend'],
    hours: 4,
    status: 'Approved',
    feedback: 'Good attention to detail.'
  },
  {
    id: 'l4',
    date: '2023-10-27',
    activity: 'Attended team sprint planning meeting and assigned tasks.',
    skills_learned: ['Agile', 'Scrum', 'Communication'],
    hours: 2,
    status: 'Approved',
    feedback: 'Participation in meetings is key to team success.'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Logbook Approved',
    message: 'Your logbook entry for Oct 26 has been approved by Prof. Mehta.',
    date: '2 hours ago',
    read: false,
    type: 'success'
  },
  {
    id: 'n2',
    title: 'New Internship Alert',
    message: 'TechFlow Solutions posted a new role: Backend Engineer Intern.',
    date: '5 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: 'n3',
    title: 'Application Shortlisted',
    message: 'Congratulations! You have been shortlisted for the Data Science Intern role.',
    date: '1 day ago',
    read: true,
    type: 'success'
  },
  {
    id: 'n4',
    title: 'Missing Logbook Entry',
    message: 'You missed submitting your daily log for Oct 23. Please submit it immediately.',
    date: '2 days ago',
    read: true,
    type: 'warning'
  }
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aditi Sharma', email: 'aditi.s@college.edu', department: 'CS', year: '4th', gpa: 9.2, status: 'Interning', skills: ['React', 'Node'], company: 'TechFlow', avatar: 'https://ui-avatars.com/api/?name=Aditi+Sharma' },
  { id: 's2', name: 'Rahul Verma', email: 'rahul.v@college.edu', department: 'CS', year: '4th', gpa: 8.5, status: 'Seeking', skills: ['Python', 'ML'], avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma' },
  { id: 's3', name: 'Priya Singh', email: 'priya.s@college.edu', department: 'IT', year: '3rd', gpa: 8.8, status: 'Placed', skills: ['Java', 'Spring'], company: 'Infosys', avatar: 'https://ui-avatars.com/api/?name=Priya+Singh' },
  { id: 's4', name: 'Amit Patel', email: 'amit.p@college.edu', department: 'ECE', year: '4th', gpa: 7.9, status: 'Seeking', skills: ['Embedded', 'C++'], avatar: 'https://ui-avatars.com/api/?name=Amit+Patel' },
  { id: 's5', name: 'Sneha Gupta', email: 'sneha.g@college.edu', department: 'CS', year: '3rd', gpa: 9.5, status: 'Interning', skills: ['Figma', 'UI/UX'], company: 'Creative Studios', avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta' },
  { id: 's6', name: 'Vikram Malhotra', email: 'vikram.m@college.edu', department: 'Mech', year: '4th', gpa: 8.2, status: 'Placed', skills: ['AutoCAD', 'SolidWorks'], company: 'Tata Motors', avatar: 'https://ui-avatars.com/api/?name=Vikram+Malhotra' },
  { id: 's7', name: 'Rohan Das', email: 'rohan.d@college.edu', department: 'IT', year: '4th', gpa: 7.5, status: 'Seeking', skills: ['PHP', 'Laravel'], avatar: 'https://ui-avatars.com/api/?name=Rohan+Das' },
];
