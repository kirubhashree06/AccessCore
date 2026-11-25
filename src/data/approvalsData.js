// ─── Approvals Data & Workflow Constants ─────────────────────────────────

export const APPROVAL_STATUSES = ['PENDING', 'APPROVED', 'REJECTED']

export const APPROVAL_STATUS_COLORS = {
  PENDING: 'amber',
  APPROVED: 'green',
  REJECTED: 'red',
}

export const APPROVAL_TYPES = [
  'Equipment & Hardware',
  'Software License',
  'Privileged Access',
  'Travel & Expense',
  'Policy Exception',
]

const NOW = new Date()
const daysAgo = (n) => new Date(NOW - n * 86400000).toISOString()

export const DEMO_APPROVALS = [
  {
    id: 'APR-3001',
    title: 'AWS Production IAM Administrator Role Access',
    type: 'Privileged Access',
    requestor: 'James Wilson',
    department: 'Engineering',
    amountOrDetails: 'Role: ProductionOpsAdmin (Time-bound 48 hours)',
    priority: 'Critical',
    status: 'PENDING',
    justification: 'Required for scheduled PostgreSQL cluster maintenance and failover rehearsal during this weekend maintenance window.',
    submittedDate: daysAgo(1),
    decisionDate: null,
    approver: null,
    rejectionReason: null,
    history: [
      { id: 1, action: 'Submitted', actor: 'James Wilson', note: 'Access request initiated via AccessCore workflow.', date: daysAgo(1) },
      { id: 2, action: 'Pre-check Passed', actor: 'System Gatekeeper', note: 'Requestor holds valid Security Tier-2 certification.', date: daysAgo(1) },
    ],
  },
  {
    id: 'APR-3002',
    title: 'Datadog Enterprise APM Subscription Extension',
    type: 'Software License',
    requestor: 'Sarah Chen',
    department: 'Engineering',
    amountOrDetails: '$4,200 / month (Annual contract addendum)',
    priority: 'High',
    status: 'PENDING',
    justification: 'Current host count exceeded by 35 nodes following Kubernetes microservice cluster expansion. Additional synthetic monitoring licenses needed.',
    submittedDate: daysAgo(2),
    decisionDate: null,
    approver: null,
    rejectionReason: null,
    history: [
      { id: 1, action: 'Submitted', actor: 'Sarah Chen', note: 'Submitted for Finance & VP approval.', date: daysAgo(2) },
    ],
  },
  {
    id: 'APR-3003',
    title: 'Ergonomic Standing Desk & Monitor Arm Package',
    type: 'Equipment & Hardware',
    requestor: 'Tom Nguyen',
    department: 'Sales',
    amountOrDetails: '$850.00 (Standard Ergonomic Allowance)',
    priority: 'Medium',
    status: 'APPROVED',
    justification: 'Occupational health recommendation for ergonomic sit-stand desk setup. Documentation uploaded to employee file.',
    submittedDate: daysAgo(5),
    decisionDate: daysAgo(4),
    approver: 'Tara Anand',
    rejectionReason: null,
    history: [
      { id: 1, action: 'Submitted', actor: 'Tom Nguyen', note: 'Submitted with doctor note receipt.', date: daysAgo(5) },
      { id: 2, action: 'Approved', actor: 'Tara Anand', note: 'Approved under Q4 workplace ergonomics policy.', date: daysAgo(4) },
      { id: 3, action: 'Dispatched', actor: 'Facilities', note: 'Purchase order sent to Herman Miller vendor.', date: daysAgo(3) },
    ],
  },
  {
    id: 'APR-3004',
    title: 'Third-party SaaS Vendor AI Evaluation (Anthropic Claude API)',
    type: 'Policy Exception',
    requestor: 'Elena Rostova',
    department: 'Product',
    amountOrDetails: '$1,500 pilot budget for semantic search R&D',
    priority: 'Medium',
    status: 'APPROVED',
    justification: 'Evaluating LLM API for automated categorization of enterprise customer support tickets. Enterprise DPA agreement signed.',
    submittedDate: daysAgo(8),
    decisionDate: daysAgo(6),
    approver: 'Tara Anand',
    rejectionReason: null,
    history: [
      { id: 1, action: 'Submitted', actor: 'Elena Rostova', note: 'Security impact questionnaire completed.', date: daysAgo(8) },
      { id: 2, action: 'Security Review', actor: 'SecOps', note: 'No customer PII stored or trained on by provider.', date: daysAgo(7) },
      { id: 3, action: 'Approved', actor: 'Tara Anand', note: 'Pilot authorized for 60 calendar days.', date: daysAgo(6) },
    ],
  },
  {
    id: 'APR-3005',
    title: 'Emergency Budget Allocation for Cloud Flare DDoS protection',
    type: 'Travel & Expense',
    requestor: 'Mike Torres',
    department: 'Operations',
    amountOrDetails: '$3,800 one-time emergency rate',
    priority: 'High',
    status: 'REJECTED',
    justification: 'Proposed premium rate card from external vendor during last week network incident.',
    submittedDate: daysAgo(11),
    decisionDate: daysAgo(10),
    approver: 'Tara Anand',
    rejectionReason: 'Rejected because our current enterprise Enterprise Agreement already covers unlimited Layer 7 DDoS mitigation with no surplus surcharge.',
    history: [
      { id: 1, action: 'Submitted', actor: 'Mike Torres', note: 'Expense authorization requested.', date: daysAgo(11) },
      { id: 2, action: 'Rejected', actor: 'Tara Anand', note: 'Existing contract terms already cover this protection.', date: daysAgo(10) },
    ],
  },
  {
    id: 'APR-3006',
    title: 'Production Kubernetes Cluster Direct SSH Bastion Access',
    type: 'Privileged Access',
    requestor: 'David Kim',
    department: 'Engineering',
    amountOrDetails: 'Permanent root SSH key injection into bastion',
    priority: 'Critical',
    status: 'REJECTED',
    justification: 'Requested for troubleshooting batch worker pipelines on node pool 2.',
    submittedDate: daysAgo(14),
    decisionDate: daysAgo(13),
    approver: 'Tara Anand',
    rejectionReason: 'Permanent root SSH keys violate Zero Trust corporate architecture. Please use ephemeral Teleport certificates with MFA approval instead.',
    history: [
      { id: 1, action: 'Submitted', actor: 'David Kim', note: 'Direct access requested.', date: daysAgo(14) },
      { id: 2, action: 'Rejected', actor: 'Tara Anand', note: 'Security policy requires Teleport session certificates.', date: daysAgo(13) },
    ],
  },
]
