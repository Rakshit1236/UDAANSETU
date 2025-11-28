import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, CheckCircle, Globe, Shield, Users } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1976D2] rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="font-bold text-xl text-gray-900">Prashikshan</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={onLogin} className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</button>
              <Button onClick={onRegister} size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Bridging the Gap Between <span className="text-[#1976D2]">Academia</span> and <span className="text-[#48C78E]">Industry</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10">
              A comprehensive platform for managing internships, tracking progress via digital logbooks, and connecting students with top industry partners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={onRegister} size="lg" className="w-full sm:w-auto">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => {}} variant="outline" size="lg" className="w-full sm:w-auto">
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Prashikshan?</h2>
            <p className="mt-4 text-gray-600">Streamlining the entire internship lifecycle for everyone involved.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8 text-[#1976D2]" />,
                title: "Unified Ecosystem",
                desc: "Connects students, colleges, and industries in a single seamless environment."
              },
              {
                icon: <Shield className="w-8 h-8 text-[#48C78E]" />,
                title: "Digital Logbooks",
                desc: "Real-time tracking of daily activities with faculty verification and feedback."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Smart Matching",
                desc: "Intelligent algorithms to match student skills with industry requirements."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Students", value: "10,000+" },
              { label: "Partner Colleges", value: "150+" },
              { label: "Industry Partners", value: "500+" },
              { label: "Internships Completed", value: "25k+" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-extrabold text-[#1976D2] mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-[#1976D2] rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-xl">Prashikshan</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 Prashikshan Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
