
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { KEYBOARD_LAYOUT, KEY_DESCRIPTIONS } from './constants';
import { KeyInfo, KeyCategory } from './types';
import Key from './components/Key';
import KeyDetails from './components/KeyDetails';
import { getKeyTips } from './geminiService';
import { soundService } from './soundService';

const LEVELS = [
  { name: "Novizio", minScore: 0, color: "text-slate-400" },
  { name: "Apprendista", minScore: 500, color: "text-green-400" },
  { name: "Esperto", minScore: 1500, color: "text-blue-400" },
  { name: "Professionista", minScore: 3000, color: "text-purple-400" },
  { name: "Maestro", minScore: 6000, color: "text-yellow-400" },
  { name: "Leggenda del Silicio", minScore: 10000, color: "text-rose-500 font-black animate-pulse" }
];

const CHALLENGES = [
  { type: 'key', target: 'bracketL', label: 'Trova la "è" accentata' },
  { type: 'key', target: 'semicolon', label: 'Dov\'è la "ò"?' },
  { type: 'key', target: 'AltGr', label: 'Tocca il tasto Alt Grafico' },
  { type: 'shortcut', target: 'c', label: 'Esegui COPIA (Ctrl+C)' },
  { type: 'shortcut', target: 'z', label: 'Esegui ANNULLA (Ctrl+Z)' },
  { type: 'key', target: 'ù', label: 'Trova la "ù" per scrivere città' },
  { type: 'key', target: 'PrtSc', label: 'Fai uno screenshot (Stamp)' },
];

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<KeyInfo | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [tips, setTips] = useState<string>("");
  const [isLoadingTips, setIsLoadingTips] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [feedback, setFeedback] = useState<{msg: string, color: string} | null>(null);
  
  const comboTimeoutRef = useRef<number | null>(null);

  const currentChallenge = CHALLENGES[currentChallengeIdx];
  const currentLevel = [...LEVELS].reverse().find(l => score >= l.minScore) || LEVELS[0];

  const triggerFeedback = (msg: string, color: string = "text-blue-400") => {
    setFeedback({ msg, color });
    setTimeout(() => setFeedback(null), 1500);
  };

  const nextChallenge = () => {
    setCurrentChallengeIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  const handleKeyAction = useCallback((keyInfo: KeyInfo, isCtrl: boolean) => {
    // Sound
    if (keyInfo.category === KeyCategory.SPACE) soundService.playKeySound('space');
    else if (keyInfo.category === KeyCategory.MODIFIER) soundService.playKeySound('modifier');
    else soundService.playKeySound('standard');

    // Score & Combo Logic
    setScore(s => s + (10 * (combo + 1)));
    setCombo(c => c + 1);
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = window.setTimeout(() => setCombo(0), 2000);

    // Challenge Logic
    if (currentChallenge.type === 'key' && keyInfo.id === currentChallenge.target) {
      setScore(s => s + 200);
      triggerFeedback("+200 SFIDA COMPLETATA!", "text-green-400");
      nextChallenge();
    } else if (currentChallenge.type === 'shortcut' && isCtrl && keyInfo.id === currentChallenge.target) {
      setScore(s => s + 500);
      triggerFeedback("+500 SUPER COMBO!", "text-yellow-400");
      nextChallenge();
    }

    // Typing Simulation
    if (keyInfo.label && keyInfo.label.length === 1 && keyInfo.category === KeyCategory.ALPHANUMERIC) {
      setTypedText(prev => (prev + keyInfo.label).slice(-50));
    } else if (keyInfo.id === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1));
    } else if (keyInfo.id === 'Space') {
      setTypedText(prev => (prev + " ").slice(-50));
    }
  }, [currentChallenge, combo]);

  const handleKeyClick = useCallback(async (keyInfo: KeyInfo) => {
    if (keyInfo.spacer) return;
    setSelectedKey(keyInfo);
    setIsLoadingTips(true);
    const result = await getKeyTips(keyInfo.label || keyInfo.id);
    setTips(result);
    setIsLoadingTips(false);
    // Punti bonus per la curiosità
    setScore(s => s + 50);
  }, []);

  const handlePress = useCallback((keyInfo: KeyInfo, isCtrl: boolean = false) => {
    setPressedKeys(prev => new Set(prev).add(keyInfo.id));
    handleKeyAction(keyInfo, isCtrl);
  }, [handleKeyAction]);

  const handleRelease = useCallback((id: string) => {
    setPressedKeys(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyStr = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      let foundKey: KeyInfo | null = null;
      for (const row of KEYBOARD_LAYOUT) {
        for (const k of row.keys) {
          if (k.label.toUpperCase() === keyStr || k.id === e.key || (e.key === ' ' && k.id === 'Space')) {
            foundKey = k;
            break;
          }
        }
      }
      if (foundKey && !pressedKeys.has(foundKey.id)) {
        handlePress(foundKey, e.ctrlKey);
        handleKeyClick(foundKey);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      for (const row of KEYBOARD_LAYOUT) {
        for (const k of row.keys) {
          if (k.id === e.key || (e.key === ' ' && k.id === 'Space')) {
             handleRelease(k.id);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlePress, handleRelease, handleKeyClick, pressedKeys]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-yellow-500/30">
      {/* Game HUD */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Punteggio</span>
               <span className="text-3xl font-black text-yellow-400 tabular-nums drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                 {score.toLocaleString()}
               </span>
             </div>
             <div className="h-10 w-[1px] bg-slate-800"></div>
             <div className="flex flex-col">
               <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Grado</span>
               <span className={`text-xl font-bold ${currentLevel.color}`}>{currentLevel.name}</span>
             </div>
          </div>

          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-3">
              {combo > 1 && (
                <span className="bg-orange-500 text-white text-xs font-black px-2 py-1 rounded italic animate-bounce shadow-lg shadow-orange-500/40">
                  COMBO X{combo}
                </span>
              )}
              <div className="bg-slate-950 px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-tighter text-slate-300">Live Mission: {currentChallenge.label}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              KEYBOARD MASTER
            </h1>
            <p className="text-slate-500 font-medium">Diventa il re del layout italiano!</p>
          </div>
          {feedback && (
            <div className={`text-2xl font-black animate-in slide-in-from-bottom duration-300 ${feedback.color}`}>
              {feedback.msg}
            </div>
          )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Keyboard Game Board */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl overflow-x-auto">
                <div className="flex flex-col gap-2 min-w-[850px]">
                  {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center lg:justify-start">
                      {row.keys.map((keyInfo) => (
                        <Key 
                          key={keyInfo.id} 
                          keyInfo={keyInfo} 
                          isSelected={selectedKey?.id === keyInfo.id}
                          isPressed={pressedKeys.has(keyInfo.id)}
                          onPress={(k) => handlePress(k)}
                          onRelease={handleRelease}
                          onClick={handleKeyClick}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal / Typed Output */}
            <div className="bg-black border-2 border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden group">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="text-[10px] font-mono text-slate-600 uppercase ml-4">Output System v2.0</span>
              </div>
              <div className="min-h-[100px] font-mono text-2xl text-green-400/80 break-all whitespace-pre-wrap">
                {typedText || <span className="text-slate-800 italic">In attesa di input...</span>}
                <span className="inline-block w-3 h-8 bg-green-500/40 animate-pulse ml-2 align-middle"></span>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <KeyDetails 
              selectedKey={selectedKey} 
              description={selectedKey ? KEY_DESCRIPTIONS[selectedKey.id] || null : null}
              tips={tips}
              isLoadingTips={isLoadingTips}
            />

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                Classifica Virtuale
              </h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Tu (User)</span>
                    <span className="font-bold text-yellow-500 tabular-nums">{score}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/50 opacity-50">
                    <span className="text-slate-500">Maestro ISO</span>
                    <span className="font-bold tabular-nums">12,500</span>
                 </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
      
      <footer className="py-12 border-t border-slate-900 text-center opacity-30 text-xs">
        IL MAESTRO DELLA TASTIERA © 2024 - AI POWERED CHALLENGE
      </footer>
    </div>
  );
};

export default App;
