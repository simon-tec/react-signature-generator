import React, { useState } from 'react';
import { Shield, RotateCcw, Copy, Check, CheckCircle2 } from 'lucide-react';
import { generateHTML, LOGO_URL } from './utils/signatureGenerator';
import FormControls from './components/FormControls';
import LayoutPreview from './components/LayoutPreview';

export default function App() {
  const [name, setName] = useState("MR. Robot");
  const [title, setTitle] = useState("Senior Cybersecurity Engineer");
  const [department, setDepartment] = useState("Allsafe Cybersecurity");
  const [phone, setPhone] = useState("+64 9 000 1234");
  const [mobile, setMobile] = useState("+64 21 000 1234");
  const [showMobile, setShowMobile] = useState(false);
  const [email, setEmail] = useState("mr.robot@securemail.io");
  const [website, setWebsite] = useState("https://www.safeguardian.co.nz");
  const [address, setAddress] = useState("Central Auckland, Auckland, New Zealand");
  const [showAddress, setShowAddress] = useState(true);
  const [company, setCompany] = useState("SafeGuardian");
  const [linkedin, setLinkedin] = useState("https://nz.linkedin.com/in/mr-robot");
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [tag1, setTag1] = useState("Autonomous Pentesting");
  const [tag2, setTag2] = useState("Horizon3.ai Autonomous Cybersecurity");
  const [showTags, setShowTags] = useState(true);
  const [tip, setTip] = useState("Security tip: verify unexpected payment or login requests by phone before acting.");
  const [showTip, setShowTip] = useState(true);
  const [layout, setLayout] = useState('split');
  const [disclaimer, setDisclaimer] = useState("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
  
  // Set legal disclaimer to true by default
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const [bannerImg, setBannerImg] = useState("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);
  
  const [primaryColor, setPrimaryColor] = useState("#2a2b72"); 
  const [accentColor, setAccentColor] = useState("#e85626");   
  const [secondaryColor, setSecondaryColor] = useState("#475569"); 

  const [selectedFont, setSelectedFont] = useState("Inter");
  const [textSize, setTextSize] = useState(13);
  const [logoWidth, setLogoWidth] = useState(140);
  const [clientMode, setClientMode] = useState("gmail");
  
  const [showCta, setShowCta] = useState(true);
  const [ctaText, setCtaText] = useState("🔒 Schedule a Security Audit");
  const [ctaUrl, setCtaUrl] = useState("https://safeguardian.co.nz/book-demo");
  
  // New Secondary CTA State
  const [showCta2, setShowCta2] = useState(false);
  const [cta2Text, setCta2Text] = useState("🗓️ Schedule a Demo");
  const [cta2Url, setCta2Url] = useState("https://www.safeguardian.co.nz/demo");

  const [copiedVisual, setCopiedVisual] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const formData = {
    name, setName, title, setTitle, department, setDepartment, phone, setPhone, mobile, setMobile,
    showMobile, setShowMobile, email, setEmail, website, setWebsite, address, setAddress, showAddress, setShowAddress,
    company, setCompany, linkedin, setLinkedin, showLinkedin, setShowLinkedin, tag1, setTag1, tag2, setTag2, showTags, setShowTags,
    tip, setTip, showTip, setShowTip, layout, setLayout, disclaimer, setDisclaimer, showDisclaimer, setShowDisclaimer,
    bannerImg, setBannerImg, logoUrl, setLogoUrl, primaryColor, setPrimaryColor, accentColor, setAccentColor,
    secondaryColor, setSecondaryColor, selectedFont, setSelectedFont, textSize, setTextSize, logoWidth, setLogoWidth, clientMode, setClientMode,
    showCta, setShowCta, ctaText, setCtaText, ctaUrl, setCtaUrl, showCta2, setShowCta2, cta2Text, setCta2Text, cta2Url, setCta2Url
  };

  const currentHtml = generateHTML(formData);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyVisual = async (previewRef) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([currentHtml], { type: 'text/html' });
        const textBlob = new Blob([currentHtml], { type: 'text/plain' });
        const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
        await navigator.clipboard.write(data);
      } else {
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
      triggerToast("Copy failed. Try copying the HTML code instead.");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentHtml);
    setCopiedCode(true);
    triggerToast("Raw HTML code copied to clipboard.");
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleReset = () => {
    setName("MR. Robot"); setTitle("Senior Cybersecurity Engineer"); setDepartment("Allsafe Cybersecurity");
    setCompany("SafeGuardian"); setPhone("+64 9 000 1234"); setMobile("+64 21 000 1234"); setShowMobile(false);
    setEmail("mr.robot@securemail.io"); setWebsite("https://www.safeguardian.co.nz"); setLinkedin("https://nz.linkedin.com/in/mr-robot"); setShowLinkedin(false);
    setAddress("Central Auckland, Auckland, New Zealand"); setShowAddress(true); setPrimaryColor("#2a2b72"); setAccentColor("#e85626"); setSecondaryColor("#475569");
    setSelectedFont("Inter"); setTextSize(13); setLogoWidth(140); setClientMode("gmail"); 
    setShowCta(true); setCtaText("🔒 Schedule a Security Audit"); setCtaUrl("https://safeguardian.co.nz/book-demo"); 
    setShowCta2(false); setCta2Text("🗓️ Schedule a Demo"); setCta2Url("https://www.safeguardian.co.nz/demo");
    setLayout("split"); setLogoUrl(LOGO_URL); setTag1("Autonomous Pentesting");
    setTag2("Horizon3.ai Autonomous Cybersecurity"); setShowTags(true); setTip("Security tip: verify unexpected payment or login requests by phone before acting.");
    setShowTip(true); setShowDisclaimer(true); setDisclaimer("CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.");
    setBannerImg("https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today");
    triggerToast("Form reset to default parameters.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* Brand Header */}
      <header className="bg-[#2a2b72] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e1e52] flex items-center justify-center text-white shadow-inner">
              <Shield className="w-5 h-5 text-[#e85626]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white leading-none tracking-tight">SafeGuardian</h1>
                <span className="bg-[#e85626]/20 text-[#ff8c66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#e85626]/30">
                  Signature Generator
                </span>
              </div>
              <p className="text-xs text-[#a0a1d6] mt-0.5 font-medium">Enterprise Email Setup Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white hover:text-white border border-[#4041a6] rounded-lg hover:bg-[#4041a6] transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
        {/* Diagonal styling element from SafeGuardian brand */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e85626] to-[#f4845f]"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-5">
          <FormControls data={formData} />
        </div>
        <div className="lg:col-span-7">
          <LayoutPreview 
            currentHtml={currentHtml} 
            clientMode={clientMode} 
            name={name} 
            email={email} 
            handleCopyVisual={handleCopyVisual} 
            handleCopyCode={handleCopyCode} 
            copiedVisual={copiedVisual} 
            copiedCode={copiedCode} 
            triggerToast={triggerToast} 
          />
        </div>
      </main>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all z-50 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
