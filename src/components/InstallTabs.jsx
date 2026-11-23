import React, { useState } from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

export default function InstallTabs() {
  const [activeTab, setActiveTab] = useState('new-outlook');

  const tabs = [
    { id: 'new-outlook', label: 'New Outlook' },
    { id: 'classic-outlook', label: 'Classic Outlook' },
    { id: 'mac-outlook', label: 'Outlook (Mac)' },
    { id: 'gmail', label: 'Gmail' },
    { id: 'apple-mail', label: 'Apple Mail' }
  ];

  return (
    <div className="bg-blue-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden mt-6">
      <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white pointer-events-none">
        <Shield className="w-48 h-48" />
      </div>

      <h3 className="font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
        <CheckCircle2 className="w-4 h-4 text-blue-400" /> Signature Installation Guides
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4 border-b border-blue-800 pb-3 relative z-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-blue-950/50 text-blue-300 hover:bg-blue-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-blue-100 bg-blue-950/60 p-4 rounded-lg border border-blue-800/60 relative z-10">
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
