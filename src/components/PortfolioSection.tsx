import React, { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  FolderGit2, 
  Loader2, 
  Sparkles, 
  RefreshCw,
  Code2
} from 'lucide-react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  'C++': '#f34b7d',
  'C': '#555555',
  'Java': '#b07219',
  'Python': '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Kotlin': '#A97BFF',
};

// Validate that a homepage/deployment URL is valid
function getValidLiveUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return null;
}

const TECH_ENTHUSIAST_QUOTES = [
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson',
  '"The best way to predict the future is to invent it." — Alan Kay',
];

export const PortfolioSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % TECH_ENTHUSIAST_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchRepositories = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const response = await fetch('https://api.github.com/users/Yea5inArafat/repos?sort=updated&per_page=30');
      
      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Sort strictly by stars descending, then by updated_at descending
        const sorted = [...data].sort((a: any, b: any) => {
          const starsA = Number(a.stargazers_count) || 0;
          const starsB = Number(b.stargazers_count) || 0;
          if (starsB !== starsA) {
            return starsB - starsA;
          }
          const timeA = new Date(a.updated_at || 0).getTime();
          const timeB = new Date(b.updated_at || 0).getTime();
          return timeB - timeA;
        });

        // Strictly take the top 4 repositories
        const top4: GitHubRepo[] = sorted.slice(0, 4).map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "No description provided for this repository.",
          html_url: r.html_url,
          homepage: r.homepage || null,
          stargazers_count: Number(r.stargazers_count) || 0,
          forks_count: Number(r.forks_count) || 0,
          language: r.language || null,
          topics: Array.isArray(r.topics) ? r.topics : [],
          updated_at: r.updated_at || new Date().toISOString()
        }));

        setRepos(top4);
      } else {
        // Empty array returned from GitHub API: trigger Empty State UI
        setRepos([]);
      }
    } catch (err) {
      console.warn("GitHub API error/rate limits:", err);
      // On fetch error or empty repos, set empty list to show clean Empty State UI
      setRepos([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <article className="space-y-8 flex-1 h-full flex flex-col justify-between min-w-0">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white tracking-tight article-title-underline inline-block">
            Project
          </h2>
        </div>

        {/* GitHub Live Status & Refresh Button */}
        <div className="flex items-center gap-2.5 self-start sm:self-end md:mt-8 shrink-0">
          <a
            href="https://github.com/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#242426] hover:bg-[#303033] border border-[#383838] text-xs font-medium text-white btn-glow"
          >
            <Github className="w-3.5 h-3.5 text-[#ffdb70]" />
            <span>@Yea5inArafat</span>
            <ExternalLink className="w-3 h-3 text-[#777]" />
          </a>

          <button
            onClick={() => fetchRepositories(true)}
            disabled={isLoading || isRefreshing}
            className="p-2 rounded-lg bg-[#242426] hover:bg-[#303033] border border-[#383838] text-[#aaa] hover:text-[#ffdb70] btn-glow cursor-pointer disabled:opacity-50"
            title="Refresh Repositories"
            aria-label="Refresh Repositories"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0fd6ab]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Top 4 Badge Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#171718] border border-[#383838] interactive-glow-div">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#ffdb70]" />
          <span className="font-semibold text-white">Top 4 Repositories</span>
          <span className="text-[#666] hidden sm:inline">•</span>
          <span className="text-[#8e8e8e] hidden sm:inline">Ranked by Stars & Recent Commits</span>
        </div>
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border interactive-glow-tag ${
          repos.length > 0 
            ? 'text-[#0fd6ab] bg-[#0fd6ab]/10 border-[#0fd6ab]/30' 
            : 'text-[#ffdb70] bg-[#ffdb70]/10 border-[#ffdb70]/30'
        }`}>
          {repos.length} of 4 Available
        </span>
      </div>

      {/* Content Area: Loading / Empty State / Repo Cards */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 flex-1">
          <Loader2 className="w-8 h-8 text-[#ffdb70] animate-spin" />
          <p className="text-xs text-[#999]">Fetching repositories from GitHub...</p>
        </div>
      ) : repos.length === 0 ? (
        /* Empty State UI */
        <div className="card-gradient group rounded-[20px] p-8 sm:p-14 border border-[#383838] flex flex-col items-center justify-center text-center my-auto flex-1 relative overflow-hidden min-h-[380px]">
          {/* Subtle ambient glow accents */}
          <div className="absolute w-64 h-64 bg-[#ffdb70]/5 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />
          <div className="absolute w-64 h-64 bg-[#0fd6ab]/5 rounded-full blur-3xl pointer-events-none -bottom-10 -left-10" />

          {/* Clean GitHub Icon Illustration */}
          <div className="relative mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#2a2a2b] to-[#1c1c1d] border border-[#383838] flex items-center justify-center shadow-xl interactive-glow-icon">
              <Github className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffdb70]" />
            </div>
          </div>

          {/* Polite Main Message */}
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2 max-w-md">
            No public repositories available at the moment.
          </h3>

          {/* Subtitle / Secondary Text */}
          <p className="text-xs sm:text-sm text-[#8e8e8e] max-w-sm mb-7 leading-relaxed">
            Check back later or visit my profile directly.
          </p>

          {/* Actionable Button (CTA) */}
          <a
            href="https://github.com/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffdb70] to-[#ffa500] hover:from-[#ffe28a] hover:to-[#ffb21a] text-black font-semibold text-xs tracking-wider uppercase shadow-lg btn-glow-primary cursor-pointer group/cta"
          >
            <Github className="w-4 h-4 text-black" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-black group-hover/cta:translate-x-0.5 transition-transform" />
          </a>
        </div>
      ) : (
        /* Repository Cards Grid (Top 4 Repositories) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 flex-1">
          {repos.map((repo, index) => {
            const validLiveUrl = getValidLiveUrl(repo.homepage);
            const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#0fd6ab') : null;

            return (
              <div
                key={repo.id}
                className="card-gradient-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between h-full border border-[#383838] group relative"
              >
                {/* Ranking Tag */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-semibold text-[#888] bg-[#141415] border border-[#2e2e30] px-2 py-0.5 rounded-md interactive-glow-tag">
                    #{index + 1}
                  </span>
                </div>

                {/* Card Header & Content */}
                <div>
                  {/* Repo Title with Icon */}
                  <div className="flex items-start gap-3 mb-2.5 pr-8">
                    <div className="w-9 h-9 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center shrink-0 text-[#ffdb70] interactive-glow-icon">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-base font-semibold tracking-tight hover:text-[#ffdb70] transition-colors truncate block"
                        title={repo.name}
                      >
                        {repo.name}
                      </a>
                      <p className="text-[10px] text-[#777]">
                        Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#a0a0a0] text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-4 min-h-[50px]">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Badges: Language & Topics */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#242426] border border-[#383838] text-white interactive-glow-tag">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: langColor || '#0fd6ab' }} 
                        />
                        <span>{repo.language}</span>
                      </span>
                    )}

                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1a2824] text-[#0fd6ab] border border-[#0fd6ab]/30 interactive-glow-tag"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metadata and Action Buttons */}
                <div className="pt-4 border-t border-[#2e2e30]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                  {/* Stats: Stars & Forks */}
                  <div className="flex items-center gap-3 text-xs text-[#8e8e8e]">
                    <span className="inline-flex items-center gap-1 hover:text-[#ffdb70] transition-colors" title="Stars">
                      <Star className="w-3.5 h-3.5 text-[#ffdb70]" />
                      <span className="font-mono">{repo.stargazers_count}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 hover:text-white transition-colors" title="Forks">
                      <GitFork className="w-3.5 h-3.5" />
                      <span className="font-mono">{repo.forks_count}</span>
                    </span>
                  </div>

                  {/* Action Buttons: Source Code & Conditional Live Preview */}
                  <div className="flex items-center gap-2">
                    {/* Source Code Button (Always Rendered) */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2a2a2c] hover:bg-[#383838] text-xs font-medium text-white border border-[#383838] btn-glow cursor-pointer group/btn"
                    >
                      <Github className="w-3.5 h-3.5 text-[#ffdb70]" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-[#777] group-hover/btn:text-white" />
                    </a>

                    {/* Conditional Live Preview Button: Rendered ONLY if valid deployment URL exists */}
                    {validLiveUrl && (
                      <a
                        href={validLiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0fd6ab]/20 to-[#0fd6ab]/10 hover:from-[#0fd6ab]/30 hover:to-[#0fd6ab]/20 text-xs font-semibold text-[#0fd6ab] border border-[#0fd6ab]/40 btn-glow-teal cursor-pointer shadow-sm group/live"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0fd6ab] animate-pulse" />
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3 text-[#0fd6ab] group-hover/live:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* GitHub Callout Footer Banner */}
      <div className="bg-[#181819] border border-[#2d2d2f] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8e8e8e] interactive-glow-div">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#ffdb70] shrink-0" />
          <span className="italic text-[#d6d6d6]">{TECH_ENTHUSIAST_QUOTES[quoteIndex]}</span>
        </div>
        <a
          href="https://github.com/Yea5inArafat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#ffdb70] hover:underline flex items-center gap-1"
        >
          <span>Explore All Repositories on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};
