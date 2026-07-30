import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUp, 
  Lock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onOpenAdminCMS?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminCMS }) => {
  const { portfolio, isAdmin } = usePortfolio();
  const personalInfo = portfolio.personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              KB
            </div>
            <div>
              <div className="font-extrabold text-slate-200 text-base group-hover:text-blue-400 transition-colors">{personalInfo.name}</div>
              <div className="text-[11px] text-slate-400">{personalInfo.university} • B.Tech CSE</div>
            </div>
          </Link>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/skills" className="hover:text-white transition-colors">Skills</Link>
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link to="/playground" className="hover:text-white transition-colors text-cyan-400">Playground</Link>
            <Link to="/education" className="hover:text-white transition-colors">Academics</Link>
            <Link to="/ai-assistant" className="hover:text-white transition-colors text-indigo-400">Ask AI</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            {onOpenAdminCMS && (
              <button
                onClick={onOpenAdminCMS}
                className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors font-mono"
              >
                <Lock className="w-3 h-3" />
                <span>{isAdmin ? 'CMS' : 'Admin'}</span>
              </button>
            )}
          </div>

          {/* Back to top */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition-all text-xs font-bold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-slate-300">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-300">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-slate-300">Email</a>
            <a href={`tel:${personalInfo.phone}`} className="hover:text-slate-300">Phone</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
