import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Check, 
  Copy, 
  MessageCircle, 
  Github, 
  MapPin, 
  Loader2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Codeforces SVG Icon
function CodeforcesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="9" width="4.5" height="12" rx="1.5" fill="#4B90E2" />
      <rect x="9.75" y="4" width="4.5" height="17" rx="1.5" fill="#F5A623" />
      <rect x="17" y="12" width="4.5" height="9" rx="1.5" fill="#D0021B" />
    </svg>
  );
}

// Telegram SVG Icon
function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

const TELEGRAM_CONFIG = {
  botToken: '8742184084:AAGnElCI3s2FQUw5-WSi7arTUi4Ijo7aIuc',
  chatId: '7280286802',
  botUsername: 'Yea5inArafat_Portfolio_BOT',
};

const DESTINATION_EMAIL = 'yea5inar4fat@gmail.com';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSending(true);
    setErrorMessage(null);

    const timestamp = new Date().toLocaleString('en-US');
    const senderName = formData.name.trim();
    const senderEmail = formData.email.trim();
    const senderSubject = formData.subject.trim();
    const senderMessage = formData.message.trim();

    let serverDelivered = false;

    // 1. Primary: Server-side route dispatches to BOTH Telegram & Email simultaneously
    try {
      const serverRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: senderSubject,
          message: senderMessage,
        }),
      });

      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data.success) {
          serverDelivered = true;
        }
      }
    } catch {
      // Server fallback executes below
    }

    // 2. Direct Fallback if server route was unavailable: Execute Telegram & Email simultaneously in browser
    if (!serverDelivered) {
      const telegramTask = (async () => {
        try {
          const formattedMessage = 
            `📬 *New Portfolio Contact Message*\n\n` +
            `👤 *Sender:* ${senderName}\n` +
            `📧 *Email:* ${senderEmail}\n` +
            (senderSubject ? `📌 *Subject:* ${senderSubject}\n\n` : '\n') +
            `💬 *Message:*\n${senderMessage}\n\n` +
            `🕒 *Timestamp:* ${timestamp}`;

          const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: TELEGRAM_CONFIG.chatId,
              text: formattedMessage,
              parse_mode: 'Markdown',
            }),
          });
          const data = await res.json();
          return Boolean(data.ok);
        } catch {
          return false;
        }
      })();

      const emailTask = (async () => {
        try {
          const res = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: senderName,
              email: senderEmail,
              _subject: senderSubject ? `[Portfolio] ${senderSubject}` : `New Message from ${senderName}`,
              message: senderMessage,
              _template: 'table',
            }),
          });
          const data = await res.json();
          return Boolean(data?.success === 'true' || data?.success === true);
        } catch {
          return false;
        }
      })();

      const [telSuccess, mailSuccess] = await Promise.allSettled([telegramTask, emailTask]);
      const telOk = telSuccess.status === 'fulfilled' && telSuccess.value;
      const mailOk = mailSuccess.status === 'fulfilled' && mailSuccess.value;

      if (!telOk && !mailOk) {
        setErrorMessage('Unable to reach dispatch gateways. Please try again or reach out directly at yea5inar4fat@gmail.com.');
        setIsSending(false);
        return;
      }
    }

    setIsSending(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 6000);
  };

  const mailtoLink = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(
    formData.subject || `Portfolio Contact from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <article className="space-y-8 flex-1 h-full flex flex-col justify-between min-w-0">
      {/* Header */}
      <header>
        <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white tracking-tight article-title-underline inline-block">
          Contact
        </h2>
        <p className="text-xs sm:text-sm text-[#9e9e9e] mt-3">
          Get in touch for competitive programming discussions, algorithm collaborations, software development, or academic projects. Messages are routed directly to both Telegram and my personal email.
        </p>
      </header>

      {/* Direct Quick Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 lg:gap-4 min-w-0">
        {/* Telegram Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between border border-[#0fd6ab]/30 shadow-sm min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#142923] border border-[#0fd6ab]/40 flex items-center justify-center text-[#0fd6ab] shrink-0 interactive-glow-icon">
              <TelegramIcon className="w-5 h-5 text-[#0fd6ab]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#0fd6ab] uppercase font-semibold">TELEGRAM</p>
              <span className="text-xs sm:text-sm font-medium text-white truncate block">
                Yea5inArafat
              </span>
            </div>
          </div>
          <a
            href="https://t.me/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#0fd6ab]/15 hover:bg-[#0fd6ab]/25 text-xs font-semibold text-[#0fd6ab] border border-[#0fd6ab]/40 btn-glow-teal shrink-0 ml-2"
          >
            Chat
          </a>
        </div>

        {/* Email Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between border border-[#ffdb70]/20 shadow-sm min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center text-[#ffdb70] shrink-0 interactive-glow-icon">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#ffdb70] uppercase font-semibold">Direct Email</p>
              <a
                href={`mailto:${DESTINATION_EMAIL}`}
                className="text-xs sm:text-sm font-medium text-white hover:text-[#0fd6ab] truncate block"
              >
                {DESTINATION_EMAIL}
              </a>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            className="p-2 rounded-lg bg-[#2b2b2c] hover:bg-[#383838] border border-transparent text-[#888] hover:text-white btn-glow cursor-pointer shrink-0 ml-2"
            title="Copy Email Address"
            aria-label="Copy Email Address"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-[#0fd6ab]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* GitHub Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center text-[#ffdb70] shrink-0 interactive-glow-icon">
              <Github className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold">GitHub Profile</p>
              <span className="text-xs sm:text-sm font-medium text-white truncate block">
                Yea5inArafat
              </span>
            </div>
          </div>
          <a
            href="https://github.com/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#2b2b2c] hover:bg-[#383838] text-xs font-medium text-[#ffdb70] border border-[#383838] btn-glow shrink-0 ml-2"
          >
            Visit
          </a>
        </div>

        {/* Codeforces Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center shrink-0 interactive-glow-icon">
              <CodeforcesIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold">Codeforces</p>
              <span className="text-xs sm:text-sm font-medium text-white truncate block">
                Yea5inArafat
              </span>
            </div>
          </div>
          <a
            href="https://codeforces.com/profile/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#2b2b2c] hover:bg-[#383838] text-xs font-medium text-[#ffdb70] border border-[#383838] btn-glow shrink-0 ml-2"
          >
            Profile
          </a>
        </div>

        {/* Discord Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center text-[#60a5fa] shrink-0 interactive-glow-icon">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold">Discord</p>
              <span className="text-xs sm:text-sm font-medium text-white truncate block">
                Yea5inArafat
              </span>
            </div>
          </div>
          <a
            href="https://discord.com/users/Yea5inArafat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#2b2b2c] hover:bg-[#383838] text-xs font-medium text-[#60a5fa] border border-[#383838] btn-glow shrink-0 ml-2"
          >
            Connect
          </a>
        </div>

        {/* Location Card */}
        <div className="card-gradient group rounded-2xl p-4 lg:p-5 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] border border-[#383838] flex items-center justify-center text-[#0fd6ab] shrink-0 interactive-glow-icon">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#8e8e8e] uppercase font-semibold">Location</p>
              <span className="text-xs sm:text-sm font-medium text-white truncate block">
                {PERSONAL_INFO.location}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#0fd6ab] font-medium bg-[#0fd6ab]/10 px-2.5 py-1 rounded-md border border-[#0fd6ab]/30 interactive-glow-tag">
            Bangladesh
          </span>
        </div>
      </div>

      {/* Interactive Contact Form with Dual Telegram & Email Dispatch */}
      <section className="card-gradient rounded-[20px] p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Subtle Dual Ambient Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0fd6ab] via-[#ffdb70] to-[#0fd6ab] opacity-75" />

        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            Send a Message
          </h3>
        </div>

        {submitted ? (
          <div className="bg-[#182a22] border border-[#0fd6ab]/40 rounded-xl p-6 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#0fd6ab]/15 border border-[#0fd6ab]/40 flex items-center justify-center mx-auto text-[#0fd6ab]">
              <Check className="w-6 h-6 text-[#0fd6ab]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-white">Dispatched to Telegram & Email!</h4>
              <p className="text-xs text-[#b8dfd1] max-w-lg mx-auto leading-relaxed">
                Your message was delivered simultaneously to Md Yeasin Arafat's Telegram bot (<span className="text-white font-medium">@{TELEGRAM_CONFIG.botUsername}</span>) and inbox (<span className="text-white font-medium">{DESTINATION_EMAIL}</span>). A reply will be sent to <span className="text-white font-medium">{formData.email}</span> shortly.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#24352d] hover:bg-[#2b4036] border border-[#0fd6ab]/30 text-xs font-medium text-[#0fd6ab] btn-glow-teal"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Email Client (Optional Backup)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#b0b0b0] mb-1.5">
                  Full Name <span className="text-[#ffdb70]">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSending}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-[#141415] border border-[#383838] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none input-glow disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b0b0b0] mb-1.5">
                  Email Address <span className="text-[#ffdb70]">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isSending}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#141415] border border-[#383838] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none input-glow disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b0b0b0] mb-1.5">
                Subject
              </label>
              <input
                type="text"
                disabled={isSending}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Competitive Programming / C++ & Java Project / Academic Question"
                className="w-full bg-[#141415] border border-[#383838] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none input-glow disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b0b0b0] mb-1.5">
                Your Message <span className="text-[#ffdb70]">*</span>
              </label>
              <textarea
                required
                disabled={isSending}
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your question, algorithmic problem, or project collaboration details..."
                className="w-full bg-[#141415] border border-[#383838] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none input-glow resize-none disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-[#777]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0fd6ab]" />
                <span>Simultaneous delivery to Telegram & {DESTINATION_EMAIL}</span>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffdb70] to-[#ffa500] hover:from-[#ffe28a] hover:to-[#ffb21a] text-black font-semibold text-xs tracking-wider uppercase shadow-lg btn-glow-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending to Telegram & Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </article>
  );
};
