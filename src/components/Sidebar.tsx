import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Mail, 
  Globe, 
  Github, 
  Linkedin,
  Instagram, 
  Facebook, 
  Twitter,
  MapPin,
  Check, 
  Copy,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO, CONTACT_ITEMS } from '../data/portfolioData';

// Discord SVG Icon
function DiscordIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Fiverr SVG Icon
function FiverrIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.5 13.5v-3h-2.2v-1.1c0-.9.4-1.2 1.2-1.2h1v-2.7h-1.9c-2.4 0-3.3 1.3-3.3 3.6v1.4h-1.5v3h1.5V21h3v-7.5h2.2zm-9.3-3h-2.9L8.7 17.1 7.1 10.5H4.2l2.9 10.5h3.2l2.9-10.5zm-11.7 0H0V21h1.5v-7.5h.3c2.1 0 3.3-1.1 3.3-3 0-2.1-1.4-3-3.6-3zm0 2.6V12h-.3c-1.1 0-1.7-.5-1.7-1.4 0-.8.6-1.3 1.7-1.3h.3v3.8z" />
    </svg>
  );
}

// Codeforces SVG Icon
function CodeforcesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="9" width="4.5" height="12" rx="1.5" fill="#4B90E2" />
      <rect x="9.75" y="4" width="4.5" height="17" rx="1.5" fill="#F5A623" />
      <rect x="17" y="12" width="4.5" height="9" rx="1.5" fill="#D0021B" />
    </svg>
  );
}

// Telegram SVG Icon
function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export const Sidebar: React.FC = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(520);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight + 8);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [isOpenMobile]);

  const handleToggleMobile = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 8);
    }
    setIsOpenMobile((prev) => !prev);
  };

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getContactIcon = (iconType: string) => {
    switch (iconType) {
      case 'discord':
        return <DiscordIcon className="w-4 h-4 text-[#ffdb70]" />;
      case 'telegram':
        return <TelegramIcon className="w-4 h-4 text-[#0fd6ab]" />;
      case 'github':
        return <Github className="w-4 h-4 text-[#ffdb70]" />;
      case 'codeforces':
        return <CodeforcesIcon className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-[#ffdb70]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#ffdb70]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#ffdb70]" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-[#ffdb70]" />;
      case 'fiverr':
        return <FiverrIcon className="w-4 h-4 text-[#ffdb70]" />;
      case 'mail':
        return <Mail className="w-4 h-4 text-[#ffdb70]" />;
      case 'map-pin':
        return <MapPin className="w-4 h-4 text-[#0fd6ab]" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-[#0fd6ab]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#ffdb70]" />;
    }
  };

  return (
    <aside 
      className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] p-[clamp(1rem,2vw,1.5rem)] shadow-2xl relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full h-auto md:h-full flex flex-col justify-between sidebar-glow-animated overflow-hidden"
      aria-label="Sidebar"
    >
      {/* Animated Ambient Top Glow Accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0fd6ab] to-[#ffdb70] opacity-85 pointer-events-none"
        aria-hidden="true"
      />

      {/* Profile Header */}
      <div className="flex md:flex-col items-center gap-[clamp(0.875rem,2vw,1.25rem)] relative shrink-0 transition-all duration-500">
        {/* Interactive Avatar Theme Changer */}
        <div className="relative group shrink-0">
          <figure 
            onClick={toggleTheme}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
            role="button"
            tabIndex={0}
            title={isDark ? "Click avatar to switch to Light Mode" : "Click avatar to switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`p-1.5 rounded-full border shadow-lg shrink-0 cursor-pointer interactive-glow-icon transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffdb70] ${
              isDark
                ? 'bg-gradient-to-br from-[#2a2a2c] to-[#121212] border-[#383838] hover:border-[#ffdb70]/80'
                : 'bg-gradient-to-br from-[#ffffff] to-[#f1f5f9] border-[#cbd5e1] hover:border-[#d97706]/80'
            }`}
          >
            <img 
              src={isDark ? PERSONAL_INFO.avatarUrl : '/assets/images/avatar_light.jpg?v=3'} 
              alt={`${PERSONAL_INFO.name} - Click avatar to toggle theme`}
              className="w-[clamp(4.5rem,13vw,5.5rem)] h-[clamp(4.5rem,13vw,5.5rem)] md:w-[clamp(6.25rem,9.5vw,8.5rem)] md:h-[clamp(6.25rem,9.5vw,8.5rem)] object-cover rounded-full select-none transition-all duration-300"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/my-avatar.png';
              }}
            />
          </figure>
        </div>

        <div className="text-left md:text-center min-w-0 flex-1 md:w-full pr-9 min-[480px]:pr-28 md:pr-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <h1 
            className="text-white text-[clamp(1.1rem,3vw,1.45rem)] md:text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold tracking-tight leading-tight mb-1.5 sm:mb-2 transition-all duration-300"
            title={PERSONAL_INFO.name}
          >
            {PERSONAL_INFO.name}
          </h1>
          <div className="inline-block w-auto md:w-full bg-[#2b2b2c] text-[#ffdb70] text-[clamp(0.6rem,1.1vw,0.6875rem)] font-medium tracking-wider uppercase px-2.5 py-1.5 rounded-lg border border-[#383838]/80 text-center leading-snug interactive-glow-tag transition-all duration-300">
            {PERSONAL_INFO.shortRole}
          </div>
          <p className="text-[11px] text-[#8e8e8e] mt-2 hidden md:flex items-center justify-center gap-1 transition-opacity duration-300">
            <MapPin className="w-3 h-3 text-[#0fd6ab] shrink-0" />
            <span className="truncate">{PERSONAL_INFO.location}</span>
          </p>
        </div>

        {/* Dynamic Mobile Toggle (< 768px): Icon-only on small screens, "Connect" + Icon on wider mobile, Hidden on Tablet & PC (>= 768px) */}
        <button
          onClick={handleToggleMobile}
          className="md:hidden absolute -top-[clamp(1rem,2vw,1.5rem)] -right-[clamp(1rem,2vw,1.5rem)] bg-[#2b2b2c] hover:bg-[#383838] active:scale-95 text-[#ffdb70] border-b border-l border-[#ffdb70]/50 button-glow-animated rounded-bl-2xl rounded-tr-[19px] p-2.5 min-[480px]:px-3.5 min-[480px]:py-2 text-xs font-semibold flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] cursor-pointer shadow-md z-10"
          aria-expanded={isOpenMobile}
          aria-label="Toggle connect contacts information"
          title={isOpenMobile ? "Hide Contacts" : "Connect"}
        >
          <span className="max-w-0 opacity-0 overflow-hidden min-[480px]:max-w-[80px] min-[480px]:opacity-100 min-[480px]:mr-1.5 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
            {isOpenMobile ? "Hide" : "Connect"}
          </span>
          <ChevronDown
            className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              isOpenMobile ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/* Expandable Contacts Section (Always visible in PC layout on Tablet & Desktop >= 768px, Smooth Drawer on Mobile < 768px) */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpenMobile ? `${contentHeight}px` : '0px',
        }}
        className={`flex flex-col justify-between transition-[max-height,opacity,transform,margin] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] md:flex-1 md:!max-h-none md:opacity-100 md:translate-y-0 md:pointer-events-auto md:mt-4 md:overflow-visible ${
          isOpenMobile
            ? 'opacity-100 translate-y-0 pointer-events-auto mt-4 overflow-hidden'
            : 'opacity-0 -translate-y-2 pointer-events-none mt-0 overflow-hidden'
        }`}
      >
        <div className="h-[1px] bg-[#383838] my-3.5 shrink-0" aria-hidden="true" />

        <ul className="grid grid-cols-1 min-[520px]:grid-cols-2 md:flex md:flex-col md:justify-between gap-3.5 flex-1 min-h-0 overflow-y-auto pr-1">
          {CONTACT_ITEMS.map((item) => (
            <li key={item.id} className="flex items-center gap-3 group min-w-0">
              <div 
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2a2a2b] to-[#1c1c1d] border border-[#383838] flex items-center justify-center shrink-0 shadow-sm interactive-glow-icon"
                aria-hidden="true"
              >
                {getContactIcon(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold tracking-wider truncate">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 min-w-0">
                  <a
                    href={item.link}
                    target={item.link.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`text-xs font-normal truncate hover:underline block flex-1 min-w-0 ${
                      item.isGlow ? "glow-link font-medium" : "text-[#d6d6d6] hover:text-[#ffdb70]"
                    }`}
                    title={item.value}
                  >
                    {item.value}
                  </a>
                  {item.link.startsWith('http') && (
                    <ExternalLink className="w-2.5 h-2.5 text-[#666] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  )}
                </div>
              </div>

              {/* Quick Copy affordance for email, discord, telegram, github, codeforces */}
              {(item.id === 'email' || item.id === 'discord' || item.id === 'telegram' || item.id === 'github' || item.id === 'codeforces') && (
                <button
                  onClick={(e) => handleCopy(e, item.value, item.id)}
                  className="p-1.5 text-[#777] hover:text-[#ffdb70] rounded-md transition-colors shrink-0"
                  title={`Copy ${item.title}`}
                  aria-label={`Copy ${item.title}`}
                >
                  {copiedItem === item.id ? (
                    <Check className="w-3.5 h-3.5 text-[#0fd6ab]" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-60 hover:opacity-100" />
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="shrink-0">
          <div className="h-[1px] bg-[#383838] my-3.5" aria-hidden="true" />

          {/* Location Footer */}
          <div className="flex items-center gap-3 group min-w-0">
            <div 
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2a2a2b] to-[#1c1c1d] border border-[#383838] flex items-center justify-center shrink-0 shadow-sm interactive-glow-icon"
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4 text-[#0fd6ab]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold tracking-wider truncate">
                Location
              </p>
              <div className="flex items-center gap-1 min-w-0">
                <a
                  href="https://maps.google.com/?q=Dinajpur,Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal truncate hover:underline block flex-1 min-w-0 text-[#d6d6d6] hover:text-[#ffdb70]"
                  title={PERSONAL_INFO.location}
                >
                  {PERSONAL_INFO.location}
                </a>
                <ExternalLink className="w-2.5 h-2.5 text-[#666] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
