import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Accordion = ({ title, icon: Icon, badge, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-3.5 transition-shadow hover:shadow">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2a2b72]/40 transition-colors border-b border-slate-100"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#2a2b72]" />} {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#2a2b72]/10 text-[#2a2b72]">
              {badge}
            </span>
          )}
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      {isOpen && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
};

export const TextInput = ({ label, value, onChange, placeholder, type = "text", disabled = false, fontMono = false }) => (
  <div>
    {label && <label className="block font-medium text-slate-700 mb-1 text-xs">{label}</label>}
    <input 
      type={type} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder} 
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-lg text-xs transition-all outline-none
        bg-white text-slate-900 border-slate-300
        hover:border-[#2a2b72]/60 hover:bg-slate-50/40
        focus-visible:border-[#2a2b72] focus-visible:ring-2 focus-visible:ring-[#2a2b72]/20 focus-visible:bg-white
        placeholder:text-slate-400 placeholder:italic placeholder-shown:bg-slate-50/50
        disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed disabled:hover:border-slate-200
        ${fontMono ? 'font-mono' : ''}`} 
    />
  </div>
);

export const TextArea = ({ value, onChange, placeholder, rows = 2, disabled = false }) => (
  <textarea 
    value={value} 
    onChange={(e) => onChange(e.target.value)} 
    placeholder={placeholder}
    disabled={disabled}
    rows={rows} 
    className="w-full px-3 py-2 border rounded-lg text-xs mt-2 resize-none transition-all outline-none
      bg-white text-slate-900 border-slate-300
      hover:border-[#2a2b72]/60 hover:bg-slate-50/40
      focus-visible:border-[#2a2b72] focus-visible:ring-2 focus-visible:ring-[#2a2b72]/20 focus-visible:bg-white
      placeholder:text-slate-400 placeholder:italic placeholder-shown:bg-slate-50/50
      disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed" 
  />
);

export const Toggle = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2b72] focus-visible:ring-offset-1
      disabled:opacity-50 disabled:cursor-not-allowed ${
      checked ? 'bg-[#2a2b72] hover:bg-[#1e1e52]' : 'bg-slate-200 hover:bg-slate-300'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </button>
);

export const ColorPicker = ({ label, value, onChange }) => (
  <div>
    <label className="block font-medium text-slate-700 mb-1 text-xs">{label}</label>
    <div className="flex items-center gap-2">
      <input 
        type="color" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white hover:border-[#2a2b72]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2b72]/20" 
      />
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder="#000000"
        className="w-full px-2 py-1.5 border rounded-lg font-mono uppercase text-[11px] transition-all outline-none
          bg-white text-slate-900 border-slate-300
          hover:border-[#2a2b72]/60 hover:bg-slate-50/40
          focus-visible:border-[#2a2b72] focus-visible:ring-2 focus-visible:ring-[#2a2b72]/20
          placeholder:text-slate-400 placeholder-shown:bg-slate-50/50" 
      />
    </div>
  </div>
);
