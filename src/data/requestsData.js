// ─── Constants ──────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'Hardware',
  'Software',
  'Network',
  'Access & Permissions',
  'General IT Support',
]

export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical']

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Finance',
  'HR',
  'Operations',
  'Sales',
  'Legal',
  'Product',
]

export const STATUSES = [
  'New',
  'Assigned',
  'In Progress',
  'On Hold',
  'Resolved',
  'Closed',
  'Reopened',
  'Rejected',
  'Cancelled',
]

// Valid forward transitions per status
export const STATUS_TRANSITIONS = {
  New: ['Assigned', 'Rejected', 'Cancelled'],
  Assigned: ['In Progress', 'On Hold', 'Rejected', 'Cancelled'],
  'In Progress': ['On Hold', 'Resolved', 'Cancelled'],
  'On Hold': ['In Progress', 'Resolved', 'Rejected', 'Cancelled'],
  Resolved: ['Closed', 'Reopened'],
  Closed: ['Reopened'],
  Reopened: ['Assigned', 'In Progress', 'Cancelled'],
  Rejected: ['Reopened'],
  Cancelled: [],
}

// ─── Visual mappings ─────────────────────────────────────────────────────────

export const PRIORITY_COLOR = {
  Low: 'green',
  Medium: 'purple',
  High: 'amber',
  Critical: 'red',
}

export const STATUS_COLOR = {
  New: 'purple',
  Assigned: 'indigo',
  'In Progress': 'amber',
  'On Hold': 'slate',
  Resolved: 'green',
  Closed: 'slate',
  Reopened: 'purple',
  Rejected: 'red',
  Cancelled: 'slate',
}

// ─── Demo seed data ───────────────────────────────────────────────────────────

const NOW = new Date()
const daysAgo = (n) => new Date(NOW - n * 86400000).toISOString()

export const DEMO_REQUESTS = [
  {
    id: 'REQ-0001',
    title: 'New MacBook Pro for Engineering Lead',
    category: 'Hardware',
    priority: 'High',
    status: 'In Progress',
    department: 'Engineering',
    description:
      'Requesting a new MacBook Pro 14" M3 Pro for the new engineering lead who joins next Monday. Required specs: 18GB RAM, 512GB SSD.',
    assignedTo: 'James Wilson',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(2),
    attachments: ['purchase_justification.pdf'],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(14) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to James Wilson.', date: daysAgo(13) },
      { id: 3, type: 'status', actor: 'James Wilson', note: 'Status changed to In Progress.', date: daysAgo(10) },
      { id: 4, type: 'comment', actor: 'James Wilson', note: 'Procurement order placed. ETA 5 business days.', date: daysAgo(8) },
    ],
  },
  {
    id: 'REQ-0002',
    title: 'Adobe Creative Cloud license renewal',
    category: 'Software',
    priority: 'Medium',
    status: 'Resolved',
    department: 'Marketing',
    description:
      'Annual renewal of 5 Adobe Creative Cloud licenses for the marketing design team. Current licenses expire on Dec 1.',
    assignedTo: 'Sarah Chen',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(21),
    updatedAt: daysAgo(1),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(21) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to Sarah Chen.', date: daysAgo(20) },
      { id: 3, type: 'status', actor: 'Sarah Chen', note: 'Status changed to In Progress.', date: daysAgo(18) },
      { id: 4, type: 'resolution', actor: 'Sarah Chen', note: 'Licenses renewed. Confirmation sent to Marketing team.', date: daysAgo(1) },
      { id: 5, type: 'status', actor: 'Sarah Chen', note: 'Status changed to Resolved.', date: daysAgo(1) },
    ],
  },
  {
    id: 'REQ-0003',
    title: 'VPN access for remote contractor',
    category: 'Access & Permissions',
    priority: 'High',
    status: 'New',
    department: 'Engineering',
    description:
      'New contractor Priya Sharma needs VPN access starting Monday. She will work on the backend API project for 3 months.',
    assignedTo: null,
    createdBy: 'Tara Anand',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    attachments: ['contractor_agreement.pdf'],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(1) },
    ],
  },
  {
    id: 'REQ-0004',
    title: 'Office Wi-Fi drops in conference rooms',
    category: 'Network',
    priority: 'Critical',
    status: 'Assigned',
    department: 'Operations',
    description:
      'All three main conference rooms (A, B, C) have unstable Wi-Fi causing disruptions during client calls. Issue started after the router firmware update last Tuesday.',
    assignedTo: 'Mike Torres',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(3) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to Mike Torres — network team.', date: daysAgo(2) },
      { id: 3, type: 'comment', actor: 'Mike Torres', note: 'Investigating. Likely a firmware regression. Will schedule rollback tonight.', date: daysAgo(2) },
    ],
  },
  {
    id: 'REQ-0005',
    title: 'Install VS Code + extensions on new dev machine',
    category: 'Software',
    priority: 'Low',
    status: 'Closed',
    department: 'Engineering',
    description: 'New developer onboarding machine needs VS Code with standard extensions: ESLint, Prettier, GitLens, Remote SSH.',
    assignedTo: 'James Wilson',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(28),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(30) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to James Wilson.', date: daysAgo(29) },
      { id: 3, type: 'status', actor: 'James Wilson', note: 'Status changed to In Progress.', date: daysAgo(29) },
      { id: 4, type: 'resolution', actor: 'James Wilson', note: 'All software installed and verified.', date: daysAgo(28) },
      { id: 5, type: 'status', actor: 'James Wilson', note: 'Status changed to Closed.', date: daysAgo(28) },
    ],
  },
  {
    id: 'REQ-0006',
    title: 'Slack workspace upgrade to Pro plan',
    category: 'Software',
    priority: 'Medium',
    status: 'On Hold',
    department: 'HR',
    description:
      'Current Slack free plan limits message history to 90 days. We need the Pro plan to retain full history for compliance.',
    assignedTo: 'Sarah Chen',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(5),
    attachments: ['budget_approval.pdf'],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(7) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to Sarah Chen.', date: daysAgo(6) },
      { id: 3, type: 'status', actor: 'Sarah Chen', note: 'Status changed to On Hold — waiting for finance approval.', date: daysAgo(5) },
    ],
  },
  {
    id: 'REQ-0007',
    title: 'Standing desk for back pain accommodation',
    category: 'Hardware',
    priority: 'Medium',
    status: 'New',
    department: 'Sales',
    description:
      'Medical accommodation request for a height-adjustable standing desk. Doctor note attached. Employee: Tom Nguyen.',
    assignedTo: null,
    createdBy: 'Tara Anand',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    attachments: ['doctor_note.pdf'],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted with medical documentation.', date: daysAgo(2) },
    ],
  },
  {
    id: 'REQ-0008',
    title: 'Set up GitHub SSO for new engineers',
    category: 'Access & Permissions',
    priority: 'High',
    status: 'In Progress',
    department: 'Engineering',
    description: '3 new engineers need GitHub organization SSO access and repo permissions configured for the main monorepo.',
    assignedTo: 'Mike Torres',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(5) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to Mike Torres.', date: daysAgo(4) },
      { id: 3, type: 'status', actor: 'Mike Torres', note: 'Status changed to In Progress.', date: daysAgo(3) },
      { id: 4, type: 'comment', actor: 'Mike Torres', note: 'Two of three accounts provisioned. Last one pending email verification.', date: daysAgo(1) },
    ],
  },
  {
    id: 'REQ-0009',
    title: 'General IT support — printer not connecting',
    category: 'General IT Support',
    priority: 'Low',
    status: 'Rejected',
    department: 'Finance',
    description: 'Office printer on Floor 3 not connecting to network. Request rejected as it is already being tracked under facility ticket #8841.',
    assignedTo: 'James Wilson',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(9),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(10) },
      { id: 2, type: 'assigned', actor: 'Admin', note: 'Assigned to James Wilson.', date: daysAgo(10) },
      { id: 3, type: 'status', actor: 'James Wilson', note: 'Rejected by admin — duplicate of facility ticket #8841.', date: daysAgo(9) },
    ],
  },
  {
    id: 'REQ-0010',
    title: 'External monitor for home office setup',
    category: 'Hardware',
    priority: 'Medium',
    status: 'Cancelled',
    department: 'Product',
    description: 'Secondary 27" 4K monitor for remote design review work. Cancelled by employee as spare hardware was found in office stash.',
    assignedTo: 'Sarah Chen',
    createdBy: 'Tara Anand',
    createdAt: daysAgo(12),
    updatedAt: daysAgo(8),
    attachments: [],
    timeline: [
      { id: 1, type: 'created', actor: 'Tara Anand', note: 'Request submitted.', date: daysAgo(12) },
      { id: 2, type: 'status', actor: 'Tara Anand', note: 'Cancelled by requestor: Found an existing available unit.', date: daysAgo(8) },
    ],
  },
]
