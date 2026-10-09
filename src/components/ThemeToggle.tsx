import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "", 
  showLabel = false 
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
        isDark 
          ? 'bg-[#2b2b2c] hover:bg-[#383838] text-[#ffdb70] border border-[#383838]' 
          : 'bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#b45309] border border-[#cbd5e1]'
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#ffdb70] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-[#0f172a] transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
};
