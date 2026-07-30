import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PortfolioData, 
  PersonalInfo, 
  Education, 
  Project, 
  SkillCategory, 
  SkillItem, 
  Certification, 
  AcademicAchievement 
} from '../types';
import { DEFAULT_PORTFOLIO_DATA } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'kiran_portfolio_custom_v1';
const LOCAL_ADMIN_KEY = 'kiran_portfolio_admin_passcode';

interface PortfolioContextType {
  portfolio: PortfolioData;
  isAdmin: boolean;
  adminPasscode: string;
  isSaving: boolean;
  saveStatusMessage: string | null;
  loginAdmin: (passcode: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateEducation: (edu: Education) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addSkillCategory: (category: SkillCategory) => void;
  updateSkillCategory: (categoryIndex: number, category: SkillCategory) => void;
  deleteSkillCategory: (categoryIndex: number) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (cert: Certification) => void;
  deleteCertification: (id: string) => void;
  addAchievement: (achievement: AcademicAchievement) => void;
  deleteAchievement: (index: number) => void;
  savePortfolioToServer: (newPasscode?: string, overrideData?: PortfolioData) => Promise<{ success: boolean; message: string }>;
  resetPortfolioToDefault: () => Promise<{ success: boolean; message: string }>;
  exportPortfolioJson: () => void;
  importPortfolioJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ensureCorrectLinks = (data: PortfolioData): PortfolioData => {
    return {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        github: 'https://github.com/Kiran2006NGU',
        linkedin: 'https://www.linkedin.com/in/kiran-kumar-behera-53aa08306/',
      }
    };
  };

  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    // Check localStorage initial sync
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return ensureCorrectLinks(parsed);
      } catch (e) {
        console.error('Failed to parse local portfolio data:', e);
      }
    }
    return ensureCorrectLinks(DEFAULT_PORTFOLIO_DATA);
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('kiran_admin_logged_in') === 'true';
  });

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return sessionStorage.getItem(LOCAL_ADMIN_KEY) || 'kiran2006';
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);

  // Sync with server on initial mount
  useEffect(() => {
    async function fetchServerPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const json = await res.json();
          if (json.data && typeof json.data === 'object') {
            const sanitizedData = ensureCorrectLinks(json.data);
            setPortfolio(sanitizedData);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizedData));
          }
        }
      } catch (e) {
        console.warn('Backend server portfolio fetch offline or using local fallback:', e);
      }
    }
    fetchServerPortfolio();
  }, []);

  // Save to localStorage whenever portfolio changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  const loginAdmin = async (passcode: string) => {
    const trimmed = passcode.trim();
    try {
      const res = await fetch('/api/portfolio/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: trimmed })
      });

      if (res.ok) {
        setIsAdmin(true);
        setAdminPasscode(trimmed);
        sessionStorage.setItem('kiran_admin_logged_in', 'true');
        sessionStorage.setItem(LOCAL_ADMIN_KEY, trimmed);
        return { success: true };
      } else {
        const json = await res.json();
        return { success: false, error: json.error || 'Incorrect passcode' };
      }
    } catch (e) {
      // Offline / fallback verification
      if (trimmed === 'kiran2006' || trimmed === adminPasscode) {
        setIsAdmin(true);
        setAdminPasscode(trimmed);
        sessionStorage.setItem('kiran_admin_logged_in', 'true');
        sessionStorage.setItem(LOCAL_ADMIN_KEY, trimmed);
        return { success: true };
      }
      return { success: false, error: 'Incorrect admin passcode' };
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('kiran_admin_logged_in');
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPortfolio((prev) => ({ ...prev, personalInfo: info }));
  };

  const updateEducation = (edu: Education) => {
    setPortfolio((prev) => ({ ...prev, education: edu }));
  };

  const addProject = (project: Project) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  };

  const updateProject = (updated: Project) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updated.id ? updated : p))
    }));
  };

  const deleteProject = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const addSkillCategory = (category: SkillCategory) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: [...prev.skills, category]
    }));
  };

  const updateSkillCategory = (categoryIndex: number, category: SkillCategory) => {
    setPortfolio((prev) => {
      const next = [...prev.skills];
      next[categoryIndex] = category;
      return { ...prev, skills: next };
    });
  };

  const deleteSkillCategory = (categoryIndex: number) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== categoryIndex)
    }));
  };

  const addCertification = (cert: Certification) => {
    setPortfolio((prev) => ({
      ...prev,
      certifications: [cert, ...prev.certifications]
    }));
  };

  const updateCertification = (cert: Certification) => {
    setPortfolio((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === cert.id ? cert : c))
    }));
  };

  const deleteCertification = (id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id)
    }));
  };

  const addAchievement = (achievement: AcademicAchievement) => {
    setPortfolio((prev) => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
  };

  const deleteAchievement = (index: number) => {
    setPortfolio((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, idx) => idx !== index)
    }));
  };

  const savePortfolioToServer = async (newPasscode?: string, overrideData?: PortfolioData) => {
    setIsSaving(true);
    setSaveStatusMessage('Persisting portfolio updates to live server storage...');
    const dataToSave = overrideData || portfolio;

    if (overrideData) {
      setPortfolio(overrideData);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));

    try {
      const res = await fetch('/api/portfolio/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode: adminPasscode,
          data: dataToSave,
          newPasscode: newPasscode
        })
      });

      if (res.ok) {
        if (newPasscode && newPasscode.trim().length >= 4) {
          setAdminPasscode(newPasscode.trim());
          sessionStorage.setItem(LOCAL_ADMIN_KEY, newPasscode.trim());
        }
        setIsSaving(false);
        setSaveStatusMessage('Saved successfully! All future visitors will see your updated portfolio.');
        setTimeout(() => setSaveStatusMessage(null), 4000);
        return { success: true, message: 'Portfolio changes saved to live server!' };
      } else {
        const json = await res.json();
        setIsSaving(false);
        setSaveStatusMessage(`Save error: ${json.error || 'Failed to save'}`);
        return { success: false, message: json.error || 'Failed to save to server' };
      }
    } catch (e: any) {
      setIsSaving(false);
      setSaveStatusMessage('Saved locally in browser cache!');
      setTimeout(() => setSaveStatusMessage(null), 4000);
      return { success: true, message: 'Saved to browser cache.' };
    }
  };

  const resetPortfolioToDefault = async () => {
    try {
      await fetch('/api/portfolio/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: adminPasscode })
      });
    } catch (e) {
      console.warn('Server reset fetch issue:', e);
    }
    setPortfolio(DEFAULT_PORTFOLIO_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return { success: true, message: 'Portfolio restored to original defaults!' };
  };

  const exportPortfolioJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kiran_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importPortfolioJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.personalInfo && parsed.projects) {
        setPortfolio(parsed);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON structure:', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isAdmin,
        adminPasscode,
        isSaving,
        saveStatusMessage,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
