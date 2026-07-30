import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Terminal, 
  User, 
  Code2, 
  GraduationCap, 
  Mail, 
  Sparkles, 
  Lock, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const navigate = useNavigate();
  const { portfolio } = usePortfolio();
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredProjects = portfolio.projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Search Header Input */}
        <div className="px-4 py-3.5 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search projects, skills, pages..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Command Options List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 text-xs">
          
          {/* Section: Navigation */}
          {!query && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Quick Navigation
              </div>
              <div className="space-y-0.5">
                
                <button
                  onClick={() => { navigate('/'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Home & Overview</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                  onClick={() => { navigate('/projects'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Explore All Projects</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </button>

                <button
                  onClick={() => { navigate('/playground'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Interactive C++ Code Playground</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">Live Runner</span>
                </button>

                <button
                  onClick={() => { navigate('/education'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Academic History & CGPA (9.82)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </button>

                <button
                  onClick={() => { navigate('/ai-assistant'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Ask Kiran AI Copilot</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </button>

              </div>
            </div>
          )}

          {/* Section: Matching Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Projects ({filteredProjects.length})
              </div>
              <div className="space-y-0.5">
                {filteredProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { navigate('/projects'); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-left"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{p.title}</div>
                      <div className="text-[11px] text-slate-400">{p.shortDescription}</div>
                    </div>
                    <div className="flex gap-1">
                      {p.techStack.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Quick Actions
            </div>
            <div className="space-y-0.5">
              
              <button
                onClick={() => handleCopy(portfolio.personalInfo.email, 'email')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Copy Email: {portfolio.personalInfo.email}</span>
                </div>
                {copiedText === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4" />
                  <span>Owner Admin Login & Portfolio CMS</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">CMS</span>
              </button>

            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Navigate through Kiran's Portfolio</span>
          <span className="font-mono">NIST University • CGPA {portfolio.personalInfo.cgpa}</span>
        </div>

      </div>
    </div>
  );
};
