// ─── Notifications Data & Constants ──────────────────────────────────────────

export const NOTIFICATION_CATEGORIES = ['All', 'Request', 'Task', 'Bug', 'Approval', 'System']

const NOW = new Date()
const minsAgo = (m) => new Date(NOW - m * 60000).toISOString()
const hoursAgo = (h) => new Date(NOW - h * 3600000).toISOString()
const daysAgo = (d) => new Date(NOW - d * 86400000).toISOString()

export const DEMO_NOTIFICATIONS = [
  {
    id: 'NOT-001',
    title: 'New Service Request Assigned',
    message: 'Request REQ-0004 "Office Wi-Fi drops in conference rooms" has been assigned to you by Admin.',
    category: 'Request',
    unread: true,
    timestamp: minsAgo(24),
    link: '/requests',
    priority: 'Critical',
  },
  {
    id: 'NOT-002',
    title: 'Approval Required: Production IAM Access',
    message: 'James Wilson requested privileged AWS ProductionOpsAdmin access for 48 hours.',
    category: 'Approval',
    unread: true,
    timestamp: hoursAgo(2),
    link: '/approvals',
    priority: 'Critical',
  },
  {
    id: 'NOT-003',
    title: 'Task Status Updated to Review',
    message: 'Elena Rostova moved task TSK-1003 "Quarterly SOC2 Type II compliance" to Review.',
    category: 'Task',
    unread: true,
    timestamp: hoursAgo(5),
    link: '/tasks',
    priority: 'High',
  },
  {
    id: 'NOT-004',
    title: 'Bug Reported: SAML Token Signature',
    message: 'Elena Rostova reported critical bug BUG-2001 on Production environment.',
    category: 'Bug',
    unread: true,
    timestamp: hoursAgo(8),
    link: '/bugs',
    priority: 'Critical',
  },
  {
    id: 'NOT-005',
    title: 'Approval Decision: Standing Desk Request',
    message: 'Your approval for Tom Nguyen ergonomic desk has been processed and approved.',
    category: 'Approval',
    unread: false,
    timestamp: daysAgo(1),
    link: '/approvals',
    priority: 'Medium',
  },
  {
    id: 'NOT-006',
    title: 'Scheduled System Maintenance Notice',
    message: 'Core gateway database cluster maintenance scheduled for Saturday 02:00 UTC (Estimated 15m).',
    category: 'System',
    unread: false,
    timestamp: daysAgo(2),
    link: '/settings',
    priority: 'Low',
  },
  {
    id: 'NOT-007',
    title: 'Task Completed: PostgreSQL v16.2',
    message: 'James Wilson marked task TSK-1004 "Upgrade production PostgreSQL" as Completed.',
    category: 'Task',
    unread: false,
    timestamp: daysAgo(3),
    link: '/tasks',
    priority: 'Medium',
  },
]
