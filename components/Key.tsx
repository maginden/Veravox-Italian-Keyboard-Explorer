
import React from 'react';
import { KeyInfo, KeyCategory } from '../types';

interface KeyProps {
  keyInfo: KeyInfo;
  isSelected: boolean;
  isPressed: boolean;
  onPress: (info: KeyInfo) => void;
  onRelease: (id: string) => void;
  onClick: (info: KeyInfo) => void;
}

const Key: React.FC<KeyProps> = ({ keyInfo, isSelected, isPressed, onPress, onRelease, onClick }) => {
  if (keyInfo.spacer) {
    return <div className={`${keyInfo.width || 'w-10'} h-12 invisible`} />;
  }

  const getBaseColor = () => {
    if (isSelected) return 'bg-blue-600 text-white border-blue-800 shadow-blue-900/20';
    if (keyInfo.customColor) return keyInfo.customColor;
    
    switch (keyInfo.category) {
      case KeyCategory.FUNCTION: return 'bg-slate-800 text-slate-300 border-slate-700';
      case KeyCategory.MODIFIER: return 'bg-slate-700 text-slate-200 border-slate-600';
      case KeyCategory.ACTION: return 'bg-slate-700 text-slate-200 border-slate-600';
      case KeyCategory.NAVIGATION: return 'bg-slate-800 text-slate-300 border-slate-700';
      case KeyCategory.SPACE: return 'bg-slate-700 border-slate-600';
      default: return 'bg-slate-900 text-slate-100 border-slate-800 hover:bg-slate-800';
    }
  };

  return (
    <button
      onMouseDown={() => onPress(keyInfo)}
      onMouseUp={() => onRelease(keyInfo.id)}
      onMouseLeave={() => onRelease(keyInfo.id)}
      onClick={() => onClick(keyInfo)}
      className={`
        ${keyInfo.width || 'w-12'} 
        h-12 
        relative 
        flex 
        items-center 
        justify-center 
        rounded-md 
        border-b-4 
        text-xs 
        font-semibold 
        key-3d 
        ${getBaseColor()}
        ${isPressed ? 'key-3d-pressed' : ''}
        ${isSelected ? 'key-selected' : ''}
        select-none
        cursor-pointer
      `}
    >
      <div className="flex flex-col items-center justify-between h-full py-1 pointer-events-none">
        {keyInfo.shiftLabel && (
          <span className="text-[10px] opacity-70 absolute top-1 left-2">{keyInfo.shiftLabel}</span>
        )}
        <span className={`${keyInfo.shiftLabel ? 'mt-2' : ''}`}>{keyInfo.label}</span>
        {keyInfo.altGrLabel && (
          <span className="text-[10px] text-orange-400 absolute bottom-1 right-2">{keyInfo.altGrLabel}</span>
        )}
      </div>
    </button>
  );
};

export default Key;
