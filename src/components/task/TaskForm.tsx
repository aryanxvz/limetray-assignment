import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../../context/TaskContext";

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle("");
  };

  return (
    <motion.form onSubmit={handleSubmit} className="mb-4"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row gap-2">
        <div className="flex-1 relative">
          <input type="text"
            className="w-full p-2 sm:p-3 rounded-xl border-2 border-gray-200 dark:border-neutral-700 
                     bg-white dark:bg-neutral-900 dark:text-white
                     focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30
                     outline-none transition-all duration-300
                     placeholder:text-gray-400 dark:placeholder:text-neutral-500
                     text-sm sm:text-base"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        
        <motion.button type="submit"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 
                   text-white font-medium shadow-lg shadow-blue-500/30
                   hover:shadow-xl hover:shadow-blue-500/40
                   active:scale-95 transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-sm sm:text-base whitespace-nowrap"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!title.trim()}
        >
          Add
        </motion.button>
      </div>
    </motion.form>
  );
};