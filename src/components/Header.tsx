import { ThemeToggle } from './ThemeToggle'

export const Header = () => {

return (
  <header className="flex items-center justify-between mb-6">
    <h1 className="text-3xl font-bold">Limetray</h1>
    <div className="flex items-center gap-3">
      <ThemeToggle />
    </div>
  </header>
  )
}