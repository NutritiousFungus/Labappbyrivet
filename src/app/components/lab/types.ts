export type AdminSection = 
  | 'home' 
  | 'client-comms' 
  | 'manage-lab-users'
  | 'test-view' 
  | 'upload-results' 
  | 'manage-orgs' 
  | 'manage-users' 
  | 'manage-projects' 
  | 'chat'
  | 'shipping'
  | 'supply-orders'
  | 'driver-routes';

export interface LabComponentProps {
  darkMode: boolean;
  onBack?: () => void;
}
