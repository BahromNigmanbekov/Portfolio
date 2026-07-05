import { useState } from 'react';
import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi';

export default function ContactCard({ icon: Icon, name, handle, link, copyValue, bgFrom, bgTo }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Nusxalashda xatolik:', err);
    }
  };

  return (
    <div className="group relative w-full max-w-[300px] mx-auto rounded-[28px] bg-white border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 ease-out overflow-hidden">
      {/* Yuqori nozik chiziq — hoverda brend rangida yonadi */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${bgFrom}, ${bgTo})` }}
      />

      <div className="p-7">
        <div className="flex items-center justify-between mb-7">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
            {name}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: bgFrom }}
          />
        </div>

        <div className="flex items-center gap-3.5 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-inner shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
            style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
          >
            <Icon />
          </div>
          <div className="min-w-0">
            <p className="text-neutral-900 font-bold truncate tracking-tight">{handle}</p>
            <p className="text-[13px] text-neutral-400 truncate">Tap to connect</p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-900 text-white text-sm font-semibold rounded-2xl py-3 hover:bg-orange-600 transition-colors duration-300"
          >
            Open
            <FiArrowUpRight className="text-base" />
          </a>
          <button
            onClick={handleCopy}
            className="w-12 flex items-center justify-center rounded-2xl border border-neutral-200 text-neutral-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-300"
            aria-label="Nusxalash"
          >
            {copied ? <FiCheck className="text-lg" /> : <FiCopy className="text-lg" />}
          </button>
        </div>
      </div>
    </div>
  );
}