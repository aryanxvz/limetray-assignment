import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../../context/TaskContext";
import type { Task } from "../../utils/type";

interface Props {
  task: Task;
}

export const TaskItem: React.FC<Props> = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div className="group" layout
      initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }} transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center justify-between p-4 sm:p-5 
                 bg-white dark:bg-neutral-800/50 backdrop-blur-sm
                 rounded-xl border border-gray-100 dark:border-neutral-700/50
                 shadow-sm hover:shadow-md dark:shadow-neutral-900/20
                 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
      >
        <label className="flex items-center gap-3 sm:gap-4 flex-1 cursor-pointer">
          <motion.div className="relative flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {e.stopPropagation(); toggleTask(task.id);}}
          >
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 
                       ${task.completed 
                         ? 'bg-blue-600 border-blue-600' 
                         : 'border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900'}
                       transition-all duration-200 cursor-pointer
                       flex items-center justify-center`}
            >
              {task.completed && (
                <motion.svg className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                </motion.svg>
              )}
            </div>
          </motion.div>
          
          <motion.span
            className={`flex-1 text-sm sm:text-base transition-all duration-300 break-words select-none
                     ${task.completed 
                       ? "text-gray-400 dark:text-neutral-500" 
                       : "text-gray-800 dark:text-white"}`}
            animate={{
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.6 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {task.title}
          </motion.span>
        </label>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="ml-2 sm:ml-4 p-2 rounded-lg text-red-500 hover:text-red-600 
                   hover:bg-red-50 dark:hover:bg-red-900/20
                   transition-all duration-200 flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
});
