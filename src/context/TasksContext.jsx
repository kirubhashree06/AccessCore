import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_TASKS, TASK_TRANSITIONS } from '../data/tasksData'

const TasksContext = createContext(null)

let nextTaskId = DEMO_TASKS.length + 1001

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ac-tasks')
    return saved ? JSON.parse(saved) : DEMO_TASKS
  })

  const sync = (newTasks) => {
    setTasks(newTasks)
    localStorage.setItem('ac-tasks', JSON.stringify(newTasks))
  }

  const createTask = useCallback((formData) => {
    const now = new Date().toISOString()
    const newTask = {
      id: `TSK-${nextTaskId++}`,
      title: formData.title,
      description: formData.description || '',
      status: 'TODO',
      priority: formData.priority || 'Medium',
      assignee: formData.assignee || 'Unassigned',
      reporter: formData.reporter || 'Tara Anand',
      department: formData.department || 'Engineering',
      dueDate: formData.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      createdAt: now,
      updatedAt: now,
      subtasks: formData.subtasks || [],
      comments: [],
    }
    setTasks(prev => {
      const updated = [newTask, ...prev]
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
    return newTask
  }, [])

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => {
      const updated = prev.map(t => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t))
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
  }, [])

  const changeTaskStatus = useCallback((id, newStatus) => {
    let success = false
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id !== id) return t
        const allowed = TASK_TRANSITIONS[t.status] || []
        if (!allowed.includes(newStatus)) return t
        success = true
        return {
          ...t,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
      })
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
    return success
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== id)
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
  }, [])

  const addComment = useCallback((id, text, author = 'Tara Anand') => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id !== id) return t
        const comment = { id: Date.now(), author, text, date: new Date().toISOString() }
        return {
          ...t,
          updatedAt: new Date().toISOString(),
          comments: [...t.comments, comment],
        }
      })
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id !== taskId) return t
        const subtasks = t.subtasks.map(s => (s.id === subtaskId ? { ...s, completed: !s.completed } : s))
        return { ...t, subtasks, updatedAt: new Date().toISOString() }
      })
      localStorage.setItem('ac-tasks', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        changeTaskStatus,
        deleteTask,
        addComment,
        toggleSubtask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasks must be used within TasksProvider')
  return ctx
}
