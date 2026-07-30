import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Sparkles, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  GraduationCap,
  FolderGit2,
  Cpu,
  Mail,
  UserCheck,
  Terminal,
  Home,
  Search,
  Lock,
  Palette,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ThemeMode } from '../types';

interface NavbarProps {
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenResume: () => void;
  onOpenCommandMenu: () => void;
  onOpenAdminCMS: () => void;
}

const THEME_OPTIONS: { id: ThemeMode; label: string; dotColor: string; bgBadge: string }[] = [
  { id: 'dark', label: 'Dark Cosmic', dotColor: 'bg-blue-500', bgBadge: 'bg-slate-900 text-blue-400' },
  { id: 'light', label: 'Light Starlight', dotColor: 'bg-amber-400', bgBadge: 'bg-slate-100 text-slate-800' },
  { id: 'nebula', label: 'Nebula Purple', dotColor: 'bg-purple-500', bgBadge: 'bg-purple-950 text-purple-300' },
  { id: 'emerald', label: 'Emerald Matrix', dotColor: 'bg-emerald-500', bgBadge: 'bg-emerald-950 text-emerald-300' },
  { id: 'sunset', label: 'Sunset Amber', dotColor: 'bg-orange-500', bgBadge: 'bg-orange-950 text-orange-300' },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTheme, 
  onSelectTheme, 
  onOpenResume, 
  onOpenCommandMenu,
  onOpenAdminCMS
}) => {
  const { portfolio, isAdmin } = usePortfolio();
  const personalInfo = portfolio.personalInfo;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: UserCheck },
    { name: 'Skills', path: '/skills', icon: Cpu },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Playground', path: '/playground', icon: Terminal, badge: 'Live' },
    { name: 'Academics', path: '/education', icon: GraduationCap },
    { name: 'Ask AI', path: '/ai-assistant', icon: Sparkles, highlight: true },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-xl backdrop-blur-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link id="nav-brand-logo" to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            KB
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 hidden xl:inline-block">
                B.Tech CSE
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:block">
              {personalInfo.university}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            
            return (
              <NavLink
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                to={link.path}
                className={({ isActive }) => `relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : link.highlight
                      ? 'text-cyan-400 hover:text-white hover:bg-slate-800/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-0.5 text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions (Command Search, Theme Picker, Resume, Admin CMS) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Spotlight Search Command Palette (Cmd+K) */}
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-medium transition-all shadow-sm"
            title="Search & Quick Commands (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Theme Dropdown Toggle */}
          <div className="relative">
            <button
              id="theme-toggle-btn"
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-2 p-2.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all active:scale-95 shadow-sm"
              title="Select Color & Space Theme"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline capitalize">{currentTheme}</span>
            </button>

            {/* Theme Dropdown Popover */}
            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in zoom-in-95 duration-150 text-xs">
                <div className="px-2 py-1 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Select Theme
                </div>
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium transition-colors ${
                      currentTheme === theme.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor}`} />
                      <span>{theme.label}</span>
                    </div>
                    {currentTheme === theme.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Resume Button */}
          <button
            id="open-resume-btn"
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 text-slate-200 border border-slate-800 hover:border-blue-500 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume</span>
          </button>

          {/* Admin CMS Lock Button */}
          <button
            onClick={onOpenAdminCMS}
            className={`p-2.5 rounded-xl border transition-all ${
              isAdmin
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50'
            }`}
            title={isAdmin ? 'Live CMS Editor Active' : 'Owner Login / Edit Site'}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 text-slate-200 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-t border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Mobile Theme Switcher */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Choose Space Theme</div>
            <div className="grid grid-cols-2 gap-2">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold border ${
                    currentTheme === theme.id
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor}`} />
                  <span className="truncate">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-800"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminCMS(); }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-cyan-400 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-800"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdmin ? 'Manage Content (CMS)' : 'Owner Login / Edit Site'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
