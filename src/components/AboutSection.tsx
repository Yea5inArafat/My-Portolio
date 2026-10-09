import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, WHAT_IM_DOING } from '../data/portfolioData';

interface AboutSectionProps {
  onNavigateToPortfolio?: () => void;
  onNavigateToContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <article className="space-y-[clamp(1.75rem,3vw,2.5rem)] flex-1 h-full flex flex-col justify-between min-w-0">
      {/* Title */}
      <header>
        <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white tracking-tight article-title-underline inline-block">
          About me
        </h2>
      </header>

      {/* Bio Paragraphs */}
      <section className="space-y-4 text-[#d6d6d6] text-[clamp(0.875rem,1.4vw,0.9375rem)] leading-relaxed font-normal">
        {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
          <p key={index} className="break-words">
            {paragraph}
          </p>
        ))}

        {/* Highlight Note & Focus Callout */}
        <div className="bg-[#242426]/80 border border-[#383838]/60 border-l-4 border-l-[#ffdb70] p-[clamp(1rem,2vw,1.25rem)] rounded-r-xl space-y-2.5 min-w-0 interactive-glow-div">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
            <div className="flex items-start sm:items-center gap-2 text-white font-medium text-[clamp(0.8125rem,1.3vw,0.875rem)] min-w-0">
              <GraduationCap className="w-4 h-4 text-[#ffdb70] shrink-0 mt-0.5 sm:mt-0" />
              <span className="min-w-0 break-words">
                <a
                  href="https://hstu.ac.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffdb70] hover:underline transition-colors"
                >
                  {PERSONAL_INFO.university.name}
                </a>
              </span>
            </div>
            <span className="text-xs font-mono text-[#0fd6ab] bg-[#0fd6ab]/10 px-2.5 py-1 rounded border border-[#0fd6ab]/30 w-fit shrink-0 interactive-glow-tag">
              {PERSONAL_INFO.university.batch}
            </span>
          </div>

          <p className="text-xs text-[#a0a0a0] flex flex-wrap items-center gap-1.5">
            <span>
              <a
                href="https://hstu.ac.bd/cse/dept_cse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffdb70] hover:underline transition-colors"
              >
                Department of Computer Science & Engineering (CSE)
              </a>
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#d6d6d6] font-normal">Based in Dinajpur, Bangladesh</span>
          </p>
        </div>
      </section>

      {/* What I'm Doing */}
      <section className="@container min-w-0 flex-1 flex flex-col justify-between">
        <h3 className="text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold text-white tracking-tight mb-[clamp(0.875rem,1.8vw,1.25rem)]">
          What I'm doing
        </h3>

        <div className="grid grid-cols-1 @[420px]:grid-cols-2 auto-rows-fr gap-[clamp(0.875rem,1.8vw,1.25rem)] flex-1">
          {WHAT_IM_DOING.map((item) => (
            <div
              key={item.id}
              className="@container card-gradient-interactive group rounded-[18px] p-[clamp(0.95rem,1.8vw,1.4rem)] flex flex-col justify-center min-w-0 h-full transition-all duration-300"
            >
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2.5 @[255px]:gap-x-4 @[255px]:gap-y-1.5 items-start w-full">
                <div className="w-10 h-10 @[255px]:w-12 @[255px]:h-12 rounded-xl bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1d] border border-[#383838] flex items-center justify-center shrink-0 p-2 @[255px]:p-2.5 shadow-sm self-center @[255px]:self-start @[255px]:row-span-2 interactive-glow-icon transition-all duration-300">
                  <img 
                    src={item.iconPath} 
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-white text-[clamp(0.875rem,1.4vw,1.05rem)] font-medium tracking-tight leading-snug self-center @[255px]:self-end min-w-0 break-words">
                  {item.title}
                </h4>
                <p className="col-span-2 @[255px]:col-span-1 @[255px]:col-start-2 text-[#a0a0a0] text-[clamp(0.75rem,1.15vw,0.8125rem)] leading-relaxed font-normal min-w-0 break-words">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
