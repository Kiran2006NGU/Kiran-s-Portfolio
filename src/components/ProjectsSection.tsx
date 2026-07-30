import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ArrowUpRight, 
  Search,
  Activity,
  Plus
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { portfolio, isAdmin } = usePortfolio();
  const projectsData = portfolio.projects;

  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Fullstack', 'AI / ML', 'C++ / DSA', 'Systems & Tools'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative bg-slate-950/30 light-theme:bg-slate-50 border-t border-b border-slate-800/60 light-theme:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED PROJECTS & ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white light-theme:text-slate-900">
            Academic & Practical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Software Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600 leading-relaxed">
            Showcasing full-stack applications, computer vision models, priority DSA implementations in C++, and diagnostic server management systems.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-4 mb-12 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by title or tech (e.g., React, Node.js, OpenCV, C++, Gemini)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 light-theme:bg-white text-slate-200 light-theme:text-slate-800 placeholder-slate-500 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-slate-800 light-theme:border-slate-300 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'bg-slate-800/60 light-theme:bg-slate-200 text-slate-300 light-theme:text-slate-700 hover:bg-slate-700 light-theme:hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 light-theme:border-slate-200 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Card Header Background Accent */}
              <div className={`p-6 bg-gradient-to-br ${project.imageAccent || 'from-blue-500/10 to-indigo-500/10'} border-b border-slate-800/80 light-theme:border-slate-200 relative overflow-hidden`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 light-theme:bg-white text-blue-400 light-theme:text-blue-600 border border-slate-700 light-theme:border-slate-300">
                    {project.category}
                  </span>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900/80 light-theme:bg-white text-slate-300 light-theme:text-slate-700 hover:text-white light-theme:hover:text-black border border-slate-700 light-theme:border-slate-300 transition-colors"
                      title="View GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white light-theme:text-slate-900 mt-4 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-300 light-theme:text-slate-600 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Metrics Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-slate-800/60 light-theme:border-slate-200 text-center">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-xs font-extrabold text-blue-400 font-mono">{metric.value}</div>
                        <div className="text-[9px] text-slate-400 light-theme:text-slate-500 truncate">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 light-theme:bg-slate-200 text-slate-300 light-theme:text-slate-700 border border-slate-800 light-theme:border-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 py-4 border-t border-slate-800/80 light-theme:border-slate-200 bg-slate-950/40 light-theme:bg-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-300 light-theme:text-slate-800 hover:text-white light-theme:hover:text-blue-600 transition-colors group/btn"
                >
                  <span>Explore Architecture & Code</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
