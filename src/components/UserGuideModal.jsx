import React, { useState, useEffect } from 'react';
import { X, BookOpen, Sparkles, Image, Layers, Info, Copy, Code, Moon, CheckCircle2, AlertCircle } from 'lucide-react';

const TABS = [
  { id: 'quickstart', label: 'Quick Start', icon: Sparkles },
  { id: 'media', label: 'Images & Links', icon: Image },
  { id: 'export', label: 'Export & Clients', icon: Layers },
  { id: 'tips', label: 'Tips & Fixes', icon: Info }
];

export default function UserGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('quickstart');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-guide-title"
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#2a2b72] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1e1e52] flex items-center justify-center shadow-inner">
              <BookOpen className="w-4 h-4 text-[#e85626]" />
            </div>
            <div>
              <h2 id="user-guide-title" className="text-sm font-bold text-white leading-tight">
                Quick User Guide
              </h2>
              <p className="text-[11px] text-[#a0a1d6] mt-0.5">
                How to build, test, and install your SafeGuardian signature
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close user guide"
            className="p-1.5 rounded-lg text-[#a0a1d6] hover:text-white hover:bg-[#4041a6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85626]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#e85626] to-[#f4845f]"></div>

        {/* Interactive Tab Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 pt-3 flex items-center gap-1.5 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap focus-visible:outline-none ${
                  isActive
                    ? 'border-[#e85626] text-[#2a2b72] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e85626]' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-700">
          {activeTab === 'quickstart' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-[#2a2b72] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Enter Your Details</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fill in <strong>Personal Details</strong> and <strong>Contact Information</strong> on the left panel. Any field left blank is automatically hidden from the signature—no empty labels or broken dividers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-[#2a2b72] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Choose Layout & Modules</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pick from 6 layouts in <strong>Signature Layout</strong>, then toggle optional extras like <strong>Social Links</strong>, <strong>Service Badges</strong>, <strong>CTAs</strong>, or a <strong>Promotional Banner</strong>. Collapsed headers show status pills so you know what is active.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-[#e85626] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Copy & Paste into Your Email Client</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click <strong>Copy Formatted</strong> below the preview, then follow the step-by-step tabs in the <strong>Signature Installation Guides</strong> card for Outlook, Gmail, or Apple Mail.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Use Public Image URLs Only</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Company Logos</strong>, <strong>Image Banners</strong>, and <strong>Custom Social Icons</strong> must be publicly hosted <code className="font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-amber-200">.png</code> or <code className="font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-amber-200">.jpg</code> URLs (e.g. from your website or CDN). Local file paths on your computer will not load for recipients.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-xs font-bold text-[#2a2b72] mb-1">Smart Social Icons</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Social icons only appear when you paste a profile URL. Icons automatically re-colour to match your <strong>Primary Colour</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-xs font-bold text-[#2a2b72] mb-1">Automatic Link Formatting</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you type a web address without <code className="font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-slate-200">https://</code>, the generator adds it automatically so links never break.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1.5">
                    <Copy className="w-3.5 h-3.5" /> Copy Formatted (Recommended)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Best for 90% of users. Copies the rendered signature directly to your clipboard so you can press <strong>Ctrl+V / Cmd+V</strong> inside Gmail, New Outlook, or Apple Mail.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-[#2a2b72] font-bold text-xs mb-1.5">
                    <Code className="w-3.5 h-3.5" /> Raw HTML / Download .html
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Best for IT admins, central signature deployment tools (Exclaimer, CodeTwo, Microsoft 365 transport rules), or manual Apple Mail <code className="font-mono text-[11px]">.mailsignature</code> files.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs font-bold text-slate-900 mb-1">Universal vs. Classic Outlook (Windows)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leave <strong>Target Email Client</strong> (bottom of the left panel) on <strong>Universal (Modern)</strong> for Gmail, Apple Mail, and New Outlook. Switch to <strong>Classic Outlook</strong> only if your team uses legacy desktop Outlook on Windows, which requires extra MSO table wrappers.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Moon className="w-4 h-4 text-[#2a2b72] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Check Dark Mode Readability</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click the <strong>Dark Test</strong> button in the preview toolbar to verify that your logo, text, and badges remain legible when recipients view emails in Dark Mode.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Always Paste into a Clean Box</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When updating an existing signature in Gmail or Outlook, select all old content and delete it first before pasting. Pasting over old text can inherit unwanted fonts or spacing.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#e85626] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Best Layout for Email Replies</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consider using <strong>Classic Split</strong> or <strong>Executive Grid</strong> for new emails, and <strong>Compact Inline</strong> as a lightweight secondary signature for replies and forwards.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Press <kbd className="font-mono px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">Esc</kbd> to close</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2a2b72] hover:bg-[#1e1e52] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2b72]/40"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
