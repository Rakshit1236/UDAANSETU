import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Briefcase, Calendar, CheckCircle, Clock } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { user, logbookEntries, internships, applications } = useApp();

  // Dynamic calculations
  const myApplications = applications.filter(app => app.studentId === user?.id);
  const activeInternship = myApplications.find(app => app.status === 'Accepted' || app.status === 'Shortlisted'); // Simulating "Active" if shortlisted for demo
  const totalHours = logbookEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const approvedEntries = logbookEntries.filter(e => e.status === 'Approved').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's what's happening with your internships today.</p>
        </div>
        <Button onClick={() => onNavigate('logbook')}>Update Logbook</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#1976D2] to-blue-600 text-white border-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">Applied Internships</p>
              <p className="text-2xl font-bold">{myApplications.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Approved Logs</p>
              <p className="text-2xl font-bold text-gray-900">{approvedEntries}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Hours Completed</p>
              <p className="text-2xl font-bold text-gray-900">{totalHours}/200</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Internship */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Current Status">
            {activeInternship ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{activeInternship.jobTitle}</h3>
                    <p className="text-gray-600">Application Status: <span className="font-medium text-[#1976D2]">{activeInternship.status}</span></p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={14}/> Applied on {activeInternship.appliedDate}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Hours Progress</span>
                    <span className="font-medium text-gray-900">{Math.min(100, Math.round((totalHours/200)*100))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1976D2] h-2 rounded-full" style={{ width: `${Math.min(100, (totalHours/200)*100)}%` }}></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">You don't have an active internship yet.</p>
                <Button onClick={() => onNavigate('internships')}>Find Opportunities</Button>
              </div>
            )}
          </Card>

          <Card title="Recommended Opportunities" action={<Button variant="outline" size="sm" onClick={() => onNavigate('internships')}>View All</Button>}>
             <div className="space-y-4">
               {internships.slice(0, 2).map((internship) => (
                 <div key={internship.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all">
                   <div>
                     <h4 className="font-medium text-gray-900">{internship.title}</h4>
                     <p className="text-sm text-gray-500">{internship.company} • {internship.type}</p>
                   </div>
                   <Button size="sm" variant="outline" onClick={() => onNavigate('internships')}>Apply</Button>
                 </div>
               ))}
             </div>
          </Card>
        </div>

        {/* Recent Logbook */}
        <div className="lg:col-span-1">
          <Card title="Recent Logs" action={<button onClick={() => onNavigate('logbook')} className="text-sm text-[#1976D2] hover:underline">View All</button>}>
            <div className="space-y-4">
              {logbookEntries.length > 0 ? (
                logbookEntries.slice(0, 3).map((log) => (
                  <div key={log.id} className="relative pl-4 border-l-2 border-gray-200 pb-4 last:pb-0">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                      log.status === 'Approved' ? 'bg-green-500' : 
                      log.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-400'
                    }`}></div>
                    <div className="text-xs text-gray-500 mb-1">{log.date}</div>
                    <p className="text-sm text-gray-900 font-medium line-clamp-2">{log.activity}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {log.skills_learned.slice(0, 2).map(skill => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No entries yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
