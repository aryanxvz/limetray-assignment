import React from 'react';
import { Header } from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/task/TaskForm';
import { TaskList } from './components/task/TaskList';
import { Filters } from './components/Filters';
import './App.css';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-all flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <Header />
        <div className="sm:px-2 sm:py-3 flex-1 flex flex-col">
          <TaskForm />
          <TaskList />
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6">
        <div className="sm:px-2">
          <Filters />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
