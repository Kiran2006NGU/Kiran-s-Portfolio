import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationCertifications } from './components/EducationCertifications';
import { KiranAiAssistant } from './components/KiranAiAssistant';
import { ContactSection } from './components/ContactSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { SpaceBackground } from './components/SpaceBackground';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { CommandMenu } from './components/CommandMenu';
import { AdminToolbar } from './components/AdminToolbar';
import { CustomCursor } from './components/CustomCursor';
import { FloatingChatbot } from './components/FloatingChatbot';
import { Project, ThemeMode } from './types';

// Scroll to top automatically when route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated Page Wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="relative z-10"
  >
    {children}
  </motion.div>
);

function AppContent() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('kiran_portfolio_theme_mode');
    return (saved as ThemeMode) || 'dark';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState<boolean>(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    // Remove all previous theme classes
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-nebula', 'theme-emerald', 'theme-sunset', 'light-theme');
    
    // Add active theme class
    root.classList.add(`theme-${themeMode}`);
    if (themeMode === 'light') {
      root.classList.add('light-theme');
    }

    localStorage.setItem('kiran_portfolio_theme_mode', themeMode);
  }, [themeMode]);

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-500 overflow-x-hidden">
      
      {/* Custom Glowing Cursor Circle */}
      <CustomCursor themeMode={themeMode} />

      {/* Animated Space & Dotted Stars Background Canvas */}
      <SpaceBackground themeMode={themeMode} />

      <ScrollToTop />

      {/* Sticky Top Navigation */}
      <Navbar
        currentTheme={themeMode}
        onSelectTheme={setThemeMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
        onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
      />

      {/* Main Multi-Page Route Container */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            
            {/* 1. Home Page (Overview of all core sections) */}
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
                  <AboutSection />
                  <SkillsSection />
                  <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
                  <PlaygroundSection />
                  <EducationCertifications />
                  <KiranAiAssistant />
                  <ContactSection />
                </PageWrapper>
              }
            />

            {/* 2. Dedicated About Page */}
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <AboutSection />
                  </div>
                </PageWrapper>
              }
            />

            {/* 3. Dedicated Skills Page */}
            <Route
              path="/skills"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <SkillsSection />
                  </div>
                </PageWrapper>
              }
            />

            {/* 4. Dedicated Projects Page */}
            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
                  </div>
                </PageWrapper>
              }
            />

            {/* 5. Dedicated Interactive Playground Page */}
            <Route
              path="/playground"
              element={
                <PageWrapper>
                  <div className="pt-20 min-h-[85vh]">
                    <PlaygroundSection />
                  </div>
                </PageWrapper>
              }
            />

            {/* 6. Dedicated Education & Certifications Page */}
            <Route
              path="/education"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <EducationCertifications />
                  </div>
                </PageWrapper>
              }
            />

            {/* 7. Dedicated AI Assistant Page */}
            <Route
              path="/ai-assistant"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <KiranAiAssistant />
                  </div>
                </PageWrapper>
              }
            />

            {/* 8. Dedicated Contact Page */}
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <div className="pt-24 min-h-[85vh]">
                    <ContactSection />
                  </div>
                </PageWrapper>
              }
            />

          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onOpenAdminCMS={() => setIsAdminCMSOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Admin CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminCMSOpen}
        onClose={() => setIsAdminCMSOpen(false)}
      />

      {/* Spotlight Command Menu Palette (Cmd + K) */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        onOpenAdmin={() => setIsAdminCMSOpen(true)}
      />

      {/* Live Admin Floating Action Bar when logged in */}
      <AdminToolbar onOpenCMS={() => setIsAdminCMSOpen(true)} />

      {/* Floating Corner AI Chatbot Widget */}
      <FloatingChatbot />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
