import React, { useState, useRef } from 'react';
import { Copy, Check, RotateCcw, Sun, Moon, Shield, Code, Eye, Palette, User, CheckCircle2, Info, LayoutTemplate } from 'lucide-react';

const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/66ac485ffc91f22009fa5c2b/f2ecda1d-b26a-46b6-a117-e90c7c274c43/SafeGuardian-logo.png";

const FONT_OPTIONS = [
  { id: 'modern', name: 'Modern system (Segoe UI, Helvetica Neue)', stack: "'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif" },
  { id: 'aptos', name: 'Aptos (Microsoft 365)', stack: "Aptos,'Segoe UI','Helvetica Neue',Arial,sans-serif" },
  { id: 'geo', name: 'Geometric (Century Gothic, Avenir)', stack: "'Century Gothic','Avenir Next',Avenir,'Segoe UI',Arial,sans-serif" },
  { id: 'calibri', name: 'Calibri, Candara', stack: "Calibri,Candara,'Segoe UI',Arial,sans-serif" },
  { id: 'treb', name: 'Trebuchet MS', stack: "'Trebuchet MS','Lucida Grande',Arial,sans-serif" }
];

export default function App() {
  // Form State
  const [name, setName] = useState("Alex Morgan");
  const [title, setTitle] = useState("Senior Security Advisor");
  const [department, setDepartment] = useState("Enterprise Risk & Compliance");
  const [company, setCompany] = useState("SafeGuardian");
  const [phone, setPhone] = useState("+64 9 300 1234");
  const [mobile, setMobile] = useState("+64 21 123 4567");
  const [showMobile, setShowMobile] = useState(false);
  const [email, setEmail] = useState("alex.morgan@safeguardian.co.nz");
  const [website, setWebsite] = useState("https://www.safeguardian.co.nz");
  const [address, setAddress] = useState("Auckland, New Zealand");
  const [showAddress, setShowAddress] = useState(true);
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/company/safeguardian");

  // Enhancements State
  const [tag1, setTag1] = useState("Autonomous Pentesting");
  const [tag2, setTag2] = useState("Horizon3.ai Autonomous Cybersecurity");
  const [showTags, setShowTags] = useState(true);
  const [tip, setTip] = useState("Security tip: verify unexpected payment or login requests by phone before acting.");
  const [showTip, setShowTip] = useState(true);
  const [disclaimer, setDisclaimer] = useState("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  // CTA & Banner Settings
  const [showCta, setShowCta] = useState(true);
  const [ctaText, setCtaText] = useState("Schedule a Security Audit");
  const [ctaUrl, setCtaUrl] = useState("https://www.safeguardian.co.nz/book-demo");
  const [ctaColor, setCtaColor] = useState("#2563eb");
  const [bannerImg, setBannerImg] = useState("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");

  // Branding & Typography
  const [primaryColor, setPrimaryColor] = useState("#1e3a8a");
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [terminalBg, setTerminalBg] = useState("#0f172a");
  const [selectedFont, setSelectedFont] = useState("modern");
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);
  const [logoWidth, setLogoWidth] = useState(150);

  // UI State
  const [layout, setLayout] = useState("split");
  const [clientMode, setClientMode] = useState("gmail");
  const [previewBg, setPreviewBg] = useState("light");
  const [activeTab, setActiveTab] = useState("visual");
  const [copiedVisual, setCopiedVisual] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  const previewRef = useRef(null);

  const handleReset = () => {
    setName("Alex Morgan");
    setTitle("Senior Security Advisor");
    setDepartment("Enterprise Risk & Compliance");
    setCompany("SafeGuardian");
    setPhone("+64 9 300 1234");
    setMobile("+64 21 123 4567");
    setShowMobile(false);
    setEmail("alex.morgan@safeguardian.co.nz");
    setWebsite("https://www.safeguardian.co.nz");
    setLinkedin("https://www.linkedin.com/company/safeguardian");
    setAddress("Auckland, New Zealand");
    setShowAddress(true);
    setTag1("Autonomous Pentesting");
    setTag2("Horizon3.ai Autonomous Cybersecurity");
    setShowTags(true);
    setTip("Security tip: verify unexpected payment or login requests by phone before acting.");
    setShowTip(true);
    setDisclaimer("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
    setShowDisclaimer(false);
    setShowCta(true);
    setCtaText("Schedule a Security Audit");
    setCtaUrl("https://www.safeguardian.co.nz/book-demo");
    setCtaColor("#2563eb");
    setBannerImg("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");
    setPrimaryColor("#1e3a8a");
    setAccentColor("#2563eb");
    setTerminalBg("#0f172a");
    setSelectedFont("modern");
    setLogoUrl(LOGO_URL);
    setLogoWidth(150);
  };

  const generateHTML = () => {
    const isOutlook = clientMode === 'outlook';
    const fontStack = FONT_OPTIONS.find(f => f.id === selectedFont)?.stack || FONT_OPTIONS[0].stack;
    const cleanWebsite = website.replace(/^https?:\/\//, '');
    
    // Outlook wrappers
    const wrapTableStart = (width) => isOutlook ? `<!--[if mso]><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="${width}"><tr><td valign="top"><![endif]-->` : '';
    const wrapTableEnd = () => isOutlook ? `</td></tr></table><![endif]-->` : '';
    const wrapColStart = (width) => isOutlook ? `<!--[if mso]></td><td valign="top" width="${width}"><![endif]-->` : '';

    const contactLines = [
      phone && `<strong>P:</strong> &nbsp; ${phone}`,
      showMobile && mobile && `<strong>M:</strong> &nbsp; ${mobile}`,
      email && `<strong>E:</strong> &nbsp; <a href="mailto:${email}" style="color:${accentColor}; text-decoration:none;">${email}</a>`,
      website && `<strong>W:</strong> &nbsp; <a href="${website}" style="color:${accentColor}; text-decoration:none;">${cleanWebsite}</a>`,
      linkedin && `<strong>In:</strong> &nbsp; <a href="${linkedin}" style="color:${accentColor}; text-decoration:none;">LinkedIn</a>`,
      showAddress && address && `<strong>A:</strong> &nbsp; ${address}`
    ].filter(Boolean).map(line => `<tr><td style="padding-bottom:4px; font-family:${fontStack}; font-size:12px; color:#475569;">${line}</td></tr>`).join('');

    const tagsHtml = showTags && (tag1 || tag2) ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
        <tr>
          ${tag1 ? `<td style="background-color:#eff6ff; border:1px solid ${accentColor}; padding:4px 8px; border-radius:4px; font-family:${fontStack}; font-size:11px; font-weight:bold; color:${primaryColor};">${tag1}</td>` : ''}
          ${tag1 && tag2 ? `<td width="8" style="width:8px;"></td>` : ''}
          ${tag2 ? `<td style="background-color:#eff6ff; border:1px solid ${accentColor}; padding:4px 8px; border-radius:4px; font-family:${fontStack}; font-size:11px; font-weight:bold; color:${primaryColor};">${tag2}</td>` : ''}
        </tr>
      </table>
    ` : '';

    const tipHtml = showTip && tip ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; width: 100%; max-width: 500px;">
        <tr><td style="font-family:${fontStack}; font-size:11px; color:#64748b; font-style:italic;">${tip}</td></tr>
      </table>
    ` : '';

    const disclaimerHtml = showDisclaimer && disclaimer ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px; width: 100%; max-width: 600px; border-top: 1px solid #e2e8f0;">
        <tr><td style="padding-top:12px; font-family:${fontStack}; font-size:10px; color:#94a3b8; line-height:1.4;">${disclaimer}</td></tr>
      </table>
    ` : '';

    const titleDeptHtml = [title, department].filter(Boolean).join(" | ");

    let coreHtml = '';

    if (layout === 'split') {
      coreHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontStack}; max-width: 600px;">
          <tr>
            ${wrapTableStart(180)}
            <td valign="middle" style="padding-right:20px; border-right:2px solid ${primaryColor}; width:${logoWidth + 20}px;">
              <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display:block; max-width:${logoWidth}px; border:none;" />
            </td>
            ${wrapColStart(400)}
            <td valign="middle" style="padding-left:20px;">
              <span style="font-size:16px; font-weight:bold; color:${primaryColor};">${name}</span><br/>
              <span style="font-size:13px; color:#64748b;">${titleDeptHtml} <br/> <strong>${company}</strong></span>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">${contactLines}</table>
              ${tagsHtml}
            </td>
            ${wrapTableEnd()}
          </tr>
        </table>
        ${tipHtml}
      `;
    } 
    else if (layout === 'stacked') {
      coreHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontStack}; max-width: 600px;">
          <tr>
            <td style="padding-bottom:10px;">
              <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display:block; max-width:${logoWidth}px; border:none;" />
            </td>
          </tr>
          <tr>
            <td style="border-top: 2px solid ${primaryColor}; padding-top:10px;">
              <span style="font-size:16px; font-weight:bold; color:${primaryColor};">${name}</span><br/>
              <span style="font-size:13px; color:#64748b;">${titleDeptHtml} <br/> <strong>${company}</strong></span>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">${contactLines}</table>
              ${tagsHtml}
            </td>
          </tr>
        </table>
        ${tipHtml}
      `;
    }
    else if (layout === 'terminal-code') {
      coreHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family: monospace; max-width: 600px; background-color:${terminalBg}; color:#10b981; border-radius:8px; padding:16px;">
          <tr>
            <td style="font-size: 13px;">
              <span style="color:#e2e8f0;">$</span> cat contact.json<br/>
              {<br/>
              &nbsp;&nbsp;"name": "${name}",<br/>
              &nbsp;&nbsp;"title": "${titleDeptHtml}",<br/>
              &nbsp;&nbsp;"company": "${company}",<br/>
              &nbsp;&nbsp;"phone": "${phone}",<br/>
              &nbsp;&nbsp;"email": "<a href="mailto:${email}" style="color:#3b82f6; text-decoration:none;">${email}</a>",<br/>
              &nbsp;&nbsp;"web": "<a href="${website}" style="color:#3b82f6; text-decoration:none;">${cleanWebsite}</a>"<br/>
              }<br/>
              <span style="color:#e2e8f0;">$</span> <span style="display:inline-block; width:8px; height:14px; background-color:#e2e8f0; vertical-align:middle;"></span>
            </td>
          </tr>
        </table>
      `;
    }
    else if (layout === 'terminal-clean') {
      const pad = (s) => (s + '\u00a0\u00a0\u00a0\u00a0\u00a0').slice(0, 5);
      const chev = `<span style="color:${accentColor};font-weight:bold;">&gt;</span>&nbsp;`;
      coreHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family: monospace; max-width: 600px;">
          <tr>
            <td valign="top" style="padding-right:20px; padding-top:8px;">
               <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display:block; max-width:${logoWidth}px; border:none;" />
            </td>
            <td style="background-color:#f1f5f9; border-left: 3px solid ${accentColor}; padding: 12px 16px;">
              <div style="font-size:16px; font-weight:bold; color:${primaryColor}; margin-bottom:4px; font-family:${fontStack};">${name}</div>
              <div style="font-size:12px; color:#64748b; margin-bottom:8px; font-family:${fontStack};">${titleDeptHtml}</div>
              <div style="font-size:12px; color:${primaryColor}; margin-bottom:4px;">${chev}${pad("tel")} <span style="color:#475569;">${phone}</span></div>
              <div style="font-size:12px; color:${primaryColor}; margin-bottom:4px;">${chev}${pad("mail")} <a href="mailto:${email}" style="color:#475569;text-decoration:none;">${email}</a></div>
              <div style="font-size:12px; color:${primaryColor}; margin-bottom:8px;">${chev}${pad("web")} <a href="${website}" style="color:#475569;text-decoration:none;">${cleanWebsite}</a></div>
              ${showTags && tag1 ? `<div style="font-size:12px; color:${primaryColor}; margin-top:8px;">${chev}${tag1}</div>` : ''}
              ${showTags && tag2 ? `<div style="font-size:12px; color:${primaryColor}; margin-top:2px;">${chev}${tag2}</div>` : ''}
            </td>
          </tr>
        </table>
      `;
    }
    else if (layout === 'banner-img') {
      coreHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontStack}; max-width: 600px;">
          <tr>
            ${wrapTableStart(180)}
            <td valign="middle" style="padding-right:20px; border-right:2px solid ${primaryColor}; width:${logoWidth + 20}px;">
              <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display:block; max-width:${logoWidth}px; border:none;" />
            </td>
            ${wrapColStart(400)}
            <td valign="middle" style="padding-left:20px;">
              <span style="font-size:16px; font-weight:bold; color:${primaryColor};">${name}</span><br/>
              <span style="font-size:13px; color:#64748b;">${titleDeptHtml} | <strong>${company}</strong></span>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">${contactLines}</table>
            </td>
            ${wrapTableEnd()}
          </tr>
          ${showCta ? `
          <tr>
            <td colspan="2" style="padding-top: 16px;">
              <a href="${ctaUrl}"><img src="${bannerImg}" alt="${ctaText}" style="display:block; max-width:100%; border:none; border-radius:6px;" /></a>
            </td>
          </tr>` : ''}
        </table>
      `;
    }
    else if (layout === 'banner-html') {
      coreHtml = `
        <table width="500" cellpadding="0" cellspacing="0" border="0" style="font-family:${fontStack}; width:500px; max-width:500px; border-collapse:collapse;">
          <tr>
            <td colspan="2">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; border-collapse:collapse;">
                <tr>
                  <td width="120" style="width:120px; border-top:4px solid ${accentColor}; font-size:0; line-height:0;">&nbsp;</td>
                  <td style="border-top:4px solid ${primaryColor}; font-size:0; line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding:12px 0;">
              <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display:block; max-width:${logoWidth}px; border:none;" />
            </td>
          </tr>
          <tr>
            ${wrapTableStart(250)}
            <td valign="top" style="padding-right:20px; width:250px;">
              <div style="font-size:18px; font-weight:bold; color:#0f172a;">${name}</div>
              <div style="font-size:13px; color:#64748b;">${titleDeptHtml}</div>
              <div style="font-size:13px; font-weight:bold; color:${primaryColor}; margin-top:2px;">${company}</div>
            </td>
            ${wrapColStart(250)}
            <td valign="top">
              <table cellpadding="0" cellspacing="0" border="0">${contactLines}</table>
            </td>
            ${wrapTableEnd()}
          </tr>
          ${showTags && (tag1 || tag2) ? `<tr><td colspan="2" style="padding-top:12px;">${tagsHtml}</td></tr>` : ''}
          ${showCta ? `
          <tr>
            <td colspan="2" style="padding-top:12px;">
               <table cellpadding="0" cellspacing="0" border="0">
                 <tr>
                   <td style="background-color:${ctaColor}; border-radius:6px; padding:8px 16px; text-align:center;">
                     <a href="${ctaUrl}" style="color:#ffffff; font-size:13px; font-weight:bold; text-decoration:none; display:inline-block;">${ctaText}</a>
                   </td>
                 </tr>
               </table>
            </td>
          </tr>` : ''}
          ${showTip ? `<tr><td colspan="2">${tipHtml}</td></tr>` : ''}
        </table>
      `;
    }

    return `${coreHtml}${disclaimerHtml}`;
  };

  const handleCopyVisual = async () => {
    if (!previewRef.current) return;
    try {
      const html = generateHTML();
      const blobHtml = new Blob([html], { type: 'text/html' });
      const blobText = new Blob([previewRef.current.innerText], { type: 'text/plain' });
      const data = [new ClipboardItem({ ['text/html']: blobHtml, ['text/plain']: blobText })];
      await navigator.clipboard.write(data);
      setCopiedVisual(true);
      setTimeout(() => setCopiedVisual(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col md:flex-row gap-6">
      
      {/* LEFT SIDEBAR: CONTROLS */}
      <div className="w-full md:w-[400px] flex-shrink-0 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">SafeGuardian</h1>
          </div>
          <button onClick={handleReset} className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-sm text-slate-800">Layout & Platform</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'split', label: 'Split' },
                { id: 'stacked', label: 'Stacked' },
                { id: 'terminal-code', label: 'Terminal (Code)' },
                { id: 'terminal-clean', label: 'Terminal (Clean)' },
                { id: 'banner-img', label: 'Banner (Image)' },
                { id: 'banner-html', label: 'Banner (HTML)' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setLayout(t.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border text-left flex items-center justify-between transition-colors ${
                    layout === t.id ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                  {layout === t.id && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Target Email Client</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setClientMode('gmail')} className={`px-3 py-2 text-xs font-medium rounded-md border text-left transition-colors ${clientMode === 'gmail' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                  Gmail / Google Apps
                </button>
                <button onClick={() => setClientMode('outlook')} className={`px-3 py-2 text-xs font-medium rounded-md border text-left transition-colors ${clientMode === 'outlook' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                  Outlook (MSO)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-sm text-slate-800">Personal Details</h2>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Job Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Department (Optional)</label>
              <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Company</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Primary Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="flex justify-between items-center font-medium text-slate-700 mb-1">
                  Mobile <input type="checkbox" checked={showMobile} onChange={e => setShowMobile(e.target.checked)} className="ml-2 rounded" />
                </label>
                <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} disabled={!showMobile} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Website URL</label>
              <input type="text" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">LinkedIn URL</label>
              <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
               <label className="flex justify-between items-center font-medium text-slate-700 mb-1">
                  Location / Address <input type="checkbox" checked={showAddress} onChange={e => setShowAddress(e.target.checked)} className="ml-2 rounded" />
                </label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} disabled={!showAddress} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-sm text-slate-800">Branding & Typography</h2>
          </div>
          <div className="p-4 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Primary Color</label>
                <div className="flex gap-2">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-slate-300 p-0.5" />
                  <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded-md uppercase outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Accent Color</label>
                <div className="flex gap-2">
                  <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-slate-300 p-0.5" />
                  <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded-md uppercase outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            
            {layout === 'terminal-code' && (
               <div>
                <label className="block font-medium text-slate-700 mb-1">Terminal Background</label>
                <div className="flex gap-2">
                  <input type="color" value={terminalBg} onChange={e => setTerminalBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-slate-300 p-0.5" />
                  <input type="text" value={terminalBg} onChange={e => setTerminalBg(e.target.value)} className="w-full px-2 py-1 border border-slate-300 rounded-md uppercase outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            )}

            <div>
              <label className="block font-medium text-slate-700 mb-1">Font Family Stack</label>
              <select value={selectedFont} onChange={e => setSelectedFont(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-slate-700 mb-1 flex justify-between">
                Company Logo URL
                <span className="text-slate-400">{logoWidth}px</span>
              </label>
              <input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md mb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              <input type="range" min="50" max="300" value={logoWidth} onChange={e => setLogoWidth(parseInt(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-sm text-slate-800">Add-ons & Extras</h2>
          </div>
          <div className="p-4 space-y-4 text-xs">
            
            <div className="space-y-2 pb-3 border-b border-slate-100">
               <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" checked={showTags} onChange={e => setShowTags(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Show Service Tags (Badges)
              </label>
              {showTags && (
                <div className="pl-6 space-y-2">
                  <input type="text" value={tag1} onChange={e => setTag1(e.target.value)} placeholder="Tag 1 (e.g. Autonomous Pentesting)" className="w-full px-3 py-1.5 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  <input type="text" value={tag2} onChange={e => setTag2(e.target.value)} placeholder="Tag 2" className="w-full px-3 py-1.5 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              )}
            </div>

            {(layout === 'banner-img' || layout === 'banner-html') && (
              <div className="space-y-2 pb-3 border-b border-slate-100">
                 <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showCta} onChange={e => setShowCta(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Show Promotional Banner/CTA
                </label>
                {showCta && (
                  <div className="pl-6 space-y-2">
                    {layout === 'banner-html' && (
                       <>
                         <input type="text" value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Button Text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                         <div className="flex gap-2 items-center">
                            <input type="color" value={ctaColor} onChange={e => setCtaColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border border-slate-300 p-0.5" />
                            <span className="text-slate-500">Button Color</span>
                         </div>
                       </>
                    )}
                    {layout === 'banner-img' && (
                       <input type="text" value={bannerImg} onChange={e => setBannerImg(e.target.value)} placeholder="Banner Image URL" className="w-full px-3 py-1.5 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    )}
                    <input type="text" value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} placeholder="Destination Link URL" className="w-full px-3 py-1.5 border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2 pb-3 border-b border-slate-100">
               <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" checked={showTip} onChange={e => setShowTip(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Show Security Tip Footer
              </label>
              {showTip && (
                <textarea value={tip} onChange={e => setTip(e.target.value)} className="w-full ml-6 w-[calc(100%-24px)] px-3 py-2 border border-slate-300 rounded-md text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" rows={2} />
              )}
            </div>

            <div className="space-y-2">
               <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" checked={showDisclaimer} onChange={e => setShowDisclaimer(e.target.checked)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Show Legal Disclaimer
              </label>
              {showDisclaimer && (
                <textarea value={disclaimer} onChange={e => setDisclaimer(e.target.value)} className="w-full ml-6 w-[calc(100%-24px)] px-3 py-2 border border-slate-300 rounded-md text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" rows={4} />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL: PREVIEW & CODE */}
      <div className="flex-grow flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px] sticky top-8">
          
          <div className="flex justify-between items-center border-b border-slate-200 p-2 bg-slate-50">
            <div className="flex bg-slate-200 p-1 rounded-lg gap-1">
              <button onClick={() => setActiveTab('visual')} className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${activeTab === 'visual' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <Eye className="w-4 h-4" /> Visual Preview
              </button>
              <button onClick={() => setActiveTab('code')} className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${activeTab === 'code' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <Code className="w-4 h-4" /> HTML Source
              </button>
            </div>
            
            {activeTab === 'visual' && (
              <div className="flex items-center gap-2 bg-slate-200 p-1 rounded-lg">
                <button onClick={() => setPreviewBg('light')} className={`p-1.5 rounded-md transition-all ${previewBg === 'light' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Sun className="w-4 h-4" />
                </button>
                <button onClick={() => setPreviewBg('dark')} className={`p-1.5 rounded-md transition-all ${previewBg === 'dark' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className={`flex-grow p-8 overflow-y-auto ${activeTab === 'visual' ? (previewBg === 'light' ? 'bg-slate-100' : 'bg-slate-900') : 'bg-[#0d1117]'}`}>
            {activeTab === 'visual' ? (
              <div className="max-w-3xl mx-auto mt-4">
                <div className={`rounded-t-lg p-4 border-b flex gap-2 items-center ${previewBg === 'light' ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                   <div className="flex gap-1.5 mr-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className={`text-xs ${previewBg === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>New Message</div>
                </div>
                <div className={`p-8 rounded-b-lg shadow-sm ${previewBg === 'light' ? 'bg-white' : 'bg-[#1e293b]'}`}>
                  <div className={`mb-8 space-y-4 text-sm ${previewBg === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <p>Hi Team,</p>
                    <p>Please review the updated compliance document attached below. Let me know if you have any questions before the meeting.</p>
                    <p>Best regards,</p>
                  </div>
                  <div ref={previewRef} dangerouslySetInnerHTML={{ __html: generateHTML() }} />
                </div>
              </div>
            ) : (
              <pre className="text-[13px] font-mono text-slate-300 whitespace-pre-wrap p-4">
                {generateHTML()}
              </pre>
            )}
          </div>

          <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Info className="w-4 h-4" /> Optimized for {clientMode === 'gmail' ? 'Gmail & Google Workspace' : 'Microsoft Outlook'}
            </div>
            <div className="flex gap-3">
              <button onClick={handleCopyCode} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors">
                {copiedCode ? <Check className="w-4 h-4 text-green-600" /> : <Code className="w-4 h-4" />}
                {copiedCode ? 'Copied HTML' : 'Copy HTML Code'}
              </button>
              <button onClick={handleCopyVisual} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                {copiedVisual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedVisual ? 'Copied to Clipboard!' : 'Copy Formatted Signature'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
