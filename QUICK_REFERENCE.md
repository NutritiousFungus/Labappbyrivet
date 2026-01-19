# Quick Reference Guide - New Utilities & Components

## 🎯 When to Use What

### Need to filter samples?
```typescript
import { applyAllFilters } from '@/app/utils/filterUtils';

const filtered = useMemo(() => 
  applyAllFilters(samples, farm, searchQuery, filters),
  [samples, farm, searchQuery, filters]
);
```

### Need to work with projects?
```typescript
import { 
  getSamplesForProject,
  getProjectForSample,
  assignSampleToProject 
} from '@/app/utils/sampleUtils';

// Get all samples in a project
const projectSamples = getSamplesForProject('proj-1', allSamples, assignments);

// Find which project a sample belongs to
const projectId = getProjectForSample('1-001-027', assignments);

// Move a sample to a different project
const newAssignments = assignSampleToProject('1-001-027', 'proj-2', currentAssignments);
```

### Need sample statistics?
```typescript
import { calculateSampleStats } from '@/app/utils/sampleUtils';

const stats = useMemo(() => 
  calculateSampleStats(samples, selectedFarm, testingMode),
  [samples, selectedFarm, testingMode]
);
// Returns: { completedLast30Days, partiallyComplete, inProcess, pendingArrival }
```

### Need user data?
```typescript
import { CURRENT_USER } from '@/app/constants/userData';

// Single source of truth - don't create new user objects
console.log(CURRENT_USER.name); // "Austin Russell"
console.log(CURRENT_USER.farms); // ['Standard Dairy Consultants', 'Friendly Illinois Brothers', 'Goeser\'s Grazers']
```

### Need to add notifications UI?
```tsx
import { NotificationsPanel } from '@/app/components/NotificationsPanel';
import { MOCK_NOTIFICATIONS } from '@/app/data/notifications';

<NotificationsPanel
  darkMode={darkMode}
  testingMode={testingMode}
  notifications={MOCK_NOTIFICATIONS}
  isOpen={showNotifications}
  onToggle={() => setShowNotifications(!showNotifications)}
  onClose={() => setShowNotifications(false)}
/>
```

### Need lab tools menu?
```tsx
import { LabToolsMenu } from '@/app/components/LabToolsMenu';

<LabToolsMenu
  darkMode={darkMode}
  isOpen={showLabToolsMenu}
  onToggle={() => setShowLabToolsMenu(!showLabToolsMenu)}
  onClose={() => setShowLabToolsMenu(false)}
  onWhatIsNIR={() => setShowWhatIsNIR(true)}
  onCustomPackages={() => setShowCustomPackages(true)}
  onSamplingInstructions={() => openSamplingModal()}
  onBulkSubmission={() => openBulkModal()}
/>
```

### Need profile menu?
```tsx
import { ProfileMenu } from '@/app/components/ProfileMenu';

<ProfileMenu
  darkMode={darkMode}
  currentUser={CURRENT_USER}
  isOpen={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
  onClose={() => setIsOpen(false)}
  onAccountSettings={() => navigate('settings')}
  onAccountBalance={() => navigate('balance')}
  onCareers={() => navigate('careers')}
  onGrowWithUs={() => navigate('grow')}
  onAboutUs={() => navigate('about')}
  onLogout={() => handleLogout()}
/>
```

## 📘 TypeScript Types

### Import types as needed:
```typescript
import type { 
  User,
  NotificationItem,
  CustomPackage,
  ViewMode,
  InfoPage,
  SampleProjectView,
  SampleStatus
} from '@/app/types';
```

### Using types:
```typescript
// State with proper types
const [viewMode, setViewMode] = useState<ViewMode>('client');
const [infoPage, setInfoPage] = useState<InfoPage>(null);
const [packages, setPackages] = useState<CustomPackage[]>([]);

// Function parameters
function handleSample(status: SampleStatus) {
  // TypeScript knows status is 'pending' | 'processing' | 'partial' | 'completed'
}
```

## 🎨 Component Patterns

### Memoization (when to use)
```typescript
// ✅ Good - expensive calculation
const stats = useMemo(() => 
  calculateSampleStats(samples, farm, mode),
  [samples, farm, mode]
);

// ✅ Good - callbacks passed to child components
const handleClick = useCallback((id: string) => {
  doSomething(id);
}, []);

// ❌ Not needed - simple values
const isActive = status === 'active'; // No useMemo needed
```

### Custom Hooks Usage
```typescript
// Project management
import { useProjectManagement } from '@/app/hooks/useProjectManagement';

const {
  projectSampleAssignments,
  getSamples,
  getProjectsWithCounts,
  assignToProject
} = useProjectManagement({ recentActivity });

// Custom packages
import { useCustomPackages } from '@/app/hooks/useCustomPackages';

const {
  getPackagesForFarm,
  savePackage,
  deletePackage
} = useCustomPackages();
```

## ⚡ Performance Tips

### 1. Use single-pass filtering
```typescript
// ❌ Multiple passes
const filtered = data
  .filter(x => x.farm === farm)
  .filter(x => x.status === status)
  .filter(x => x.type === type);

// ✅ Single pass with utility
const filtered = applyAllFilters(data, farm, query, filters);
```

### 2. Memoize expensive operations
```typescript
// ✅ Only recalculates when dependencies change
const expensive = useMemo(() => 
  doExpensiveCalculation(data),
  [data]
);
```

### 3. Extract static data
```typescript
// ❌ Created every render
function Component() {
  const config = { option1: true, option2: false };
  // ...
}

// ✅ Created once
const CONFIG = { option1: true, option2: false };
function Component() {
  // Use CONFIG
}
```

## 🐛 Common Patterns

### Searching samples
```typescript
const searchResults = useMemo(() => {
  if (!searchQuery) return allSamples;
  const query = searchQuery.toLowerCase();
  return allSamples.filter(sample =>
    sample.id.toLowerCase().includes(query) ||
    sample.name.toLowerCase().includes(query)
  );
}, [allSamples, searchQuery]);
```

### Toggling modals
```typescript
// Using custom hook
const modals = useModalState();
modals.openModal('showIntakeFlow');
modals.closeModal('showIntakeFlow');
modals.toggleModal('showAccountMenu');

// Manual state
const [isOpen, setIsOpen] = useState(false);
<Component 
  isOpen={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
  onClose={() => setIsOpen(false)}
/>
```

### Handling projects
```typescript
// Get samples for project display
const projectSamples = getSamples(projectId);

// Get project counts for sidebar
const projects = getProjectsWithCounts(farmName);

// Reassign a sample
assignToProject(sampleId, newProjectId);

// Assign to multiple projects
assignToProjects(sampleId, [proj1, proj2]);
```

## 📦 File Organization

```
/src/app/
├── components/          # UI Components
│   ├── NotificationsPanel.tsx
│   ├── LabToolsMenu.tsx
│   ├── ProfileMenu.tsx
│   └── ...
├── hooks/              # Custom hooks
│   ├── useProjectManagement.ts
│   ├── useCustomPackages.ts
│   ├── useFilters.ts
│   └── ...
├── utils/              # Pure utility functions
│   ├── sampleUtils.ts
│   ├── filterUtils.ts
│   ├── statusUtils.ts
│   └── ...
├── constants/          # App constants
│   ├── userData.ts
│   ├── theme.ts
│   └── ...
├── types/              # TypeScript types
│   ├── index.ts
│   └── user.ts
└── data/               # Mock data & generators
    ├── sampleGenerator.ts
    ├── mockData.ts
    └── ...
```

## 🎓 Best Practices

### 1. Import utilities, don't duplicate
```typescript
// ❌ Don't recreate logic
function Component() {
  const filtered = items.filter(x => /* complex logic */);
}

// ✅ Use existing utilities
import { applyAllFilters } from '@/app/utils/filterUtils';
const filtered = applyAllFilters(items, farm, query, filters);
```

### 2. Use constants for shared data
```typescript
// ❌ Don't create inline
const user = { name: 'Austin', email: '...' };

// ✅ Import constant
import { CURRENT_USER } from '@/app/constants/userData';
```

### 3. Type everything
```typescript
// ❌ Implicit any
function handleClick(status) { }

// ✅ Explicit types
function handleClick(status: SampleStatus) { }
```

### 4. Memoize appropriately
```typescript
// ✅ Memoize expensive operations
const stats = useMemo(() => calculate(data), [data]);

// ✅ Memoize callbacks for child props
const onClick = useCallback(() => {}, []);

// ❌ Don't over-memoize
const sum = useMemo(() => a + b, [a, b]); // Overkill!
```

## 🚀 Migration Checklist

When refactoring existing code:

- [ ] Replace inline user data with `CURRENT_USER`
- [ ] Replace filtering loops with `applyAllFilters()`
- [ ] Replace stats calculation with `calculateSampleStats()`
- [ ] Extract navigation components (Notifications, LabTools, Profile)
- [ ] Use proper TypeScript types from `/types`
- [ ] Move constants to `/constants`
- [ ] Add `useCallback` to event handlers passed as props
- [ ] Add `useMemo` to expensive calculations
- [ ] Test that dependencies are correct

---

**Remember:** The goal is **smart, efficient, clean, and better** code! 🎯
