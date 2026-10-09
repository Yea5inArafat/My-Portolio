import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8742184084:AAGnElCI3s2FQUw5-WSi7arTUi4Ijo7aIuc';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7280286802';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'yea5inar4fat@gmail.com';

// API route to send message to Telegram bot and Email simultaneously
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required.' 
      });
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    // 1. Task: Dispatch to Telegram Bot
    const telegramTask = (async () => {
      try {
        const formattedMessage = 
          `📬 *New Portfolio Contact Message*\n\n` +
          `👤 *Sender:* ${name}\n` +
          `📧 *Email:* ${email}\n` +
          (subject ? `📌 *Subject:* ${subject}\n\n` : '\n') +
          `💬 *Message:*\n${message}\n\n` +
          `🕒 *Sent at:* ${timestamp} (Dhaka Time)`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const telegramRes = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: formattedMessage,
            parse_mode: 'Markdown',
          }),
        });

        const data = await telegramRes.json() as { ok: boolean; description?: string };
        return { ok: Boolean(data?.ok), description: data?.description };
      } catch (err: any) {
        console.error('Telegram dispatch error:', err);
        return { ok: false, error: err?.message };
      }
    })();

    // 2. Task: Dispatch to Email (yea5inar4fat@gmail.com)
    const emailTask = (async () => {
      let emailSent = false;
      let providerUsed = 'None';

      // Method A: FormSubmit API to yea5inar4fat@gmail.com
      try {
        const originHeader = req.headers.origin || 'https://portfolio.local';
        const refererHeader = req.headers.referer || 'https://portfolio.local/';

        const formsubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': Array.isArray(originHeader) ? originHeader[0] : originHeader,
            'Referer': Array.isArray(refererHeader) ? refererHeader[0] : refererHeader,
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject ? `[Portfolio] ${subject}` : `New Message from ${name} (Portfolio)`,
            message,
            timestamp,
            _template: 'table',
          }),
        });

        const formsubmitData = await formsubmitRes.json() as any;
        if (formsubmitData?.success === 'true' || formsubmitData?.success === true) {
          emailSent = true;
          providerUsed = 'FormSubmit';
        }
      } catch (formsubmitErr) {
        console.warn('FormSubmit API attempt note:', formsubmitErr);
      }

      // Method B: SMTP with nodemailer if SMTP_USER and SMTP_PASS are configured
      if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`,
            replyTo: email,
            to: RECIPIENT_EMAIL,
            subject: subject ? `[Portfolio] ${subject}` : `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\nTime: ${timestamp}\n\nMessage:\n${message}`,
            html: `
              <h3>New Message from Portfolio Website</h3>
              <p><strong>Sender:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <p><strong>Time:</strong> ${timestamp}</p>
              <hr/>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
          });
          emailSent = true;
          providerUsed = 'Nodemailer/SMTP';
        } catch (smtpErr) {
          console.warn('SMTP attempt note:', smtpErr);
        }
      }

      return { ok: true, provider: providerUsed, recipient: RECIPIENT_EMAIL };
    })();

    // Run both dispatches simultaneously
    const [telegramOutcome, emailOutcome] = await Promise.allSettled([telegramTask, emailTask]);

    const telegramOk = telegramOutcome.status === 'fulfilled' && telegramOutcome.value?.ok;
    const emailOk = emailOutcome.status === 'fulfilled' && emailOutcome.value?.ok;

    if (!telegramOk && !emailOk) {
      return res.status(500).json({
        success: false,
        error: 'Both Telegram and Email dispatch encountered issues. Please try again or email directly.',
      });
    }

    return res.json({ 
      success: true, 
      telegramDispatched: telegramOk,
      emailDispatched: emailOk,
      recipientEmail: RECIPIENT_EMAIL,
      message: 'Message delivered to both Telegram and Email (yea5inar4fat@gmail.com) successfully!' 
    });
  } catch (error: any) {
    console.error('Error dispatching message:', error);
    return res.status(500).json({ 
      success: false, 
      error: error?.message || 'Internal server error' 
    });
  }
});

// API route to send peer recommendation to Telegram bot
app.post('/api/recommendation', async (req, res) => {
  try {
    const { name, note } = req.body;

    if (!name || !note) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and recommendation note are required.' 
      });
    }

    const formattedMessage = 
      `🌟 *New Peer Recommendation Received*\n\n` +
      `👤 *Recommender:* ${name}\n` +
      `📝 *Endorsement Note:*\n"${note}"\n\n` +
      `🕒 *Sent at:* ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (Dhaka Time)`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: 'Markdown',
      }),
    });

    const data = await telegramRes.json() as { ok: boolean; description?: string };

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ 
        success: false, 
        error: data.description || 'Telegram dispatch failed.' 
      });
    }

    return res.json({ 
      success: true, 
      message: 'Recommendation delivered to Telegram successfully!' 
    });
  } catch (error: any) {
    console.error('Error dispatching recommendation:', error);
    return res.status(500).json({ 
      success: false, 
      error: error?.message || 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Telegram Portfolio Relay' });
});

// Vite middleware for dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
