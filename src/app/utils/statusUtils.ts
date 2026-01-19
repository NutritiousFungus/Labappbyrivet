// Status utility functions for sample status badges and colors

export type SampleStatus = 'pending-arrival' | 'in-process' | 'partially-complete' | 'complete';

export function getStatusColor(status: SampleStatus, darkMode: boolean): string {
  if (darkMode) {
    switch (status) {
      case 'complete':
        return 'bg-green-900/30 text-green-400 border-green-700/50';
      case 'partially-complete':
        return 'bg-blue-900/30 text-blue-400 border-blue-700/50';
      case 'in-process':
        return 'bg-amber-900/30 text-amber-400 border-amber-700/50';
      case 'pending-arrival':
        return 'bg-stone-700/50 text-stone-300 border-stone-600/50';
      default:
        return 'bg-stone-700/50 text-stone-300 border-stone-600/50';
    }
  } else {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partially-complete':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-process':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending-arrival':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  }
}

export function getStatusLabel(status: SampleStatus): string {
  switch (status) {
    case 'complete':
      return 'Complete';
    case 'partially-complete':
      return 'Partial';
    case 'in-process':
      return 'In Lab';
    case 'pending-arrival':
      return 'In Transit';
    default:
      return status;
  }
}

export function getStatusBadge(status: SampleStatus, darkMode: boolean): string {
  const color = getStatusColor(status, darkMode);
  return `px-2 py-0.5 rounded-full text-xs font-medium border ${color}`;
}

// Alternative status types used in some components
export type AlternativeStatus = 'completed' | 'partial' | 'processing' | 'intransit';

export function getAlternativeStatusColor(status: AlternativeStatus, darkMode: boolean): string {
  if (darkMode) {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border-green-700/50';
      case 'partial':
        return 'bg-blue-900/30 text-blue-400 border-blue-700/50';
      case 'processing':
        return 'bg-amber-900/30 text-amber-400 border-amber-700/50';
      case 'intransit':
        return 'bg-stone-700/50 text-stone-300 border-stone-600/50';
      default:
        return 'bg-stone-700/50 text-stone-300 border-stone-600/50';
    }
  } else {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'intransit':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  }
}

export function getAlternativeStatusLabel(status: AlternativeStatus): string {
  switch (status) {
    case 'completed':
      return 'Complete';
    case 'partial':
      return 'Partial';
    case 'processing':
      return 'In Lab';
    case 'intransit':
      return 'In Transit';
    default:
      return status;
  }
}
