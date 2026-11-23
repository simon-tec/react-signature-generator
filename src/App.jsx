import React, { useState, useRef, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Sun, 
  Moon, 
  Mail, 
  Phone, 
  Globe, 
  Building, 
  User, 
  Briefcase, 
  Shield, 
  ExternalLink, 
  Code, 
  Eye, 
  Palette, 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  Info,
  Type,
  Link,
  Layers,
  Sparkles,
  LayoutTemplate,
  FileText
} from 'lucide-react';

const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/66ac485ffc91f22009fa5c2b/f2ecda1d-b26a-46b6-a117-e90c7c274c43/SafeGuardian-logo.png";

const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter / Modern Sans', stack: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { id: 'CenturyGothic', name: 'Century Gothic / Geometric', stack: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" },
  { id: 'SegoeUI', name: 'Segoe UI / System', stack: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { id: 'Arial', name: 'Arial / Standard', stack: "Arial, Helvetica, sans-serif" },
  { id: 'Georgia', name: 'Georgia / Serif', stack: "Georgia, 'Times New Roman', serif" },
  { id: 'Aptos', name: 'Aptos (Microsoft 365)', stack: "Aptos, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" },
  { id: 'Calibri', name: 'Calibri / Candara', stack: "Calibri, Candara, 'Segoe UI', Arial, sans-serif" },
  { id: 'Trebuchet', name: 'Trebuchet MS', stack: "'Trebuchet MS', 'Lucida Grande', Arial, sans-serif" }
];

export default function App() {
  // Form State
  const [name, setName] = useState("Alex Morgan");
  const [title, setTitle] = useState("Senior Security Advisor");
  const [department, setDepartment] = useState("Enterprise Risk & Compliance");
  const [phone, setPhone] = useState("+64 9 300 1234");
  const [mobile, setMobile] = useState("+64 21 123 4567");
  const [showMobile, setShowMobile] = useState(false);
  const [email, setEmail] = useState("alex.morgan@safeguardian.co.nz");
  const [website, setWebsite] = useState("https://safeguardian.co.nz");
  const [address, setAddress] = useState("Auckland, New Zealand");
  const [showAddress, setShowAddress] = useState(true);

  // New Content State Additions
  const [company, setCompany] = useState("SafeGuardian");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/safeguardian");
  const [tag1, setTag1] = useState("Autonomous Pentesting");
  const [tag2, setTag2] = useState("Horizon3.ai Autonomous Cybersecurity");
  const [showTags, setShowTags] = useState(true);
  const [tip, setTip] = useState("Security tip: verify unexpected payment or login requests by phone before acting.");
  const [showTip, setShowTip] = useState(true);

  // Layout State Additions
  const [layout, setLayout] = useState('split'); // 'split' | 'stacked' | 'terminal-code' | 'terminal-clean' | 'banner-img' | 'banner-html'
  const [disclaimer, setDisclaimer] = useState("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [bannerImg, setBannerImg] = useState("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);

  // Brand Color Controls
  const [primaryColor, setPrimaryColor] = useState("#1e3a8a"); // Navy
  const [accentColor, setAccentColor] = useState("#2563eb");   // Bright Blue
  const [secondaryColor, setSecondaryColor] = useState("#475569"); // Slate

  // Style & Layout
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [logoWidth, setLogoWidth] = useState(140);
  const [clientMode, setClientMode] = useState("gmail"); // 'gmail' | 'outlook' | 'universal'

  // CTA Banner & Links
  const [showCta, setShowCta] = useState(true);
  const [ctaText, setCtaText] = useState("🔒 Schedule a Security Audit");
  const [ctaUrl, setCtaUrl] = useState("https://safeguardian.co.nz/book-demo");

  // UI Display States
  const [previewBg, setPreviewBg] = useState("light"); // 'light' | 'dark' | 'neutral'
  const [activeTab, setActiveTab] = useState("visual"); // 'visual' | 'code'
  const [copiedVisual, setCopiedVisual] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const previewRef = useRef(null);

  // Helper to strip protocol for web display
  const displayWebsite = website.replace(/^https?:\/\//i, '');

  const currentFontStack = FONT_OPTIONS.find(f => f.id === selectedFont)?.stack || FONT_OPTIONS[0].stack;

  // Generate Raw HTML Signature
  const generateHTML = () => {
    const isOutlook = clientMode === 'outlook';
    const font = currentFontStack;
    
    const ctaHtml = showCta ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px; border-collapse: collapse;">
        <tr>
          <td style="background-color: ${accentColor}; border-radius: 4px; padding: 6px 14px; text-align: center; border: 2px solid ${primaryColor};">
            <a href="${ctaUrl}" target="_blank" style="font-family: ${font}; font-size: 11px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">
              ${ctaText}
            </a>
          </td>
        </tr>
      </table>` : '';

    const disclaimerHtml = showDisclaimer && disclaimer ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
        <tr>
          <td style="font-family: ${font}; font-size: 10px; color: #94a3b8; line-height: 1.4; text-align: justify; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            ${disclaimer}
          </td>
        </tr>
      </table>` : '';

    const tipHtml = showTip && tip ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse; width: 100%; max-width: 520px;">
        <tr>
          <td style="font-family: ${font}; font-size: 11px; color: #64748b; line-height: 1.4; font-style: italic;">
            ${tip}
          </td>
        </tr>
      </table>` : '';

    const tagsHtml = showTags && (tag1 || tag2) ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
        <tr>
          ${tag1 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${font}; font-weight: 600; font-size: 11px; color: ${primaryColor};">${tag1}</td>` : ''}
          ${tag1 && tag2 ? `<td width="6" style="width: 6px; font-size: 0px;">&nbsp;</td>` : ''}
          ${tag2 ? `<td style="background-color: #f1f5f9; border: 1px solid ${primaryColor}; border-radius: 12px; padding: 3px 10px; font-family: ${font}; font-weight: 600; font-size: 11px; color: ${primaryColor};">${tag2}</td>` : ''}
        </tr>
      </table>
    ` : '';

    const contactDetailsHtml = `
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; font-size: 12px; color: ${secondaryColor}; font-family: ${font}; border-collapse: collapse;">
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">P:</strong> ${phone}
          </td>
        </tr>
        ${showMobile && mobile ? `
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">M:</strong> ${mobile}
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">E:</strong> <a href="mailto:${email}" style="color: ${accentColor}; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">W:</strong> <a href="${website}" target="_blank" style="color: ${accentColor}; text-decoration: none;">${displayWebsite}</a>
          </td>
        </tr>
        ${linkedin ? `
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">in:</strong> <a href="${linkedin}" target="_blank" style="color: ${accentColor}; text-decoration: none;">LinkedIn</a>
          </td>
        </tr>` : ''}
        ${showAddress && address ? `
        <tr>
          <td style="padding-bottom: 3px; font-family: ${font}; color: ${secondaryColor};">
            <strong style="color: ${accentColor}; display: inline-block; width: 16px;">A:</strong> ${address}
          </td>
        </tr>` : ''}
      </table>
    `;

    if (layout === 'stacked') {
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; font-size: 13px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 15px;">
      <div style="font-size: 18px; font-weight: 700; color: ${primaryColor}; line-height: 1.2;">${name}</div>
      <div style="font-size: 13px; font-weight: 500; color: ${secondaryColor}; padding-top: 2px;">${title}${department ? ` &bull; ${department}` : ''}</div>
      ${company ? `<div style="font-size: 12px; font-weight: 600; color: ${accentColor}; padding-top: 2px;">${company}</div>` : ''}
    </td>
  </tr>
  <tr>
    <td valign="top" style="border-top: 3px solid ${primaryColor}; padding-top: 15px;">
      ${contactDetailsHtml}
      ${tagsHtml}
      <div style="margin-top: 12px;">
        <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
          <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0;" />
        </a>
      </div>
      ${ctaHtml}
    </td>
  </tr>
</table>
${tipHtml}
${disclaimerHtml}
`.trim();
    }

    if (layout === 'terminal-code') {
      return `
<table cellpadding="12" cellspacing="0" border="0" style="background-color: #0f172a; border-radius: 6px; font-family: 'Courier New', Courier, monospace; color: #cbd5e1; font-size: 12px; border-collapse: collapse; text-align: left; width: 520px; max-width: 100%;">
  <tr>
    <td valign="top" style="border-bottom: 1px dashed #334155; padding-bottom: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}:~$</span> whoami<br/>
       <span style="color: #f8fafc; font-size: 15px; font-weight: bold; margin-top: 5px; display: inline-block;">${name}</span><br/>
       <span style="color: #94a3b8;">${title}</span>
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding-top: 10px;">
       <span style="color: ${accentColor}; font-weight: bold;">guest@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}:~$</span> cat contact.json<br/>
       <div style="padding-top: 5px; color: #a5b4fc;">
         {<br/>
         &nbsp;&nbsp;"phone": "${phone}",<br/>
         &nbsp;&nbsp;"email": "<a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>",<br/>
         &nbsp;&nbsp;"web": "<a href="${website}" target="_blank" style="color: #60a5fa; text-decoration: none;">${displayWebsite}</a>"<br/>
         }
       </div>
       ${showCta ? `<div style="margin-top: 10px;"><a href="${ctaUrl}" style="background-color: ${accentColor}; color: #fff; padding: 4px 8px; text-decoration: none; font-size: 11px; font-weight: bold; border-radius: 3px;">> ${ctaText}</a></div>` : ''}
    </td>
  </tr>
</table>
${tipHtml}
${disclaimerHtml}
`.trim();
    }

    if (layout === 'terminal-clean') {
      const monospaced = `"Consolas", "Menlo", "Courier New", monospace`;
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; font-size: 13px; color: ${primaryColor}; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-bottom: 12px;">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td bgcolor="#f8fafc" style="background-color: #f8fafc; border-left: 3px solid ${accentColor}; padding: 12px 20px 12px 16px;">
            <div style="font-size: 16px; font-weight: 700; color: ${primaryColor}; margin-bottom: 2px;">${name}</div>
            <div style="font-size: 12px; color: ${secondaryColor}; margin-bottom: 10px;">${title}${company ? ` &bull; ${company}` : ''}</div>
            
            <div style="font-family: ${monospaced}; font-size: 12px; color: ${primaryColor}; line-height: 1.6;">
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> tel &nbsp;&nbsp;&nbsp;&nbsp; <a href="tel:${phone}" style="color: ${primaryColor}; text-decoration: none;">${phone}</a><br/>
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> email &nbsp;&nbsp; <a href="mailto:${email}" style="color: ${primaryColor}; text-decoration: none;">${email}</a><br/>
              <span style="color: ${accentColor}; font-weight: bold;">&gt;</span> web &nbsp;&nbsp;&nbsp;&nbsp; <a href="${website}" target="_blank" style="color: ${primaryColor}; text-decoration: none;">${displayWebsite}</a>
            </div>
            
            ${showTags && (tag1 || tag2) ? `
            <div style="padding-top: 8px;">
              ${tag1 ? `<div style="font-family: ${monospaced}; font-size: 12px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${tag1}</div>` : ''}
              ${tag2 ? `<div style="font-family: ${monospaced}; font-size: 12px; color: ${primaryColor}; line-height: 1.6;"><span style="color: ${accentColor}; font-weight: bold;">&gt;</span> ${tag2}</div>` : ''}
            </div>` : ''}
            ${ctaHtml}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
${tipHtml}
${disclaimerHtml}
`.trim();
    }

    const splitBaseHtml = `
${isOutlook ? '<!--[if mso]><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="520"><tr><td width="' + (Number(logoWidth) + 30) + '" valign="top"><![endif]-->' : ''}
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; font-size: 13px; color: ${primaryColor}; line-height: 1.45; border-collapse: collapse; text-align: left;">
  <tr>
    <td valign="top" style="padding-right: 18px; border-right: 2px solid ${accentColor}; width: ${logoWidth}px;" width="${logoWidth}">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
    ${isOutlook ? '<!--[if mso]></td><td width="20" style="font-size:0px;line-height:0px;">&nbsp;</td><td width="330" valign="top"><![endif]-->' : ''}
    <td valign="top" style="padding-left: 18px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr><td style="font-size: 16px; font-weight: 700; color: ${primaryColor}; font-family: ${font}; line-height: 1.2;">${name}</td></tr>
        <tr><td style="font-size: 13px; font-weight: 500; color: ${secondaryColor}; font-family: ${font}; padding-top: 2px;">${title}${department ? ` &bull; ${department}` : ''}</td></tr>
        ${company ? `<tr><td style="font-size: 12px; font-weight: 600; color: ${accentColor}; font-family: ${font}; padding-top: 1px;">${company}</td></tr>` : ''}
      </table>
      ${contactDetailsHtml}
      ${tagsHtml}
      ${ctaHtml}
    </td>
  </tr>
</table>
${isOutlook ? '<!--[if mso]></td></tr></table><![endif]-->' : ''}
`;

    if (layout === 'banner-img') {
      return `
${splitBaseHtml}
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-collapse: collapse; width: 100%; max-width: 520px;">
  <tr>
    <td>
      <a href="${ctaUrl}" target="_blank" style="text-decoration: none;">
        <img src="${bannerImg}" alt="Promotional Banner" style="display: block; width: 100%; max-width: 520px; height: auto; border-radius: 6px; border: 0;" />
      </a>
    </td>
  </tr>
</table>
${tipHtml}
${disclaimerHtml}
`.trim();
    }
    
    if (layout === 'banner-html') {
      return `
<table width="480" cellpadding="0" cellspacing="0" border="0" style="width: 480px; max-width: 100%; font-family: ${font}; font-size: 13px; color: ${primaryColor}; border-collapse: collapse; text-align: left;">
  <tr>
    <td colspan="2">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td width="120" style="width: 120px; border-top: 4px solid ${accentColor}; font-size: 0; line-height: 0;">&nbsp;</td>
          <td style="border-top: 4px solid ${primaryColor}; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 16px 0 6px 0;">
      <a href="${website}" target="_blank" style="text-decoration: none; display: block;">
        <img src="${logoUrl}" alt="${company}" width="${logoWidth}" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; text-decoration: none;" />
      </a>
    </td>
  </tr>
  <tr>
    <td valign="top" style="padding: 10px 28px 0 0; width: 50%;">
      <div style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">${name}</div>
      <div style="font-size: 13px; color: ${secondaryColor};">${title}</div>
      ${company ? `<div style="font-size: 13px; font-weight: 600; color: ${primaryColor}; margin-top: 2px;">${company}</div>` : ''}
    </td>
    <td valign="top" style="padding: 10px 0 0 0; width: 50%;">
      ${contactDetailsHtml}
    </td>
  </tr>
  ${showTags && (tag1 || tag2) ? `<tr><td colspan="2" style="padding-top: 12px;">${tagsHtml}</td></tr>` : ''}
  ${showCta ? `<tr><td colspan="2" style="padding-top: 12px;">${ctaHtml}</td></tr>` : ''}
</table>
${tipHtml}
${disclaimerHtml}
`.trim();
    }

    return `
${splitBaseHtml}
${tipHtml}
${disclaimerHtml}
`.trim();
  };

  const currentHtml = generateHTML();

  // Show Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy Formatted Signature (Rich HTML) to Clipboard
  const handleCopyVisual = async () => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([currentHtml], { type: 'text/html' });
        const textBlob = new Blob([currentHtml], { type: 'text/plain' });
        const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
        await navigator.clipboard.write(data);
      } else {
        // Fallback for older browsers
        const el = previewRef.current;
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      setCopiedVisual(true);
      triggerToast("Formatted Signature copied! Ready to paste into Gmail or Outlook.");
      setTimeout(() => setCopiedVisual(false), 3000);
    } catch (err) {
      console.error("Copy failed", err);
      triggerToast("Copy failed. Try copying the HTML code instead.");
    }
  };

  // Copy Raw HTML Code to Clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentHtml);
    setCopiedCode(true);
    triggerToast("Raw HTML code copied to clipboard.");
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Reset form to defaults
  const handleReset = () => {
    setName("Alex Morgan");
    setTitle("Senior Security Advisor");
    setDepartment("Enterprise Risk & Compliance");
    setCompany("SafeGuardian");
    setPhone("+64 9 300 1234");
    setMobile("+64 21 123 4567");
    setShowMobile(false);
    setEmail("alex.morgan@safeguardian.co.nz");
    setWebsite("https://safeguardian.co.nz");
    setLinkedin("https://linkedin.com/company/safeguardian");
    setAddress("Auckland, New Zealand");
    setShowAddress(true);
    setPrimaryColor("#1e3a8a");
    setAccentColor("#2563eb");
    setSecondaryColor("#475569");
    setSelectedFont("Inter");
    setLogoWidth(140);
    setClientMode("gmail");
    setShowCta(true);
    setCtaText("🔒 Schedule a Security Audit");
    setCtaUrl("https://safeguardian.co.nz/book-demo");
    setLayout("split");
    setLogoUrl(LOGO_URL);
    setTag1("Autonomous Pentesting");
    setTag2("Horizon3.ai Autonomous Cybersecurity");
    setShowTags(true);
    setTip("Security tip: verify unexpected payment or login requests by phone before acting.");
    setShowTip(true);
    setShowDisclaimer(false);
    setDisclaimer("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
    setBannerImg("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");
    triggerToast("Form reset to default parameters.");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col antialiased">
      
      {/* Top Application Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 leading-none">SafeGuardian</h1>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Signature Generator
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Gmail & Outlook Compliant HTML Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              onClick={handleCopyVisual}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-sm active:scale-95"
            >
              {copiedVisual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedVisual ? "Copied!" : "Copy for Email"}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customization Controls */}
    <div className="lg:col-span-5 flex flex-col gap-6">
      
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
                <input
                  type="radio"
                  name="layout"
                  value={type.id}
                  checked={layout === type.id}
                  onChange={(e) => setLayout(e.target.value)}
                  className="accent-blue-600"
                />
              </div>
            </label>
          ))}
        </div>

        {layout === 'banner-img' && (
          <div className="pt-2 border-t border-slate-100">
            <label className="block font-medium text-slate-700 text-xs mb-1">Banner Image URL</label>
            <input
              type="text"
              value={bannerImg}
              onChange={(e) => setBannerImg(e.target.value)}
              placeholder="https://example.com/banner.png"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}
      </div>

      {/* Target Email Client Selection */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" /> Target Email Client
              </span>
              <span className="text-[11px] text-slate-400">Layout Optimization</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                  clientMode === 'gmail' 
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-900">Gmail / Web</span>
                  <input
                    type="radio"
                    name="clientMode"
                    value="gmail"
                    checked={clientMode === 'gmail'}
                    onChange={(e) => setClientMode(e.target.value)}
                    className="accent-blue-600"
                  />
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">Standard HTML table with clean inline styles</span>
              </label>

              <label 
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                  clientMode === 'outlook' 
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' 
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-900">Outlook Desktop</span>
                  <input
                    type="radio"
                    name="clientMode"
                    value="outlook"
                    checked={clientMode === 'outlook'}
                    onChange={(e) => setClientMode(e.target.value)}
                    className="accent-blue-600"
                  />
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
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. SafeGuardian"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+64 9 300 1234"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-medium text-slate-700">Mobile Phone</label>
                    <label className="inline-flex items-center gap-1 cursor-pointer text-[10px] text-blue-600">
                      <input 
                        type="checkbox" 
                        checked={showMobile} 
                        onChange={(e) => setShowMobile(e.target.checked)} 
                        className="rounded border-slate-300 text-blue-600 focus:ring-0" 
                      />
                      Show
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={!showMobile}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+64 21 123 4567"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      showMobile ? 'border-slate-300 text-slate-900 bg-white' : 'border-slate-200 text-slate-400 bg-slate-50'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Website URL</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Location / Address</label>
                  <label className="inline-flex items-center gap-1 cursor-pointer text-[10px] text-blue-600">
                    <input 
                      type="checkbox" 
                      checked={showAddress} 
                      onChange={(e) => setShowAddress(e.target.checked)} 
                      className="rounded border-slate-300 text-blue-600 focus:ring-0" 
                    />
                    Show
                  </label>
                </div>
                <input
                  type="text"
                  disabled={!showAddress}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Auckland, New Zealand"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                    showAddress ? 'border-slate-300 text-slate-900 bg-white' : 'border-slate-200 text-slate-400 bg-slate-50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Branding & Styling Customizer */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" /> Branding & Typography
            </h2>

            <div className="space-y-4 text-xs">
              
              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Primary Color (Navy)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono uppercase text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Accent Color (Blue)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono uppercase text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Font Stack Selector */}
          <div>
            <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-slate-400" /> Font Family Stack
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white"
            >
              {FONT_OPTIONS.map(font => (
                <option key={font.id} value={font.id}>{font.name}</option>
              ))}
            </select>
          </div>

          {/* Logo URL Control */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Company Logo URL</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono"
            />
          </div>

          {/* Logo Size Control */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-slate-700">Logo Size</label>
              <span className="font-mono text-blue-600 font-semibold">{logoWidth}px</span>
            </div>
            <input
              type="range"
              min="90"
              max="200"
              step="5"
              value={logoWidth}
              onChange={(e) => setLogoWidth(e.target.value)}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* CTA Button Toggle */}
          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Promotional CTA Button
              </label>
              <input
                type="checkbox"
                checked={showCta}
                onChange={(e) => setShowCta(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {showCta && (
              <div className="space-y-2 mt-2 pl-2 border-l-2 border-blue-200">
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="CTA Text"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="CTA Link URL"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
            )}
          </div>

          {/* Legal Disclaimer Toggle */}
          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> Legal Disclaimer
              </label>
              <input
                type="checkbox"
                checked={showDisclaimer}
                onChange={(e) => setShowDisclaimer(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {showDisclaimer && (
              <textarea
                value={disclaimer}
                onChange={(e) => setDisclaimer(e.target.value)}
                placeholder="Confidentiality notice..."
                rows={3}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mt-2 resize-none"
              />
            )}
          </div>

          {/* Service Tags Toggle */}
          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" /> Service Tags (Badges)
              </label>
              <input
                type="checkbox"
                checked={showTags}
                onChange={(e) => setShowTags(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {showTags && (
              <div className="space-y-2 mt-2 pl-2 border-l-2 border-blue-200">
                <input
                  type="text"
                  value={tag1}
                  onChange={(e) => setTag1(e.target.value)}
                  placeholder="Tag 1 (e.g. Autonomous Pentesting)"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={tag2}
                  onChange={(e) => setTag2(e.target.value)}
                  placeholder="Tag 2 (optional)"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            )}
          </div>

          {/* Security Tip Toggle */}
          <div className="pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-slate-800 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-500" /> Security Footer Tip
              </label>
              <input
                type="checkbox"
                checked={showTip}
                onChange={(e) => setShowTip(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {showTip && (
              <textarea
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                placeholder="Security tip message..."
                rows={2}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mt-2 resize-none"
              />
            )}
          </div>

        </div>
      </div>

    </div>

    {/* Right Column: Live Interactive Canvas & Output Panel */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Display Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Top Toolbar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
              
              {/* Tabs: Visual vs Code */}
              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'visual'
                      ? 'bg-white text-blue-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Visual Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    activeTab === 'code'
                      ? 'bg-white text-blue-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> HTML Source
                </button>
              </div>

              {/* Background Theme Tester (Light vs Dark) */}
              {activeTab === 'visual' && (
                <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setPreviewBg('light')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      previewBg === 'light' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600'
                    }`}
                    title="Light Theme Preview"
                  >
                    <Sun className="w-3.5 h-3.5 inline mr-1" /> Light
                  </button>
                  <button
                    onClick={() => setPreviewBg('dark')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      previewBg === 'dark' ? 'bg-slate-900 text-indigo-300 shadow-sm' : 'text-slate-600'
                    }`}
                    title="Dark Mode Preview"
                  >
                    <Moon className="w-3.5 h-3.5 inline mr-1" /> Dark Test
                  </button>
                </div>
              )}

            </div>

            {/* Visual Canvas Area */}
            {activeTab === 'visual' && (
              <div 
                className={`p-8 sm:p-12 transition-colors duration-200 min-h-[340px] flex flex-col justify-center items-center ${
                  previewBg === 'dark' ? 'bg-slate-950' : 'bg-slate-100/70'
                }`}
              >
                {/* Email Client Mockup Window */}
                <div className="w-full max-w-xl">
                  
                  {/* Email Header Bar */}
                  <div className={`border border-b-0 rounded-t-xl p-3 flex items-center justify-between text-xs ${
                    previewBg === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      <span className="ml-2 font-mono text-[11px]">Re: SafeGuardian Enterprise Security Audit</span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                      {clientMode === 'outlook' ? 'Outlook (MSO)' : 'Gmail Compliant'}
                    </span>
                  </div>

                  {/* Email Content Box */}
                  <div className={`p-6 sm:p-8 rounded-b-xl border shadow-lg transition-all ${
                    previewBg === 'dark' 
                      ? 'bg-slate-900 border-slate-800 text-slate-200' 
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <div className="text-xs text-slate-400 pb-4 mb-4 border-b border-slate-100/10 space-y-1">
                      <p><strong className="text-slate-400">From:</strong> {name} &lt;{email}&gt;</p>
                      <p><strong className="text-slate-400">To:</strong> client@enterprise-corp.com</p>
                    </div>

                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                      Hi David,<br /><br />
                      Thank you for reviewing the updated SafeGuardian deployment roadmap. Please review my signature details below and let me know if you need any further compliance documentations.
                      <br /><br />
                      Best regards,
                    </p>

                    {/* LIVE SIGNATURE RENDER CONTAINER */}
                    <div 
                      ref={previewRef}
                      id="signature-render-area"
                      className="py-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: currentHtml }}
                    />
                  </div>

                </div>

              </div>
            )}

            {/* Code Source Area */}
            {activeTab === 'code' && (
              <div className="p-6 bg-slate-950 flex flex-col gap-3 min-h-[340px]">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Clean HTML Table &bull; MSO Comment Compatible</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  value={currentHtml}
                  className="w-full h-80 bg-slate-900 text-blue-300 font-mono text-xs p-4 rounded-lg border border-slate-800 outline-none resize-none leading-relaxed"
                />
              </div>
            )}

            {/* Action Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>
                  {clientMode === 'outlook' 
                    ? 'Includes MSO width tables to prevent column breaks in Microsoft Outlook.'
                    : 'Standard responsive HTML table optimized for Gmail & Google Workspace.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5 text-slate-500" /> Copy Raw HTML
                </button>
                <button
                  onClick={handleCopyVisual}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  {copiedVisual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedVisual ? "Copied Formatted!" : "Copy Formatted Signature"}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Installation Guide Card */}
          <div className="bg-blue-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white pointer-events-none">
              <Shield className="w-48 h-48" />
            </div>

            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> Gmail & Outlook Installation Quick Steps
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-blue-100">
              <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-800/60 space-y-1.5">
                <strong className="text-white block font-semibold mb-1">Gmail / Google Workspace:</strong>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click <strong>Copy Formatted Signature</strong> above.</li>
                  <li>Open <strong>Gmail &rarr; Settings (⚙️) &rarr; See all settings</strong>.</li>
                  <li>Scroll to <strong>Signature</strong>, click <strong>Create new</strong>.</li>
                  <li>Paste (<kbd className="bg-blue-800 px-1 py-0.5 rounded text-[10px]">Ctrl+V</kbd> / <kbd className="bg-blue-800 px-1 py-0.5 rounded text-[10px]">Cmd+V</kbd>) into the text area and Save.</li>
                </ol>
              </div>

              <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-800/60 space-y-1.5">
                <strong className="text-white block font-semibold mb-1">Microsoft Outlook:</strong>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Select <strong>Outlook Desktop</strong> mode under Target Client.</li>
                  <li>Click <strong>Copy Formatted Signature</strong>.</li>
                  <li>Open <strong>Outlook &rarr; Options &rarr; Mail &rarr; Signatures</strong>.</li>
                  <li>Create new signature and paste directly into the editor box.</li>
                </ol>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all z-50 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
