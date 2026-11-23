import React from 'react';
import { User, Palette, Type, Sparkles, FileText, Info, Layers, LayoutTemplate, Contact, Image } from 'lucide-react';
import { FONT_OPTIONS } from '../utils/signatureGenerator';
import { Accordion, TextInput, TextArea, Toggle, ColorPicker } from './FormElements';

export default function FormControls({ config, updateConfig }) {
  
  return (
    <div className="flex flex-col">
      
      <Accordion title="Signature Layout" icon={LayoutTemplate} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'split', label: 'Split' },
            { id: 'stacked', label: 'Stacked (Left)' },
            { id: 'terminal-code', label: 'Terminal (Code)' },
            { id: 'terminal-clean', label: 'Terminal (Clean)' },
            { id: 'grid-block', label: 'Stacked (Grid block)' }
          ].map((type) => (
            <label 
              key={type.id}
              className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                config.layout === type.id 
                  ? 'border-[#2a2b72] bg-[#2a2b72]/5 ring-1 ring-[#2a2b72]' 
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-900 capitalize">{type.label}</span>
                <input type="radio" name="layout" value={type.id} checked={config.layout === type.id} onChange={(e) => updateConfig('layout', e.target.value)} className="accent-[#2a2b72]" />
              </div>
            </label>
          ))}
        </div>
      </Accordion>

      <Accordion title="Target Email Client" icon={Layers}>
        <div className="grid grid-cols-1 gap-3">
          <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${config.clientMode === 'gmail' ? 'border-[#2a2b72] bg-[#2a2b72]/5 ring-1 ring-[#2a2b72]' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-900">Universal (Modern)</span>
              <input type="radio" name="clientMode" value="gmail" checked={config.clientMode === 'gmail'} onChange={(e) => updateConfig('clientMode', e.target.value)} className="accent-[#2a2b72]" />
            </div>
            <span className="text-[11px] text-slate-500 leading-tight">Optimised for Gmail, Apple Mail, New Outlook, and Outlook (Mac).</span>
          </label>
          <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${config.clientMode === 'outlook' ? 'border-[#2a2b72] bg-[#2a2b72]/5 ring-1 ring-[#2a2b72]' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-900">Classic Outlook (Windows)</span>
              <input type="radio" name="clientMode" value="outlook" checked={config.clientMode === 'outlook'} onChange={(e) => updateConfig('clientMode', e.target.value)} className="accent-[#2a2b72]" />
            </div>
            <span className="text-[11px] text-slate-500 leading-tight">Includes MSO conditional tables for older Microsoft Word rendering engines.</span>
          </label>
        </div>
      </Accordion>

      <Accordion title="Personal Details" icon={User} defaultOpen={true}>
        <TextInput label="Full Name" value={config.name} onChange={(val) => updateConfig('name', val)} placeholder="MR. Robot" />
        <TextInput label="Job Title" value={config.title} onChange={(val) => updateConfig('title', val)} placeholder="Senior Cybersecurity Engineer" />
        <TextInput label="Department" value={config.department} onChange={(val) => updateConfig('department', val)} placeholder="Allsafe Cybersecurity" />
        <TextInput label="Company Name" value={config.company} onChange={(val) => updateConfig('company', val)} placeholder="SafeGuardian" />
      </Accordion>

      <Accordion title="Contact Information" icon={Contact}>
        <TextInput label="Phone (primary)" value={config.phone} onChange={(val) => updateConfig('phone', val)} placeholder="+64 9 000 1234" />
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-medium text-slate-700 text-xs">Phone (secondary)</label>
            <Toggle checked={config.showMobile} onChange={(val) => updateConfig('showMobile', val)} />
          </div>
          <TextInput value={config.mobile} onChange={(val) => updateConfig('mobile', val)} placeholder="+64 21 000 1234" disabled={!config.showMobile} />
        </div>

        <TextInput label="Email Address" type="email" value={config.email} onChange={(val) => updateConfig('email', val)} placeholder="mr.robot@securemail.io" />
        <TextInput label="Website URL" value={config.website} onChange={(val) => updateConfig('website', val)} placeholder="https://www.safeguardian.co.nz" />
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-medium text-slate-700 text-xs">LinkedIn URL</label>
            <Toggle checked={config.showLinkedin} onChange={(val) => updateConfig('showLinkedin', val)} />
          </div>
          <TextInput value={config.linkedin} onChange={(val) => updateConfig('linkedin', val)} placeholder="https://nz.linkedin.com/in/mr-robot" disabled={!config.showLinkedin} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-medium text-slate-700 text-xs">Location</label>
            <Toggle checked={config.showAddress} onChange={(val) => updateConfig('showAddress', val)} />
          </div>
          <TextInput value={config.address} onChange={(val) => updateConfig('address', val)} placeholder="Central Auckland, Auckland, New Zealand" disabled={!config.showAddress} />
        </div>
      </Accordion>

      <Accordion title="Promotional Banner" icon={Image}>
        <div>
          <label className="block font-medium text-slate-700 mb-1 text-xs">Banner Type</label>
          <select value={config.bannerType} onChange={(e) => updateConfig('bannerType', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#2a2b72] outline-none text-slate-900 bg-white">
            <option value="none">None</option>
            <option value="image">Image Banner</option>
            <option value="html">HTML Banner</option>
          </select>
        </div>

        {config.bannerType === 'image' && (
          <div className="space-y-3 pt-2">
            <TextInput label="Image URL" value={config.bannerImgUrl} onChange={(val) => updateConfig('bannerImgUrl', val)} placeholder="https://example.com/banner.png" fontMono={true} />
            <TextInput label="Link URL (Optional)" value={config.bannerLinkUrl} onChange={(val) => updateConfig('bannerLinkUrl', val)} placeholder="https://example.com/promo" fontMono={true} />
          </div>
        )}

        {config.bannerType === 'html' && (
          <div className="space-y-3 pt-2">
            <TextInput label="Banner Message" value={config.bannerHtmlText} onChange={(val) => updateConfig('bannerHtmlText', val)} placeholder="Secure Your Enterprise Today" />
            <div className="grid grid-cols-2 gap-3">
              <ColorPicker label="Background Colour" value={config.bannerBgColor} onChange={(val) => updateConfig('bannerBgColor', val)} />
              <ColorPicker label="Text Colour" value={config.bannerTextColor} onChange={(val) => updateConfig('bannerTextColor', val)} />
            </div>
          </div>
        )}
      </Accordion>

      <Accordion title="Branding & Typography" icon={Palette}>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <ColorPicker label="Primary Colour (Navy)" value={config.primaryColor} onChange={(val) => updateConfig('primaryColor', val)} />
          <ColorPicker label="Accent Colour (Orange)" value={config.accentColor} onChange={(val) => updateConfig('accentColor', val)} />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1 text-xs"><Type className="w-3.5 h-3.5 text-slate-400" /> Font Family Stack</label>
          <select value={config.selectedFont} onChange={(e) => updateConfig('selectedFont', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#2a2b72] outline-none text-slate-900 bg-white">
            {FONT_OPTIONS.map(font => (<option key={font.id} value={font.id}>{font.name}</option>))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1 text-xs"><Type className="w-3.5 h-3.5 text-slate-400" /> Text Size</label>
          <select value={config.textSize} onChange={(e) => updateConfig('textSize', Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#2a2b72] outline-none text-slate-900 bg-white">
            <option value={11}>Small (11px)</option>
            <option value={13}>Medium (13px)</option>
            <option value={15}>Large (15px)</option>
            <option value={17}>Extra Large (17px)</option>
          </select>
        </div>

        <TextInput label="Company Logo URL" value={config.logoUrl} onChange={(val) => updateConfig('logoUrl', val)} fontMono={true} />

        <div>
          <div className="mb-1 text-xs">
            <label className="font-medium text-slate-700">Logo Size: </label>
            <span className="font-mono text-[#2a2b72] font-semibold">{config.logoWidth}px</span>
          </div>
          <input type="range" min="50" max="220" step="5" value={config.logoWidth} onChange={(e) => updateConfig('logoWidth', e.target.value)} className="w-full accent-[#2a2b72] cursor-pointer" />
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><Sparkles className="w-3.5 h-3.5 text-[#2a2b72]" /> Promotional CTA Button</label>
            <input type="checkbox" checked={config.showCta} onChange={(e) => updateConfig('showCta', e.target.checked)} className="rounded border-slate-300 text-[#2a2b72] focus:ring-0 cursor-pointer" />
          </div>
          {config.showCta && (
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-[#2a2b72]/20">
              <TextInput value={config.ctaText} onChange={(val) => updateConfig('ctaText', val)} />
              <TextInput value={config.ctaUrl} onChange={(val) => updateConfig('ctaUrl', val)} fontMono={true} />
            </div>
          )}
        </div>
        
        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><Sparkles className="w-3.5 h-3.5 text-[#2a2b72]" /> Secondary CTA Button</label>
            <input type="checkbox" checked={config.showCta2} onChange={(e) => updateConfig('showCta2', e.target.checked)} className="rounded border-slate-300 text-[#2a2b72] focus:ring-0 cursor-pointer" />
          </div>
          {config.showCta2 && (
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-[#2a2b72]/20">
              <TextInput value={config.cta2Text} onChange={(val) => updateConfig('cta2Text', val)} />
              <TextInput value={config.cta2Url} onChange={(val) => updateConfig('cta2Url', val)} fontMono={true} />
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><FileText className="w-3.5 h-3.5 text-slate-500" /> Legal Disclaimer</label>
            <input type="checkbox" checked={config.showDisclaimer} onChange={(e) => updateConfig('showDisclaimer', e.target.checked)} className="rounded border-slate-300 text-[#2a2b72] focus:ring-0 cursor-pointer" />
          </div>
          {config.showDisclaimer && (
            <TextArea value={config.disclaimer} onChange={(val) => updateConfig('disclaimer', val)} rows={3} />
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><Layers className="w-3.5 h-3.5 text-[#2a2b72]" /> Service Tags (Badges)</label>
            <input type="checkbox" checked={config.showTags} onChange={(e) => updateConfig('showTags', e.target.checked)} className="rounded border-slate-300 text-[#2a2b72] focus:ring-0 cursor-pointer" />
          </div>
          {config.showTags && (
            <div className="space-y-2 mt-2 pl-2 border-l-2 border-[#2a2b72]/20">
              <TextInput value={config.tag1} onChange={(val) => updateConfig('tag1', val)} />
              <TextInput value={config.tag2} onChange={(val) => updateConfig('tag2', val)} />
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><Info className="w-3.5 h-3.5 text-amber-500" /> Security Footer Tip</label>
            <input type="checkbox" checked={config.showTip} onChange={(e) => updateConfig('showTip', e.target.checked)} className="rounded border-slate-300 text-[#2a2b72] focus:ring-0 cursor-pointer" />
          </div>
          {config.showTip && (
            <TextArea value={config.tip} onChange={(val) => updateConfig('tip', val)} rows={2} />
          )}
        </div>
      </Accordion>
      
    </div>
  );
}
