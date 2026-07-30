import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  RefreshCw, 
  MessageSquare, 
  Code2, 
  Trophy, 
  Mail,
  Zap
} from 'lucide-react';
import { ChatMessage } from '../types';
import { MarkdownMessage } from './MarkdownMessage';

export const KiranAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "👋 Hi! I'm **Kiran AI**, an intelligent assistant trained on Kiran Kumar Behera's resume, academic background, projects, and technical skills.\n\nHow can I help you today? You can ask me about his 9.82 CGPA, C++ DSA expertise, fullstack projects, or ask me to draft a message to him!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialMounted = useRef(false);

  useEffect(() => {
    // Only scroll inner container when new messages arrive after initial render
    if (!initialMounted.current) {
      initialMounted.current = true;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const suggestedQuestions = [
    "Why hire Kiran for an AI/ML or Web internship?",
    "Tell me about his Campus Energy Dashboard project.",
    "What are his main certifications & academic record?",
    "Draft a quick recruiter message to Kiran.",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();

      const aiReply = data.reply || "I'd be happy to share more details about Kiran's qualifications!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Kiran is a third-year B.Tech CSE student at NIST University with a 9.82 CGPA, experienced in C++, Python, OpenCV, and Fullstack Web Development.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 relative bg-slate-950/50 light-theme:bg-slate-100 border-t border-b border-slate-800/80 light-theme:border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>INTERACTIVE AI ASSISTANT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Kiran AI</span> Anything
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto">
            Powered by Gemini AI, this assistant answers questions regarding Kiran's projects, technical stack, CGPA rank, or drafts emails directly.
          </p>
        </div>

        {/* Chat Console Card */}
        <div className="glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col h-[560px]">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-900/90 light-theme:bg-slate-200/90 border-b border-slate-800 light-theme:border-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-2">
                  <span>Kiran AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-muted">Gemini 2.5 Flash • Context Loaded</div>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 light-theme:bg-slate-300 transition-colors flex items-center gap-1.5"
              title="Reset Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Messages Body */}
          <div ref={chatContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-900/90 light-theme:bg-slate-200 text-slate-200 light-theme:text-slate-900 border border-slate-800 light-theme:border-slate-300 rounded-tl-none'
                  }`}
                >
                  <MarkdownMessage content={msg.text} isUser={msg.sender === 'user'} />
                  <div className="text-[10px] text-right opacity-60 pt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[80%] items-center">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  Kiran AI is formulating response...
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions Pills */}
          <div className="px-4 py-2 bg-slate-950/60 light-theme:bg-slate-100 border-t border-slate-800/60 light-theme:border-slate-300 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted text-[11px] font-semibold whitespace-nowrap flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Prompts:
              </span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={loading}
                  className="px-3 py-1 rounded-full bg-slate-800/80 light-theme:bg-slate-200 text-slate-300 light-theme:text-slate-800 hover:bg-indigo-600 hover:text-white transition-all text-[11px] whitespace-nowrap shrink-0 border border-slate-700 light-theme:border-slate-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900 light-theme:bg-slate-200 border-t border-slate-800 light-theme:border-slate-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-assistant-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Kiran AI about projects, skills, CGPA, or email draft..."
                disabled={loading}
                className="flex-1 bg-slate-950 light-theme:bg-white text-slate-200 light-theme:text-slate-900 px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <button
                id="ai-assistant-send-btn"
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white disabled:opacity-50 hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
