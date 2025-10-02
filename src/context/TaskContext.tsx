import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Task } from "../utils/type";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (updated: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

  const addTask = useCallback((title: string) => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, completed: false }])
  }, [setTasks])

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    )
  }, [setTasks])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [setTasks])

  const reorderTasks = useCallback((updated: Task[]) => {
    setTasks(updated)
  }, [setTasks])

  const value = useMemo(() => ({ tasks, addTask, toggleTask, deleteTask, reorderTasks }), [
    tasks, addTask, toggleTask, deleteTask, reorderTasks
  ])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTasks must be used within TaskProvider")
  return context
}
