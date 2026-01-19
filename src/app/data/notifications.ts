// Mock notifications data - extracted for performance optimization

export interface Notification {
  id: number;
  type: 'completed' | 'arrived' | 'processing' | 'alert' | 'system';
  message: string;
  time: string;
  unread: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'completed',
    message: 'Sample 1-001-023 (North Field Hay) completed analysis',
    time: '12 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'arrived',
    message: '4 samples from West Pasture project arrived at lab',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 3,
    type: 'processing',
    message: 'Sample 1-001-019 (Corn Silage) entered processing queue',
    time: '5 hours ago',
    unread: false
  },
  {
    id: 4,
    type: 'alert',
    message: 'Low moisture content detected in Sample 1-001-017 - Review recommended',
    time: '1 day ago',
    unread: true
  },
  {
    id: 5,
    type: 'system',
    message: 'Scheduled maintenance: Lab closed January 20th for equipment calibration',
    time: '2 days ago',
    unread: false
  },
  {
    id: 6,
    type: 'completed',
    message: 'Soil analysis package for South Field completed',
    time: '3 days ago',
    unread: false
  }
];
