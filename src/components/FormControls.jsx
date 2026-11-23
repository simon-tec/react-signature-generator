import React from 'react';
import { User, Palette, Type, Sparkles, FileText, Info, Layers, LayoutTemplate } from 'lucide-react';
import { FONT_OPTIONS } from '../utils/signatureGenerator';

export default function FormControls({ data }) {
  // Destructure everything from the shared state object
  const {
    name, setName, title, setTitle, department, setDepartment, company, setCompany,
    phone, setPhone, mobile, setMobile, showMobile, setShowMobile, email, setEmail,
    website, setWebsite, linkedin, setLinkedin, address, setAddress, showAddress, setShowAddress,
    layout, setLayout, bannerImg, setBannerImg, clientMode, setClientMode,
    primaryColor, setPrimaryColor, accentColor, setAccentColor, secondaryColor, setSecondaryColor,
    selectedFont, setSelectedFont, logoUrl, setLogoUrl, logoWidth, setLogoWidth,
    showCta, setShowCta, ctaText, setCtaText, ctaUrl, setCtaUrl,
    showDisclaimer, setShowDisclaimer, disclaimer, setDisclaimer,
    showTags, setShowTags, tag1, setTag1, tag2, setTag2,
    showTip, setShowTip, tip, setTip
  } = data;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Signature Layout Options */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" /> Signature Layout
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'split', label: 'Split' },
            { id: 'stacked', label: 'Stacked' },
            { id: 'terminal-code', label: 'Terminal (Code)' },
            { id: 'terminal-clean', label: 'Terminal (Clean)' },
            { id: 'banner-img', label: 'Banner (Image)' },
            { id: 'banner-html', label: 'Banner (HTML)' }
          ].map((type) => (
            <label 
              key={type.id}
              className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                layout === type.id 
                  ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' 
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-900 capitalize">{type.label}</span>
                <input type="radio" name="layout" value={type.id} checked={layout === type.id} onChange={(e) => setLayout(e.target.value)} className="accent-blue-600" />
              </div>
            </label>
          ))}
        </div>

        {layout === 'banner-img' && (
          <div className="pt-2 border-t border-slate-100">
            <label className="block font-medium text-slate-700 text-xs mb-1">Banner Image URL</label>
            <input type="text" value={bannerImg} onChange={(e) => setBannerImg(e.target.value)} placeholder="https://example.com/banner.png" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        )}
      </div>

      {/* Target Email Client Selection */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Target Email Client
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${clientMode === 'gmail' ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-900">Gmail / Web</span>
              <input type="radio" name="clientMode" value="gmail" checked={clientMode === 'gmail'} onChange={(e) => setClientMode(e.target.value)} className="accent-blue-600" />
            </div>
            <span className="text-[11px] text-slate-500 leading-tight">Standard HTML table with clean inline styles</span>
          </label>
          <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${clientMode === 'outlook' ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-900">Outlook Desktop</span>
              <input type="radio" name="clientMode" value="outlook" checked={clientMode === 'outlook'} onChange={(e) => setClientMode(e.target.value)} className="accent-blue-600" />
            </div>
            <span className="text-[11px] text-slate-500 leading-tight">MSO conditional tables for Word rendering engine</span>
          </label>
        </div>
      </div>

      {/* User Profile Form */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" /> Personal Details
        </h2>
        <div className="space-y-3.5 text-xs">
          <div><label className="block font-medium text-slate-700 mb-1">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
          <div><label className="block font-medium text-slate-700 mb-1">Company Name</label><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block font-medium text-slate-700 mb-1">Primary Phone</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-slate-700">Mobile Phone</label>
                <label className="inline-flex items-center gap-1 cursor-pointer text-[10px] text-blue-600"><input type="checkbox" checked={showMobile} onChange={(e) => setShowMobile(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0" /> Show</label>
              </div>
              <input type="text" disabled={!showMobile} value={mobile} onChange={(e) => setMobile(e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${showMobile ? 'border-slate-300 text-slate-900 bg-white' : 'border-slate-200 text-slate-400 bg-slate-50'}`} />
            </div>
          </div>
          <div><label className="block font-medium text-slate-700 mb-1">Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
          <div><label className="block font-medium text-slate-700 mb-1">Website URL</label><input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
          <div><label className="block font-medium text-slate-700 mb-1">LinkedIn URL</label><input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" /></div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-slate-700">Location / Address</label>
              <label className="inline-flex items-center gap-1 cursor-pointer text-[10px] text-blue-600"><input type="checkbox" checked={showAddress} onChange={(e) => setShowAddress(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0" /> Show</label>
            </div>
            <input type="text" disabled={!showAddress} value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${showAddress ? 'border-slate-300 text-slate-900 bg-white' : 'border-slate-200 text-slate-400 bg-slate-50'}`} />
          </div>
        </div>
      </div>

      {/* Branding & Styling Customizer */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-600" /> Branding & Typography
        </h2>
        <div className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Primary Color (Navy)</label>
              <div className="flex items-center gap-2">
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white" />
                <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono uppercase text-[11px]" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Accent Color (Orange)</label>
              <div className="flex items-center gap-2">
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white" />
                <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono uppercase text-[11px]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1"><Type className="w-3.5 h-3.5 text-slate-400" /> Font Family Stack</label>
            <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white">
              {FONT_OPTIONS.map(font => (<option key={font.id} value={font.id}>{font.name}</option>))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Company Logo URL</label>
            <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-slate-700">Logo Size</label><span className="font-mono text-blue-600 font-semibold">{logoWidth}px</span>
            </div>
            <input type="range" min="90" max="200" step="5" value={logoWidth} onChange={(e) => setLogoWidth(e.target.value)} className="w-full accent-blue-600 cursor-pointer" />
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-blue-600" /> Promotional CTA Button</label>
              <input type="checkbox" checked={showCta} onChange={(e) => setShowCta(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
            </div>
            {showCta && (
              <div className="space-y-2 mt-2 pl-2 border-l-2 border-blue-200">
                <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
                <input type="text" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono" />
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-500" /> Legal Disclaimer</label>
              <input type="checkbox" checked={showDisclaimer} onChange={(e) => setShowDisclaimer(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
            </div>
            {showDisclaimer && (
              <textarea value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} rows={3} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mt-2 resize-none" />
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-600" /> Service Tags (Badges)</label>
              <input type="checkbox" checked={showTags} onChange={(e) => setShowTags(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
            </div>
            {showTags && (
              <div className="space-y-2 mt-2 pl-2 border-l-2 border-blue-200">
                <input type="text" value={tag1} onChange={(e) => setTag1(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
                <input type="text" value={tag2} onChange={(e) => setTag2(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-amber-500" /> Security Footer Tip</label>
              <input type="checkbox" checked={showTip} onChange={(e) => setShowTip(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
            </div>
            {showTip && (
              <textarea value={tip} onChange={(e) => setTip(e.target.value)} rows={2} className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mt-2 resize-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
