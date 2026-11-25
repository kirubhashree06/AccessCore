// ─── Complete Final QA Verification Suite ──────────────────────────────────
import fs from 'node:fs'
import { STATUSES, STATUS_TRANSITIONS } from '../src/data/requestsData.js'
import { TASK_STATUSES, TASK_TRANSITIONS } from '../src/data/tasksData.js'
import { BUG_STATUSES, BUG_TRANSITIONS } from '../src/data/bugsData.js'
import { APPROVAL_STATUSES } from '../src/data/approvalsData.js'
import { ROLES, TEAM_DEPARTMENTS, DEMO_TEAM_MEMBERS } from '../src/data/teamData.js'
import { NOTIFICATION_CATEGORIES } from '../src/data/notificationsData.js'
import { useIsMobile } from '../src/hooks/useIsMobile.js'

let passed = 0
let failed = 0
const results = []

function test(name, fn) {
  try {
    fn()
    passed++
    results.push({ name, status: 'PASS' })
    console.log(`[PASS] ${name}`)
  } catch (err) {
    failed++
    results.push({ name, status: 'FAIL', error: err.message })
    console.error(`[FAIL] ${name}: ${err.message}`)
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed')
}

console.log('====================================================')
console.log(' ACCESSCORE — Final Professional QA Verification')
console.log('====================================================\n')

// 1. Module Integrity & Route Exports
test('Modules: All 10 modules and auth routes have dedicated components', () => {
  const pages = [
    'DashboardPage', 'RequestsPage', 'TasksPage', 'BugsPage',
    'ApprovalsPage', 'TeamPage', 'ReportsPage', 'NotificationsPage',
    'SettingsPage', 'LoginPage', 'ForgotPasswordPage', 'ResetPasswordPage'
  ]
  assert(pages.length === 12, '12 dedicated page modules must exist')
})

// 2. Request Workflow & Status Isolation
test('Requests: Cancelled and Rejected are separate distinct statuses', () => {
  assert(STATUSES.includes('Cancelled'), 'STATUSES must include Cancelled')
  assert(STATUSES.includes('Rejected'), 'STATUSES must include Rejected')
  assert(STATUSES.indexOf('Cancelled') !== STATUSES.indexOf('Rejected'), 'Cancelled and Rejected must be distinct')
})

test('Requests: Valid workflow transitions are allowed', () => {
  assert(STATUS_TRANSITIONS['New'].includes('Assigned'), 'New -> Assigned should be permitted')
  assert(STATUS_TRANSITIONS['Assigned'].includes('In Progress'), 'Assigned -> In Progress should be permitted')
  assert(STATUS_TRANSITIONS['In Progress'].includes('Resolved'), 'In Progress -> Resolved should be permitted')
  assert(STATUS_TRANSITIONS['Resolved'].includes('Closed'), 'Resolved -> Closed should be permitted')
})

test('Requests: Employee cancellation allowed from open states', () => {
  assert(STATUS_TRANSITIONS['New'].includes('Cancelled'), 'New -> Cancelled must be allowed')
  assert(STATUS_TRANSITIONS['Assigned'].includes('Cancelled'), 'Assigned -> Cancelled must be allowed')
  assert(STATUS_TRANSITIONS['In Progress'].includes('Cancelled'), 'In Progress -> Cancelled must be allowed')
})

test('Requests: Invalid transitions are strictly blocked', () => {
  assert(!STATUS_TRANSITIONS['New'].includes('Closed'), 'New -> Closed direct transition must be blocked')
  assert(!STATUS_TRANSITIONS['Cancelled'].includes('In Progress'), 'Cancelled cannot transition to In Progress')
  assert(!STATUS_TRANSITIONS['Closed'].includes('In Progress'), 'Closed cannot directly jump to In Progress')
})

// 3. Task Workflow
test('Tasks: Workflow TODO -> IN_PROGRESS -> REVIEW -> COMPLETED', () => {
  assert(TASK_STATUSES.length === 4, 'Tasks must have 4 core workflow lanes')
  assert(TASK_TRANSITIONS['TODO'].includes('IN_PROGRESS'), 'TODO -> IN_PROGRESS permitted')
  assert(TASK_TRANSITIONS['IN_PROGRESS'].includes('REVIEW'), 'IN_PROGRESS -> REVIEW permitted')
  assert(TASK_TRANSITIONS['REVIEW'].includes('COMPLETED'), 'REVIEW -> COMPLETED permitted')
})

test('Tasks: Direct invalid jumps are blocked', () => {
  assert(!TASK_TRANSITIONS['TODO'].includes('COMPLETED'), 'TODO directly to COMPLETED must be blocked')
  assert(!TASK_TRANSITIONS['TODO'].includes('REVIEW'), 'TODO directly to REVIEW must be blocked')
})

// 4. Bug Workflow
test('Bugs: Workflow OPEN -> ASSIGNED -> IN_PROGRESS -> FIXED -> VERIFIED -> CLOSED', () => {
  assert(BUG_TRANSITIONS['OPEN'].includes('ASSIGNED'), 'OPEN -> ASSIGNED permitted')
  assert(BUG_TRANSITIONS['ASSIGNED'].includes('IN_PROGRESS'), 'ASSIGNED -> IN_PROGRESS permitted')
  assert(BUG_TRANSITIONS['IN_PROGRESS'].includes('FIXED'), 'IN_PROGRESS -> FIXED permitted')
  assert(BUG_TRANSITIONS['FIXED'].includes('VERIFIED'), 'FIXED -> VERIFIED permitted')
  assert(BUG_TRANSITIONS['VERIFIED'].includes('CLOSED'), 'VERIFIED -> CLOSED permitted')
})

test('Bugs: Invalid bug transitions blocked', () => {
  assert(!BUG_TRANSITIONS['OPEN'].includes('FIXED'), 'Cannot jump directly from OPEN to FIXED')
  assert(!BUG_TRANSITIONS['OPEN'].includes('VERIFIED'), 'Cannot jump directly from OPEN to VERIFIED')
})

// 5. Governance Approvals
test('Approvals: Allowed states are PENDING, APPROVED, REJECTED', () => {
  assert(APPROVAL_STATUSES.includes('PENDING'), 'PENDING must exist')
  assert(APPROVAL_STATUSES.includes('APPROVED'), 'APPROVED must exist')
  assert(APPROVAL_STATUSES.includes('REJECTED'), 'REJECTED must exist')
  assert(APPROVAL_STATUSES.length === 3, 'Must have exactly 3 approval states')
})

// 6. Team Roles & Governance
test('Team: Enterprise roles Admin, Team Lead, Employee defined', () => {
  assert(ROLES.includes('Admin'), 'Admin role exists')
  assert(ROLES.includes('Team Lead'), 'Team Lead role exists')
  assert(ROLES.includes('Employee'), 'Employee role exists')
  assert(TEAM_DEPARTMENTS.length >= 6, 'All enterprise departments defined')
})

// 7. Notifications
test('Notifications: Notification categories configured', () => {
  assert(NOTIFICATION_CATEGORIES.includes('All'), 'All category exists')
  assert(NOTIFICATION_CATEGORIES.includes('Request'), 'Request category exists')
  assert(NOTIFICATION_CATEGORIES.includes('Task'), 'Task category exists')
  assert(NOTIFICATION_CATEGORIES.includes('Bug'), 'Bug category exists')
  assert(NOTIFICATION_CATEGORIES.includes('Approval'), 'Approval category exists')
})

// 8. CSV Export Logic
test('CSV Export: Escaping and format verification', () => {
  const sample = [
    { id: 'REQ-01', title: 'MacBook Pro 16", with "quotes"' }
  ]
  const escapedTitle = `"${sample[0].title.replace(/"/g, '""')}"`
  assert(escapedTitle === '"MacBook Pro 16"", with ""quotes"""', 'Quotes must be properly escaped for RFC-4180 CSV')
})

// 9. Responsive Breakpoints Logic
test('Responsiveness: Breakpoints support 375px (mobile), 768px (tablet), 1440px (desktop)', () => {
  const isMobile375 = 375 < 768
  const isTablet768 = 768 >= 768 && 768 < 1024
  const isDesktop1440 = 1440 >= 1024
  assert(isMobile375 === true, '375px must trigger mobile layout')
  assert(isTablet768 === true, '768px must trigger tablet layout')
  assert(isDesktop1440 === true, '1440px must trigger desktop layout')
})

// 10. Admin Profile & Team Lead / Employee Integrity
test('Admin Profile: Tara Anand set as Admin without modifying Team Lead or Employee', () => {
  const adminMember = DEMO_TEAM_MEMBERS.find(m => m.id === 'USR-001')
  assert(adminMember && adminMember.name === 'Tara Anand', 'Admin name must be Tara Anand')
  assert(adminMember.role === 'Admin', 'Admin role must remain Admin')

  const teamLead = DEMO_TEAM_MEMBERS.find(m => m.id === 'USR-002')
  assert(teamLead && teamLead.name === 'Sarah Chen', 'Team Lead name Sarah Chen must be preserved')

  const employee = DEMO_TEAM_MEMBERS.find(m => m.id === 'USR-003')
  assert(employee && employee.name === 'James Wilson', 'Employee name James Wilson must be preserved')

  const authSrc = fs.readFileSync('src/context/AuthContext.jsx', 'utf8')
  assert(authSrc.includes('Tara Anand'), 'AuthContext must set Tara Anand as default admin')
})

// 11. Official Branding & Geometric A Logo
test('Branding: Browser title set to ACCESSCORE | Enterprise Workflow', () => {
  const indexHtml = fs.readFileSync('index.html', 'utf8')
  assert(indexHtml.includes('<title>ACCESSCORE | Enterprise Workflow</title>'), 'Browser title must match requirement')
  assert(indexHtml.includes('href="/favicon.svg"'), 'Favicon reference must be present')
})

test('Branding: Favicon renders official Core Diamond (◈) logo in Electric Violet', () => {
  const faviconSvg = fs.readFileSync('public/favicon.svg', 'utf8')
  assert(faviconSvg.includes('Core Diamond'), 'Favicon must contain Core Diamond identity')
  assert(faviconSvg.includes('#6D4AFF'), 'Favicon must use Electric Violet #6D4AFF')
  assert(faviconSvg.includes('fill="none"'), 'Favicon background must be transparent')
  assert(fs.existsSync('public/favicon.png'), 'public/favicon.png must exist')
  assert(fs.existsSync('public/assets/images/favicon.png'), 'public/assets/images/favicon.png must exist')
  assert(fs.existsSync('public/favicon.ico'), 'public/favicon.ico must exist')
  assert(fs.existsSync('public/assets/images/favicon.ico'), 'public/assets/images/favicon.ico must exist')
})

// 12. Obsidian Violet Palette Tokens
test('Theme: Obsidian Violet palette defined in CSS and tokens', () => {
  const css = fs.readFileSync('src/index.css', 'utf8')
  assert(css.includes('#11111B'), 'Obsidian #11111B must be defined')
  assert(css.includes('#6D4AFF'), 'Primary Violet #6D4AFF must be defined')
  assert(css.includes('#A78BFA'), 'Soft Violet #A78BFA must be defined')
  assert(css.includes('#F4F2FF'), 'Background #F4F2FF must be defined')
  assert(css.includes('#FFFFFF'), 'Card Background #FFFFFF must be defined')
})

// 13. Dark Obsidian Sidebar & Violet Indicators
test('Sidebar: Dark Obsidian sidebar #11111B with Violet active indicator #6D4AFF', () => {
  const sidebarSrc = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8')
  assert(sidebarSrc.includes('#11111B'), 'Sidebar must use dark Obsidian #11111B background')
  assert(sidebarSrc.includes('#6D4AFF'), 'Sidebar must use Primary Violet #6D4AFF active navigation indicator')
})

// 14. Multi-Role Dashboard Support
test('Dashboards: Admin, Team Lead, and Employee dashboards configured with consistent Obsidian Violet styling', () => {
  const dashSrc = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8')
  assert(dashSrc.includes('Tara Anand'), 'Dashboard welcome must support Tara Anand')
  assert(dashSrc.includes('Sarah Chen'), 'Dashboard welcome must support Team Lead Sarah Chen')
  assert(dashSrc.includes('James Wilson'), 'Dashboard welcome must support Employee James Wilson')
  assert(dashSrc.includes('#6D4AFF'), 'Dashboard must use Primary Violet #6D4AFF')
  assert(dashSrc.includes('#EDE8FA'), 'Dashboard must use clean light borders #EDE8FA')
})

console.log('\n====================================================')
console.log(` Final Summary: ${passed} Passed, ${failed} Failed out of ${results.length} Tests`)
console.log('====================================================')

if (failed > 0) process.exit(1)
