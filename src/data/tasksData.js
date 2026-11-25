// ─── Tasks Data & Workflow Constants ────────────────────────────────────────

export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']

export const TASK_STATUS_LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'In Review',
  COMPLETED: 'Completed',
}

export const TASK_STATUS_COLORS = {
  TODO: 'slate',
  IN_PROGRESS: 'purple',
  REVIEW: 'indigo',
  COMPLETED: 'green',
}

export const TASK_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent']

export const TASK_PRIORITY_COLORS = {
  Low: 'green',
  Medium: 'purple',
  High: 'amber',
  Urgent: 'red',
}

export const TASK_TRANSITIONS = {
  TODO: ['IN_PROGRESS'],
  IN_PROGRESS: ['REVIEW', 'TODO'],
  REVIEW: ['COMPLETED', 'IN_PROGRESS'],
  COMPLETED: ['TODO'], // allows reopening if necessary
}

const NOW = new Date()
const daysAgo = (n) => new Date(NOW - n * 86400000).toISOString()
const daysAhead = (n) => new Date(NOW.getTime() + n * 86400000).toISOString()

export const DEMO_TASKS = [
  {
    id: 'TSK-1001',
    title: 'Implement Multi-Factor Authentication (MFA) Enforcement',
    description: 'Configure corporate Okta policies to require TOTP / FIDO2 security keys for all enterprise admin accounts.',
    status: 'IN_PROGRESS',
    priority: 'Urgent',
    assignee: 'James Wilson',
    reporter: 'Tara Anand',
    department: 'Engineering',
    dueDate: daysAhead(2),
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
    subtasks: [
      { id: 1, text: 'Review Okta policy documentation', completed: true },
      { id: 2, text: 'Set up staging test group with YubiKeys', completed: true },
      { id: 3, text: 'Notify admins 48h before enforcement', completed: false },
      { id: 4, text: 'Enable conditional access rule in production', completed: false },
    ],
    comments: [
      { id: 1, author: 'Tara Anand', text: 'Please ensure recovery emergency codes are safely stored in 1Password Vault.', date: daysAgo(3) },
      { id: 2, author: 'James Wilson', text: 'Verified with security team. Staging rollout went smoothly.', date: daysAgo(1) },
    ],
  },
  {
    id: 'TSK-1002',
    title: 'Migrate legacy LDAP directory to Azure AD SCIM',
    description: 'Transition on-prem active directory synchronization to modern SCIM automated user provisioning.',
    status: 'TODO',
    priority: 'High',
    assignee: 'Mike Torres',
    reporter: 'Tara Anand',
    department: 'Engineering',
    dueDate: daysAhead(7),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
    subtasks: [
      { id: 1, text: 'Audit user schema attributes', completed: false },
      { id: 2, text: 'Generate SCIM bearer tokens', completed: false },
      { id: 3, text: 'Execute delta sync test', completed: false },
    ],
    comments: [],
  },
  {
    id: 'TSK-1003',
    title: 'Quarterly SOC2 Type II compliance evidence collection',
    description: 'Gather access log exports, role change audit tickets, and firewall penetration test certificates for external auditors.',
    status: 'REVIEW',
    priority: 'High',
    assignee: 'Sarah Chen',
    reporter: 'Elena Rostova',
    department: 'Operations',
    dueDate: daysAhead(1),
    createdAt: daysAgo(12),
    updatedAt: daysAgo(1),
    subtasks: [
      { id: 1, text: 'Export AWS CloudTrail access logs', completed: true },
      { id: 2, text: 'Collect employee onboarding/offboarding sign-offs', completed: true },
      { id: 3, text: 'Auditor review session walkthrough', completed: false },
    ],
    comments: [
      { id: 1, author: 'Elena Rostova', text: 'Auditor requested Q3 encrypted drive policy receipts as well.', date: daysAgo(2) },
    ],
  },
  {
    id: 'TSK-1004',
    title: 'Upgrade production PostgreSQL cluster to v16.2',
    description: 'Perform rolling minor version upgrade on primary and replica instances with zero read downtime.',
    status: 'COMPLETED',
    priority: 'Medium',
    assignee: 'James Wilson',
    reporter: 'James Wilson',
    department: 'Engineering',
    dueDate: daysAgo(1),
    createdAt: daysAgo(8),
    updatedAt: daysAgo(1),
    subtasks: [
      { id: 1, text: 'Take pre-maintenance EBS snapshot', completed: true },
      { id: 2, text: 'Upgrade standby replica nodes', completed: true },
      { id: 3, text: 'Failover and upgrade former primary', completed: true },
      { id: 4, text: 'Validate database query latency', completed: true },
    ],
    comments: [
      { id: 1, author: 'James Wilson', text: 'Upgrade completed with zero packet drop. Replication lag 0ms.', date: daysAgo(1) },
    ],
  },
  {
    id: 'TSK-1005',
    title: 'Deploy Automated Patch Management agent on macOS fleet',
    description: 'Roll out Jamf Pro configuration profile to enforce monthly critical security patch installations within 7 days.',
    status: 'IN_PROGRESS',
    priority: 'Medium',
    assignee: 'Sarah Chen',
    reporter: 'Tara Anand',
    department: 'Operations',
    dueDate: daysAhead(5),
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
    subtasks: [
      { id: 1, text: 'Test package on IT devices', completed: true },
      { id: 2, text: 'Send reminder newsletter to employees', completed: true },
      { id: 3, text: 'Monitor installation compliance percentage', completed: false },
    ],
    comments: [],
  },
  {
    id: 'TSK-1006',
    title: 'Revoke inactive VPN accounts older than 90 days',
    description: 'Identify contractors and terminated staff who still have valid certificates and purge their credentials.',
    status: 'TODO',
    priority: 'Low',
    assignee: 'Mike Torres',
    reporter: 'Elena Rostova',
    department: 'Operations',
    dueDate: daysAhead(10),
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    subtasks: [
      { id: 1, text: 'Run python audit script against Radius log', completed: false },
      { id: 2, text: 'Cross-check with HR Workday status', completed: false },
    ],
    comments: [],
  },
  {
    id: 'TSK-1007',
    title: 'Redesign single sign-on landing portal',
    description: 'Improve responsive layout and dark mode styling for the internal employee application launchpad.',
    status: 'REVIEW',
    priority: 'Low',
    assignee: 'Tara Anand',
    reporter: 'Sarah Chen',
    department: 'Product',
    dueDate: daysAhead(3),
    createdAt: daysAgo(6),
    updatedAt: daysAgo(1),
    subtasks: [
      { id: 1, text: 'Create Tailwind mockups', completed: true },
      { id: 2, text: 'Integrate SVG icon library', completed: true },
      { id: 3, text: 'Browser cross-testing on Safari & Firefox', completed: false },
    ],
    comments: [
      { id: 1, author: 'Sarah Chen', text: 'Looks crisp! Let us test with high contrast mode before merge.', date: daysAgo(1) },
    ],
  },
]
