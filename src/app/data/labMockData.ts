// Lab Admin Portal Mock Data
// Extracted for performance optimization - prevents recreation on every render

export interface ClientMessage {
  id: number;
  clientName: string;
  organization: string;
  subject: string;
  preview: string;
  priority: 'urgent' | 'high' | 'normal';
  timestamp: string;
  status: 'open' | 'resolved';
}

export const CLIENT_MESSAGES: ClientMessage[] = [
  {
    id: 1,
    clientName: 'Marcus Henderson',
    organization: 'Valley View Dairy LLC',
    subject: 'Unexpected Crude Protein Results on Recent Haylage Samples',
    preview: 'Hi team, we received results for samples 1-247-764 through 1-247-771 (2nd cutting haylage from our west fields)...',
    priority: 'high',
    timestamp: '2 hours ago',
    status: 'open'
  },
  {
    id: 2,
    clientName: 'Jennifer Kowalski',
    organization: 'Sunrise Holsteins',
    subject: 'Request for Historical Trend Report - Corn Silage Starch %',
    preview: 'Good afternoon! I\'m preparing for our annual nutrition review meeting with our consultant next week...',
    priority: 'normal',
    timestamp: '5 hours ago',
    status: 'open'
  },
  {
    id: 3,
    clientName: 'Tom Brandtner',
    organization: 'Brandtner Brothers Farms',
    subject: 'Missing Results for Rush Sample - Container GG-2026-0147',
    preview: 'We submitted a corn silage sample on Tuesday morning (Container ID: GG-2026-0147) with rush processing requested...',
    priority: 'urgent',
    timestamp: '6 hours ago',
    status: 'open'
  },
  {
    id: 4,
    clientName: 'Dr. Amanda Chen',
    organization: 'Green Pastures Organic Dairy',
    subject: 'Question About Mycotoxin Panel Options for Commodity Screening',
    preview: 'Hello! We\'re looking at purchasing a large load of corn from a new supplier and want to run mycotoxin screening...',
    priority: 'normal',
    timestamp: 'Yesterday',
    status: 'open'
  },
  {
    id: 5,
    clientName: 'Robert "Bobby" Miller',
    organization: 'Miller Family Farms',
    subject: 'Interpreting NDF Digestibility Results - First Time Running This Test',
    preview: 'Hey folks, this is the first year we\'ve added the 30-hour NDFD test to our corn silage analysis...',
    priority: 'normal',
    timestamp: 'Yesterday',
    status: 'open'
  },
  {
    id: 6,
    clientName: 'Sarah Lindemann',
    organization: 'Clover Creek Nutrition Services',
    subject: 'Adding Additional Users to Farm Account - Bulk Upload Available?',
    preview: 'Hi there! I\'m a consulting nutritionist working with about 15 dairy farms in your service area...',
    priority: 'normal',
    timestamp: '2 days ago',
    status: 'open'
  },
  {
    id: 7,
    clientName: 'David Ortega',
    organization: 'Twin Oaks Farm & Feed',
    subject: 'Invoice Question - Duplicate Charge on January Statement?',
    preview: 'Quick billing question - I\'m reviewing our January statement and I think I see sample 1-246-332 listed twice...',
    priority: 'normal',
    timestamp: '3 days ago',
    status: 'resolved'
  }
];

export const CLIENT_MESSAGE_FULL_TEXT: Record<number, string> = {
  1: "Hi team, we received results for samples 1-247-764 through 1-247-771 (2nd cutting haylage from our west fields). The CP values are showing 18-19% DM, which is significantly higher than our typical 14-15% range for this field. We haven't changed our harvest timing or fertilization program. Could there be a calibration issue, or should we look into our agronomic practices? We're adjusting rations based on these numbers so want to make sure they're accurate. Thanks for your help!",
  2: "Good afternoon! I'm preparing for our annual nutrition review meeting with our consultant next week. Is it possible to get a trend report showing the starch percentage of our corn silage samples over the past 18 months? We're trying to identify any seasonal patterns or year-over-year changes. Our farm account is #FA-2891. If you could include both as-fed and DM basis that would be incredibly helpful. Thanks so much!",
  3: "We submitted a corn silage sample on Tuesday morning (Container ID: GG-2026-0147) with rush processing requested. We're filling a new bunker silo today and need to know the moisture content before we can set our packing density targets. The sample was hand-delivered by our farm manager Jake around 8:30 AM. Can you please check on the status? We're working against the weather forecast here and really need those DM numbers ASAP. Thanks!",
  4: "Hello! We're looking at purchasing a large load of corn from a new supplier and want to run mycotoxin screening before acceptance. I see you offer both a basic panel and an extended panel. For a due diligence check on incoming corn, which panel would you recommend? We're primarily concerned about aflatoxin, DON, and fumonisin. Also, what's the typical turnaround time? We need results before finalizing the purchase agreement. Appreciate your guidance!",
  5: "Hey folks, this is the first year we've added the 30-hour NDFD test to our corn silage analysis. We got back a value of 52.3% for sample 1-247-689. Our nutritionist mentioned this is pretty good, but I'm not sure how to interpret this in context. Do you have any reference ranges or could you point me to resources that explain what different NDFD values mean for ration formulation? Really trying to understand the value we're getting from this upgraded testing package.",
  6: "Hi there! I'm a consulting nutritionist working with about 15 dairy farms in your service area. Several of my clients have asked if I can be added to their accounts so I can view results directly rather than waiting for them to forward PDFs. Is there a way to do a bulk addition, or do each farm need to add me individually? My email is s.lindemann@clovercreeknutrition.com. Also, will I be able to see historical data or only new results submitted after I'm added? Thanks for clarifying the process!",
  7: "Quick billing question - I'm reviewing our January statement and I think I see sample 1-246-332 listed twice, both showing the Premium Feed Panel at $47.50. We definitely only submitted this sample once back on January 3rd. Could you check if this is a duplicate charge? Otherwise everything looks correct. I can forward the invoice if that helps. Thanks for looking into this!"
};

export const INCOMING_SAMPLES_BY_LAB: Record<string, any[]> = {
  'Watertown, WI': [
    { containerId: 'A7K2', sampleType: 'Corn Silage', tests: 'NIR Analysis, Starch', organization: 'Goeser\'s Grazers', submittedDate: 'Jan 15, 2026' },
    { containerId: 'B3M9', sampleType: 'Hay/Haylage', tests: 'Wet Chemistry, CP/ADF/NDF', organization: 'Sunset Dairy', submittedDate: 'Jan 16, 2026' },
    { containerId: 'C8R4', sampleType: 'TMR', tests: 'NIR Analysis', organization: 'Green Valley Farms', submittedDate: 'Jan 16, 2026' },
    { containerId: 'D5P1', sampleType: 'Grains/Commodities', tests: 'Mycotoxin Panel', organization: 'Valley View Dairy', submittedDate: 'Jan 17, 2026' },
    { containerId: 'E2W7', sampleType: 'Corn Silage', tests: 'NIR Analysis, NDFD', organization: 'Sunrise Holsteins', submittedDate: 'Jan 17, 2026' },
  ],
  'Colby, WI': [
    { containerId: 'P4X9', sampleType: 'Hay/Haylage', tests: 'NIR Analysis', organization: 'Dairy Meadows LLC', submittedDate: 'Jan 15, 2026' },
    { containerId: 'Q7M2', sampleType: 'Corn Silage', tests: 'Wet Chemistry', organization: 'Riverside Farms', submittedDate: 'Jan 16, 2026' },
    { containerId: 'R1N5', sampleType: 'TMR', tests: 'Mineral Analysis', organization: 'Clover Hill Dairy', submittedDate: 'Jan 17, 2026' },
  ],
  'Binghamton, NY': [
    { containerId: 'T8K3', sampleType: 'Grains/Commodities', tests: 'Mycotoxin Panel', organization: 'Empire Nutrition', submittedDate: 'Jan 14, 2026' },
    { containerId: 'U2V6', sampleType: 'Hay/Haylage', tests: 'NIR Analysis, NDFD', organization: 'Hudson Valley Farms', submittedDate: 'Jan 15, 2026' },
  ]
};

export const INTERLAB_TO_RECEIVE: Record<string, any[]> = {
  'Watertown, WI': [
    { containerId: 'F9X3', sampleType: 'Corn Silage', tests: 'Wet Chemistry', fromLab: 'Colby, WI', expectedDate: 'Jan 18, 2026' },
    { containerId: 'G6Y8', sampleType: 'Hay/Haylage', tests: 'Mineral Analysis', fromLab: 'Binghamton, NY', expectedDate: 'Jan 19, 2026' },
    { containerId: 'H4Z5', sampleType: 'TMR', tests: 'Mycotoxin Panel', fromLab: 'Sioux Falls, SD', expectedDate: 'Jan 19, 2026' },
  ],
  'Colby, WI': [
    { containerId: 'M3P7', sampleType: 'Hay/Haylage', tests: 'NIR Analysis', fromLab: 'Watertown, WI', expectedDate: 'Jan 18, 2026' },
    { containerId: 'N8Q2', sampleType: 'Grains/Commodities', tests: 'Mycotoxin Panel', fromLab: 'Visalia, CA', expectedDate: 'Jan 20, 2026' },
  ],
  'Binghamton, NY': [
    { containerId: 'S5R9', sampleType: 'Corn Silage', tests: 'Wet Chemistry', fromLab: 'Wooster, OH', expectedDate: 'Jan 19, 2026' },
    { containerId: 'T1U4', sampleType: 'TMR', tests: 'Mineral Analysis', fromLab: 'Sioux Falls, SD', expectedDate: 'Jan 20, 2026' },
  ]
};

export const INTERLAB_TO_SEND: Record<string, any[]> = {
  'Watertown, WI': [
    { containerId: 'J1Q6', sampleType: 'Grains/Commodities', tests: 'Mycotoxin Panel', toLab: 'Visalia, CA', dueDate: 'Jan 19, 2026' },
    { containerId: 'K5T9', sampleType: 'Corn Silage', tests: 'Wet Chemistry', toLab: 'Wooster, OH', dueDate: 'Jan 20, 2026' },
  ],
  'Colby, WI': [
    { containerId: 'V7W2', sampleType: 'Hay/Haylage', tests: 'NIR Analysis', toLab: 'Sioux Falls, SD', dueDate: 'Jan 18, 2026' },
    { containerId: 'W3X8', sampleType: 'TMR', tests: 'Mineral Analysis', toLab: 'Nampa, ID', dueDate: 'Jan 21, 2026' },
  ],
  'Binghamton, NY': [
    { containerId: 'Y4Z1', sampleType: 'Corn Silage', tests: 'Mycotoxin Panel', toLab: 'Watertown, WI', dueDate: 'Jan 19, 2026' },
    { containerId: 'Z8A5', sampleType: 'Grains/Commodities', tests: 'Wet Chemistry', toLab: 'Marne, MI', dueDate: 'Jan 20, 2026' },
  ]
};

export const getInterlabToReceive = (lab: string) => {
  return INTERLAB_TO_RECEIVE[lab] || [];
};

export const getInterlabToSend = (lab: string) => {
  return INTERLAB_TO_SEND[lab] || [];
};

// Generate test data function - memoized in component
export const generateTestData = () => {
  const labs = ['Watertown, WI', 'Binghamton, NY', 'Colby, WI', 'Sioux Falls, SD', 'Visalia, CA', 'Wooster, OH', 'Edmondson, TX', 'Marne, MI', 'Nampa, ID', 'Manheim, PA'];
  const sampleTypes = ['Corn Silage', 'Alfalfa Hay', 'TMR', 'Soybean Meal', 'High Moisture Corn'];
  const assays = ['NIR Analysis', 'Wet Chemistry', 'Mycotoxin Panel', 'Mineral Analysis', 'Starch', 'NDFD'];
  const statuses = ['Received', 'In Process', 'In Review', 'Completed'];
  const farms = ['Goeser\'s Grazers', 'Friendly Illinois Brothers', 'Sunset Dairy', 'Green Valley Farms', 'Meadow View Farms', 'Rolling Hills Ranch'];
  const growers = ['John Smith', 'Mike Davis', 'Sarah Johnson', 'Robert Taylor', 'James Wilson'];
  
  const tests = [];
  for (let i = 0; i < 103; i++) {
    const assayCount = Math.floor(Math.random() * 3) + 1;
    const currentAssays = [];
    for(let j=0; j<assayCount; j++) {
      currentAssays.push(assays[Math.floor(Math.random() * assays.length)]);
    }
    // Remove duplicates
    const uniqueAssays = [...new Set(currentAssays)];

    tests.push({
      labId: `1-${247}-${891 + i}`,
      dateReceived: `Jan ${Math.floor(Math.random() * 20) + 1}, 2026`,
      farm: farms[Math.floor(Math.random() * farms.length)],
      grower: growers[Math.floor(Math.random() * growers.length)],
      sampleType: sampleTypes[Math.floor(Math.random() * sampleTypes.length)],
      tests: uniqueAssays,
      labLocation: labs[Math.floor(Math.random() * labs.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  return tests;
};
