import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Download, MessageSquare, Check, X, Search } from 'lucide-react';

export const CandidatesPage: React.FC = () => {
  const { applications, updateApplicationStatus } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
           <p className="text-gray-600">Review applications for your posted roles.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
             <option>All Jobs</option>
             <option>Frontend Developer</option>
             <option>Data Analyst</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.length > 0 ? applications.map((app) => (
          <Card key={app.id} className={`transition-all ${app.status === 'Rejected' ? 'opacity-60 bg-gray-50' : ''} ${app.status === 'Shortlisted' ? 'border-green-200 bg-green-50/20' : ''} ${app.status === 'Accepted' ? 'border-blue-200 bg-blue-50/20' : ''}`}>
            <div className="flex flex-col sm:flex-row gap-6 p-2">
              <div className="flex-shrink-0">
                <img src={app.studentAvatar} alt={app.studentName} className="w-20 h-20 rounded-full object-cover bg-gray-100" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{app.studentName}</h3>
                    <p className="text-gray-600">Applying for: <span className="font-medium text-[#1976D2]">{app.jobTitle}</span></p>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm"><MessageSquare size={16} className="text-gray-500"/></Button>
                     <Button variant="outline" size="sm"><Download size={16} className="text-gray-500"/></Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">GPA: <span className="text-gray-900 font-semibold">{app.studentGpa || 'N/A'}</span></span>
                  <span>|</span>
                  <span>Applied: {app.appliedDate}</span>
                </div>
              </div>
              
              {/* Action Area */}
              <div className="flex flex-col justify-center gap-2 border-l border-gray-100 pl-0 sm:pl-6 pt-4 sm:pt-0 min-w-[140px]">
                {app.status !== 'Applied' ? (
                   <div className={`text-center font-bold px-3 py-2 rounded-lg 
                     ${app.status === 'Shortlisted' ? 'text-green-600 bg-green-100' : 
                       app.status === 'Rejected' ? 'text-red-600 bg-red-100' : 
                       'text-blue-600 bg-blue-100'}`}>
                     {app.status}
                   </div>
                ) : (
                  <>
                    <Button onClick={() => updateApplicationStatus(app.id, 'Shortlisted')} className="w-full sm:w-auto" size="sm">
                      <Check size={16} className="mr-2" /> Shortlist
                    </Button>
                    <Button onClick={() => updateApplicationStatus(app.id, 'Rejected')} variant="outline" className="w-full sm:w-auto text-red-600 hover:bg-red-50 border-red-200" size="sm">
                      <X size={16} className="mr-2" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        )) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates yet</h3>
            <p className="mt-1 text-sm text-gray-500">Wait for students to apply to your jobs.</p>
          </div>
        )}
      </div>
    </div>
  );
};
