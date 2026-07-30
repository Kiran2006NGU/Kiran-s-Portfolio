import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Terminal, 
  Sparkles, 
  Users, 
  Layers,
  Search,
  Zap,
  CheckCircle2,
  Check,
  Brain,
  Server,
  Grid,
  BookmarkCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const skillCategories = portfolio.skills;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'pills'>('cards');

  const categories = ['All', ...skillCategories.map(cat => cat.title)];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-400" />;
      default: return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  // Domain Highlight Pillars
  const domainPillars = [
    {
      title: 'C++ & Algorithms',
      description: 'Advanced C++17, STL, Graph Algorithms & Problem Solving',
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
    },
    {
      title: 'AI, ML & Computer Vision',
      description: 'Gemini API, OpenCV, Neural Networks & Data Mining',
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    },
    {
      title: 'Systems, Linux & Tools',
      description: 'Kali Linux CLI, Shell Scripting, PuTTY, WinSCP & VM Box',
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Fullstack Engineering',
      description: 'React, Node.js, Express, REST APIs & MySQL DBs',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    },
  ];

  // Calculate total competencies count
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 light-theme:bg-indigo-50 light-theme:text-indigo-600 text-xs font-semibold shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY & COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white light-theme:text-slate-900">
            Skills, Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Domains of Interest</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600 leading-relaxed">
            Curated computational skills, programming languages, server management tools, and domain specializations cultivated through rigorous coursework and hands-on project engineering.
          </p>
        </div>

        {/* Domain Pillars Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {domainPillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`p-4 rounded-2xl bg-gradient-to-br ${pillar.color} border bg-slate-900/60 light-theme:bg-white backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-slate-950/40 light-theme:bg-slate-100 border border-white/10">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300 light-theme:text-slate-700">
                  CORE DOMAIN
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white light-theme:text-slate-900 mb-1">{pillar.title}</h3>
                <p className="text-xs text-slate-300 light-theme:text-slate-600 leading-snug">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Category Filters */}
        <div className="space-y-5 mb-10 max-w-5xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills (C++, Python, Linux, DSA...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 light-theme:bg-white text-slate-200 light-theme:text-slate-800 placeholder-slate-500 text-xs sm:text-sm pl-11 pr-4 py-2.5 rounded-2xl border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* View Mode & Count */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-400 light-theme:text-slate-600 font-medium">
                {searchQuery ? `Matching Skills` : `Total Competencies`}: <strong className="text-blue-400">{totalSkills}</strong>
              </span>

              <div className="flex items-center bg-slate-900 light-theme:bg-slate-200 p-1 rounded-xl border border-slate-800 light-theme:border-slate-300">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'cards'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 light-theme:text-slate-700'
                  }`}
                  title="Detailed Cards View"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Detailed</span>
                </button>
                <button
                  onClick={() => setViewMode('pills')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'pills'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 light-theme:text-slate-700'
                  }`}
                  title="Compact Pills View"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Compact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`skill-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'bg-slate-800/60 light-theme:bg-slate-200 text-slate-300 light-theme:text-slate-700 hover:bg-slate-700 light-theme:hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories
            .filter(cat => activeCategory === 'All' || cat.title === activeCategory)
            .map((catGroup) => {
              const matchingSkills = catGroup.skills.filter(s => 
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (matchingSkills.length === 0) return null;

              return (
                <div
                  key={catGroup.title}
                  className="glass-panel rounded-3xl p-6 border border-slate-800/90 light-theme:border-slate-200 hover:border-blue-500/40 transition-all duration-300 space-y-5 shadow-lg bg-slate-900/70 light-theme:bg-white"
                >
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 light-theme:border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-slate-800/80 light-theme:bg-slate-100 border border-slate-700/80 light-theme:border-slate-300 shadow-xs">
                        {getCategoryIcon(catGroup.iconName)}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white light-theme:text-slate-900">{catGroup.title}</h3>
                        <p className="text-[11px] text-slate-400 light-theme:text-slate-500 font-medium">
                          {matchingSkills.length} {matchingSkills.length === 1 ? 'competency' : 'competencies'}
                        </p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </div>

                  {/* Skills Render */}
                  {viewMode === 'cards' ? (
                    /* Detailed Cards Layout */
                    <div className="space-y-3">
                      {matchingSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group p-3.5 rounded-2xl bg-slate-850/60 light-theme:bg-slate-50 border border-slate-800/80 light-theme:border-slate-200/80 hover:bg-slate-800 light-theme:hover:bg-slate-100 hover:border-blue-500/40 transition-all duration-200 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                              <span className="font-bold text-xs text-slate-100 light-theme:text-slate-900 group-hover:text-blue-400 transition-colors truncate">
                                {skill.name}
                              </span>
                            </div>
                            {skill.tag && (
                              <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 light-theme:bg-blue-50 light-theme:text-blue-700">
                                {skill.tag}
                              </span>
                            )}
                          </div>

                          {skill.description && (
                            <p className="text-[11px] text-slate-400 light-theme:text-slate-600 leading-snug pl-5">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Compact Pills Layout */
                    <div className="flex flex-wrap gap-2 pt-1">
                      {matchingSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group px-3 py-2 rounded-xl bg-slate-800/80 light-theme:bg-slate-100 border border-slate-700/60 light-theme:border-slate-200 hover:border-blue-400 hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="text-xs font-semibold text-slate-200 light-theme:text-slate-800 group-hover:text-blue-400">
                            {skill.name}
                          </span>
                          {skill.tag && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
};
