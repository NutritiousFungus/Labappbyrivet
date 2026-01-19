import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Send,
  UserCircle2
} from 'lucide-react';
import { ClientMessage, CLIENT_MESSAGE_FULL_TEXT } from '@/app/data/labMockData';

interface LabChatProps {
  darkMode: boolean;
  selectedMessage: ClientMessage;
  onBack: () => void;
  messageAssignments: Record<number, string>;
  onAssignMessage: (messageId: number, assignee: string) => void;
  labTeamMembers: string[];
}

export function LabChat({ 
  darkMode, 
  selectedMessage, 
  onBack, 
  messageAssignments, 
  onAssignMessage, 
  labTeamMembers 
}: LabChatProps) {
  const [chatInput, setChatInput] = useState('');

  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor, hoverBg } = themeClasses;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back to Messages</span>
      </button>

      {/* Chat Header */}
      <div className={`${cardBg} ${borderColor} border rounded-lg p-4 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${textPrimary} mb-1`}>{selectedMessage.clientName}</h2>
            <div className={`text-sm ${textSecondary}`}>{selectedMessage.organization}</div>
            <div className={`text-sm font-medium ${textPrimary} mt-2`}>{selectedMessage.subject}</div>
            
            {/* Show assigned team member in chat */}
            {messageAssignments[selectedMessage.id] && (
              <div className={`flex items-center gap-1 mt-2 px-2 py-1 rounded text-xs inline-flex ${
                darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
              }`}>
                <UserCircle2 className="size-3" />
                <span>Assigned to: {messageAssignments[selectedMessage.id]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            {/* Assignment Dropdown in Chat */}
            <div className="relative">
              <select
                value={messageAssignments[selectedMessage.id] || ''}
                onChange={(e) => onAssignMessage(selectedMessage.id, e.target.value)}
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
            
            <div className="flex items-center gap-2">
              <button className={`p-2 ${hoverBg} rounded-full`}>
                <Phone className={`size-5 ${textSecondary}`} />
              </button>
              <button className={`p-2 ${hoverBg} rounded-full`}>
                <MoreVertical className={`size-5 ${textSecondary}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className={`${cardBg} ${borderColor} border rounded-lg p-6 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto`}>
        <div className="space-y-4">
          {/* Client Message */}
          <div className="flex gap-3">
            <div className={`size-10 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
              <User className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-sm font-semibold ${textPrimary}`}>{selectedMessage.clientName}</span>
                <span className={`text-xs ${textSecondary}`}>{selectedMessage.timestamp}</span>
              </div>
              <div className={`${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-100'} rounded-lg p-3`}>
                <p className={`text-sm ${textPrimary}`}>
                  {CLIENT_MESSAGE_FULL_TEXT[selectedMessage.id] || "Message content"}
                </p>
              </div>
            </div>
          </div>

          {/* Lab Response */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-xs ${textSecondary}`}>You • 1 hour ago</span>
              </div>
              <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-lg p-3 max-w-[80%]`}>
                <p className={`text-sm ${textPrimary}`}>
                  {selectedMessage.id === 7 
                    ? "Rebecca from billing confirmed this was a system error and issued credit memo #CM-4782. All set!"
                    : `Hi ${selectedMessage.clientName.split(' ')[0]}, thanks for reaching out. I'm reviewing your inquiry and will have a detailed response for you shortly. In the meantime, let me pull up your account information to better assist you.`}
                </p>
              </div>
            </div>
            <div className={`size-10 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
              <User className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className={`${cardBg} ${borderColor} border rounded-lg p-4`}>
        <div className="flex gap-3">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your response..."
            className={`flex-1 px-4 py-3 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'} ${borderColor} border rounded-lg ${textPrimary} resize-none focus:outline-none focus:ring-2 focus:ring-green-500`}
            rows={3}
          />
          <div className="flex flex-col gap-2">
            <button className={`p-3 ${hoverBg} rounded-lg transition-colors`}>
              <Paperclip className={`size-5 ${textSecondary}`} />
            </button>
            <button 
              className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => {
                if (chatInput.trim()) {
                  alert(`Message sent: ${chatInput}`);
                  setChatInput('');
                }
              }}
            >
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
