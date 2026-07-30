import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Building2, 
  Trophy,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Certification } from '../types';

export const EducationCertifications: React.FC = () => {
  const { portfolio } = usePortfolio();
  const education = portfolio.education;
  const certifications = portfolio.certifications;
  const achievements = portfolio.achievements || [];

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMICS & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Education, Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 light-theme:text-slate-600">
            Formal B.Tech CSE degree at {portfolio.personalInfo.university} alongside industry certifications from Cisco, Outskill, RINL, and APLL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Education Timeline & Academic Honors */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Main Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/30 bg-blue-950/10 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-blue-400 tracking-wider uppercase">UNDERGRADUATE DEGREE</span>
                  <h3 className="text-xl font-bold">{education.degree}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{education.institution}</span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  {education.period}
                </div>
              </div>

              {/* CGPA Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">CUMULATIVE GPA</div>
                  <div className="text-2xl font-black text-amber-300">{education.cgpa}</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-400/20 text-amber-400">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ACADEMIC HIGHLIGHTS</h4>
                {education.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 light-theme:text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Card */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 light-theme:border-slate-200 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Academic Honors
              </h3>

              <div className="space-y-3">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/50 light-theme:bg-slate-100 border border-slate-800 light-theme:border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-200 light-theme:text-slate-800">{ach.title}</div>
                    <div className="text-[11px] text-slate-400 light-theme:text-slate-600">{ach.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Verified Certifications List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                Verified Certifications ({certifications.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="glass-panel rounded-3xl p-5 border border-slate-800 light-theme:border-slate-200 hover:border-indigo-500/50 transition-all cursor-pointer space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{cert.year}</span>
                  </div>

                  <h4 className="font-bold text-sm text-white light-theme:text-slate-900 group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-slate-300 light-theme:text-slate-600 line-clamp-2">
                    {cert.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 light-theme:border-slate-200 text-[11px] text-indigo-400 font-semibold">
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Certification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{selectedCert.issuer}</span>
                <h3 className="text-xl font-bold">{selectedCert.title}</h3>
              </div>
              <button onClick={() => setSelectedCert(null)} className="text-slate-400 hover:text-white p-1">
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedCert.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Key Competencies Verified:</h4>
              <div className="flex flex-wrap gap-1.5">
                {(selectedCert.skills || selectedCert.skillsCovered || []).map((skill, idx) => (
                  <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
