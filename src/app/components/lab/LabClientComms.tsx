import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Filter, 
  UserCircle2
} from 'lucide-react';
import { ClientMessage, CLIENT_MESSAGES } from '@/app/data/labMockData';
import { AdminSection } from './types';

interface LabClientCommsProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
  setSelectedMessage: (message: ClientMessage) => void;
  messageAssignments: Record<number, string>;
  onAssignMessage: (messageId: number, assignee: string) => void;
  labTeamMembers: string[];
}

export function LabClientComms({ 
  darkMode, 
  setActiveSection, 
  setSelectedMessage, 
  messageAssignments, 
  onAssignMessage, 
  labTeamMembers 
}: LabClientCommsProps) {
  // Client comms filter state
  const [clientFilter, setClientFilter] = useState<string>('');
  const [assignedToFilter, setAssignedToFilter] = useState<string>('');

  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor, hoverBg } = themeClasses;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Client Communications</h2>
      
      {/* Filters */}
      <div className={`${cardBg} ${borderColor} border rounded-lg p-4 mb-4 flex gap-4 items-center`}>
        <div className="flex items-center gap-2">
          <Filter className={`size-4 ${textSecondary}`} />
          <span className={`text-sm font-medium ${textSecondary}`}>Filters:</span>
        </div>
        
        {/* Client Filter */}
        <div className="flex-1">
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className={`w-full px-3 py-2 text-sm rounded border ${borderColor} ${
              darkMode ? 'bg-[#2C2C2C]' : 'bg-white'
            } ${textPrimary} cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">All Clients</option>
            {Array.from(new Set(CLIENT_MESSAGES.map(m => m.clientName))).sort().map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        
        {/* Assigned To Filter */}
        <div className="flex-1">
          <select
            value={assignedToFilter}
            onChange={(e) => setAssignedToFilter(e.target.value)}
            className={`w-full px-3 py-2 text-sm rounded border ${borderColor} ${
              darkMode ? 'bg-[#2C2C2C]' : 'bg-white'
            } ${textPrimary} cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            {labTeamMembers.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>
        
        {/* Clear Filters */}
        {(clientFilter || assignedToFilter) && (
          <button
            onClick={() => {
              setClientFilter('');
              setAssignedToFilter('');
            }}
            className={`px-3 py-2 text-sm rounded ${hoverBg} ${textSecondary} hover:${textPrimary} transition-colors`}
          >
            Clear
          </button>
        )}
      </div>
      
      {/* Client Inquiries List */}
      <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
        {(() => {
          // In dark mode (cannabis mode), show no messages
          const messagesData = darkMode ? [] : CLIENT_MESSAGES;
          
          const filteredMessages = messagesData.filter(message => {
            // Apply client filter
            if (clientFilter && message.clientName !== clientFilter) {
              return false;
            }
            
            // Apply assigned to filter
            if (assignedToFilter) {
              const assignedTo = messageAssignments[message.id];
              if (assignedToFilter === 'unassigned' && assignedTo) {
                return false;
              }
              if (assignedToFilter !== 'unassigned' && assignedTo !== assignedToFilter) {
                return false;
              }
            }
            
            return true;
          });
          
          if (filteredMessages.length === 0) {
            return (
              <div className={`p-8 text-center ${textSecondary}`}>
                <MessageSquare className={`size-12 mx-auto mb-3 opacity-50`} />
                <p className="text-sm">{darkMode ? 'No client communications found.' : 'No messages match the selected filters.'}</p>
              </div>
            );
          }
          
          return filteredMessages.map((message, index) => {
            const assignedTo = messageAssignments[message.id];
            
            return (
              <div 
                key={message.id}
                className={`p-5 ${index !== filteredMessages.length - 1 ? `border-b ${borderColor}` : ''}`}
              >
              <div className="flex items-start justify-between mb-2">
                <div 
                  className={`flex-1 cursor-pointer ${hoverBg} -m-2 p-2 rounded transition-colors`}
                  onClick={() => {
                    setSelectedMessage(message);
                    setActiveSection('chat');
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`text-sm font-semibold ${textPrimary}`}>{message.clientName}</div>
                    <div className={`text-xs ${textSecondary}`}>• {message.organization}</div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      message.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      message.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      message.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {message.status === 'resolved' ? 'Resolved' : 
                       message.priority === 'urgent' ? 'Urgent' :
                       message.priority === 'high' ? 'High Priority' :
                       'Normal Priority'}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${textPrimary} mb-1`}>
                    {message.subject}
                  </div>
                  <div className={`text-sm ${textSecondary} line-clamp-2`}>
                    {message.preview}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                  <div className={`text-xs ${textSecondary} whitespace-nowrap`}>
                    {message.timestamp}
                  </div>
                  
                  {/* Assignment Dropdown */}
                  <div className="relative">
                    <select
                      value={assignedTo || ''}
                      onChange={(e) => onAssignMessage(message.id, e.target.value)}
                      className={`text-xs px-2 py-1 pr-6 rounded border ${borderColor} ${
                        darkMode ? 'bg-[#2C2C2C]' : 'bg-white'
                      } ${textPrimary} cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                      <option value="">Assign to...</option>
                      {labTeamMembers.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Show assigned team member */}
                  {assignedTo && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                    }`}>
                      <UserCircle2 className="size-3" />
                      <span>{assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
