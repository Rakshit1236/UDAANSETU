import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Download, Calendar } from 'lucide-react';

const MONTHLY_LOG_DATA = [
  { name: 'Aug', hours: 400 },
  { name: 'Sep', hours: 850 },
  { name: 'Oct', hours: 1200 },
  { name: 'Nov', hours: 1100 },
  { name: 'Dec', hours: 600 },
];

const PLACEMENT_BY_DEPT = [
  { name: 'Computer Science', placed: 85, seeking: 15 },
  { name: 'Info Tech', placed: 70, seeking: 30 },
  { name: 'Electronics', placed: 60, seeking: 40 },
  { name: 'Mechanical', placed: 50, seeking: 50 },
];

const SKILL_DEMAND = [
  { name: 'React', value: 35 },
  { name: 'Python', value: 25 },
  { name: 'Java', value: 20 },
  { name: 'Node.js', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#1976D2', '#48C78E', '#FFBB28', '#FF8042', '#8884d8'];

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Deep dive into internship performance and placement stats.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar size={16} className="mr-2"/> This Year</Button>
          <Button><Download size={16} className="mr-2"/> Download PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement by Dept */}
        <Card title="Placement vs Seeking by Department">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLACEMENT_BY_DEPT}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="placed" fill="#1976D2" name="Placed %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="seeking" fill="#E5E7EB" name="Seeking %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Total Internship Hours Trend */}
        <Card title="Total Internship Hours (Monthly)">
          <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MONTHLY_LOG_DATA}>
                 <defs>
                   <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#48C78E" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#48C78E" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Area type="monotone" dataKey="hours" stroke="#48C78E" fillOpacity={1} fill="url(#colorHours)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Demand Distribution */}
        <Card title="Top Skills in Demand">
           <div className="h-80 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={SKILL_DEMAND}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={100}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {SKILL_DEMAND.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex flex-wrap justify-center gap-4 mt-2">
             {SKILL_DEMAND.map((entry, index) => (
               <div key={index} className="flex items-center gap-2 text-sm">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                 <span>{entry.name}</span>
               </div>
             ))}
           </div>
        </Card>

        {/* Key Metrics */}
        <Card title="Performance Summary">
           <div className="space-y-6">
             {[
               { label: "Placement Rate", value: "82%", sub: "+5% from last year", color: "text-green-600" },
               { label: "Avg. Stipend", value: "₹18,500", sub: "Top 10% earn > ₹30k", color: "text-blue-600" },
               { label: "Partner Satisfaction", value: "4.8/5", sub: "Based on 45 reviews", color: "text-purple-600" },
               { label: "Total Logged Hours", value: "12,450", sub: "Across all departments", color: "text-orange-600" },
             ].map((metric, i) => (
               <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                 <div>
                   <div className="text-gray-500 font-medium text-sm">{metric.label}</div>
                   <div className="text-xs text-gray-400">{metric.sub}</div>
                 </div>
                 <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
               </div>
             ))}
           </div>
        </Card>
      </div>
    </div>
  );
};
