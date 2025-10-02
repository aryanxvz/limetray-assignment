import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-3 mb-4 rounded-full shadow-sm transition-all">
      <div className="mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 dark:from-blue-400 dark:to-blue-400 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}