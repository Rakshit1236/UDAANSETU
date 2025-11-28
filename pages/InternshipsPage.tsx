import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, MapPin, DollarSign, Calendar, Filter, Check } from 'lucide-react';

export const InternshipsPage: React.FC = () => {
  const { internships, applyForInternship } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [applyingId, setApplyingId] = useState<string | null>(null);

  const filteredInternships = internships.filter(job => 
    (filterType === 'All' || job.type === filterType) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = (id: string) => {
    setApplyingId(id);
    // Simulate network delay
    setTimeout(() => {
      applyForInternship(id);
      setApplyingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Internships</h1>
          <p className="text-gray-600">Discover opportunities that match your skills.</p>
        </div>
        <Button>Upload Resume</Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by role or company..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
             {['All', 'Remote', 'On-site', 'Hybrid'].map(type => (
               <button
                 key={type}
                 onClick={() => setFilterType(type)}
                 className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                   ${filterType === type 
                     ? 'bg-[#1976D2] text-white' 
                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                 `}
               >
                 {type}
               </button>
             ))}
          </div>
        </div>
      </Card>

      {/* Internships List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInternships.map((job) => {
          // In a real app we would check a separate "applications" list
          // Here we use status="Closed" to simulate "Applied" for demo purposes based on AppContext logic
          const isApplied = job.status === 'Closed' && job.applicants > 0; 
          
          return (
            <Card key={job.id} className="hover:border-blue-300 transition-all cursor-pointer group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                   <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg object-cover bg-gray-50" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1976D2] transition-colors">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {job.status === 'Closed' ? 'Applied' : job.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-6 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={16}/> {job.stipend}</span>
                    <span className="flex items-center gap-1"><Calendar size={16}/> {job.duration}</span>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{job.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                     {job.skills.map((skill, idx) => (
                       <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs border border-gray-100">
                         {skill}
                       </span>
                     ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end min-w-[120px]">
                  <span className="text-xs text-gray-400">{job.postedDate}</span>
                  <Button 
                    className="w-full md:w-auto" 
                    disabled={job.status !== 'Open' || applyingId === job.id}
                    onClick={() => handleApply(job.id)}
                    isLoading={applyingId === job.id}
                    variant={isApplied ? 'outline' : 'primary'}
                  >
                    {isApplied ? <span className="flex items-center text-green-600"><Check size={16} className="mr-2"/> Applied</span> : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No internships found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
