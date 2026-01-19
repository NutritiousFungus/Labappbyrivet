// Helper to format timestamp - relative for <7 days, full date for >=7 days
export const formatTimestamp = (daysAgo: number, hoursAgo?: number) => {
  const now = new Date('2026-01-13T12:00:00'); // Current date/time
  
  if (daysAgo === 0 && hoursAgo !== undefined) {
    if (hoursAgo === 0) return 'Just now';
    if (hoursAgo === 1) return '1 hour ago';
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
  }
  
  if (daysAgo < 1 && hoursAgo !== undefined && hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }
  
  if (daysAgo === 1) return '1 day ago';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  
  // For 7+ days, show full date
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Helper to generate 4-character alphanumeric sample IDs (Container IDs)
export const generateSampleId = () => {
  // Use characters that are visually distinct (no 0/O, 1/I, etc.)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 4; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// Helper to generate display ID (e.g., #1027, #1026, etc.)
const generateDisplayId = (counter: number) => {
  return `#${counter}`;
};

// Helper to calculate expected completion date/time based on status
export const calculateExpectedCompletion = (status: string, createdDate: Date) => {
  const expected = new Date(createdDate);
  
  // Add business days for processing
  let businessDaysToAdd;
  switch (status) {
    case 'pending':
      businessDaysToAdd = 3; // 3 business days from receipt
      break;
    case 'processing':
      businessDaysToAdd = 1; // 1 business day remaining
      break;
    case 'partial':
      businessDaysToAdd = 1; // 1 business day for remaining tests
      break;
    case 'completed':
      return null; // No expected date for completed samples
    default:
      businessDaysToAdd = 3;
  }
  
  let daysAdded = 0;
  while (daysAdded < businessDaysToAdd) {
    expected.setDate(expected.getDate() + 1);
    const dayOfWeek = expected.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  
  // Set completion time to 5:00 PM (17:00)
  expected.setHours(17, 0, 0, 0);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return {
    date: `${months[expected.getMonth()]} ${expected.getDate()}, ${expected.getFullYear()}`,
    dayOfWeek: days[expected.getDay()],
    time: '5:00 PM'
  };
};

// Helper to generate sample data
export const generateSampleData = () => {
  const sampleNamesBySampleType: Record<string, string[]> = {
    'Corn Silage': ['East Bunker', 'West Field', 'North Silage', 'Silage Pile C', 'East Lot', 'Silage Bunker 1', 'Bunker Silo', 'West Bunker', 'Silage Mix', 'Field 7B', 'South Field', 'Field 12'],
    'Hay/Haylage': ['Hay Lot 5', 'Haylage Pit 2', 'Alfalfa Mix', 'Grass Hay', 'Pit 3', 'Dry Hay Batch', 'Haylage Test', 'Baleage Lot 7', 'First Cut Hay', 'Hay Sample 1', 'Mid Field'],
    'TMR': ['TMR Batch 3', 'TMR Mix 1', 'Morning Batch', 'Feed Mix A', 'TMR Evening', 'Morning Mix', 'Daily Ration', 'Ration Check', 'Batch 5'],
    'Grains/Commodities': ['Corn Grain', 'Soybean Meal', 'Whole Cottonseed', 'Lot C', 'Barley Sample', 'Sample A', 'Test Sample', 'South Lot']
  };
  const sampleTypes = ['Corn Silage', 'Hay/Haylage', 'TMR', 'Grains/Commodities'];
  const testPackages = ['Basic Check', 'Standard Profile', 'Nutritionist Select', 'Advanced Plus', 'CNCPS Complete', 'Premium Research'];
  const addOnsOptions = [[], ['DCAD'], ['Minerals'], ['In Situ'], ['DCAD', 'Minerals'], ['Minerals', 'In Situ']];
  const statuses = ['completed', 'processing', 'pending', 'partial'] as const;
  const farms = ['Friendly Illinois Brothers', 'Goeser\'s Grazers', 'Standard Dairy Consultants'];
  
  const samples = [];
  let idCounter = 1027;
  
  // Generate samples in blocks by type (more realistic for nutritionists)
  const blockSizes = [8, 6, 9, 5, 7, 8, 6, 10, 7, 9, 8, 6, 7, 5, 8, 9, 7, 6, 8, 7]; // Varying block sizes
  let sampleIndex = 0;
  
  for (const blockSize of blockSizes) {
    if (sampleIndex >= 150) break;
    
    // Pick a sample type for this block
    const sampleType = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
    const namesForType = sampleNamesBySampleType[sampleType];
    
    // Generate a block of samples of the same type
    for (let j = 0; j < blockSize && sampleIndex < 150; j++, sampleIndex++) {
      const i = sampleIndex;
      const id = generateDisplayId(idCounter - i);
      const bagLabelId = generateSampleId();
      
      // Calculate days/hours ago
      let timestamp;
      let daysAgo;
      if (i < 10) {
        // First 10: hours ago (0-14 hours)
        const hoursAgo = i + 1;
        timestamp = formatTimestamp(0, hoursAgo);
        daysAgo = 0;
      } else if (i < 30) {
        // Next 20: 1-6 days ago
        daysAgo = Math.floor((i - 9) / 3.5) + 1;
        timestamp = formatTimestamp(daysAgo);
      } else {
        // Rest: 7+ days ago (up to ~90 days)
        daysAgo = Math.floor((i - 29) / 1.5) + 7;
        timestamp = formatTimestamp(daysAgo);
      }
      
      // Calculate created date
      const now = new Date('2026-01-13T12:00:00');
      const createdDate = new Date(now);
      createdDate.setDate(createdDate.getDate() - daysAgo);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const createdDateStr = `${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`;
      
      const status = i < 3 ? 'processing' : 
                     i < 5 ? 'pending' : 
                     i % 15 === 0 ? 'partial' :
                     i % 20 === 0 ? 'processing' :
                     i % 25 === 0 ? 'pending' : 
                     'completed';
      
      const testPackage = testPackages[Math.floor(Math.random() * testPackages.length)];
      const addOns = addOnsOptions[Math.floor(Math.random() * addOnsOptions.length)];
      const farm = farms[Math.floor(Math.random() * farms.length)];
      const sampleName = namesForType[j % namesForType.length]; // Cycle through names for this type
      
      const sample: any = {
        id,
        bagLabelId,
        status,
        timestamp,
        daysAgo, // Store for filtering
        createdDate: createdDateStr, // Human-readable created date
        farm,
        sampleName,
        sampleType,
        testPackage,
        addOns,
        partialResults: status === 'partial'
      };
      
      if (status === 'partial') {
        sample.completedTests = ['Dry Matter', 'Crude Protein', 'ADF', 'NDF'];
        sample.pendingTests = ['DCAD', 'Minerals'];
      }
      
      // Add pending tests for pending samples
      if (status === 'pending') {
        // For pending samples, all tests from the package are pending
        const allTests = ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'];
        if (addOns.length > 0) {
          sample.pendingTests = [...allTests, ...addOns];
        } else {
          sample.pendingTests = allTests;
        }
      }
      
      // Add pending tests for processing samples
      if (status === 'processing') {
        // For processing samples, show which tests are still being analyzed
        const remainingTests = ['Starch', 'Ash', 'Fat', 'Sugar'];
        if (addOns.length > 0) {
          sample.pendingTests = [...remainingTests, ...addOns];
        } else {
          sample.pendingTests = remainingTests;
        }
        sample.completedTests = ['Dry Matter', 'Crude Protein', 'ADF'];
      }
      
      samples.push(sample);
    }
  }
  
  return samples;
};

// Helper to generate soil sample data
export const generateSoilSampleData = () => {
  const soilSampleNames: Record<string, string[]> = {
    'Field/Pasture': ['North Field', 'South Pasture', 'East Section', 'West Field', 'Field 12A', 'Pasture B', 'Field 7', 'Back Forty', 'Home Field', 'Field 3B', 'South Section'],
    'Garden/Lawn': ['Front Lawn', 'Vegetable Garden', 'Back Yard', 'Side Garden', 'Lawn Area', 'Garden Plot 1', 'Herb Garden'],
    'Commercial': ['Site A-1', 'Plot C', 'Development Zone', 'Commercial Lot', 'Section 4', 'Building Site']
  };
  const soilSampleTypes = ['Field/Pasture', 'Garden/Lawn', 'Commercial'];
  const soilTestPackages = ['Basic Soil', 'Standard Soil', 'Complete Soil + Micronutrients', 'Organic Matter Analysis', 'Custom Soil Panel'];
  const soilAddOnsOptions = [[], ['Heavy Metals'], ['Micronutrients'], ['Organic Matter'], ['Heavy Metals', 'Micronutrients']];
  const statuses = ['completed', 'processing', 'pending', 'partial'] as const;
  const farms = ['Friendly Illinois Brothers', 'Goeser\'s Grazers', 'Standard Dairy Consultants'];
  
  const samples = [];
  let idCounter = 2001; // Different counter for soil samples
  
  // Generate samples in blocks by type
  const blockSizes = [7, 5, 8, 6, 9, 7, 6, 8, 5, 7, 9, 6, 8, 7, 5, 9, 6, 7, 8, 6];
  let sampleIndex = 0;
  
  for (const blockSize of blockSizes) {
    if (sampleIndex >= 150) break;
    
    const sampleType = soilSampleTypes[Math.floor(Math.random() * soilSampleTypes.length)];
    const namesForType = soilSampleNames[sampleType];
    
    for (let j = 0; j < blockSize && sampleIndex < 150; j++, sampleIndex++) {
      const i = sampleIndex;
      const id = generateDisplayId(idCounter - i);
      const bagLabelId = generateSampleId();
      
      // Calculate days/hours ago
      let timestamp;
      let daysAgo;
      if (i < 10) {
        const hoursAgo = i + 1;
        timestamp = formatTimestamp(0, hoursAgo);
        daysAgo = 0;
      } else if (i < 30) {
        daysAgo = Math.floor((i - 9) / 3.5) + 1;
        timestamp = formatTimestamp(daysAgo);
      } else {
        daysAgo = Math.floor((i - 29) / 1.5) + 7;
        timestamp = formatTimestamp(daysAgo);
      }
      
      // Calculate created date
      const now = new Date('2026-01-13T12:00:00');
      const createdDate = new Date(now);
      createdDate.setDate(createdDate.getDate() - daysAgo);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const createdDateStr = `${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`;
      
      const status = i < 3 ? 'processing' : 
                     i < 5 ? 'pending' : 
                     i % 15 === 0 ? 'partial' :
                     i % 20 === 0 ? 'processing' :
                     i % 25 === 0 ? 'pending' : 
                     'completed';
      
      const testPackage = soilTestPackages[Math.floor(Math.random() * soilTestPackages.length)];
      const addOns = soilAddOnsOptions[Math.floor(Math.random() * soilAddOnsOptions.length)];
      // Only assign soil samples to Friendly Illinois Brothers, not Goeser's Grazers or Standard Dairy Consultants
      const farm = 'Friendly Illinois Brothers';
      const sampleName = namesForType[j % namesForType.length];
      
      const sample: any = {
        id,
        bagLabelId,
        status,
        timestamp,
        daysAgo,
        createdDate: createdDateStr,
        farm,
        sampleName,
        sampleType,
        testPackage,
        addOns,
        partialResults: status === 'partial'
      };
      
      if (status === 'partial') {
        sample.completedTests = ['pH', 'Buffer pH', 'P', 'K'];
        sample.pendingTests = ['Micronutrients', 'Organic Matter'];
      }
      
      // Add pending tests for pending soil samples
      if (status === 'pending') {
        const allTests = ['pH', 'Buffer pH', 'P', 'K', 'Ca', 'Mg', 'Organic Matter'];
        if (addOns.length > 0) {
          sample.pendingTests = [...allTests, ...addOns];
        } else {
          sample.pendingTests = allTests;
        }
      }
      
      // Add pending tests for processing soil samples
      if (status === 'processing') {
        const remainingTests = ['Ca', 'Mg', 'Organic Matter'];
        if (addOns.length > 0) {
          sample.pendingTests = [...remainingTests, ...addOns];
        } else {
          sample.pendingTests = remainingTests;
        }
        sample.completedTests = ['pH', 'Buffer pH', 'P', 'K'];
      }
      
      samples.push(sample);
    }
  }
  
  return samples;
};