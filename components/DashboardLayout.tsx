import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Users, 
  FileBarChart, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell
} from 'lucide-react';
import { Button } from './Button';

interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  user, 
  children, 
  onLogout,
  currentPage,
  onNavigate
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = (role: UserRole) => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    if (role === 'student') {
      return [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'internships', label: 'Find Internships', icon: Briefcase },
        { id: 'logbook', label: 'Logbook', icon: BookOpen },
        ...common.slice(1)
      ];
    } else if (role === 'college') {
      return [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'reports', label: 'Reports', icon: FileBarChart },
        ...common.slice(1)
      ];
    } else if (role === 'industry') {
      return [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'postings', label: 'Internships', icon: Briefcase },
        { id: 'candidates', label: 'Candidates', icon: Users },
        ...common.slice(1)
      ];
    }
    return common;
  };

  const navItems = getNavItems(user.role);

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1976D2] rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-xl text-gray-800">Prashikshan</span>
            </div>
            <button 
              className="lg:hidden text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 flex items-center gap-3 border-b border-gray-100">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
              alt={user.name} 
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${currentPage === item.id 
                    ? 'bg-blue-50 text-[#1976D2]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 lg:hidden px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 p-1"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-gray-800">Prashikshan</span>
          </div>
          <div className="relative">
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            <Bell size={24} className="text-gray-600" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
