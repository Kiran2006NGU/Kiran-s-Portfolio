import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Persistent Data File Path
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio_custom.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create data directory:', e);
  }
}

// Default Admin Passcode
let CURRENT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'kiran2006';

// Helper to read custom portfolio data
function getCustomPortfolio() {
  if (fs.existsSync(PORTFOLIO_FILE)) {
    try {
      const raw = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading custom portfolio file:', e);
    }
  }
  return null;
}

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    if (!aiClient) {
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }
  return null;
}

const RESUME_CONTEXT = `
You are Kiran AI, an intelligent AI Assistant representing Kiran Kumar Behera on his portfolio website.
Answer questions from recruiters, students, and visitors accurately, enthusiastically, and professionally based strictly on Kiran's resume background:

FULL PROFILE DATA:
- Name: Kiran Kumar Behera
- Status: 3rd Year B.Tech Computer Science & Engineering Undergraduate
- Institution: NIST University, Berhampur (2024–Present)
- Academic Standing: CGPA 9.82 / 10.0 (Consistently among top performers in class)
- Headlines: AI, ML & Data Science Enthusiast, Full-Stack Developer, Competitive C++ Problem Solver
- Location: Berhampur, Odisha, India
- Email: kirankumarbehera2006@gmail.com
- Phone: +91 7735310875
- GitHub: https://github.com/Kiran2006NGU
- LinkedIn: https://www.linkedin.com/in/kiran-kumar-behera-53aa08306/

CAREER OBJECTIVE:
"Motivated third-year B.Tech Computer Science student with strong academic performance and a keen interest in Artificial Intelligence, Data Science, and Software Development. Seeking a challenging internship opportunity to apply computational and problem-solving skills in real-world and research-driven environments."

ABOUT ME:
"I am a third-year B.Tech CSE student with a strong interest in Artificial Intelligence, Machine Learning, and scientific computing. I am motivated to explore how computational methods can be applied to solve complex scientific problems. I am eager to gain research experience and contribute to interdisciplinary projects with multiple hackathon competition participations."

TECHNICAL SKILLS:
- Programming Languages: C, C++, Python, Java, Data Structures & Algorithms in C, HTML, CSS, JavaScript
- Core Concepts: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Problem Solving
- Technologies & Developer Tools: Git, GitHub, VS Code, phpMyAdmin, PuTTY, WinSCP, VM Box (VirtualBox), Kali Linux
- Domains of Interest: Artificial Intelligence (AI), Machine Learning (ML), Data Science, Scientific Computing, Web Development, Cybersecurity, DevOps
- Soft Skills: Teamwork & Leadership, Consistency & Discipline, Problem Solving Mindset, Quick Learner

CERTIFICATIONS:
1. Fullstack Internship at RINL Plant, Visakhapatnam
2. Gen AI Certification from Outskill
3. C++ Certification from Cisco Networking Academy
4. C Essentials Certification from Cisco Networking Academy
5. Python Certification
6. APLL IT Course Certification

KEY PROJECTS:
1. Campus Energy Dashboard (Fullstack): Comprehensive energy monitoring dashboard built to track real-time power consumption, load analytics, and energy conservation metrics across campus facilities.
2. Delay Analysis System (Fullstack, serverhandling): Server-handled analytical framework that models, logs, and diagnoses system transmission and process delays with server administration tools (PuTTY, WinSCP, phpMyAdmin).
3. AI ChatBot: Intelligent conversational bot powered by natural language understanding and machine learning algorithms to assist users with automated query resolution.
4. Brand Logo Detection (OpenCV): Computer vision system trained on image datasets to detect, extract, and classify brand logos in real-time camera feeds using OpenCV and Python.
5. Smart Food Ordering System (C++): Console & DSA-driven ordering software implementing priority queues, efficient search algorithms, menu management, and file persistence.
6. Simple Student Task Tracker: Clean task tracking utility tailored for academic workflows to help students organize assignments, track completion, and calculate deadlines.

TONE & INSTRUCTIONS:
- Be concise, friendly, articulate, and confident.
- Emphasize Kiran's stellar 9.82 CGPA, strong foundation in C++ DSA, full-stack web development, and passion for AI/ML & scientific computing.
- Offer to draft contact notes or recruiter emails to Kiran directly.
- Keep responses well-formatted with markdown lists or short paragraphs.
`;

// Health API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// PORTFOLIO API ENDPOINTS FOR LIVE EDITING & PERSISTENCE
app.get('/api/portfolio', (req, res) => {
  const customData = getCustomPortfolio();
  res.json({
    custom: !!customData,
    data: customData
  });
});

app.post('/api/portfolio/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode || passcode !== CURRENT_ADMIN_PASSCODE) {
    res.status(401).json({ error: 'Invalid admin passcode. Access denied.' });
    return;
  }
  res.json({ success: true, message: 'Admin authenticated successfully' });
});

app.post('/api/portfolio/save', (req, res) => {
  const { passcode, data, newPasscode } = req.body;
  if (!passcode || passcode !== CURRENT_ADMIN_PASSCODE) {
    res.status(401).json({ error: 'Invalid admin passcode. Access denied.' });
    return;
  }

  if (!data) {
    res.status(400).json({ error: 'Portfolio data payload is required.' });
    return;
  }

  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2), 'utf-8');
    if (newPasscode && newPasscode.trim().length >= 4) {
      CURRENT_ADMIN_PASSCODE = newPasscode.trim();
    }
    res.json({ success: true, message: 'Portfolio changes persisted successfully!' });
  } catch (err: any) {
    console.error('Failed to save custom portfolio file:', err);
    res.status(500).json({ error: 'Failed to write portfolio data to storage.' });
  }
});

app.post('/api/portfolio/reset', (req, res) => {
  const { passcode } = req.body;
  if (!passcode || passcode !== CURRENT_ADMIN_PASSCODE) {
    res.status(401).json({ error: 'Invalid admin passcode.' });
    return;
  }

  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      fs.unlinkSync(PORTFOLIO_FILE);
    }
    res.json({ success: true, message: 'Portfolio reset to default state.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to reset portfolio file.' });
  }
});

function buildDynamicContext() {
  const custom = getCustomPortfolio();
  const rawContext = custom ? JSON.stringify(custom, null, 2) : RESUME_CONTEXT;

  return `
You are Kiran AI, an intelligent, articulate, and highly capable AI Assistant representing Kiran Kumar Behera on his personal developer portfolio.

YOUR PRIMARY MISSION:
- Serve as Kiran's 24/7 interactive representative for recruiters, engineering leaders, collaborators, and portfolio visitors.
- Provide clear, impressive, and accurate information about Kiran's academic excellence (9.82 CGPA at NIST University), technical skillset (C++, DSA, Python, Fullstack Web, OpenCV, Systems), projects, and certifications.
- Speak with a confident, warm, professional, and articulate tone.

DYNAMIC LIVE PORTFOLIO DATA:
${rawContext}

INTERACTION GUIDELINES:
1. RECRUITER & INTERVIEW ENQUIRIES: When recruiters ask why to hire Kiran or ask about his fit for AI/ML or Software Engineering roles, present a structured highlight reel (9.82 CGPA, C++ DSA expertise, Fullstack & OpenCV projects, strong discipline).
2. PROJECT DEEP DIVES: Detail any project (e.g., Campus Energy Dashboard, Delay Analysis System, Brand Logo Detection, Smart Food Ordering in C++) with tech stack and real-world value.
3. DRAFTING MESSAGES: Offer to draft emails or messages addressed to Kiran (kirankumarbehera2006@gmail.com / +91 7735310875).
4. TECHNICAL AGILITY: Confidently answer technical questions about Data Structures, C++, Python, Linux administration, and fullstack web architecture.
5. FORMATTING: Use clean markdown styling with bold highlights, bullet points, and code blocks where helpful. Keep responses concise yet rich.
`;
}

// AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    const ai = getGeminiClient();
    const systemInstruction = buildDynamicContext();

    if (!ai) {
      // Fallback answer if API Key is not set yet
      const custom = getCustomPortfolio();
      const p = custom?.personalInfo;
      const cgpa = p?.cgpa || '9.82';
      const email = p?.email || 'kirankumarbehera2006@gmail.com';
      const phone = p?.phone || '+91 7735310875';

      res.json({
        reply: `👋 Hello! I am **Kiran AI**! \n\nHere is a quick overview of Kiran Kumar Behera:\n- **Academic Record**: ${cgpa} CGPA in B.Tech CSE at NIST University\n- **Skills**: C++, Python, Fullstack Web Dev, AI/ML, OpenCV, DSA, Linux\n- **Top Projects**: Campus Energy Dashboard, Brand Logo Detection (OpenCV), AI ChatBot, Delay Analysis System\n- **Contact**: [${email}](mailto:${email}) | ${phone}\n\nFeel free to ask me anything about his projects, skills, certifications, or ask me to draft a message to him!`
      });
      return;
    }

    const contents = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: "Understood! I am fully trained as Kiran AI with live portfolio context. I am ready to engage intelligently with visitors and recruiters." }] }
    ];

    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'model') {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : msg.role,
            parts: [{ text: msg.content || msg.text || '' }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    const reply = response.text || "I'm happy to help with any information regarding Kiran's portfolio, skills, or projects!";
    res.json({ reply });
  } catch (err: any) {
    console.error('Gemini Chat Error:', err);
    res.status(500).json({
      error: 'Failed to process chat response',
      details: err.message || String(err)
    });
  }
});

export default app;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}
