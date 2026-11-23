import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Accordion = ({ title, icon: Icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#2a2b72]" />} {title}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {isOpen && <div className="p-6 space-y-4">{children}</div>}
    </div>
  );
};

export const TextInput = ({ label, value, onChange, placeholder, type = "text", disabled = false, fontMono = false }) => (
  <div>
    <label className="block font-medium text-slate-700 mb-1 text-xs">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder} 
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-lg text-xs focus:ring-2 focus:ring-[#2a2b72] outline-none transition-all ${
        disabled ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-900 border-slate-300'
      } ${fontMono ? 'font-mono' : ''}`} 
    />
  </div>
);

export const TextArea = ({ value, onChange, rows = 2 }) => (
  <textarea 
    value={value} 
    onChange={(e) => onChange(e.target.value)} 
    rows={rows} 
    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs mt-2 resize-none focus:ring-2 focus:ring-[#2a2b72] outline-none bg-white text-slate-900" 
  />
);

export const Toggle = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] text-[#2a2b72] font-medium hover:text-[#e85626] transition-colors">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)} 
      className="rounded border-slate-300 text-[#2a2b72] focus:ring-[#2a2b72]" 
    /> 
    Show
  </label>
);

export const ColorPicker = ({ label, value, onChange }) => (
  <div>
    <label className="block font-medium text-slate-700 mb-1 text-xs">{label}</label>
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded-lg font-mono uppercase text-[11px] bg-white text-slate-900 focus:ring-2 focus:ring-[#2a2b72] outline-none" />
    </div>
  </div>
);
