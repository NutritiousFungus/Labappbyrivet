// Helper functions for sample generation and management

// Generate 4-character alphanumeric sample IDs (avoiding confusing characters)
export function generateSampleId(): string {
  // Use characters that are visually distinct (no 0/O, 1/I, etc.)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 4; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Format a sample ID with dashes (e.g., "1-001-027")
export function formatSampleId(counter: number): string {
  const thousandsPlace = Math.floor(counter / 1000);
  const remainder = counter % 1000;
  return `1-${String(thousandsPlace).padStart(3, '0')}-${String(remainder).padStart(3, '0')}`;
}

// Get a random date within the last N days
export function getRandomDate(daysBack: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString().split('T')[0];
}

// Get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
