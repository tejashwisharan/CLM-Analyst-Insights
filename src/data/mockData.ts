export interface Comment {
  id: string;
  authorRole: string;
  text: string;
  date: string;
}

export interface Feedback {
  id: string;
  analystRole: string;
  institutionType: string;
  platform: string;
  kycType: 'Individual' | 'Non-Individual' | 'Both';
  painPointCategory: string;
  feedbackText: string;
  proposedSolution: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  tatImpactMinutes: number;
  date: string;
  country: string;
  comments: Comment[];
}

export const majorPlatforms = [
  'Fenergo',
  'Pega CLM',
  'nCino',
  'Appian',
  'Oracle KYC',
  'Salesforce FSC',
  'Encompass',
  'In-House Custom',
];

export const painPointCategories = [
  'False Positives (AML/Sanctions)',
  'Manual Document Collection',
  'Siloed Data / Integration Issues',
  'Complex UBO Unwrapping',
  'Clunky UI / Too Many Clicks',
  'Slow System Performance',
  'Regulatory Rule Updates',
];

const roles = [
  'Senior KYC Analyst', 'Onboarding Specialist', 'CLM Manager', 
  'AML/KYC Analyst', 'Client Lifecycle Analyst', 'KYC Reviewer', 
  'Onboarding Analyst', 'Compliance Officer', 'CDD Analyst', 
  'EDD Specialist', 'Quality Assurance Analyst', 'Financial Crime Investigator'
];

const institutions = [
  'Corporate Banking', 'Retail Banking', 'Wealth Management', 
  'Investment Banking', 'Mortgage', 'Insurance', 'Private Banking', 
  'Fintech', 'Asset Management', 'Commercial Real Estate', 'Crypto Exchange'
];

const countries = [
  'UK', 'USA', 'Switzerland', 'Singapore', 'Australia', 'Germany', 
  'Canada', 'Hong Kong', 'Japan', 'France', 'UAE', 'Brazil', 
  'Luxembourg', 'Ireland', 'Netherlands'
];

const painPointDetails: Record<string, { feedbacks: string[], solutions: string[] }> = {
  'False Positives (AML/Sanctions)': {
    feedbacks: [
      "The screening engine flags too many common names.",
      "Sanctions screening is too sensitive and lacks context.",
      "We spend hours discounting false matches every week.",
      "Name matching algorithm doesn't account for cultural naming conventions.",
      "Too many alerts generated for low-risk jurisdictions.",
      "The screening engine generates a massive amount of false positives for common names. We spend 60% of our day discounting alerts that are clearly not our client.",
      "Our PEP screening hits on almost anyone with a common surname in Asia.",
      "The fuzzy matching logic is a black box, making it hard to explain to auditors why an alert fired."
    ],
    solutions: [
      "Implement AI/ML to pre-score and auto-discount alerts.",
      "Allow fuzzy matching tuning by business users.",
      "Integrate better secondary identifiers like DOB and nationality.",
      "Use natural language processing to analyze adverse media.",
      "Create a feedback loop where the system learns from discounted alerts.",
      "Improve the matching algorithm by weighting date of birth and nationality higher before generating an alert.",
      "Allow whitelisting of specific entity names that frequently trigger false positives.",
      "Integrate with a more modern screening provider via API."
    ]
  },
  'Manual Document Collection': {
    feedbacks: [
      "Chasing clients for documents via email is inefficient.",
      "No secure portal for clients to upload IDs.",
      "Document expiry tracking is completely manual.",
      "We lose track of which documents have been requested vs received.",
      "Clients complain about having to send sensitive documents via insecure channels.",
      "Great CRM capabilities, but chasing clients for missing passports or proof of address is entirely manual via email. No secure document upload portal linked directly to the case.",
      "Front-office relationship managers often forget to attach the UBO declarations, causing massive delays.",
      "We have to manually download PDFs from emails and upload them one-by-one into the CLM."
    ],
    solutions: [
      "Build a client-facing document upload portal.",
      "Automate document expiry notifications.",
      "Integrate with OCR for automatic data extraction.",
      "Implement a secure drop-zone with automatic virus scanning.",
      "Create automated email chasers for missing documents.",
      "Add a client-facing secure portal where they can upload docs directly into the Salesforce record.",
      "Implement a mobile app for retail clients to scan their IDs directly.",
      "Connect directly to government e-ID systems where available."
    ]
  },
  'Siloed Data / Integration Issues': {
    feedbacks: [
      "System doesn't talk to our core banking platform.",
      "We have to dual-key data into multiple systems.",
      "Transaction data is not integrated with the KYC profile.",
      "API connections drop frequently causing data sync issues.",
      "Customer data is spread across 5 different legacy systems.",
      "nCino connects well with the loan origination side, but pulling data from our legacy core banking system fails frequently, requiring manual dual-entry.",
      "Our internal tool doesn't talk to the transaction monitoring system. We have to log into two different portals to get a full view of the customer's risk.",
      "When a client updates their address in the mobile app, it doesn't flow through to the KYC system."
    ],
    solutions: [
      "Build robust two-way APIs with core systems.",
      "Create a single pane of glass dashboard.",
      "Automate data synchronization overnight.",
      "Implement a data lake to centralize customer information.",
      "Use RPA bots to sync data between legacy systems without APIs.",
      "Stabilize the API middleware between nCino and the core banking mainframe.",
      "Create a unified dashboard that pulls transaction alerts via API into the KYC profile.",
      "Implement an event-driven architecture using Kafka for real-time updates."
    ]
  },
  'Complex UBO Unwrapping': {
    feedbacks: [
      "Unwrapping corporate layers takes too long.",
      "Visualizing ownership structures is clunky.",
      "We need automated registry lookups for UBOs.",
      "Calculating ultimate ownership percentages manually leads to errors.",
      "Trust structures are incredibly difficult to map in the current UI.",
      "Unwrapping complex corporate structures with multiple layers of ownership takes too long. The visualizer is good but manual entry of intermediate holding companies is tedious.",
      "The system struggles to handle circular ownership structures.",
      "We lack integration with Dun & Bradstreet or Bureau van Dijk for automatic entity resolution."
    ],
    solutions: [
      "Integrate with external corporate registries.",
      "Improve the UBO visualization tool with drag-and-drop.",
      "Automate the calculation of ultimate ownership percentages.",
      "Add specific templates for complex trust structures.",
      "Allow importing of corporate structures via CSV or API.",
      "Integrate directly with corporate registries (like Companies House) to auto-populate intermediate layers.",
      "Implement an algorithm to automatically detect and flag circular ownership.",
      "Partner with a premium data provider for instant entity resolution."
    ]
  },
  'Clunky UI / Too Many Clicks': {
    feedbacks: [
      "Too many clicks to update a simple field.",
      "The interface is not intuitive for new analysts.",
      "Navigating between cases is slow and confusing.",
      "We have to scroll through 50 fields just to update an address.",
      "The layout doesn't prioritize the most important risk factors.",
      "Pega is extremely powerful for workflow routing, but updating a simple address requires navigating through 4 different screens and re-running the entire risk engine.",
      "The screen real estate is poorly used, with massive white spaces and tiny input boxes.",
      "There is no way to bulk-approve low-risk periodic reviews."
    ],
    solutions: [
      "Redesign the case view into a single-page application.",
      "Reduce mandatory fields for low-risk clients.",
      "Implement keyboard shortcuts for common actions.",
      "Create role-based views that hide irrelevant fields.",
      "Add a 'quick edit' sidebar for common updates.",
      "Implement a \"quick edit\" modal for low-risk demographic updates that doesn't trigger a full case refresh unless necessary.",
      "Allow users to customize their own dashboard layout.",
      "Introduce a bulk-action feature for team leads."
    ]
  },
  'Slow System Performance': {
    feedbacks: [
      "Generating the final PDF report takes forever.",
      "The system crashes during peak hours.",
      "Page load times are unacceptable.",
      "Search functionality times out on large queries.",
      "Saving a case takes up to 30 seconds.",
      "Encompass is fantastic for auto-pulling registry data, but the platform lags heavily during peak hours when generating the final KYC profile PDF.",
      "When we have more than 100 active users, the database locks up frequently.",
      "Exporting audit logs for regulators consistently times out."
    ],
    solutions: [
      "Move heavy processing to background jobs.",
      "Upgrade the database infrastructure.",
      "Optimize the frontend code and implement lazy loading.",
      "Implement better caching for search queries.",
      "Break down large save operations into smaller chunks.",
      "Optimize the PDF generation microservice or move it to a background asynchronous task.",
      "Migrate the on-premise database to a scalable cloud solution.",
      "Implement pagination and asynchronous downloads for large exports."
    ]
  },
  'Regulatory Rule Updates': {
    feedbacks: [
      "Updating rules for new regulations requires IT support.",
      "We can't easily adjust risk weights.",
      "Questionnaires are hardcoded and hard to change.",
      "Testing new regulatory rules takes months.",
      "No version control for rule changes.",
      "When new local regulations drop, updating the dynamic questionnaires takes IT weeks. We have to use offline Excel checklists in the meantime.",
      "Adapting to the new EU AML directives took our vendor 6 months to patch.",
      "We need a way to apply different risk models based on the booking center, but the system only supports global rules."
    ],
    solutions: [
      "Implement a no-code rule engine.",
      "Allow compliance teams to update questionnaires directly.",
      "Version control for risk models with easy rollback.",
      "Create a sandbox environment for testing rule changes.",
      "Decouple the questionnaire logic from the core application code.",
      "Give business admins a no-code rule builder to update KYC questionnaires without IT deployment.",
      "Ensure the vendor provides regulatory updates as a service rather than a software patch.",
      "Implement a multi-tenant or multi-jurisdiction rule hierarchy."
    ]
  }
};

const genericComments = [
  "I completely agree, this is a huge bottleneck for us too.",
  "Have you tried using the bulk upload workaround? It saves a bit of time.",
  "Our IT team is looking into this, but the vendor is slow to respond.",
  "Spot on. This adds at least 20 mins to every case I touch.",
  "We implemented a custom macro for this, but it breaks every update.",
  "Management doesn't realize how much time is wasted here.",
  "Is there any timeline for when this will be fixed?",
  "I've raised this in the last 3 feedback sessions, still no change.",
  "Actually, the latest patch improved this slightly, but it's still not ideal.",
  "This is exactly why our SLA breach rate is so high this quarter."
];

// Seeded random generator for consistent mock data
let seed = 12345;
const random = () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};
const getSeededRandom = <T>(arr: T[]): T => arr[Math.floor(random() * arr.length)];

const generateFeedback = (count: number): Feedback[] => {
  return Array.from({ length: count }).map((_, i) => {
    const category = getSeededRandom(painPointCategories);
    const details = painPointDetails[category];
    const sentimentRoll = random();
    let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Negative';
    if (sentimentRoll > 0.8) sentiment = 'Positive';
    else if (sentimentRoll > 0.5) sentiment = 'Neutral';

    // Generate a date within the last year
    const dateOffset = Math.floor(random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - dateOffset);

    const numComments = Math.floor(random() * 6); // 0 to 5 comments
    const comments = Array.from({ length: numComments }).map((_, cIdx) => {
      const cDate = new Date(date);
      cDate.setDate(cDate.getDate() + Math.floor(random() * 5) + 1); // comment 1-5 days after post
      return {
        id: `C-${1000 + i}-${cIdx}`,
        authorRole: getSeededRandom(roles),
        text: getSeededRandom(genericComments),
        date: cDate.toISOString().split('T')[0]
      };
    });

    return {
      id: `FB-${1000 + i}`,
      analystRole: getSeededRandom(roles),
      institutionType: getSeededRandom(institutions),
      platform: getSeededRandom(majorPlatforms),
      kycType: getSeededRandom(['Individual', 'Non-Individual', 'Both']),
      painPointCategory: category,
      feedbackText: getSeededRandom(details.feedbacks),
      proposedSolution: getSeededRandom(details.solutions),
      sentiment,
      tatImpactMinutes: Math.floor(random() * 110) + 10, // 10 to 120 mins
      date: date.toISOString().split('T')[0],
      country: getSeededRandom(countries),
      comments,
    };
  });
};

export const mockFeedback: Feedback[] = generateFeedback(100).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const platformStats = [
  { name: 'Fenergo', marketShare: 25, avgSatisfaction: 3.8, topIssue: 'Complex Configuration' },
  { name: 'Pega CLM', marketShare: 22, avgSatisfaction: 3.5, topIssue: 'UI Friction' },
  { name: 'nCino', marketShare: 15, avgSatisfaction: 4.1, topIssue: 'Core Integrations' },
  { name: 'Appian', marketShare: 12, avgSatisfaction: 3.9, topIssue: 'Rule Updates' },
  { name: 'Oracle KYC', marketShare: 10, avgSatisfaction: 3.2, topIssue: 'False Positives' },
  { name: 'Salesforce FSC', marketShare: 8, avgSatisfaction: 4.0, topIssue: 'Document Collection' },
  { name: 'Encompass', marketShare: 5, avgSatisfaction: 4.2, topIssue: 'Performance' },
  { name: 'In-House Custom', marketShare: 3, avgSatisfaction: 2.8, topIssue: 'Maintenance' },
];
