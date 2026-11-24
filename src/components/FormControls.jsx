import React from 'react';
import { User, Palette, Type, Sparkles, FileText, Info, Layers, LayoutTemplate, Contact, Image, Link, Shield, Scale, Check } from 'lucide-react';
import { FONT_OPTIONS } from '../utils/signatureGenerator';
import { Accordion, TextInput, TextArea, Toggle, ColorPicker } from './FormElements';

export default function FormControls({ config, updateConfig }) {
  const activeSocialCount = [
    config.socialGithub, config.socialLinkedin, config.socialFacebook,
    config.socialInstagram, config.socialYoutube, config.socialTwitter,
    config.socialTiktok, config.socialPinterest, config.socialWhatsapp,
    config.customLink1, config.customLink2
  ].filter(Boolean).length;

  const activeCtaCount = (config.showCta ? 1 : 0) + (config.showCta2 ? 1 : 0);
  const activeFooterCount = (config.showTip ? 1 : 0) + (config.showDisclaimer ? 1 : 0);

  return (
    <div className="flex flex-col">
      
      {/* 1. SIGNATURE LAYOUT */}
      <Accordion title="Signature Layout" icon={LayoutTemplate} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'split', label: 'Split' },
            { id: 'stacked', label: 'Stacked (Left)' },
            { id: 'terminal-code', label: 'Terminal (Code)' },
            { id: 'terminal-clean', label: 'Terminal (Clean)' },
            { id: 'grid-block', label: 'Stacked (Grid Block)', fullWidth: true }
          ].map((type) => {
            const isSelected = config.layout === type.id;
            return (
              <label 
                key={type.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  type.fullWidth ? 'col-span-2' : ''
                } ${
                  isSelected 
                    ? 'border-[#2a2b72] bg-[#2a2b72]/5 ring-1 ring-[#2a2b72]' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70'
                }`}
              >
                <span className={`text-xs font-semibold ${isSelected ? 'text-[#2a2b72]' : 'text-slate-800'}`}>
                  {type.label}
                </span>
                <input 
                  type="radio" 
                  name="layout" 
                  value={type.id} 
                  checked={isSelected} 
                  onChange={(e) => updateConfig('layout', e.target.value)} 
                  className="sr-only" 
                />
                <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  isSelected 
                    ? 'bg-[#2a2b72] border border-[#2a2b72] text-white' 
                    : 'bg-white border border-slate-300'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </label>
            );
          })}
        </div>
      </Accordion>

      {/* 2. PERSONAL DETAILS */}
      <Accordion title="Personal Details" icon={User} defaultOpen={true}>
        <TextInput label="Full Name" value={config.name} onChange={(val) => updateConfig('name', val)} placeholder="MR. Robot" />
        <TextInput label="Job Title" value={config.title} onChange={(val) => updateConfig('title', val)} placeholder="Senior Cybersecurity Engineer" />
        <TextInput label="Department" value={config.department} onChange={(val) => updateConfig('department', val)} placeholder="Allsafe Cybersecurity" />
        <TextInput label="Company Name" value={config.company} onChange={(val) => updateConfig('company', val)} placeholder="SafeGuardian" />
      </Accordion>

      {/* 3. CONTACT INFORMATION */}
      <Accordion title="Contact Information" icon={Contact}>
        <TextInput label="Phone (primary)" value={config.phone} onChange={(val) => updateConfig('phone', val)} placeholder="+64 9 000 1234" />
        
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-medium text-slate-700 text-xs">Phone (secondary)</label>
            <Toggle checked={config.showMobile} onChange={(val) => updateConfig('showMobile', val)} />
          </div>
          <TextInput value={config.mobile} onChange={(val) => updateConfig('mobile', val)} placeholder="+64 21 000 1234" disabled={!config.showMobile} />
        </div>

        <TextInput label="Email Address" type="email" value={config.email} onChange={(val) => updateConfig('email', val)} placeholder="mr.robot@securemail.io" />
        <TextInput label="Website URL" value={config.website} onChange={(val) => updateConfig('website', val)} placeholder="https://www.safeguardian.co.nz" />
        
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-medium text-slate-700 text-xs">LinkedIn URL</label>
            <Toggle checked={config.showLinkedin} onChange={(val) => updateConfig('showLinkedin', val)} />
          </div>
          <TextInput value={config.linkedin} onChange={(val) => updateConfig('linkedin', val)} placeholder="https://nz.linkedin.com/in/mr-robot" disabled={!config.showLinkedin} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-medium text-slate-700 text-xs">Location</label>
            <Toggle checked={config.showAddress} onChange={(val) => updateConfig('showAddress', val)} />
          </div>
          <TextInput value={config.address} onChange={(val) => updateConfig('address', val)} placeholder="Central Auckland, Auckland, New Zealand" disabled={!config.showAddress} />
        </div>
      </Accordion>

      {/* 4. BRANDING & TYPOGRAPHY */}
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
      </Accordion>

      {/* 5. SOCIAL LINKS */}
      <Accordion title="Social Links" icon={Link} badge={activeSocialCount > 0 ? `${activeSocialCount} Active` : null}>
        <div className="text-[11px] text-slate-500 mb-4 pb-4 border-b border-slate-100">
          Social icons only appear when a URL is provided.
        </div>
        
        <div className="space-y-4">
          <TextInput label="GitHub" value={config.socialGithub} onChange={(val) => updateConfig('socialGithub', val)} placeholder="https://github.com/..." fontMono={true} />
          <TextInput label="LinkedIn" value={config.socialLinkedin} onChange={(val) => updateConfig('socialLinkedin', val)} placeholder="https://linkedin.com/in/..." fontMono={true} />
          <TextInput label="Facebook" value={config.socialFacebook} onChange={(val) => updateConfig('socialFacebook', val)} placeholder="https://facebook.com/..." fontMono={true} />
          <TextInput label="Instagram" value={config.socialInstagram} onChange={(val) => updateConfig('socialInstagram', val)} placeholder="https://instagram.com/..." fontMono={true} />
          <TextInput label="YouTube" value={config.socialYoutube} onChange={(val) => updateConfig('socialYoutube', val)} placeholder="https://youtube.com/@..." fontMono={true} />
          <TextInput label="Twitter / X" value={config.socialTwitter} onChange={(val) => updateConfig('socialTwitter', val)} placeholder="https://x.com/..." fontMono={true} />
          <TextInput label="TikTok" value={config.socialTiktok} onChange={(val) => updateConfig('socialTiktok', val)} placeholder="https://tiktok.com/@..." fontMono={true} />
          <TextInput label="Pinterest" value={config.socialPinterest} onChange={(val) => updateConfig('socialPinterest', val)} placeholder="https://pinterest.com/..." fontMono={true} />
          <TextInput label="WhatsApp" value={config.socialWhatsapp} onChange={(val) => updateConfig('socialWhatsapp', val)} placeholder="https://wa.me/..." fontMono={true} />
        </div>

        <div className="pt-5 mt-5 border-t border-slate-100">
          <h4 className="text-[11px] font-bold text-[#2a2b72] uppercase tracking-wider mb-4">Custom Icons</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Custom Link 1" value={config.customLink1} onChange={(val) => updateConfig('customLink1', val)} placeholder="https://..." fontMono={true} />
              <TextInput label="Icon Image URL" value={config.customIcon1} onChange={(val) => updateConfig('customIcon1', val)} placeholder="https://example.com/icon.png" fontMono={true} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Custom Link 2" value={config.customLink2} onChange={(val) => updateConfig('customLink2', val)} placeholder="https://..." fontMono={true} />
              <TextInput label="Icon Image URL" value={config.customIcon2} onChange={(val) => updateConfig('customIcon2', val)} placeholder="https://example.com/icon.png" fontMono={true} />
            </div>
            <div className="text-[10px] text-slate-500 leading-tight">
              For any network not listed above. Use a square PNG or JPEG hosted at a public URL; it is shown at 24x24px.
            </div>
          </div>
        </div>
      </Accordion>

      {/* 6. SERVICE TAGS & BADGES */}
      <Accordion title="Service Tags & Badges" icon={Shield} badge={config.showTags ? 'On' : null}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <label className="font-medium text-slate-800 text-xs">Enable Service Badges</label>
          <Toggle checked={config.showTags} onChange={(val) => updateConfig('showTags', val)} />
        </div>
        {config.showTags && (
          <div className="space-y-3">
            <TextInput label="Tag 1 (Left)" value={config.tag1} onChange={(val) => updateConfig('tag1', val)} />
            <TextInput label="Tag 2 (Right)" value={config.tag2} onChange={(val) => updateConfig('tag2', val)} />
          </div>
        )}
      </Accordion>

      {/* 7. CALL-TO-ACTION BUTTONS */}
      <Accordion title="Call-to-Action Buttons" icon={Sparkles} badge={activeCtaCount > 0 ? `${activeCtaCount} Active` : null}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full bg-[#e85626]"></span> Primary CTA Button</label>
            <Toggle checked={config.showCta} onChange={(val) => updateConfig('showCta', val)} />
          </div>
          {config.showCta && (
            <div className="space-y-3 pl-2 border-l-2 border-[#2a2b72]/20">
              <TextInput label="Button Text" value={config.ctaText} onChange={(val) => updateConfig('ctaText', val)} />
              <TextInput label="Destination URL" value={config.ctaUrl} onChange={(val) => updateConfig('ctaUrl', val)} fontMono={true} />
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full bg-[#2a2b72]"></span> Secondary CTA Button</label>
            <Toggle checked={config.showCta2} onChange={(val) => updateConfig('showCta2', val)} />
          </div>
          {config.showCta2 && (
            <div className="space-y-3 pl-2 border-l-2 border-[#2a2b72]/20">
              <TextInput label="Button Text" value={config.cta2Text} onChange={(val) => updateConfig('cta2Text', val)} />
              <TextInput label="Destination URL" value={config.cta2Url} onChange={(val) => updateConfig('cta2Url', val)} fontMono={true} />
            </div>
          )}
        </div>
      </Accordion>

      {/* 8. PROMOTIONAL BANNER */}
      <Accordion title="Promotional Banner" icon={Image} badge={config.bannerType !== 'none' ? config.bannerType.toUpperCase() : null}>
        <div>
          <label className="block font-medium text-slate-700 mb-2 text-xs">Banner Type</label>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'none', label: 'None' },
              { id: 'image', label: 'Image Banner' },
              { id: 'html', label: 'HTML Banner' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => updateConfig('bannerType', tab.id)}
                className={`flex-1 px-3 py-1.5 text-xs rounded-md transition-all ${
                  config.bannerType === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm font-semibold' 
                    : 'text-slate-500 hover:text-slate-700 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
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

      {/* 9. LEGAL & SECURITY FOOTERS */}
      <Accordion title="Legal & Security Footers" icon={Scale} badge={activeFooterCount > 0 ? `${activeFooterCount} Active` : null}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><Info className="w-3.5 h-3.5 text-amber-500" /> Security Footer Tip</label>
            <Toggle checked={config.showTip} onChange={(val) => updateConfig('showTip', val)} />
          </div>
          {config.showTip && (
            <TextArea value={config.tip} onChange={(val) => updateConfig('tip', val)} rows={2} />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <label className="font-medium text-slate-800 flex items-center gap-1.5 text-xs"><FileText className="w-3.5 h-3.5 text-slate-500" /> Legal Disclaimer</label>
            <Toggle checked={config.showDisclaimer} onChange={(val) => updateConfig('showDisclaimer', val)} />
          </div>
          {config.showDisclaimer && (
            <TextArea value={config.disclaimer} onChange={(val) => updateConfig('disclaimer', val)} rows={3} />
          )}
        </div>
      </Accordion>

      {/* 10. TARGET EMAIL CLIENT */}
      <Accordion title="Target Email Client" icon={Layers} badge={config.clientMode === 'outlook' ? 'MSO' : 'Universal'}>
        <div className="grid grid-cols-1 gap-2.5">
          {[
            { id: 'gmail', title: 'Universal (Modern)', desc: 'Optimised for Gmail, Apple Mail, New Outlook, and Outlook (Mac).' },
            { id: 'outlook', title: 'Classic Outlook (Windows)', desc: 'Includes MSO conditional tables for older Microsoft Word rendering engines.' }
          ].map((mode) => {
            const isSelected = config.clientMode === mode.id;
            return (
              <label 
                key={mode.id}
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#2a2b72] bg-[#2a2b72]/5 ring-1 ring-[#2a2b72]' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-[#2a2b72]' : 'text-slate-900'}`}>{mode.title}</span>
                  <input 
                    type="radio" 
                    name="clientMode" 
                    value={mode.id} 
                    checked={isSelected} 
                    onChange={(e) => updateConfig('clientMode', e.target.value)} 
                    className="sr-only" 
                  />
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    isSelected 
                      ? 'bg-[#2a2b72] border border-[#2a2b72] text-white' 
                      : 'bg-white border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">{mode.desc}</span>
              </label>
            );
          })}
        </div>
      </Accordion>
      
    </div>
  );
}
