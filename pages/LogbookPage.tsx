import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LogbookEntry } from '../types';
import { Calendar, Plus, Upload, Image as ImageIcon, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const LogbookPage: React.FC = () => {
  const { logbookEntries, addLogEntry } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  
  // New entry form state
  const [newActivity, setNewActivity] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newHours, setNewHours] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: LogbookEntry = {
      id: `l${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      activity: newActivity,
      skills_learned: newSkills.split(',').map(s => s.trim()),
      hours: Number(newHours),
      status: 'Pending',
      mediaUrl: file ? URL.createObjectURL(file) : undefined
    };

    addLogEntry(entry);
    setIsAdding(false);
    setNewActivity('');
    setNewSkills('');
    setNewHours('');
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Logbook</h1>
          <p className="text-gray-600">Track your internship activities and get faculty feedback.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {isAdding && (
        <Card className="border-[#1976D2] border-2 shadow-lg animate-fade-in-down">
          <form onSubmit={handleAddEntry} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What did you work on today?</label>
              <textarea 
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={3}
                placeholder="Describe your tasks..."
                value={newActivity}
                onChange={e => setNewActivity(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills Learned (comma separated)</label>
                <input 
                  type="text"
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="React, CSS, SQL"
                  value={newSkills}
                  onChange={e => setNewSkills(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours Spent</label>
                <input 
                  type="number"
                  className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="8"
                  value={newHours}
                  onChange={e => setNewHours(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Screenshots/Docs)</label>
               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                 <div className="space-y-1 text-center">
                   {file ? (
                     <div className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> {file.name}
                     </div>
                   ) : (
                     <>
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#1976D2] hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                     </>
                   )}
                 </div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit">Submit Entry</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {logbookEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 flex flex-col items-center">
                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#1976D2] font-bold">
                    {new Date(entry.date).getDate()}
                 </div>
                 <div className="text-xs text-gray-500 mt-1 uppercase">
                   {new Date(entry.date).toLocaleString('default', { month: 'short' })}
                 </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-lg">{entry.activity}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    entry.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    entry.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {entry.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {entry.skills_learned.map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      #{skill}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded flex items-center gap-1">
                    <Clock size={12} /> {entry.hours}h
                  </span>
                </div>

                {entry.mediaUrl && (
                  <div className="mt-2">
                    <img src={entry.mediaUrl} alt="Proof of work" className="h-32 rounded-lg object-cover border border-gray-200" />
                  </div>
                )}

                {entry.feedback && (
                  <div className="mt-3 bg-blue-50 p-3 rounded-lg flex items-start gap-2 text-sm text-blue-900">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Faculty Feedback:</span> {entry.feedback}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
