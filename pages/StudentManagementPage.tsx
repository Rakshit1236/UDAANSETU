import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Filter, MoreVertical, Download, Plus, X } from 'lucide-react';
import { Student } from '../types';

export const StudentManagementPage: React.FC = () => {
  const { students, addStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    department: 'CS',
    year: '1st',
    gpa: ''
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: `s${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
      year: newStudent.year,
      gpa: Number(newStudent.gpa),
      status: 'Seeking',
      skills: [],
      avatar: `https://ui-avatars.com/api/?name=${newStudent.name.replace(' ', '+')}`
    };
    addStudent(student);
    setShowAddModal(false);
    setNewStudent({ name: '', email: '', department: 'CS', year: '1st', gpa: '' });
  };

  const handleExport = () => {
    alert("Exporting student data to CSV...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Monitor student progress and placement status.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={handleExport}><Download size={16} className="mr-2"/> Export CSV</Button>
           <Button onClick={() => setShowAddModal(true)}><Plus size={16} className="mr-2"/> Add Student</Button>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} placeholder="student@college.edu" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newStudent.department} onChange={e => setNewStudent({...newStudent, department: e.target.value})}>
                    <option>CS</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>MECH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newStudent.year} onChange={e => setNewStudent({...newStudent, year: e.target.value})}>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                <input required type="number" step="0.1" max="10" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newStudent.gpa} onChange={e => setNewStudent({...newStudent, gpa: e.target.value})} placeholder="e.g. 8.5" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit">Add Student</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card>
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Filter size={16} className="mr-2"/> Filter</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">GPA</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-200" />
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.department} - {student.year} Yr</td>
                  <td className="px-6 py-4 font-medium">{student.gpa}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                      ${student.status === 'Placed' ? 'bg-green-50 text-green-700 border-green-200' :
                        student.status === 'Interning' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'}
                    `}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.company || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                 <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
