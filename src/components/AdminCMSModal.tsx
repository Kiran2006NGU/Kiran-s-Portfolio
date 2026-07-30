import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Lock, 
  User, 
  FolderPlus, 
  Trash2, 
  Edit3, 
  Plus, 
  Check, 
  Award, 
  GraduationCap, 
  Code2, 
  ShieldCheck,
  KeyRound,
  FileCode2,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData, Project, SkillCategory, Certification, AcademicAchievement } from '../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({ isOpen, onClose }) => {
  const { 
    portfolio, 
    isAdmin, 
    loginAdmin, 
    logoutAdmin, 
    updatePersonalInfo, 
    updateEducation, 
    addProject, 
    updateProject, 
    deleteProject, 
    addSkillCategory, 
    updateSkillCategory, 
    deleteSkillCategory, 
    addCertification, 
    updateCertification, 
    deleteCertification, 
    addAchievement, 
    deleteAchievement, 
    savePortfolioToServer, 
    resetPortfolioToDefault, 
    exportPortfolioJson, 
    importPortfolioJson,
    isSaving,
    saveStatusMessage
  } = usePortfolio();

  const [loginPasscodeInput, setLoginPasscodeInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'certifications' | 'education' | 'settings'>('profile');

  // Local state for forms
  const [personalForm, setPersonalForm] = useState(portfolio.personalInfo);
  const [educationForm, setEducationForm] = useState(portfolio.education);

  // Sync forms whenever portfolio context updates
  React.useEffect(() => {
    setPersonalForm(portfolio.personalInfo);
    setEducationForm(portfolio.education);
  }, [portfolio.personalInfo, portfolio.education]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 800;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.88));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
      };
      reader.onerror = () => resolve('');
    });
  };
  
  // Project editing state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Cert editing state
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Skill Category editing state
  const [editingSkillCategory, setEditingSkillCategory] = useState<{ index: number; category: SkillCategory } | null>(null);

  // Security passcode change state
  const [newPasscode, setNewPasscode] = useState('');
  const [jsonImportText, setJsonImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await loginAdmin(loginPasscodeInput);
    if (!res.success) {
      setLoginError(res.error || 'Invalid passcode');
    } else {
      setLoginPasscodeInput('');
      setPersonalForm(portfolio.personalInfo);
      setEducationForm(portfolio.education);
    }
  };

  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(personalForm);
    const updatedPortfolio = { ...portfolio, personalInfo: personalForm };
    await savePortfolioToServer(undefined, updatedPortfolio);
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(educationForm);
    const updatedPortfolio = { ...portfolio, education: educationForm };
    await savePortfolioToServer(undefined, updatedPortfolio);
  };

  const handlePersistAll = async () => {
    updatePersonalInfo(personalForm);
    updateEducation(educationForm);
    const updatedPortfolio: PortfolioData = {
      ...portfolio,
      personalInfo: personalForm,
      education: educationForm
    };
    await savePortfolioToServer(undefined, updatedPortfolio);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const proj: Project = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title || 'New Project',
      category: editingProject.category || 'Fullstack',
      shortDescription: editingProject.shortDescription || '',
      fullDescription: editingProject.fullDescription || '',
      techStack: typeof editingProject.techStack === 'string' 
        ? (editingProject.techStack as string).split(',').map((s) => s.trim()).filter(Boolean)
        : (editingProject.techStack || []),
      keyFeatures: typeof editingProject.keyFeatures === 'string'
        ? (editingProject.keyFeatures as string).split('\n').map((s) => s.trim()).filter(Boolean)
        : (editingProject.keyFeatures || []),
      githubUrl: editingProject.githubUrl || '',
      liveDemoUrl: editingProject.liveDemoUrl || '',
      imageAccent: editingProject.imageAccent || 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
      architectureNotes: editingProject.architectureNotes || '',
      sampleCodeOrOutput: editingProject.sampleCodeOrOutput || '',
      metrics: editingProject.metrics || []
    };

    let updatedProjects = [...portfolio.projects];
    if (isNewProject) {
      updatedProjects = [proj, ...updatedProjects];
      addProject(proj);
    } else {
      updatedProjects = updatedProjects.map((p) => (p.id === proj.id ? proj : p));
      updateProject(proj);
    }

    setEditingProject(null);
    savePortfolioToServer(undefined, { ...portfolio, projects: updatedProjects });
  };

  const handleSaveCertForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title) return;

    const cert: Certification = {
      id: editingCert.id || `cert-${Date.now()}`,
      title: editingCert.title || '',
      issuer: editingCert.issuer || '',
      description: editingCert.description || '',
      badgeColor: editingCert.badgeColor || 'blue',
      skillsCovered: typeof editingCert.skillsCovered === 'string'
        ? (editingCert.skillsCovered as string).split(',').map((s) => s.trim()).filter(Boolean)
        : (editingCert.skillsCovered || [])
    };

    let updatedCerts = [...portfolio.certifications];
    if (isNewCert) {
      updatedCerts = [cert, ...updatedCerts];
      addCertification(cert);
    } else {
      updatedCerts = updatedCerts.map((c) => (c.id === cert.id ? cert : c));
      updateCertification(cert);
    }

    setEditingCert(null);
    savePortfolioToServer(undefined, { ...portfolio, certifications: updatedCerts });
  };

  const handleImportJson = () => {
    if (!jsonImportText) return;
    const ok = importPortfolioJson(jsonImportText);
    if (ok) {
      setImportStatus('Successfully imported portfolio data!');
      setJsonImportText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Failed to parse JSON. Please check formatting.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Portfolio CMS & Live Editor
                {isAdmin && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">Authenticated</span>}
              </h2>
              <p className="text-xs text-slate-400">Edit any details of your portfolio site in real-time. Changes are restricted to you.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAdmin ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-bold text-white">Owner Access Control</h3>
              <p className="text-xs text-slate-400">
                Enter your secure Admin Passcode to enable live visual content editing for your portfolio.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={loginPasscodeInput}
                  onChange={(e) => setLoginPasscodeInput(e.target.value)}
                  placeholder="Enter Admin Passcode..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-sm outline-none transition-all pl-10"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>

              {loginError && (
                <div className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Unlock CMS Editor</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Interface */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-slate-950/80 border-r border-slate-800 p-3 space-y-1 flex md:flex-col overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Personal Info</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Projects ({portfolio.projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'skills' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Skills Categories</span>
              </button>

              <button
                onClick={() => setActiveTab('certifications')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'certifications' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Certifications ({portfolio.certifications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'education' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Academics & CGPA</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Security & Backup</span>
              </button>

              <div className="pt-4 border-t border-slate-800/80 mt-auto hidden md:block">
                <button
                  onClick={logoutAdmin}
                  className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Exit Admin Mode</span>
                </button>
              </div>
            </div>

            {/* Main Editor Tab Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
              
              {/* TAB 1: Personal Info */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSavePersonalInfo} className="space-y-4 max-w-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">Edit Personal & Header Details</h3>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Apply Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    
                    {/* Profile Picture Uploader & URL */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-blue-400 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Profile Picture / Avatar</span>
                        </label>
                        <span className="text-[10px] text-slate-400">URL or Local Upload</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden shrink-0 bg-slate-900 shadow-lg">
                          <img
                            src={personalForm.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          <input
                            type="text"
                            placeholder="Image URL (e.g. https://... or data:image/...)"
                            value={personalForm.profileImage || ''}
                            onChange={(e) => setPersonalForm({ ...personalForm, profileImage: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500 text-xs"
                          />

                          <div className="flex flex-wrap items-center gap-2">
                            <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold flex items-center gap-1.5 transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Photo File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file).then((imageDataUrl) => {
                                      if (imageDataUrl) {
                                        const updatedForm = { ...personalForm, profileImage: imageDataUrl };
                                        setPersonalForm(updatedForm);
                                        updatePersonalInfo(updatedForm);
                                        savePortfolioToServer(undefined, { ...portfolio, personalInfo: updatedForm });
                                      }
                                    });
                                  }
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                const defaultImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                                const updatedForm = { ...personalForm, profileImage: defaultImg };
                                setPersonalForm(updatedForm);
                                updatePersonalInfo(updatedForm);
                                savePortfolioToServer(undefined, { ...portfolio, personalInfo: updatedForm });
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
                            >
                              Reset Default
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resume PDF / Download Link */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                          <FileCode2 className="w-4 h-4" />
                          <span>Resume Document / PDF Link</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Custom PDF or Drive Link</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          placeholder="Resume Link (e.g. Google Drive, Dropbox, or PDF file URL)"
                          value={personalForm.resumePdfUrl || ''}
                          onChange={(e) => setPersonalForm({ ...personalForm, resumePdfUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500 text-xs"
                        />

                        <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload PDF</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    const updatedForm = {
                                      ...personalForm,
                                      resumePdfUrl: event.target.result as string
                                    };
                                    setPersonalForm(updatedForm);
                                    updatePersonalInfo(updatedForm);
                                    savePortfolioToServer(undefined, { ...portfolio, personalInfo: updatedForm });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        When updated, users clicking "Digital Resume" can download or view this exact document.
                      </p>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Short Name</label>
                      <input
                        type="text"
                        value={personalForm.shortName}
                        onChange={(e) => setPersonalForm({ ...personalForm, shortName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">University / College</label>
                      <input
                        type="text"
                        value={personalForm.university}
                        onChange={(e) => setPersonalForm({ ...personalForm, university: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">CGPA</label>
                      <input
                        type="text"
                        value={personalForm.cgpa}
                        onChange={(e) => setPersonalForm({ ...personalForm, cgpa: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Phone Number</label>
                      <input
                        type="text"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={personalForm.github}
                        onChange={(e) => setPersonalForm({ ...personalForm, github: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={personalForm.linkedin}
                        onChange={(e) => setPersonalForm({ ...personalForm, linkedin: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Headline Title</label>
                      <input
                        type="text"
                        value={personalForm.headline}
                        onChange={(e) => setPersonalForm({ ...personalForm, headline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Current Status Banner</label>
                      <input
                        type="text"
                        value={personalForm.status}
                        onChange={(e) => setPersonalForm({ ...personalForm, status: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">About Bio Summary</label>
                      <textarea
                        rows={3}
                        value={personalForm.about}
                        onChange={(e) => setPersonalForm({ ...personalForm, about: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Career Objective</label>
                      <textarea
                        rows={3}
                        value={personalForm.objective}
                        onChange={(e) => setPersonalForm({ ...personalForm, objective: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: Projects Manager */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  
                  {!editingProject ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div>
                          <h3 className="text-base font-bold text-white">Project Portfolio Manager</h3>
                          <p className="text-xs text-slate-400">Add, edit, or remove projects shown on your portfolio.</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingProject({
                              title: '',
                              category: 'Fullstack',
                              shortDescription: '',
                              fullDescription: '',
                              techStack: [],
                              keyFeatures: [],
                              githubUrl: 'https://github.com/Kiran2006NGU',
                              metrics: []
                            });
                            setIsNewProject(true);
                          }}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Project</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {portfolio.projects.map((proj) => (
                          <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                                  {proj.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingProject({ ...proj });
                                      setIsNewProject(false);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                    title="Edit Project"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteProject(proj.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                    title="Delete Project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <h4 className="font-bold text-white text-sm mt-2">{proj.title}</h4>
                              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.shortDescription}</p>
                            </div>

                            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/80">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Project Editor Form */
                    <form onSubmit={handleSaveProjectForm} className="space-y-4 max-w-2xl bg-slate-950 p-6 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h3 className="text-sm font-bold text-white">
                          {isNewProject ? 'Add New Project' : `Edit "${editingProject.title}"`}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Project Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Category</label>
                          <select
                            value={editingProject.category || 'Fullstack'}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          >
                            <option value="Fullstack">Fullstack</option>
                            <option value="AI / ML">AI / ML</option>
                            <option value="C++ / DSA">C++ / DSA</option>
                            <option value="Systems & Tools">Systems & Tools</option>
                            <option value="Research">Research</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Short Card Description</label>
                          <input
                            type="text"
                            required
                            value={editingProject.shortDescription || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Full Detailed Description</label>
                          <textarea
                            rows={3}
                            value={editingProject.fullDescription || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Tech Stack (comma-separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(editingProject.techStack) ? editingProject.techStack.join(', ') : editingProject.techStack || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value as any })}
                            placeholder="React, Node.js, C++, OpenCV..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Key Features (one per line)</label>
                          <textarea
                            rows={3}
                            value={Array.isArray(editingProject.keyFeatures) ? editingProject.keyFeatures.join('\n') : editingProject.keyFeatures || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, keyFeatures: e.target.value as any })}
                            placeholder="Real-time energy tracking&#10;Anomaly alert notification&#10;Custom analytical charts"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">GitHub Repository URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-medium">Sample Code Snippet / Output</label>
                          <textarea
                            rows={4}
                            value={editingProject.sampleCodeOrOutput || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, sampleCodeOrOutput: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-[11px] outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              )}

              {/* TAB 3: Certifications */}
              {activeTab === 'certifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white">Certifications & Training</h3>
                      <p className="text-xs text-slate-400">Manage your verified certificates, internships, and badges.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCert({
                          title: '',
                          issuer: '',
                          description: '',
                          badgeColor: 'blue',
                          skillsCovered: []
                        });
                        setIsNewCert(true);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {!editingCert ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {portfolio.certifications.map((cert) => (
                        <div key={cert.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                              {cert.issuer}
                            </span>
                            <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                            <p className="text-xs text-slate-400">{cert.description}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingCert(cert);
                                setIsNewCert(false);
                              }}
                              className="p-1.5 text-slate-400 hover:text-white"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteCertification(cert.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={handleSaveCertForm} className="space-y-3 max-w-lg bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Certificate Name</label>
                        <input
                          type="text"
                          required
                          value={editingCert.title || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Issuing Organization / Company</label>
                        <input
                          type="text"
                          required
                          value={editingCert.issuer || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingCert.description || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Skills Covered (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingCert.skillsCovered) ? editingCert.skillsCovered.join(', ') : editingCert.skillsCovered || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, skillsCovered: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setEditingCert(null)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                        <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold">Save Certificate</button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: Education & Academics */}
              {activeTab === 'education' && (
                <form onSubmit={handleSaveEducation} className="space-y-4 max-w-2xl text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">Academic Details & CGPA</h3>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Academic Data</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={educationForm.degree}
                        onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Institution</label>
                      <input
                        type="text"
                        value={educationForm.institution}
                        onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Period / Batch</label>
                      <input
                        type="text"
                        value={educationForm.period}
                        onChange={(e) => setEducationForm({ ...educationForm, period: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">CGPA Metric</label>
                      <input
                        type="text"
                        value={educationForm.cgpa}
                        onChange={(e) => setEducationForm({ ...educationForm, cgpa: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Courses & Subjects (comma separated)</label>
                    <textarea
                      rows={3}
                      value={educationForm.courses.join(', ')}
                      onChange={(e) => setEducationForm({ 
                        ...educationForm, 
                        courses: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                    />
                  </div>
                </form>
              )}

              {/* TAB 5: Skills Categories */}
              {activeTab === 'skills' && (
                <div className="space-y-4 text-xs">
                  <div className="pb-2 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">Skills Matrix Overview</h3>
                    <p className="text-xs text-slate-400">Skill groups rendered dynamically across your portfolio.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolio.skills.map((cat, cIdx) => (
                      <div key={cIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <h4 className="font-bold text-blue-400 text-sm flex items-center justify-between">
                          <span>{cat.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{cat.skills.length} skills</span>
                        </h4>
                        <div className="space-y-1">
                          {cat.skills.map((sk, skIdx) => (
                            <div key={skIdx} className="flex items-center justify-between py-1 border-b border-slate-900 text-slate-300">
                              <span>{sk.name}</span>
                              <span className="font-mono text-cyan-400 font-bold">{sk.level}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Settings, Passcode & Backups */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Change Admin Passcode</span>
                    </h4>
                    <p className="text-slate-400">Set a custom secret passcode to protect your CMS editor.</p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        placeholder="Enter new 4+ char passcode..."
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none"
                      />
                      <button
                        onClick={() => {
                          if (newPasscode.length >= 4) {
                            savePortfolioToServer(newPasscode);
                            setNewPasscode('');
                          }
                        }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg"
                      >
                        Update Key
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Download className="w-4 h-4 text-cyan-400" />
                      <span>Export & Import Backup JSON</span>
                    </h4>
                    <p className="text-slate-400">Download a full JSON backup of your current portfolio state to your device.</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={exportPortfolioJson}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg flex items-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export JSON Backup</span>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-900 space-y-2">
                      <label className="block text-slate-400 font-medium">Paste JSON to Import Portfolio:</label>
                      <textarea
                        rows={3}
                        value={jsonImportText}
                        onChange={(e) => setJsonImportText(e.target.value)}
                        placeholder="Paste JSON content here..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-[10px] outline-none"
                      />
                      <button
                        onClick={handleImportJson}
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import & Apply</span>
                      </button>
                      {importStatus && <div className="text-cyan-400 font-medium pt-1">{importStatus}</div>}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                    <h4 className="font-bold text-rose-400 text-sm">Reset to Default State</h4>
                    <p className="text-slate-400">Restore original portfolio data and erase custom edits.</p>
                    <button
                      onClick={async () => {
                        if (confirm('Are you sure you want to reset all portfolio data to original defaults?')) {
                          await resetPortfolioToDefault();
                          onClose();
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Portfolio Defaults</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer Persistence Controls */}
        {isAdmin && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {saveStatusMessage ? (
                <span className="text-cyan-400 font-medium animate-pulse">{saveStatusMessage}</span>
              ) : (
                <span>Click "Persist to Live Server" to save changes permanently for all visitors.</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePersistAll}
                disabled={isSaving}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Persist to Live Server'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
