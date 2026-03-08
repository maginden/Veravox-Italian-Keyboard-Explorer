
import React from 'react';
import { KeyInfo, KeyDescription } from '../types';

interface KeyDetailsProps {
  selectedKey: KeyInfo | null;
  description: KeyDescription | null;
  tips: string;
  isLoadingTips: boolean;
}

const KeyDetails: React.FC<KeyDetailsProps> = ({ selectedKey, description, tips, isLoadingTips }) => {
  if (!selectedKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-slate-600 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-[2rem]">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-center font-bold uppercase tracking-widest text-xs opacity-50">Seleziona un tasto per caricare il database</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300 relative overflow-hidden">
      {/* Badge decorativo */}
      <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded border border-yellow-500/20 uppercase">
        Unlocked
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border-b-4 border-indigo-900 shadow-xl text-3xl font-black">
          {selectedKey.label || '...'}
        </div>
        <div>
          <h2 className="text-2xl font-black text-white leading-tight">{description?.title || `Tasto ${selectedKey.label}`}</h2>
          <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
            Cat: {selectedKey.category}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-3">
             <div className="h-4 w-1 bg-blue-500 rounded-full"></div>
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Archivio Storico</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            {description?.text || "Un componente fondamentale del layout ISO-IT per la digitazione standard."}
          </p>
        </section>

        <section className="bg-black/40 p-5 rounded-2xl border border-white/5 relative">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-4 w-1 bg-orange-500 rounded-full"></div>
             <h3 className="text-xs font-black uppercase tracking-widest text-orange-400">Database IA Gemini</h3>
          </div>
          <div className="text-slate-400 text-sm italic min-h-[80px]">
            {isLoadingTips ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-4">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-black uppercase opacity-50 tracking-tighter">Decrittazione in corso...</span>
              </div>
            ) : (
              <p className="whitespace-pre-line leading-relaxed">{tips}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KeyDetails;
