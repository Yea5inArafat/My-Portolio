import React from 'react';

export type NavTab = 'about' | 'resume' | 'portfolio' | 'services' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Project' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop & Tablet Floating Header Nav */}
      <nav 
        className="hidden md:flex items-center absolute top-0 right-0 z-20 bg-[#282829]/80 backdrop-blur-md border-b border-l border-[#383838] rounded-bl-[20px] rounded-tr-[20px] px-[clamp(1.125rem,2.5vw,1.75rem)] py-3.5 shadow-sm overflow-hidden max-w-full"
        aria-label="Main Navigation Desktop"
      >
        {/* Animated Corner Ambient Accent Line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#0fd6ab] via-[#ffdb70] to-transparent opacity-85 pointer-events-none"
          aria-hidden="true"
        />

        <ul className="flex items-center gap-[clamp(1rem,2vw,1.75rem)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`nav-tab-btn text-[clamp(0.8125rem,1.3vw,0.9375rem)] font-medium transition-all duration-200 cursor-pointer relative py-1 whitespace-nowrap ${
                    isActive 
                      ? 'text-[#ffdb70] font-semibold' 
                      : 'text-[#d6d6d6]/80 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ffdb70] to-[#ffa500] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e1f]/95 backdrop-blur-xl border-t border-[#383838] px-3 py-2 shadow-2xl"
        aria-label="Main Navigation Mobile"
      >
        <ul className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="flex-1">
                <button
                  onClick={() => {
                    onTabChange(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full py-1.5 px-1 text-center text-xs font-medium rounded-lg transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    isActive 
                      ? 'text-[#ffdb70] bg-[#2a2a2c]' 
                      : 'text-[#9e9e9e] hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffdb70]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
