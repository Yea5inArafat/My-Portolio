import React, { useState } from 'react';
import { Briefcase, GraduationCap, Download, Check, Sparkles, BookOpen } from 'lucide-react';
import { 
  SKILLS_LIST, 
  EXPERIENCE_TIMELINE, 
  EDUCATION_TIMELINE, 
  LEARNING_FOCUS, 
  PERSONAL_INFO 
} from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCV = () => {
    const cvContent = `=====================================================
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
Blog: ${PERSONAL_INFO.blogUrl}
GitHub: https://github.com/Yea5inArafat
Codeforces: https://codeforces.com/profile/Yea5inArafat
LinkedIn: https://linkedin.com/in/Yea5inArafat
=====================================================

ABOUT
${PERSONAL_INFO.bioParagraphs.join('\n\n')}

EDUCATION
${EDUCATION_TIMELINE.map(e => `• ${e.title} (${e.period})\n  ${e.institution}\n  ${e.description}\n  Key Focus Areas:\n${e.bullets?.map(b => `    - ${b}`).join('\n')}`).join('\n\n')}

EXPERIENCE & PROJECTS
${EXPERIENCE_TIMELINE.map(e => `• ${e.title} (${e.period})\n  ${e.institution}\n  ${e.description}\n${e.bullets?.map(b => `    - ${b}`).join('\n')}`).join('\n\n')}

CORE SKILLS & PROFICIENCIES
${SKILLS_LIST.map(s => `• ${s.name}: ${s.percentage}%`).join('\n')}

CURRENT LEARNING FOCUS
${LEARNING_FOCUS.map(f => `• ${f}`).join('\n')}
=====================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Md_Yeasin_Arafat_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <article className="space-y-10 flex-1 h-full flex flex-col justify-between min-w-0">
      {/* Header with Download Action */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 md:pt-6">
        <div className="min-w-0">
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white tracking-tight article-title-underline inline-block">
            Resume
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9e9e] mt-3 max-w-xl">
            Computer Science student background, competitive programming timeline, and core competencies.
          </p>
        </div>

        <button
          onClick={handleDownloadCV}
          className="self-start sm:self-end inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ffdb70] to-[#ffa500] text-black font-semibold text-xs tracking-wide shadow-md btn-glow-primary cursor-pointer shrink-0"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-950" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </>
          )}
        </button>
      </header>

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a2a2b] to-[#1c1c1d] border border-[#383838] flex items-center justify-center text-[#ffdb70] shadow-sm interactive-glow-icon">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Work Experience & Development
          </h3>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2 sm:before:left-3 before:w-[1px] before:bg-[#383838]">
          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group space-y-2 p-3 -ml-3 rounded-xl border border-transparent hover:bg-[#242426]/40 interactive-glow-div">
              {/* Timeline marker */}
              <div className="absolute -left-[17px] sm:-left-[25px] top-4.5 w-3 h-3 rounded-full bg-[#ffdb70] border-2 border-[#1e1e1f] group-hover:scale-125 transition-transform" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="text-white font-medium text-base sm:text-lg">
                  {item.title}
                </h4>
                <span className="text-xs font-mono font-medium text-[#ffdb70]">
                  {item.period}
                </span>
              </div>

              {item.institution && (
                <p className="text-xs text-[#0fd6ab] font-medium">
                  {item.institution}
                </p>
              )}

              <p className="text-[#a0a0a0] text-xs sm:text-[13px] leading-relaxed">
                {item.description}
              </p>

              {item.bullets && (
                <ul className="space-y-1.5 pt-1 pl-1">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-[#b8b8b8] flex items-start gap-2">
                      <span className="text-[#ffdb70] text-sm leading-none mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a2a2b] to-[#1c1c1d] border border-[#383838] flex items-center justify-center text-[#0fd6ab] shadow-sm interactive-glow-icon">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Education
          </h3>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-7 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2 sm:before:left-3 before:w-[1px] before:bg-[#383838]">
          {EDUCATION_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group space-y-2 p-3 -ml-3 rounded-xl border border-transparent hover:bg-[#242426]/40 interactive-glow-div">
              {/* Timeline marker */}
              <div className="absolute -left-[17px] sm:-left-[25px] top-4.5 w-3 h-3 rounded-full bg-[#0fd6ab] border-2 border-[#1e1e1f] group-hover:scale-125 transition-transform" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="text-white font-medium text-base sm:text-lg">
                  {item.title}
                </h4>
                <span className="text-xs font-mono font-medium text-[#0fd6ab]">
                  {item.period}
                </span>
              </div>

              {item.institution && (
                <p className="text-xs text-[#ffdb70] font-medium">
                  {item.institution}
                </p>
              )}

              <p className="text-[#a0a0a0] text-xs sm:text-[13px] leading-relaxed">
                {item.description}
              </p>

              {item.bullets && (
                <ul className="space-y-1.5 pt-1 pl-1">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-[#b8b8b8] flex items-start gap-2">
                      <span className="text-[#0fd6ab] text-sm leading-none mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Current Learning Focus */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#ffdb70]" />
          <h4 className="text-base font-semibold text-white">Current Learning Focus</h4>
        </div>
        <div className="card-gradient rounded-2xl p-5 flex flex-wrap gap-2">
          {LEARNING_FOCUS.map((focus) => (
            <span
              key={focus}
              className="text-xs bg-[#242426] text-[#e0e0e0] px-3 py-1.5 rounded-lg border border-[#383838] interactive-glow-tag cursor-default"
            >
              {focus}
            </span>
          ))}
        </div>
      </section>

      {/* Skills Section with Exact Percentages */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            My skills & Proficiencies
          </h3>
          <span className="text-xs text-[#888] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ffdb70]" />
            <span>Problem Solving & CS</span>
          </span>
        </div>

        <div className="card-gradient rounded-[20px] p-5 sm:p-7 space-y-5">
          {SKILLS_LIST.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-white text-xs sm:text-sm">
                  {skill.name}
                </span>
                <span className="font-mono text-xs sm:text-sm text-[#ffdb70] font-semibold">
                  {skill.percentage}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#2a2a2c] overflow-hidden p-[1px]">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#ffdb70] to-[#ffa500] transition-all duration-700 ease-out"
                  style={{ width: `${skill.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={skill.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
