import React, { useRef, useState } from 'react';
import { Eye, Code, Sun, Moon, Info, Copy, Check, Download } from 'lucide-react';
import InstallTabs from './InstallTabs';

export default function LayoutPreview({ 
  currentHtml, 
  clientMode, 
  name, 
  email,
  handleCopyVisual,
  handleCopyCode,
  copiedVisual,
  copiedCode,
  triggerToast
}) {
  const [activeTab, setActiveTab] = useState("visual");
  const [previewBg, setPreviewBg] = useState("light");
  const previewRef = useRef(null);

  const handleDownloadHtml = () => {
    const blob = new Blob([currentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SafeGuardian_Signature.html';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("HTML file downloaded.");
  };

  return (
    <div className="flex flex-col sticky top-24 self-start">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Top Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
            <button onClick={() => setActiveTab('visual')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${activeTab === 'visual' ? 'bg-white text-[#2a2b72] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
              <Eye className="w-3.5 h-3.5" /> Visual Preview
            </button>
            <button onClick={() => setActiveTab('code')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${activeTab === 'code' ? 'bg-white text-[#2a2b72] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
              <Code className="w-3.5 h-3.5" /> HTML Source
            </button>
          </div>

          {activeTab === 'visual' && (
            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
              <button onClick={() => setPreviewBg('light')} className={`px-2.5 py-1 rounded-md transition-all ${previewBg === 'light' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600'}`}>
                <Sun className="w-3.5 h-3.5 inline mr-1" /> Light
              </button>
              <button onClick={() => setPreviewBg('dark')} className={`px-2.5 py-1 rounded-md transition-all ${previewBg === 'dark' ? 'bg-[#1a1b4b] text-indigo-300 shadow-sm' : 'text-slate-600'}`}>
                <Moon className="w-3.5 h-3.5 inline mr-1" /> Dark Test
              </button>
            </div>
          )}
        </div>

        {/* Visual Canvas Area */}
        {activeTab === 'visual' && (
          <div className={`p-4 sm:p-6 transition-colors duration-200 min-h-[340px] flex flex-col justify-center items-center ${previewBg === 'dark' ? 'bg-[#15153a]' : 'bg-slate-100/70'}`}>
            <div className="w-full max-w-full">
              <div className={`border border-b-0 rounded-t-xl p-3 flex items-center justify-between text-xs ${previewBg === 'dark' ? 'bg-[#1e1e52] border-[#2a2b72] text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span><span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span className="ml-2 font-mono text-[11px]">Re: SafeGuardian Enterprise Security Audit</span>
                </div>
                <span className="text-[10px] bg-[#2a2b72]/10 text-[#2a2b72] px-2 py-0.5 rounded font-semibold">{clientMode === 'outlook' ? 'Classic Outlook (MSO)' : 'Universal / Web'}</span>
              </div>
              <div className={`p-6 sm:p-8 rounded-b-xl border shadow-lg transition-all ${previewBg === 'dark' ? 'bg-[#1e1e52] border-[#2a2b72] text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}>
                <div className="text-xs text-slate-400 pb-4 mb-4 border-b border-slate-100/10 space-y-1">
                  <p><strong className="text-slate-400">From:</strong> {name} &lt;{email}&gt;</p>
                  <p><strong className="text-slate-400">To:</strong> client@enterprise-corp.com</p>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Hi David,<br /><br />Thank you for reviewing the updated SafeGuardian deployment roadmap. Please review my signature details below and let me know if you need any further compliance documentations.<br /><br />Best regards,
                </p>
                <div ref={previewRef} id="signature-render-area" className="py-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: currentHtml }} />
              </div>
            </div>
          </div>
        )}

        {/* Code Source Area */}
        {activeTab === 'code' && (
          <div className="p-6 bg-[#15153a] flex flex-col gap-3 min-h-[340px]">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[#a0a1d6]">Clean HTML Table &bull; MSO Comment Compatible</span>
            </div>
            <textarea readOnly value={currentHtml} className="w-full h-80 bg-[#1e1e52] text-blue-300 font-mono text-xs p-4 rounded-lg border border-[#2a2b72] outline-none resize-none leading-relaxed" />
          </div>
        )}

        {/* Action Bottom Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 max-w-sm">
            <Info className="w-4 h-4 text-[#2a2b72] flex-shrink-0" />
            <span>{clientMode === 'outlook' ? 'Includes MSO width tables to prevent column breaks in Microsoft Outlook.' : 'Standard responsive HTML table optimised for Gmail & Google Workspace.'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownloadHtml} className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-slate-500" /> Download .html
            </button>
            <button onClick={handleCopyCode} className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-slate-500" /> Copy Raw HTML
            </button>
            <button onClick={() => handleCopyVisual(previewRef)} className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5">
              {copiedVisual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedVisual ? "Copied Formatted!" : "Copy Formatted"}</span>
            </button>
          </div>
        </div>
      </div>
      
      <InstallTabs clientMode={clientMode} />
    </div>
  );
}
