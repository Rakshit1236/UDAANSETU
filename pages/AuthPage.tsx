import React, { useState } from 'react';
import { Button } from '../components/Button';
import { UserRole } from '../types';
import { Mail, Lock, User, Building, GraduationCap, Briefcase } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (role: UserRole, name?: string) => void;
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('aditi.s@college.edu');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(role, mode === 'register' ? name : undefined);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 bg-[#1976D2] rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">
          P
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-medium text-[#1976D2] hover:text-blue-500">
            {mode === 'login' ? 'create a new account' : 'sign in to existing account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select your role</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'student', icon: GraduationCap, label: 'Student' },
                  { id: 'college', icon: Building, label: 'College' },
                  { id: 'industry', icon: Briefcase, label: 'Industry' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id as UserRole)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-all
                      ${role === r.id 
                        ? 'border-[#1976D2] bg-blue-50 text-[#1976D2] ring-1 ring-[#1976D2]' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    <r.icon className="w-5 h-5 mb-1" />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#1976D2] focus:border-[#1976D2] sm:text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#1976D2] focus:border-[#1976D2] sm:text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#1976D2] focus:border-[#1976D2] sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
