import React, { useState } from 'react';
import { Shield, RotateCcw, CheckCircle2, BookOpen } from 'lucide-react';
import { generateHTML, LOGO_URL } from './utils/signatureGenerator';
import FormControls from './components/FormControls';
import LayoutPreview from './components/LayoutPreview';
import UserGuideModal from './components/UserGuideModal';

const DEFAULT_CONFIG = {
  name: "MR. Robot",
  title: "Senior Cybersecurity Engineer",
  department: "Allsafe Cybersecurity",
  phone: "+64 9 000 1234",
  mobile: "+64 21 000 1234",
  showMobile: false,
  email: "mr.robot@securemail.io",
  website: "https://www.safeguardian.co.nz",
  address: "Central Auckland, Auckland, New Zealand",
  showAddress: true,
  company: "SafeGuardian",
  linkedin: "",
  showLinkedin: false,
  socialGithub: "",
  socialLinkedin: "",
  socialFacebook: "",
  socialInstagram: "",
  socialYoutube: "",
  socialTwitter: "",
  socialTiktok: "",
  socialPinterest: "",
  socialWhatsapp: "",
  customLink1: "",
  customIcon1: "",
  customLink2: "",
  customIcon2: "",
  tag1: "Autonomous Pentesting",
  tag2: "Horizon3.ai Autonomous Cybersecurity",
  showTags: true,
  tip: "Security tip: verify unexpected payment or login requests by phone before acting.",
  showTip: true,
  layout: 'split',
  disclaimer: "CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.",
  showDisclaimer: true,
  logoUrl: LOGO_URL,
  primaryColor: "#2a2b72",
  accentColor: "#e85626",
  secondaryColor: "#475569",
  selectedFont: "Inter",
  textSize: 13,
  logoWidth: 140,
  clientMode: "gmail",
  showCta: true,
  ctaText: "🔒 Schedule a Security Audit",
  ctaUrl: "https://safeguardian.co.nz/book-demo",
  showCta2: false,
  cta2Text: "🗓️ Schedule a Demo",
  cta2Url: "https://www.safeguardian.co.nz/demo",
  bannerType: "none",
  bannerImgUrl: "https://placehold.co/520x100/1e3a8a/ffffff?text=Secure+Your+Enterprise+Today",
  bannerLinkUrl: "",
  bannerHtmlText: "Secure Your Enterprise Today",
  bannerBgColor: "#2a2b72",
  bannerTextColor: "#ffffff"
};

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [copiedVisual, setCopiedVisual] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const currentHtml = generateHTML(config);

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
    setConfig(DEFAULT_CONFIG);
    triggerToast("Form reset to default parameters.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased relative">
      {/* Subtle Background Watermark */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 flex items-end justify-end p-8 sm:p-12 select-none">
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="w-[420px] sm:w-[560px] max-w-none opacity-[0.04] grayscale transform -rotate-6 translate-x-12 translate-y-6"
        />
      </div>

      <header className="bg-[#2a2b72] sticky top-0 z-30 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e1e52] flex items-center justify-center text-white shadow-inner">
              <Shield className="w-5 h-5 text-[#e85626]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white leading-none tracking-tight">SafeGuardian</h1>
                <span className="bg-[#e85626]/20 text-[#ff8c66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#e85626]/30">
                  Internal Tool
                </span>
              </div>
              <p className="text-xs text-[#a0a1d6] mt-0.5 font-medium">Email Signature Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white border border-[#4041a6] rounded-lg hover:bg-[#4041a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85626] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#ff8c66]" />
              <span>User Guide</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white border border-[#4041a6] rounded-lg hover:bg-[#4041a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85626] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#e85626] to-[#f4845f]"></div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-5 xl:col-span-4">
          <FormControls config={config} updateConfig={updateConfig} />
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <LayoutPreview 
            currentHtml={currentHtml} 
            clientMode={config.clientMode} 
            name={config.name} 
            email={config.email} 
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

      <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}
