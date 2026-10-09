import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/portfolioData';

interface ServicesSectionProps {
  onNavigateToContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateToContact }) => {
  return (
    <article className="space-y-8 flex-1 h-full flex flex-col justify-between min-w-0">
      {/* Header */}
      <header>
        <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white tracking-tight article-title-underline inline-block">
          Services & Expertise
        </h2>
        <p className="text-xs sm:text-sm text-[#9e9e9e] mt-3">
          Algorithmic problem solving, Data Structures & Algorithms implementation, C++ & Java development, and academic software solutions.
        </p>
      </header>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {SERVICES_LIST.map((service) => {
          const isExternal = Boolean(service.actionUrl);

          return (
            <div
              key={service.id}
              className="card-gradient-interactive rounded-[20px] p-6 flex flex-col justify-between group h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1d] border border-[#383838] flex items-center justify-center p-3 shadow-md interactive-glow-icon">
                    <img 
                      src={service.iconPath} 
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-medium text-[#0fd6ab] bg-[#0fd6ab]/10 border border-[#0fd6ab]/30 px-2.5 py-1 rounded-full interactive-glow-tag">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-white text-lg font-medium tracking-tight mb-2 group-hover:text-[#ffdb70] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#a0a0a0] text-xs sm:text-[13px] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <div>
                {isExternal ? (
                  <a
                    href={service.actionUrl}
                    target={service.actionUrl?.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a2c] hover:bg-[#383838] text-xs font-medium text-white border border-[#383838] btn-glow cursor-pointer group/btn"
                  >
                    <span>{service.actionText || "Learn More"}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#ffdb70] group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <button
                    onClick={onNavigateToContact}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a2c] hover:bg-[#383838] text-xs font-medium text-white border border-[#383838] btn-glow cursor-pointer"
                  >
                    <span>Discuss Collaboration</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ffdb70]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Academic Collaboration Banner */}
      <div className="bg-gradient-to-r from-[#202022] via-[#242426] to-[#202022] border border-[#383838] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 interactive-glow-div">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-white font-medium text-sm flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0fd6ab]" />
            <span>Open for Coding & Academic Collaborations</span>
          </h4>
          <p className="text-xs text-[#8e8e8e]">
            Have an algorithmic problem, study group question, or software project idea? Let's connect.
          </p>
        </div>
        <button
          onClick={onNavigateToContact}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffdb70] to-[#ffa500] text-black font-semibold text-xs tracking-wide shadow-md btn-glow-primary cursor-pointer shrink-0"
        >
          Send Inquiry
        </button>
      </div>
    </article>
  );
};
