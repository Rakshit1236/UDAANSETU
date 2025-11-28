import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, Mail, Phone, MapPin, Camera, Lock, Bell, Shield, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [formData, setFormData] = useState(user!);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateUserProfile(formData);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        {showSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg animate-fade-in-down">
            <Check size={16} /> Changes saved successfully
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'notifications', label: 'Notifications', icon: Bell },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-50 text-[#1976D2]' 
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card title="Public Profile">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="relative">
                    <img 
                      src={formData.avatar} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-[#1976D2] text-white rounded-full hover:bg-blue-700 transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{formData.name}</h3>
                    <p className="text-gray-500 capitalize">{formData.role} • {formData.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="email" 
                        value={formData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text" 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <Card title="Security Settings">
              <div className="space-y-6">
                <div>
                   <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                   <div className="space-y-4 max-w-md">
                     <input type="password" placeholder="Current Password" className="w-full p-2 border border-gray-300 rounded-lg" />
                     <input type="password" placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-lg" />
                     <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-gray-300 rounded-lg" />
                     <Button variant="outline">Update Password</Button>
                   </div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card title="Notification Preferences">
              <div className="space-y-4">
                {[
                  'Email notifications for new internships',
                  'Push notifications for logbook reminders',
                  'Email digest of weekly progress',
                  'Alerts for application status changes'
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-gray-700">{pref}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
