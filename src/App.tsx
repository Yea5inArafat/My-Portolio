import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar, NavTab } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { ResumeSection } from './components/ResumeSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Globe, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';

// Codeforces SVG Icon
function CodeforcesMiniIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="9" width="4.5" height="12" rx="1.5" fill="#4B90E2" />
      <rect x="9.75" y="4" width="4.5" height="17" rx="1.5" fill="#F5A623" />
      <rect x="17" y="12" width="4.5" height="9" rx="1.5" fill="#D0021B" />
    </svg>
  );
}

function PortfolioContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('about');
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = "Yeasin Arafat's Portfolio";
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212] text-[#d6d6d6] selection:bg-[#0fd6ab]/30 selection:text-white' : 'bg-[#FAF9F6] text-[#0f172a] selection:bg-[#0d9488]/25 selection:text-[#0f172a]'} flex flex-col justify-between pb-20 md:pb-12 transition-colors duration-300 overflow-x-hidden`}>
      {/* Main Center Stage */}
      <main className="max-w-[1240px] w-full mx-auto px-[clamp(0.75rem,2.5vw,2rem)] py-[clamp(1rem,2.5vw,3rem)] flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[clamp(235px,25vw,295px)_minmax(0,1fr)] items-stretch gap-[clamp(1rem,2vw,1.75rem)] relative flex-1">
          
          {/* Sidebar (Equal-height PC style on Tablet & Desktop >= 768px, Collapsible on Mobile < 768px) */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="min-w-0 w-full h-full flex flex-col">
            <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] p-[clamp(1.25rem,3vw,2.5rem)] shadow-2xl relative h-full flex-1 flex flex-col overflow-hidden">
              
              {/* Header Navbar */}
              <Navbar 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              {/* Dynamic Tab Views */}
              <div className="pt-2 md:pt-4 flex-1 h-full flex flex-col">
                {activeTab === 'about' && (
                  <AboutSection
                    onNavigateToPortfolio={() => setActiveTab('portfolio')}
                    onNavigateToContact={() => setActiveTab('contact')}
                  />
                )}
                {activeTab === 'resume' && (
                  <ResumeSection />
                )}
                {activeTab === 'portfolio' && (
                  <PortfolioSection />
                )}
                {activeTab === 'services' && (
                  <ServicesSection
                    onNavigateToContact={() => setActiveTab('contact')}
                  />
                )}
                {activeTab === 'contact' && (
                  <ContactSection />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-6 border-t border-[#222223] text-center text-xs text-[#707070] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#0fd6ab]" />
          <span className="font-medium text-white tracking-wide">MD YEASIN ARAFAT</span>
        </div>
        
        <p className="text-[11px] sm:text-xs">
          Computer Science Student | Competitive Programmer | Aspiring Software Developer
        </p>

        <div className="flex items-center gap-3 text-xs">
          <a 
            href={PERSONAL_INFO.blogUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#0fd6ab] flex items-center gap-1 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#0fd6ab]" />
            <span>Blog</span>
          </a>
          <a 
            href="https://github.com/Yea5inArafat" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/Yea5inArafat" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
