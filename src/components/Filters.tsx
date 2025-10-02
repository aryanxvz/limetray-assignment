import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTasks } from "../context/TaskContext";

export const Filters: React.FC = () => {
  const { tasks } = useTasks()
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [isOpen, setIsOpen] = useState(false)

  const filterOptions = [
    { value: "all", label: "All"},
    { value: "completed", label: "Completed"},
    { value: "pending", label: "Pending"},
  ] as const

  const filtered = tasks.filter(task =>
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  )

  const stats = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  }

  const selectedOption = filterOptions.find(opt => opt.value === filter)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <div className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-neutral-700/50 shadow-lg p-4">
        <div className="flex flex-row items-center justify-between gap-3 mb-6 border-b border-gray-200 dark:border-neutral-700 pb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white ml-1 sm:ml-2">
            Filter Tasks
          </h3>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 min-w-[150px]"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{selectedOption?.label}</span>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div className="fixed inset-0 z-10"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-full min-w-[180px] bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden z-20"
                  >
                    {filterOptions.map((option) => (
                      <button key={option.value}
                        onClick={() => {
                          setFilter(option.value)
                          setIsOpen(false)}}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200
                          ${filter === option.value
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                          }`}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                          ${filter === option.value
                            ? "bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {stats[option.value]}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} className="space-y-2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <motion.div className="text-center py-8 text-gray-400 dark:text-neutral-500 text-sm sm:text-base"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                No {filter !== "all" && filter} tasks found
              </motion.div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mb-3">
                  Showing {filtered.length} {filter !== "all" && filter} task{filtered.length !== 1 && "s"}
                </p>
                {filtered.map((task, index) => (
                  <motion.div key={task.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-700/30 border border-gray-200 dark:border-neutral-600/30 text-sm sm:text-base"
                  >
                    <span className={task.completed ? "line-through text-gray-400 dark:text-neutral-500" : "text-gray-700 dark:text-white"}>
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
