// Notifications dropdown panel component
import React from 'react';
import { Bell } from 'lucide-react';
import type { NotificationItem } from '@/app/types/user';

interface NotificationsPanelProps {
  darkMode: boolean;
  testingMode: 'feeds' | 'soil';
  notifications: NotificationItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const NotificationsPanel = React.memo(({
  darkMode,
  testingMode,
  notifications,
  isOpen,
  onToggle,
  onClose
}: NotificationsPanelProps) => {
  const unreadCount = notifications.filter(n => n.unread).length;
  
  // Theme classes
  const navTextSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const navHoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';
  const cardBg = darkMode ? 'bg-[#1F1F1F]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textTertiary = darkMode ? 'text-gray-500' : 'text-gray-500';
  
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors relative`}
        aria-label="Notifications"
      >
        <Bell className={`size-4 md:size-5 ${navTextSecondary}`} />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 md:top-1 right-0.5 md:right-1 size-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          <div className={`absolute right-0 mt-2 w-80 sm:w-96 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto`}>
            <div className={`px-4 py-3 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
              <div className={`text-sm font-semibold ${textPrimary} flex items-center justify-between`}>
                <span>Notifications</span>
                <span className={`text-xs ${textTertiary}`}>{unreadCount} unread</span>
              </div>
            </div>
            <div className="divide-y divide-opacity-50" style={{ borderColor: darkMode ? '#2C2C2C' : '#e5e7eb' }}>
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 ${notification.unread ? (darkMode ? 'bg-blue-950/20' : 'bg-blue-50/50') : ''} hover:${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-50'} cursor-pointer transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`size-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.type === 'completed' ? 'bg-[#2d7a3e]' :
                      notification.type === 'arrived' ? 'bg-blue-500' :
                      notification.type === 'processing' ? 'bg-amber-500' :
                      notification.type === 'alert' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className={`text-sm ${textPrimary} ${notification.unread ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs ${textTertiary} mt-1`}>{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`px-4 py-3 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} text-center`}>
              <button className={`text-sm ${testingMode === 'feeds' ? 'text-[#2d7a3e] hover:text-[#246630]' : 'text-amber-800 hover:text-amber-900'} font-medium`}>
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

NotificationsPanel.displayName = 'NotificationsPanel';
