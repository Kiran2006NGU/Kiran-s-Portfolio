import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Code2, 
  Award, 
  Cpu, 
  ChevronDown,
  MapPin,
  Terminal
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const ROLES = [
  "B.Tech CSE Undergraduate",
  "AI & Machine Learning Enthusiast",
  "Competitive C++ Problem Solver",
  "Full-Stack Web Developer",
  "Data Science & Scientific Computing",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio.personalInfo;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Typing Role, Bios & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white light-theme:text-slate-900">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">{personalInfo.name}</span>
              </h1>
              
              {/* Dynamic Typing Title */}
              <div className="h-8 sm:h-10 text-lg sm:text-2xl font-bold text-slate-300 light-theme:text-slate-700 flex items-center justify-center lg:justify-start gap-1">
                <span>I am a</span>
                <span className="text-blue-400 font-mono underline decoration-blue-500/50 underline-offset-4">{displayText}</span>
                <span className="w-0.5 h-6 bg-blue-400 animate-pulse ml-0.5" />
              </div>
            </div>

            {/* Brief Introduction */}
            <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {personalInfo.objective}
            </p>

            {/* Key Quick Highlight Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <Link to="/education" className="glass-panel p-3 rounded-2xl text-center lg:text-left space-y-0.5 border border-blue-500/20 hover:border-blue-500/50 transition-all group">
                <div className="text-blue-400 text-lg font-extrabold flex items-center justify-center lg:justify-start gap-1 group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4 text-amber-400" />
                  NIST Univ.
                </div>
                <div className="text-[11px] text-slate-400 light-theme:text-slate-600 font-medium">B.Tech CSE '26</div>
              </Link>

              <Link to="/projects" className="glass-panel p-3 rounded-2xl text-center lg:text-left space-y-0.5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all group">
                <div className="text-indigo-400 text-xl font-extrabold flex items-center justify-center lg:justify-start gap-1 group-hover:scale-105 transition-transform">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  {portfolio.projects.length}+
                </div>
                <div className="text-[11px] text-slate-400 light-theme:text-slate-600 font-medium">Projects Built</div>
              </Link>

              <Link to="/education" className="glass-panel p-3 rounded-2xl text-center lg:text-left space-y-0.5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-xl font-extrabold flex items-center justify-center lg:justify-start gap-1 group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  {portfolio.certifications.length}
                </div>
                <div className="text-[11px] text-slate-400 light-theme:text-slate-600 font-medium">Certifications</div>
              </Link>

              <Link to="/playground" className="glass-panel p-3 rounded-2xl text-center lg:text-left space-y-0.5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group">
                <div className="text-emerald-400 text-xl font-extrabold flex items-center justify-center lg:justify-start gap-1 group-hover:scale-105 transition-transform">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Playground
                </div>
                <div className="text-[11px] text-slate-400 light-theme:text-slate-600 font-medium">Live Code Demos</div>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <Link
                id="hero-explore-projects-btn"
                to="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                id="hero-ask-ai-btn"
                to="/ai-assistant"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 hover:border-indigo-400 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                Ask Kiran AI
              </Link>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-800/80 light-theme:bg-slate-200 text-slate-200 light-theme:text-slate-800 border border-slate-700 light-theme:border-slate-300 hover:border-slate-500 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                Digital Resume
              </button>
            </div>

            {/* Social Links & Location Quick Ribbon */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mr-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {personalInfo.location}
              </div>

              <a
                id="hero-social-github"
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800/60 light-theme:bg-slate-200/80 hover:text-white light-theme:hover:text-black hover:bg-slate-700 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                id="hero-social-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800/60 light-theme:bg-slate-200/80 hover:text-blue-400 hover:bg-slate-700 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                id="hero-social-email"
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg bg-slate-800/60 light-theme:bg-slate-200/80 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                id="hero-social-phone"
                href={`tel:${personalInfo.phone}`}
                className="p-2 rounded-lg bg-slate-800/60 light-theme:bg-slate-200/80 hover:text-amber-400 hover:bg-slate-700 transition-colors"
                title="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Stylized Developer Card / Headshot Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl blur-md opacity-40 animate-pulse" />
              
              {/* Main Profile Card Container */}
              <div className="relative glass-panel rounded-3xl p-6 space-y-6 border border-slate-700/60 light-theme:border-slate-300 shadow-2xl">
                
                {/* Avatar Frame */}
                <div className="relative w-40 h-40 mx-auto rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 shadow-xl overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative group">
                    <img
                      src={personalInfo.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-2">
                      <span className="text-[10px] font-bold text-blue-300 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                        NIST CSE '26
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Details Header */}
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-white light-theme:text-slate-900">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    {personalInfo.university}
                  </p>
                </div>

                {/* Quick Academic Spotlight */}
                <div className="space-y-2.5 bg-slate-900/60 light-theme:bg-slate-100/90 p-3.5 rounded-2xl border border-slate-800 light-theme:border-slate-200 text-xs">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-800 light-theme:border-slate-200">
                    <span className="text-slate-400 light-theme:text-slate-600">Degree</span>
                    <span className="font-semibold text-slate-200 light-theme:text-slate-800">B.Tech CSE</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-800 light-theme:border-slate-200">
                    <span className="text-slate-400 light-theme:text-slate-600">Current CGPA</span>
                    <span className="font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {personalInfo.cgpa} / 10.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 light-theme:text-slate-600">Primary Focus</span>
                    <span className="font-semibold text-cyan-400">AI / ML & Fullstack</span>
                  </div>
                </div>

                {/* Tech Badges Row */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-1">
                  {['C++', 'Python', 'React', 'Node.js', 'OpenCV', 'DSA', 'Linux'].map((tech) => (
                    <span key={tech} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 light-theme:bg-slate-200 text-slate-300 light-theme:text-slate-700 border border-slate-700/50 light-theme:border-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down Arrow scroll trigger */}
      <div className="mt-12 text-center">
        <Link to="/about" className="inline-flex p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};
