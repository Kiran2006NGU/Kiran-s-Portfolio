import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, isUser = false }) => {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div className="markdown-chat-body space-y-1.5 text-xs sm:text-sm leading-relaxed">
      <Markdown
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed text-slate-200 light-theme:text-slate-800">{children}</p>;
          },
          h1({ children }) {
            return <h1 className="text-base sm:text-lg font-extrabold text-white light-theme:text-slate-950 mt-3 mb-1.5 border-b border-slate-700/50 pb-1">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-sm sm:text-base font-bold text-white light-theme:text-slate-950 mt-3 mb-1">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-xs sm:text-sm font-semibold text-indigo-300 light-theme:text-indigo-700 mt-2.5 mb-1 tracking-wide">{children}</h3>;
          },
          ul({ children }) {
            return <ul className="my-2 space-y-1.5 pl-2 border-l-2 border-indigo-500/30 text-slate-200 light-theme:text-slate-800">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-2 space-y-1.5 pl-4 list-decimal text-slate-200 light-theme:text-slate-800 font-medium">{children}</ol>;
          },
          li({ children }) {
            return (
              <li className="leading-relaxed relative pl-1 flex items-start gap-1.5">
                <span className="text-slate-200 light-theme:text-slate-800 flex-1">{children}</span>
              </li>
            );
          },
          strong({ children }) {
            return <strong className="font-bold text-white light-theme:text-slate-950 bg-indigo-500/10 light-theme:bg-indigo-50 px-1 py-0.5 rounded text-indigo-200 light-theme:text-indigo-900">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic text-slate-300 light-theme:text-slate-700">{children}</em>;
          },
          code({ className, children, ...props }) {
            const isBlock = className || (typeof children === 'string' && children.includes('\n'));
            if (isBlock) {
              return (
                <pre className="my-2 p-3 rounded-xl bg-slate-950 light-theme:bg-slate-900 text-cyan-300 border border-slate-800 overflow-x-auto text-xs font-mono">
                  <code {...props}>{children}</code>
                </pre>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-slate-900 light-theme:bg-slate-200 text-cyan-300 light-theme:text-cyan-800 font-mono text-[0.85em] border border-slate-800/80 light-theme:border-slate-300" {...props}>
                {children}
              </code>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 light-theme:text-blue-600 underline hover:text-blue-300 font-semibold transition-colors"
              >
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="my-2 pl-3 border-l-3 border-indigo-500 bg-indigo-500/5 light-theme:bg-indigo-50/50 py-1 rounded-r-lg italic text-slate-300 light-theme:text-slate-700 text-xs">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-2 rounded-xl border border-slate-700 light-theme:border-slate-300">
                <table className="w-full text-left text-xs border-collapse">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return <th className="bg-slate-800 light-theme:bg-slate-200 p-2 font-bold text-slate-200 light-theme:text-slate-900 border-b border-slate-700 light-theme:border-slate-300">{children}</th>;
          },
          td({ children }) {
            return <td className="p-2 border-b border-slate-800 light-theme:border-slate-200 text-slate-300 light-theme:text-slate-800">{children}</td>;
          }
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
