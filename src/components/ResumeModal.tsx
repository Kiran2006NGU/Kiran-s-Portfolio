import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  ExternalLink,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio.personalInfo;
  const education = portfolio.education;
  const projects = portfolio.projects;
  const certifications = portfolio.certifications;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 light-theme:bg-white text-slate-100 light-theme:text-slate-900 rounded-3xl shadow-2xl border border-slate-700/80 light-theme:border-slate-300 flex flex-col">
        
        {/* Modal Top Action Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-slate-900/95 light-theme:bg-slate-100/95 border-b border-slate-800 light-theme:border-slate-300 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="font-extrabold text-sm sm:text-base">
              Digital Resume • {personalInfo.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {personalInfo.resumePdfUrl ? (
              <a
                href={personalInfo.resumePdfUrl}
                download={`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Custom PDF</span>
              </a>
            ) : null}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 light-theme:bg-slate-200 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content */}
        <div id="printable-resume" className="p-6 sm:p-10">
          <div className="bg-slate-950 light-theme:bg-slate-50 border border-slate-800 light-theme:border-slate-300 rounded-2xl overflow-hidden shadow-inner grid grid-cols-1 md:grid-cols-12 text-slate-200 light-theme:text-slate-900">
            
            {/* Left Sidebar */}
            <div className="md:col-span-5 bg-slate-900 light-theme:bg-slate-200/90 p-6 sm:p-8 space-y-6 border-r border-slate-800 light-theme:border-slate-300">
              
              {/* Profile Image Headshot */}
              <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 shadow-md overflow-hidden">
                <img
                  src={personalInfo.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* About Me */}
              <div className="space-y-2">
                <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase border-b border-slate-800 pb-1">ABOUT ME</h4>
                <p className="text-[11px] leading-relaxed text-slate-300 light-theme:text-slate-700">
                  {personalInfo.about}
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-2 text-[11px]">
                <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase border-b border-slate-800 pb-1">CONTACT</h4>
                <div className="space-y-2 text-slate-300 light-theme:text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline truncate">{personalInfo.github.replace('https://', '')}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline truncate">{personalInfo.linkedin.replace('https://', '')}</a>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2 text-[11px]">
                <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase border-b border-slate-800 pb-1">EDUCATION</h4>
                <div className="space-y-1">
                  <div className="font-bold text-slate-100 light-theme:text-slate-900">{education.degree}</div>
                  <div className="text-blue-400 font-semibold">{education.institution}</div>
                  <div className="text-slate-400">{education.period}</div>
                  <div className="font-extrabold text-amber-400 pt-1">CGPA: {education.cgpa}</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2 text-[11px]">
                <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase border-b border-slate-800 pb-1">CERTIFICATIONS</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 light-theme:text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-bold">{c.title}</span> ({c.issuer})
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Main Column */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Header Banner */}
              <div className="bg-slate-900 light-theme:bg-slate-900 text-white p-6 rounded-xl space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                  {personalInfo.name}
                </h1>
                <p className="text-xs font-bold text-blue-300 tracking-wide uppercase">
                  {personalInfo.headline}
                </p>
              </div>

              {/* Career Objective */}
              <div className="space-y-1.5 text-xs">
                <h3 className="font-black text-sm text-blue-400 uppercase border-b border-slate-800 pb-1">CAREER OBJECTIVE</h3>
                <p className="text-slate-300 light-theme:text-slate-700 leading-relaxed">
                  {personalInfo.objective}
                </p>
              </div>

              {/* Projects */}
              <div className="space-y-2 text-xs">
                <h3 className="font-black text-sm text-blue-400 uppercase border-b border-slate-800 pb-1">FEATURED PROJECTS</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 light-theme:text-slate-700">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <strong className="text-slate-100 light-theme:text-slate-900">{p.title}</strong> ({p.category}) — {p.shortDescription}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
