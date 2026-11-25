// ─── Bug Tracking Data & Workflow Constants ─────────────────────────────────

export const BUG_STATUSES = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'VERIFIED', 'CLOSED']

export const BUG_STATUS_LABELS = {
  OPEN: 'Open',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  FIXED: 'Fixed',
  VERIFIED: 'Verified',
  CLOSED: 'Closed',
}

export const BUG_STATUS_COLORS = {
  OPEN: 'red',
  ASSIGNED: 'indigo',
  IN_PROGRESS: 'amber',
  FIXED: 'purple',
  VERIFIED: 'indigo',
  CLOSED: 'green',
}

export const BUG_SEVERITIES = ['Low', 'Medium', 'High', 'Critical']

export const BUG_SEVERITY_COLORS = {
  Low: 'slate',
  Medium: 'purple',
  High: 'amber',
  Critical: 'red',
}

export const BUG_ENVIRONMENTS = ['Production', 'Staging', 'QA', 'Development']

export const BUG_TRANSITIONS = {
  OPEN: ['ASSIGNED', 'CLOSED'],
  ASSIGNED: ['IN_PROGRESS', 'CLOSED'],
  IN_PROGRESS: ['FIXED', 'ASSIGNED'],
  FIXED: ['VERIFIED', 'IN_PROGRESS'],
  VERIFIED: ['CLOSED', 'IN_PROGRESS'],
  CLOSED: ['OPEN'], // allows reopen if regression
}

const NOW = new Date()
const daysAgo = (n) => new Date(NOW - n * 86400000).toISOString()

export const DEMO_BUGS = [
  {
    id: 'BUG-2001',
    title: 'SAML token signature validation fails intermittent during IdP failover',
    severity: 'Critical',
    status: 'IN_PROGRESS',
    environment: 'Production',
    assignedTo: 'Mike Torres',
    reportedBy: 'Elena Rostova',
    reproductionSteps: '1. Initiate login via Okta backup IdP URL.\n2. Observe intermittent 401 unauthorized error during callback handshake.\n3. Inspection of server log shows clock skew mismatch > 180s on node worker-03.',
    expectedResult: 'Authentication should automatically succeed with leeway buffer tolerance up to 300s.',
    actualResult: 'User redirected to error screen with "Invalid SAML Assertion Signature".',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
    attachments: ['saml_trace_dump.xml', 'node_worker03_syslog.log'],
    comments: [
      { id: 1, author: 'Mike Torres', text: 'Confirmed clock skew on worker-03 NTP daemon. Syncing chrony service now.', date: daysAgo(1) },
    ],
  },
  {
    id: 'BUG-2002',
    title: 'Export to CSV on Reports page truncated at 1000 records',
    severity: 'Medium',
    status: 'FIXED',
    environment: 'Staging',
    assignedTo: 'James Wilson',
    reportedBy: 'Tara Anand',
    reproductionSteps: '1. Navigate to Reports.\n2. Filter date range to past 12 months (> 1,200 records).\n3. Click "Export CSV".\n4. Inspect output file row count.',
    expectedResult: 'All filtered records should be streamed into the generated CSV file.',
    actualResult: 'File strictly stops at record row 1,000 due to backend default limit clause.',
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
    attachments: ['export_sample.csv'],
    comments: [
      { id: 1, author: 'James Wilson', text: 'Implemented paginated cursor streaming in frontend export utility.', date: daysAgo(1) },
    ],
  },
  {
    id: 'BUG-2003',
    title: 'Role permission modal does not save custom API scope checkboxes',
    severity: 'High',
    status: 'ASSIGNED',
    environment: 'QA',
    assignedTo: 'Sarah Chen',
    reportedBy: 'James Wilson',
    reproductionSteps: '1. Go to Team Management -> Role Settings.\n2. Edit custom role "Auditor".\n3. Check "read:audit_logs" and click Save.\n4. Reopen modal.',
    expectedResult: 'Checkboxes persist state in storage.',
    actualResult: 'State reverts to default empty array because payload keys were mismatching.',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
    attachments: ['network_request_payload.json'],
    comments: [],
  },
  {
    id: 'BUG-2004',
    title: 'Dark mode theme flash during initial page load',
    severity: 'Low',
    status: 'VERIFIED',
    environment: 'Production',
    assignedTo: 'Tara Anand',
    reportedBy: 'Sarah Chen',
    reproductionSteps: '1. Set system preference to dark mode.\n2. Hard refresh browser (Ctrl+Shift+R).\n3. Observe white background flash before dark class mounts.',
    expectedResult: 'Inline script initializes class before React hydrate without perceptible visual jitter.',
    actualResult: 'Flash of un-themed content lasts ~80ms.',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(1),
    attachments: [],
    comments: [
      { id: 1, author: 'Tara Anand', text: 'Fixed with zero-delay theme initializer script in document head.', date: daysAgo(2) },
      { id: 2, author: 'Sarah Chen', text: 'Tested across Chrome, Edge and Firefox. Clean transition verified.', date: daysAgo(1) },
    ],
  },
  {
    id: 'BUG-2005',
    title: 'Session timeout toast notification persists after user re-authenticates',
    severity: 'Medium',
    status: 'OPEN',
    environment: 'Staging',
    assignedTo: null,
    reportedBy: 'Elena Rostova',
    reproductionSteps: '1. Allow session to idle for 15 minutes.\n2. Observe timeout toast appear.\n3. Log back in on modal prompt.\n4. Toast remains visible until manually dismissed.',
    expectedResult: 'Toast should automatically clear upon successful re-login token issuance.',
    actualResult: 'Toast stays on screen indefinitely.',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    attachments: [],
    comments: [],
  },
  {
    id: 'BUG-2006',
    title: 'Notification count badge shows negative numbers when cleared rapidly',
    severity: 'Low',
    status: 'CLOSED',
    environment: 'Production',
    assignedTo: 'Mike Torres',
    reportedBy: 'Tara Anand',
    reproductionSteps: '1. Have 3 unread notifications.\n2. Double-click "Mark all as read" in rapid succession.',
    expectedResult: 'Unread counter clamps to Math.max(0, count).',
    actualResult: 'Badge rendered "-1" unread items.',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(8),
    attachments: [],
    comments: [
      { id: 1, author: 'Mike Torres', text: 'Added state clamp to prevention handler. Tested and closed.', date: daysAgo(8) },
    ],
  },
]
