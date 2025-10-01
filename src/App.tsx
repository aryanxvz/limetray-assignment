import React from 'react';
import { Header } from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-all">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Hello Vite + React!
        </h1>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App;