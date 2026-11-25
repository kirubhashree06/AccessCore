# ACCESSCORE – Enterprise Workflow & Service Management System

![ACCESSCORE Version](https://img.shields.io/badge/version-2.0.0-6D4AFF?style=flat-square)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.0-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)
![QA Audit](https://img.shields.io/badge/QA%20Verification-20%2F20%20Passed-10B981?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**ACCESSCORE** is an enterprise-grade workflow, service request, and team orchestration platform engineered with modern React, Vite, and Tailwind CSS. Featuring the signature **Obsidian Violet** design system, ACCESSCORE provides seamless end-to-end task automation, request management, agile Kanban workflows, role-based access control (Admin, Team Lead, Employee), defect tracking, and governance approvals.

---

## 🌟 Key Capabilities & Features

- **Obsidian Violet Design System**: Polished dark Obsidian sidebar (`#11111B`), Electric Violet accents (`#6D4AFF`), Soft Violet highlights (`#A78BFA`), crisp white cards, and luminous lavender canvas (`#F4F2FF`).
- **Signature Core Diamond (◈) Identity**: Minimal, geometric brand identity integrated across the application header, authentication screens, and high-fidelity browser favicon.
- **Multi-Role Role-Based Access Control (RBAC)**:
  - **Admin (Tara Anand)**: System-wide telemetry, cross-department KPI monitors, audit logs, team governance, and velocity analytics.
  - **Team Lead (Sarah Chen)**: Team workload balancing, pending approval queues, SLA dispatch, and sprint tracking.
  - **Employee (James Wilson)**: Self-service request creation, ticket progress tracker, assigned tasks, and incident reporting.
- **Interactive Kanban Task Management**: 4-column workflow (`To Do`, `In Progress`, `Review`, `Done`) with Work In Progress (WIP) limits, 1-click stage advancement, priority weight ordering, and member assignees.
- **Service Request Lifecycle**: Filterable, searchable request catalog with status chips, multi-row checkbox bulk export, live character counters, dynamic SLA resolution target calculation, and approval auditing.
- **Defect & Bug Tracking**: Severity-classified issue boards (`Critical`, `High`, `Medium`, `Low`) with reproduction steps, telemetry attachment chips, 1-click clipboard summary export, and filtered CSV export.
- **Governance & Approvals**: One-click approval/rejection workflows with mandatory justification audit trail, keyword search across requestor/dept, and category filtering.
- **Global Search & Quick Actions**: Instant fuzzy navigation modal (`Ctrl+K` / `Cmd+K`) across projects, requests, members, and documentation with recent search persistence and category chips.
- **Accessibility & Responsive Design**: Standard WAI-ARIA form validation descriptors (`aria-describedby`, `aria-invalid`), skip-to-content landmark, dynamic `100dvh` viewport support, and mobile drawer scroll locking.
- **Automated Verification**: Integrated 20-point automated QA test suite (`node scripts/qa-audit.js`) verifying branding, routing, workflow state machines, and visual design compliance.

---

## 🎨 Theme Palette (Obsidian Violet)

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Obsidian** | `#11111B` | Sidebar navigation, dark structural framing |
| **Primary Violet** | `#6D4AFF` | Primary buttons, active indicators, brand accent |
| **Soft Violet** | `#A78BFA` | Badges, secondary highlights, subtle accents |
| **Canvas Background** | `#F4F2FF` | Main application content background |
| **Card Background** | `#FFFFFF` | Elevated cards, tables, modals, input containers |
| **Text Primary** | `#1E1B2E` | Headings, primary typography, high-contrast labels |
| **Text Secondary** | `#64748B` | Subtext, timestamps, secondary metadata |
| **Borders** | `#EDE8FA` | Refined card borders, separators, table dividers |

---

## 👥 Three-Member Collaboration Team

This repository is maintained and developed cooperatively by:

| Contributor | GitHub Account | Primary Domain |
| :--- | :--- | :--- |
| **Repository Owner** | `thavimathijp12-png` | Architecture, Governance, Branch Merges & Reviews |
| **Collaborator** | `varshinivathasivam` | UI Foundations & Core Design System |
| **Collaborator** | `kirubhashree06` | Enterprise Workflows, QA Verification & Feature Milestones |

---

## 📋 20 Pull Request Contributions & Changelog

| PR # | Branch Name | Title & Description | Key Files Modified |
| :--- | :--- | :--- | :--- |
| **#11** | `feature/dashboard-improvements` | Dynamic time-horizon velocity metrics and telemetry JSON export | `src/pages/DashboardPage.jsx` |
| **#12** | `feature/sidebar-enhancements` | Live badge counters for operational items and Ctrl+B collapse toggle | `src/components/layout/Sidebar.jsx` |
| **#13** | `feature/global-search` | Category filter chips, recent search history persistence, and arrow navigation | `src/components/common/GlobalSearchModal.jsx` |
| **#14** | `feature/request-validation` | Real-time input validation, character counters, and attachment limits | `src/components/requests/RequestForm.jsx` |
| **#15** | `feature/request-table` | Multi-row checkbox selection, bulk CSV export, and table density toggle | `src/components/requests/RequestTable.jsx` |
| **#16** | `feature/request-details` | ID clipboard copy, text summary export, dynamic SLA targets, timeline filter | `src/components/requests/RequestDetail.jsx` |
| **#17** | `feature/task-management` | Due date status badges, pure form state, and schedule list view | `src/pages/TasksPage.jsx` |
| **#18** | `feature/kanban-improvements` | WIP limit badges and 1-click stage advancement buttons on task cards | `src/pages/TasksPage.jsx` |
| **#19** | `feature/task-priority` | Priority weight ordering, priority matrix chips, and live counts | `src/pages/TasksPage.jsx` |
| **#20** | `feature/team-management` | Workload capacity progress bars, status filtering, and roster CSV export | `src/pages/TeamPage.jsx` |
| **#21** | `feature/employee-profiles` | Employee dossier with active workload metrics, clearance tags, and contact links | `src/pages/TeamPage.jsx` |
| **#22** | `feature/approval-workflow` | Search filtering, category dropdown, and priority visual badges | `src/pages/ApprovalsPage.jsx` |
| **#23** | `feature/bug-tracking` | Defect CSV export, telemetry attachment chips, and brief clipboard copy | `src/pages/BugsPage.jsx` |
| **#24** | `feature/notifications` | Keyword search filtering, unread-only filter, and clear-read actions | `src/pages/NotificationsPage.jsx` |
| **#25** | `feature/auth-validation` | Password strength meter, persona quick-fill, and remember-me persistence | `src/pages/LoginPage.jsx` |
| **#26** | `feature/responsive-design` | Dynamic viewport dvh units, safe area insets, and drawer scroll locking | `src/components/layout/AppLayout.jsx`, `src/index.css` |
| **#27** | `feature/accessibility` | Skip-to-content landmark, WAI-ARIA form descriptors, and button busy states | `src/components/layout/AppLayout.jsx`, `src/components/ui/Input.jsx`, `src/components/ui/Button.jsx` |
| **#28** | `feature/ui-improvements` | Quick-create navigation menu, operational health badge, and header refinements | `src/components/layout/Topbar.jsx` |
| **#29** | `feature/code-quality` | Named auth guard exports, clean unused imports, and eliminate dead variables | `src/router/index.jsx`, `src/pages/ReportsPage.jsx`, `src/pages/SettingsPage.jsx`, etc. |
| **#30** | `feature/documentation` | Comprehensive architecture documentation, changelog, and QA reports | `README.md` |

---

## 🛠️ Technology Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tooling & Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling & Design Tokens**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Visualization**: Recharts
- **Quality Assurance**: Automated Node.js audit suite (`scripts/qa-audit.js`)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thavimathijp12-png/AccessCore.git
   cd AccessCore
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run production build**:
   ```bash
   npm run build
   ```

5. **Run linter**:
   ```bash
   npm run lint
   ```

6. **Run automated QA verification**:
   ```bash
   node scripts/qa-audit.js
   ```

---

## 👥 Role Personas & Test Accounts

| Role | Default User | Email | Credentials & Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | **Tara Anand** | `tara.anand@accesscore.io` | Level 3 Root Access: Full system governance, approvals, team administration |
| **Team Lead** | **Sarah Chen** | `sarah.chen@accesscore.io` | Level 2 Lead Access: Approval queues, department oversight, task assignment |
| **Employee** | **James Wilson** | `james.wilson@accesscore.io` | Level 1 Standard Access: Service requests, personal task tracker, defect reporting |

---

## 📄 License

This project is licensed under the MIT License.
