import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Code2, 
  CheckCircle2, 
  Play, 
  Layers, 
  Terminal,
  Cpu,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'architecture'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700/80 light-theme:border-slate-300 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/80 light-theme:bg-slate-200 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
            <span className="text-xs text-muted font-mono">
              ID: {project.id}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {project.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-700 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider">TECHNOLOGY STACK</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800/90 light-theme:bg-slate-200 text-slate-200 light-theme:text-slate-800 border border-slate-700/60 light-theme:border-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 light-theme:border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Key Features
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code / Logic Snippet
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'architecture'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            System Architecture
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[160px] bg-slate-900/60 light-theme:bg-slate-100 p-4 rounded-2xl border border-slate-800 light-theme:border-slate-200">
          {activeTab === 'overview' && (
            <div className="space-y-2.5">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 light-theme:text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted font-mono">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-blue-400" /> Source Logic</span>
                <span>Language / Framework</span>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-blue-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>{project.sampleCodeOrOutput || '// Sample code logic available on request'}</code>
              </pre>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Cpu className="w-4 h-4" />
                <span>Architecture & Implementation Highlights</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 light-theme:text-slate-700 leading-relaxed">
                {project.architectureNotes || 'Built with standard modular architecture prioritizing clean code separation, performance optimization, and reliable system flow.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/90 light-theme:bg-slate-200 text-slate-200 light-theme:text-slate-800 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all ml-auto"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
