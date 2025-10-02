import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTask: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export const TaskList: React.FC = () => {
  const { tasks, reorderTasks } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);
      reorderTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <motion.div className="mb-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <motion.div key="empty-state"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12 sm:py-16"
                >
                  <motion.div animate={{ y: [0, -10, 0]}}
                    transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                  >
                    <div className="text-6xl sm:text-7xl mb-4">📝</div>
                  </motion.div>
                  <p className="text-gray-400 dark:text-neutral-500 text-base sm:text-lg">
                    No tasks yet. Add one to get started!
                  </p>
                </motion.div>
              ) : (
                tasks.map(task => (
                  <SortableTask key={task.id} id={task.id}>
                    <TaskItem task={task} />
                  </SortableTask>
                ))
              )}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  );
};