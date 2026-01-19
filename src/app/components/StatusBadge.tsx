import React from 'react';
import { Clock, FlaskConical, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  darkMode: boolean;
}

export function StatusBadge({ status, darkMode }: StatusBadgeProps) {
  switch (status) {
    case 'pending':
    case 'pending-arrival':
    case 'intransit':
      return (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full`}>
          <Clock className={`size-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} />
          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Pending Arrival</span>
        </div>
      );
    case 'processing':
    case 'in-process':
      return (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full`}>
          <FlaskConical className={`size-3 ${darkMode ? 'text-amber-600' : 'text-amber-800'}`} />
          <span className={`text-xs font-medium ${darkMode ? 'text-amber-600' : 'text-amber-800'}`}>In the Lab</span>
        </div>
      );
    case 'partial':
    case 'partially-complete':
      return (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full`}>
          <CheckCircle2 className={`size-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`} />
          <span className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Partially Complete</span>
        </div>
      );
    case 'completed':
    case 'complete':
      return (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full`}>
          <CheckCircle2 className={`size-3 text-[#2d7a3e]`} />
          <span className={`text-xs font-medium text-[#2d7a3e]`}>Complete</span>
        </div>
      );
    default:
      return null;
  }
}
