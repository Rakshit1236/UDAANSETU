import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell, Check, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>Mark all as read</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`transition-all ${!notif.read ? 'border-l-4 border-l-[#1976D2] bg-blue-50/30' : ''}`}>
             <div className="flex gap-4">
               <div className={`mt-1 p-2 rounded-full h-fit flex-shrink-0 ${
                 notif.type === 'success' ? 'bg-green-100' : 
                 notif.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
               }`}>
                 {getIcon(notif.type)}
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                   <h3 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                     {notif.title}
                   </h3>
                   <span className="text-xs text-gray-500">{notif.date}</span>
                 </div>
                 <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                 {!notif.read && (
                   <button 
                     onClick={() => markNotificationRead(notif.id)}
                     className="text-xs text-[#1976D2] font-medium mt-2 hover:underline"
                   >
                     Mark as read
                   </button>
                 )}
               </div>
             </div>
          </Card>
        ))}
        
        {notifications.length === 0 && (
           <div className="text-center py-10 text-gray-500">
             <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
             <p>You're all caught up!</p>
           </div>
        )}
      </div>
    </div>
  );
};
