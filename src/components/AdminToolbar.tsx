import React from 'react';
import { Lock, Edit3, Save, Download, LogOut, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AdminToolbarProps {
  onOpenCMS: () => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ onOpenCMS }) => {
  const { isAdmin, logoutAdmin, savePortfolioToServer, isSaving, saveStatusMessage, exportPortfolioJson } = usePortfolio();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl shadow-cyan-950/50 text-slate-100 flex items-center gap-3 sm:gap-4 text-xs animate-bounce-subtle">
      <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold text-cyan-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          <span>Live CMS Active</span>
        </span>
      </div>

      <button
        onClick={onOpenCMS}
        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Manage Content</span>
      </button>

      <button
        onClick={() => savePortfolioToServer()}
        disabled={isSaving}
        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
      >
        <Save className="w-3.5 h-3.5" />
        <span>{isSaving ? 'Saving...' : 'Save to Live Server'}</span>
      </button>

      <button
        onClick={exportPortfolioJson}
        className="hidden sm:flex px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all items-center gap-1.5"
        title="Export JSON Backup"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Backup</span>
      </button>

      <button
        onClick={logoutAdmin}
        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors ml-1"
        title="Exit Admin Mode"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};
