import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { DashboardLayout } from './components/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CollegeDashboard } from './pages/CollegeDashboard';
import { IndustryDashboard } from './pages/IndustryDashboard';
import { LogbookPage } from './pages/LogbookPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { StudentManagementPage } from './pages/StudentManagementPage';
import { ReportsPage } from './pages/ReportsPage';
import { CandidatesPage } from './pages/CandidatesPage';

const App: React.FC = () => {
  const { user, login, logout } = useApp();
  const [currentPage, setCurrentPage] = useState('landing');

  // Navigation Helper
  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (role: any, name?: string) => {
    login(role, name);
    navigate('dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('landing');
  };

  // View Routing Logic
  if (!user) {
    if (currentPage === 'login') return <AuthPage onLoginSuccess={handleLoginSuccess} initialMode="login" />;
    if (currentPage === 'register') return <AuthPage onLoginSuccess={handleLoginSuccess} initialMode="register" />;
    return <LandingPage onLogin={() => navigate('login')} onRegister={() => navigate('register')} />;
  }

  // Authenticated Views
  const renderDashboardContent = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user.role === 'student') return <StudentDashboard onNavigate={navigate} />;
        if (user.role === 'college') return <CollegeDashboard />;
        if (user.role === 'industry') return <IndustryDashboard />;
        return <StudentDashboard onNavigate={navigate} />; // Fallback
      
      case 'internships':
        return <InternshipsPage />;
      
      case 'logbook':
        return <LogbookPage />;

      case 'students':
        return <StudentManagementPage />;

      case 'reports':
        return <ReportsPage />;

      case 'postings':
        return <IndustryDashboard />; 

      case 'candidates':
        return <CandidatesPage />;
        
      case 'notifications':
        return <NotificationsPage />;
        
      case 'settings':
        return <SettingsPage />;

      default:
        return <StudentDashboard onNavigate={navigate} />;
    }
  };

  return (
    <DashboardLayout 
      user={user} 
      onLogout={handleLogout}
      currentPage={currentPage}
      onNavigate={navigate}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default App;
