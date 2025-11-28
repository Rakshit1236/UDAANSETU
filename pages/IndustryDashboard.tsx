import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, Users, Briefcase, Search, X } from 'lucide-react';
import { Internship } from '../types';

export const IndustryDashboard: React.FC = () => {
  const { internships, postInternship, applications } = useApp();
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: 'TechFlow Solutions', // Default for demo
    location: '',
    stipend: '',
    type: 'Remote',
    description: '',
    skills: ''
  });

  const totalApplicants = applications.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const internship: Internship = {
      id: `i${Date.now()}`,
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      type: newJob.type as any,
      stipend: newJob.stipend,
      status: 'Open',
      applicants: 0,
      postedDate: 'Just now',
      duration: '3 Months',
      description: newJob.description,
      skills: newJob.skills.split(',').map(s => s.trim())
    };
    postInternship(internship);
    setShowPostModal(false);
    setNewJob({ ...newJob, title: '', location: '', stipend: '', description: '', skills: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industry Dashboard</h1>
          <p className="text-gray-600">Manage your postings and find the best talent.</p>
        </div>
        <Button onClick={() => setShowPostModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Post Internship
        </Button>
      </div>

      {/* Post Internship Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Create New Opportunity</h3>
              <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handlePost} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. React Developer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
                  <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.stipend} onChange={e => setNewJob({...newJob, stipend: e.target.value})} placeholder="e.g. ₹15,000/mo" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Bangalore" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="Job description..." />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} placeholder="React, Node.js" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowPostModal(false)}>Cancel</Button>
                <Button type="submit">Post Opportunity</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1976D2] text-white">
          <h3 className="text-blue-100 font-medium">Active Postings</h3>
          <p className="text-3xl font-bold mt-2">{internships.length}</p>
        </Card>
        <Card>
          <h3 className="text-gray-500 font-medium">Total Applicants</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalApplicants}</p>
        </Card>
        <Card>
          <h3 className="text-gray-500 font-medium">Shortlisted</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{shortlistedCount}</p>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search applicants by skill, college..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Your Recent Postings</h2>
      <div className="grid grid-cols-1 gap-4">
        {internships.map((job) => (
          <Card key={job.id} className="hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.stipend}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {job.applicants} Applicants
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {job.status}
                </span>
                <Button size="sm" variant="outline" onClick={() => {}}>Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
