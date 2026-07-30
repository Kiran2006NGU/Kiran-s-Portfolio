import React from 'react';
import { 
  UserCheck, 
  Target, 
  Trophy, 
  Award, 
  CheckCircle2, 
  Compass, 
  Zap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio.personalInfo;
  const achievements = portfolio.achievements || [];

  return (
    <section id="about" className="py-20 relative bg-slate-950/40 light-theme:bg-slate-50 border-t border-b border-slate-800/60 light-theme:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Driven by Curiosity, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Grounded in Academic Excellence</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600">
            {personalInfo.year} at {personalInfo.university} combining strong theoretical foundations with software engineering & Artificial Intelligence.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: About Me Card */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 light-theme:border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">About Me</h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-700 leading-relaxed">
                {personalInfo.about}
              </p>
            </div>

            {/* Core Values / Strengths */}
            <div className="pt-4 border-t border-slate-800/80 light-theme:border-slate-200 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 light-theme:text-slate-700 font-medium">Interdisciplinary Hackathon Mindset</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 light-theme:text-slate-700 font-medium">Scientific Computing Focus</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 light-theme:text-slate-700 font-medium">Robust Problem Solving & DSA</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 light-theme:text-slate-700 font-medium">Continuous Research Motivation</span>
              </div>
            </div>
          </div>

          {/* Right Block: Career Objective & Academic Record */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            {/* Objective Box */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-indigo-500/20 bg-indigo-950/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Career Objective</h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-700 leading-relaxed italic">
                "{personalInfo.objective}"
              </p>
            </div>

            {/* Academic Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ACADEMIC FOUNDATION</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-bold text-amber-300">NIST University</div>
                <p className="text-xs text-slate-300 light-theme:text-slate-600">
                  3rd Year Computer Science & Engineering Undergraduate.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">HACKATHONS & RECOGNITION</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">Competitor</div>
                <p className="text-xs text-slate-300 light-theme:text-slate-600">
                  Active team contributor in university hackathons and algorithmic events.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
