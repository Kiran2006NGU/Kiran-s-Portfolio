import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  User, 
  Minimize2, 
  Maximize2,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { ChatMessage } from '../types';
import { WalkingWhiteRobot } from './WalkingWhiteRobot';
import { MarkdownMessage } from './MarkdownMessage';

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-floating-1',
      sender: 'ai',
      text: "👋 Hi! I'm **Kiran AI**, an intelligent representative trained on Kiran Kumar Behera's live portfolio, 9.82 CGPA academic record, projects, and technical skills.\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat box
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  // Handle Speech Synthesis
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Clean text of markdown characters
    const cleanText = text.replace(/[*_#\[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customQuery?: string) => {
    const textToSubmit = customQuery || input.trim();
    if (!textToSubmit || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSubmit, history }),
      });

      const data = await res.json();
      const aiReply = data.reply || "I'd be glad to share more details about Kiran's qualifications!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReply);
    } catch (err) {
      console.error('Floating Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Kiran Kumar Behera is a top student at NIST University (9.82 CGPA) skilled in C++, Python, OpenCV, and Fullstack Web Development.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrompts = [
    "Why hire Kiran?",
    "Campus Energy Dashboard",
    "C++ & DSA expertise",
    "Draft email to Kiran"
  ];

  return (
    <>
      {/* Floating Trigger Button at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group">
        {!isOpen && (
          <div
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 light-theme:bg-white/90 border border-indigo-500/30 text-xs font-semibold shadow-lg backdrop-blur-md cursor-pointer text-slate-200 light-theme:text-slate-800 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="whitespace-nowrap">Ask Kiran AI</span>
          </div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative group focus:outline-none flex items-center justify-center drop-shadow-2xl"
          aria-label="Toggle AI Chatbot"
        >
          {isOpen ? (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center border border-indigo-400/30">
              <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <WalkingWhiteRobot size={72} />
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 z-30">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] max-h-[82vh] rounded-3xl bg-slate-900/95 light-theme:bg-white/95 border border-indigo-500/30 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-slate-100 light-theme:text-slate-900"
          >
            {/* Chatbot Header */}
            <div className="px-4 py-3 bg-slate-950/90 light-theme:bg-slate-100/90 border-b border-slate-800 light-theme:border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                  <WalkingWhiteRobot size={36} />
                </div>
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    <span>Kiran AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-slate-400 light-theme:text-slate-500">
                    Gemini 2.5 • Live Trained
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Speech Toggle */}
                {'speechSynthesis' in window && (
                  <button
                    onClick={() => {
                      if (voiceEnabled) {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }
                      setVoiceEnabled(!voiceEnabled);
                    }}
                    className={`p-2 rounded-lg text-xs transition-colors ${
                      voiceEnabled 
                        ? 'text-indigo-400 bg-indigo-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800 light-theme:hover:bg-slate-200'
                    }`}
                    title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                )}

                {/* Reset Chat */}
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setMessages([messages[0]]);
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 light-theme:hover:bg-slate-200 transition-colors"
                  title="Reset Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 light-theme:hover:bg-slate-200 transition-colors"
                  title="Close Assistant"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body Messages */}
            <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0 shadow overflow-hidden">
                      <WalkingWhiteRobot size={30} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-md font-medium'
                        : 'bg-slate-800/80 light-theme:bg-slate-100 text-slate-200 light-theme:text-slate-800 border border-slate-700/60 light-theme:border-slate-300 rounded-bl-xs'
                    }`}
                  >
                    <MarkdownMessage content={msg.text} isUser={msg.sender === 'user'} />
                    <div
                      className={`text-[10px] mt-1.5 opacity-60 text-right ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400 light-theme:text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 light-theme:bg-slate-300 text-slate-300 light-theme:text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/80 light-theme:bg-slate-100 border border-slate-700/60 light-theme:border-slate-300 text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px]">Kiran AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-3 py-2 bg-slate-950/40 light-theme:bg-slate-50 border-t border-slate-800/60 light-theme:border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-700 light-theme:bg-slate-200 light-theme:hover:bg-slate-300 text-[11px] font-medium text-slate-300 light-theme:text-slate-700 whitespace-nowrap transition-colors border border-slate-700/50 light-theme:border-slate-300 shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-950/90 light-theme:bg-slate-100 border-t border-slate-800 light-theme:border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Kiran AI anything..."
                disabled={loading}
                className="flex-1 bg-slate-900 light-theme:bg-white border border-slate-800 light-theme:border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 light-theme:text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold disabled:opacity-40 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
