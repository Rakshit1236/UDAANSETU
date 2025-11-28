import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, Building, FileCheck, TrendingUp, Check } from 'lucide-react';

const COLORS = ['#48C78E', '#1976D2', '#FFBB28'];

export const CollegeDashboard: React.FC = () => {
  const { students, internships, logbookEntries, approveLogbookEntry } = useApp();

  // Dynamic calculations
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const interningStudents = students.filter(s => s.status === 'Interning').length;
  const seekingStudents = students.filter(s => s.status === 'Seeking').length;
  const pendingApprovals = logbookEntries.filter(e => e.status === 'Pending').slice(0, 5); // Just show recent 5

  const placementData = [
    { name: 'CS', placed: students.filter(s => s.department === 'CS' && s.status === 'Placed').length, total: students.filter(s => s.department === 'CS').length },
    { name: 'IT', placed: students.filter(s => s.department === 'IT' && s.status === 'Placed').length, total: students.filter(s => s.department === 'IT').length },
    { name: 'ECE', placed: students.filter(s => s.department === 'ECE' && s.status === 'Placed').length, total: students.filter(s => s.department === 'ECE').length },
  ];

  const statusData = [
    { name: 'Placed', value: placedStudents, color: '#48C78E' },
    { name: 'Interning', value: interningStudents, color: '#1976D2' },
    { name: 'Seeking', value: seekingStudents, color: '#FFBB28' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">College Overview</h1>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Industry Partners', value: '15', icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Active Internships', value: internships.length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Logs', value: logbookEntries.filter(e=>e.status==='Pending').length, icon: FileCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="flex items-center p-4">
             <div className={`p-3 rounded-lg mr-4 ${stat.bg}`}>
               <stat.icon className={`w-6 h-6 ${stat.color}`} />
             </div>
             <div>
               <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
               <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Department-wise Placement" className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="placed" name="Placed" fill="#1976D2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total Students" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Student Status Distribution" className="h-96">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {statusData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Pending Logbooks">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Activity</th>
                <th className="px-6 py-3">Hours</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingApprovals.length > 0 ? pendingApprovals.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4">{entry.activity}</td>
                  <td className="px-6 py-4">{entry.hours}h</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span></td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline" onClick={() => approveLogbookEntry(entry.id)}>
                      <Check size={14} className="mr-1" /> Approve
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No pending logbooks.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
