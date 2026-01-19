// User-related type definitions

export interface UserRole {
  farm: string;
  role: 'Owner' | 'Nutritionist' | 'Manager' | 'Admin' | 'Viewer';
}

export interface User {
  name: string;
  email: string;
  farms: string[];
  roles: Record<string, string>;
}

export interface NotificationItem {
  id: string;
  type: 'completed' | 'arrived' | 'processing' | 'alert' | 'info';
  message: string;
  time: string;
  unread: boolean;
  sampleId?: string;
}
