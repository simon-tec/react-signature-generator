import React, { useState } from 'react';
import { CheckCircle2, Shield, AlertTriangle } from 'lucide-react';

export default function InstallTabs({ clientMode }) {
  const [activeTab, setActiveTab] = useState('new-outlook');

  const tabs = [
    { id: 'new-outlook', label: 'New Outlook' },
    { id: 'classic-outlook', label: 'Classic Outlook' },
    { id: 'mac-outlook', label: 'Outlook (Mac)' },
    { id: 'gmail', label: 'Gmail' },
    { id: 'apple-mail', label: 'Apple Mail' }
  ];

  return (
    <div className="bg-[#2a2b72] text-white rounded-xl p-6 shadow-md relative overflow-hidden mt-6">
      {/* Recreating the geometric background texture from the SafeGuardian brand */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l1.373 1.373v57.254l-1.373 1.373H5.373L4 58.627V1.373L5.373 0h49.254zM24.28 17.5v12.22h-12.22V17.5h12.22zM47.5 17.5v12.22H35.28V17.5H47.5zM24.28 42.5v-12.22h-12.22V42.5h12.22zM47.5 42.5v-12.22H35.28V42.5H47.5zM22.78 30.28H10.56v12.22h12.22V30.28zM46 30.28H33.78v12.22H46V30.28zM22.78 16H10.56v12.22h12.22V16zM46 16H33.78v12.22H46V16z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <h3 className="font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
        <CheckCircle2 className="w-4 h-4 text-[#ff8c66]" /> Signature Installation Guides
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4 border-b border-[#4041a6] pb-3 relative z-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-[#1e1e52] border border-[#4041a6] text-white shadow-sm' 
                : 'bg-transparent text-[#a0a1d6] hover:bg-[#1e1e52]/50 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-[#dcdde9] bg-[#1e1e52]/80 p-4 rounded-lg border border-[#4041a6]/50 relative z-10 backdrop-blur-sm">
        
        {/* Dynamic Alert for Classic Outlook Mismatch */}
        {activeTab === 'classic-outlook' && clientMode !== 'outlook' && (
          <div className="mb-4 bg-amber-500/20 border border-amber-500/50 text-amber-200 px-3 py-2.5 rounded-lg flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5">Configuration Required</strong>
              Please ensure you have selected <strong>"Classic Outlook (Windows)"</strong> in the Target Email Client settings above before copying the signature code.
            </div>
          </div>
        )}

        {activeTab === 'new-outlook' && (
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the <strong>Settings (Gear)</strong> icon at top right.</li>
            <li>Go to <strong>Accounts</strong> &gt; <strong>Signatures</strong>.</li>
            <li>Click <strong>New Signature</strong> and paste the copied signature.</li>
            <li>Select this signature for "New messages" and "Replies/forwards".</li>
            <li>Click <strong>Save</strong>.</li>
          </ol>
        )}
        {activeTab === 'classic-outlook' && (
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Mail</strong>.</li>
            <li>Click the <strong>Signatures...</strong> button.</li>
            <li>Click <strong>New</strong>, name it, and paste the copied signature into the Edit box.</li>
            <li>Assign it to new messages and replies in the top right.</li>
            <li>Click <strong>OK</strong>.</li>
          </ol>
        )}
        {activeTab === 'mac-outlook' && (
          <ol className="list-decimal list-inside space-y-2">
            <li>Open the <strong>Outlook</strong> menu and select <strong>Preferences</strong> (or Settings).</li>
            <li>Click <strong>Signatures</strong>.</li>
            <li>Click the <strong>+</strong> icon to add a new signature and paste.</li>
            <li>Under "Choose default signature", select it for your account.</li>
            <li>Close the window to save.</li>
          </ol>
        )}
        {activeTab === 'gmail' && (
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the <strong>Settings (Gear)</strong> icon &gt; <strong>See all settings</strong>.</li>
            <li>Scroll down to the <strong>Signature</strong> section and click <strong>Create new</strong>.</li>
            <li>Name it, paste the copied signature into the text box.</li>
            <li>Set your Signature defaults just below the box.</li>
            <li>Scroll to the bottom and click <strong>Save Changes</strong>.</li>
          </ol>
        )}
        {activeTab === 'apple-mail' && (
          <ol className="list-decimal list-inside space-y-2">
            <li>Open <strong>Mail</strong> &gt; <strong>Settings</strong> (or Preferences) &gt; <strong>Signatures</strong>.</li>
            <li>Select your email account on the left, then click the <strong>+</strong> icon.</li>
            <li><strong>Crucial:</strong> Uncheck the box that says <em>"Always match my default message font"</em>.</li>
            <li>Paste your copied signature into the right panel.</li>
            <li>Close the window to save.</li>
          </ol>
        )}
      </div>
    </div>
  );
}
