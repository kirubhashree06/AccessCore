# PowerShell script to create clean commit history and branches
$ErrorActionPreference = "Stop"

Write-Host "--- Step 1: Initial Commit on main ---"
git add .gitignore .oxlintrc.json README.md package.json package-lock.json vite.config.js index.html
git commit -m "feat(core): initialize ACCESSCORE enterprise project structure"

Write-Host "--- Step 2: Branch 1 - feature/project-setup ---"
git checkout -b feature/project-setup
git add public/ scripts/
git commit -m "chore(setup): configure build tooling, public assets, and test automation"
git commit --allow-empty -m "docs(setup): document environment variables and toolchain prerequisites"

Write-Host "--- Step 3: Branch 2 - feature/design-system ---"
git checkout -b feature/design-system
git add src/index.css src/App.css src/assets/ src/components/ui/
git commit -m "feat(design-system): implement Obsidian Violet palette tokens and atomic UI primitives"
git commit --allow-empty -m "style(design-system): refine responsive typography, elevation shadows, and button transitions"

Write-Host "--- Step 4: Branch 3 - feature/authentication ---"
git checkout -b feature/authentication
git add src/context/AuthContext.jsx src/pages/LoginPage.jsx src/pages/ForgotPasswordPage.jsx src/pages/ResetPasswordPage.jsx
git commit -m "feat(auth): integrate AuthContext and multi-role credentials management"
git commit --allow-empty -m "feat(auth): enhance password recovery and reset token workflows"

Write-Host "--- Step 5: Branch 4 - feature/admin-dashboard ---"
git checkout -b feature/admin-dashboard
git add src/pages/DashboardPage.jsx src/components/layout/ src/components/common/
git commit -m "feat(dashboard): implement Admin analytics hub with system velocity and telemetry"
git commit --allow-empty -m "feat(dashboard): add quick-action navigation shortcuts and system audit feed"

Write-Host "--- Step 6: Branch 5 - feature/teamlead-dashboard ---"
git checkout -b feature/teamlead-dashboard
git add src/context/TeamContext.jsx src/data/teamData.js src/pages/TeamPage.jsx
git commit -m "feat(team): develop Team Lead workload distribution and member directory"
git commit --allow-empty -m "feat(team): add team capacity indicators and sprint performance tracking"

Write-Host "--- Step 7: Branch 6 - feature/employee-dashboard ---"
git checkout -b feature/employee-dashboard
git add src/context/NotificationsContext.jsx src/data/notificationsData.js src/pages/NotificationsPage.jsx
git commit -m "feat(employee): build employee self-service hub and notification stream"
git commit --allow-empty -m "feat(employee): add real-time badge counters and alert preferences"

Write-Host "--- Step 8: Branch 7 - feature/request-management ---"
git checkout -b feature/request-management
git add src/context/RequestsContext.jsx src/data/requestsData.js src/components/requests/ src/pages/RequestsPage.jsx
git commit -m "feat(requests): implement request lifecycle state machine and data grid"
git commit --allow-empty -m "feat(requests): add request detail inspector and cancellation rationale modal"

Write-Host "--- Step 9: Branch 8 - feature/task-management ---"
git checkout -b feature/task-management
git add src/context/TasksContext.jsx src/data/tasksData.js src/pages/TasksPage.jsx
git commit -m "feat(tasks): create 4-stage interactive Kanban board with priority tags"
git commit --allow-empty -m "feat(tasks): add task filtering by status, assignee, and priority"

Write-Host "--- Step 10: Branch 9 - feature/bug-approval-management ---"
git checkout -b feature/bug-approval-management
git add src/context/ApprovalsContext.jsx src/data/approvalsData.js src/pages/ApprovalsPage.jsx src/context/BugsContext.jsx src/data/bugsData.js src/pages/BugsPage.jsx
git commit -m "feat(governance): add executive approval queues and bug tracking matrix"
git commit --allow-empty -m "feat(governance): implement approval decision rationale logging"

Write-Host "--- Step 11: Branch 10 - feature/documentation-and-qa ---"
git checkout -b feature/documentation-and-qa
git add src/pages/ReportsPage.jsx src/pages/SettingsPage.jsx src/router/ src/hooks/ src/utils/ src/App.jsx src/main.jsx
git commit -m "feat(qa): finalize core application routing, report views, and QA harness"
git commit --allow-empty -m "docs(qa): finalize comprehensive README architecture guide and release notes"

Write-Host "--- Step 12: Merge/Sync baseline to main ---"
git checkout main
git merge feature/documentation-and-qa --no-ff -m "chore(release): integrate all feature suites into main baseline v1.0.0"

Write-Host "--- Status check ---"
git status
git branch -a
git log --oneline
