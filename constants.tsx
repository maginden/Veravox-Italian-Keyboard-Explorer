
import React from 'react';
import { KeyCategory, KeyboardRow, KeyInfo } from './types';

export const KEY_DESCRIPTIONS: Record<string, { title: string; text: string }> = {
  'Esc': { title: 'Escape (Esc)', text: 'Annulla l\'azione corrente o esce da menu e modalità a schermo intero.' },
  'f1': { title: 'F1', text: 'Apre la "Guida" o l\'aiuto in linea del programma.' },
  'f2': { title: 'F2', text: 'Rinomina rapidamente un file o una cartella selezionata.' },
  'f3': { title: 'F3', text: 'Attiva la funzione di ricerca nel programma corrente.' },
  'f4': { title: 'F4', text: 'Chiude la finestra attiva (Alt+F4) o blocca riferimenti in Excel.' },
  'f5': { title: 'F5', text: 'Aggiorna (refresh) la pagina o la cartella corrente.' },
  'f6': { title: 'F6', text: 'Sposta il cursore nella barra degli indirizzi del browser.' },
  'f7': { title: 'F7', text: 'Controllo ortografico e grammaticale nei documenti.' },
  'f8': { title: 'F8', text: 'Accede al menu di avvio di Windows durante l\'accensione.' },
  'f9': { title: 'F9', text: 'Invia/Riceve email o aggiorna campi in Word.' },
  'f10': { title: 'F10', text: 'Attiva la barra dei menu.' },
  'f11': { title: 'F11', text: 'Attiva/Disattiva la modalità a schermo intero.' },
  'f12': { title: 'F12', text: 'Apre "Salva con nome" o gli strumenti sviluppatore.' },
  'PrtSc': { title: 'Stamp (Print Screen)', text: 'Cattura uno screenshot di tutto lo schermo.' },
  'Scroll': { title: 'Bloc Scorr (Scroll Lock)', text: 'Serve a far scorrere l\'intero foglio (es. Excel) usando le frecce.' },
  'Pause': { title: 'Pausa (Pause/Break)', text: 'Sospende l\'operazione in corso o mette in pausa alcuni processi.' },
  'Tab': { title: 'Tabulazione (Tab)', text: 'Sposta il cursore al prossimo campo o inserisce un rientro.' },
  'Caps Lock': { title: 'Bloc Maiusc', text: 'Attiva la scrittura permanente in maiuscolo.' },
  'Shift': { title: 'Maiusc (Shift)', text: 'Usa questo tasto insieme a un altro per scrivere maiuscole o i simboli in alto a sinistra del tasto.' },
  'Shift-Right': { title: 'Maiusc (Shift)', text: 'Usa questo tasto insieme a un altro per scrivere maiuscole o i simboli in alto a sinistra del tasto.' },
  'Ctrl': { title: 'Control (Ctrl)', text: 'Tasto per scorciatoie. Tenendo premuto Ctrl e cliccando altri tasti si eseguono comandi rapidi.' },
  'Ctrl-Right': { title: 'Control (Ctrl)', text: 'Tasto per scorciatoie.' },
  'Alt': { title: 'Alternativa (Alt)', text: 'Accede ai menu delle finestre o cambia finestra (Alt+Tab).' },
  'AltGr': { title: 'Alt Graph (AltGr)', text: 'Tenendolo premuto puoi scrivere i simboli in basso a destra del tasto, come @, #, [ o ].' },
  'Enter': { title: 'Invio (Enter)', text: 'Conferma comandi o inizia una nuova riga.' },
  'Backspace': { title: 'Backspace', text: 'Cancella il carattere a sinistra del cursore.' },
  'Delete': { title: 'Canc (Delete)', text: 'Cancella il carattere a destra o l\'elemento selezionato.' },
  'Space': { title: 'Barra Spaziatrice', text: 'Inserisce uno spazio tra le parole.' },
  'Win': { title: 'Tasto Windows', text: 'Apre il menu Start.' },
  'Fn': { title: 'Function (Fn)', text: 'Attiva funzioni speciali sui laptop.' },
  'Home': { title: 'Inizio (Home)', text: 'Sposta il cursore all\'inizio della riga corrente o in cima a un documento.' },
  'End': { title: 'Fine (End)', text: 'Sposta il cursore alla fine della riga corrente o in fondo a un documento.' },
  'PageUp': { title: 'Pagina Su (PgUp)', text: 'Scorre il contenuto verso l\'alto di una intera schermata.' },
  'PageDown': { title: 'Pagina Giù (PgDn)', text: 'Scorre il contenuto verso il basso di una intera schermata.' },
  'Insert': { title: 'Ins (Insert)', text: 'Passa tra modalità inserimento e sovrascrittura del testo.' },
  'ArrowUp': { title: 'Freccia Su', text: 'Sposta il cursore o la selezione verso l\'alto di una riga.' },
  'ArrowDown': { title: 'Freccia Giù', text: 'Sposta il cursore o la selezione verso il basso di una riga.' },
  'ArrowLeft': { title: 'Freccia Sinistra', text: 'Sposta il cursore o la selezione verso sinistra di un carattere.' },
  'ArrowRight': { title: 'Freccia Destra', text: 'Sposta il cursore o la selezione verso destra di un carattere.' }
};

const GAP = (width: string = 'w-10'): KeyInfo => ({ id: `gap-${Math.random()}`, label: '', category: KeyCategory.ALPHANUMERIC, spacer: true, width });

const F_STRIPED = 'bg-striped-purple';
const COLOR_BACKSPACE = 'bg-rose-500 text-white border-rose-700';
const COLOR_ENTER = 'bg-teal-500 text-white border-teal-700';

export const KEYBOARD_LAYOUT: KeyboardRow[] = [
  {
    keys: [
      { id: 'Esc', label: 'Esc', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'f1', label: 'F1', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f2', label: 'F2', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f3', label: 'F3', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f4', label: 'F4', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f5', label: 'F5', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f6', label: 'F6', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f7', label: 'F7', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f8', label: 'F8', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f9', label: 'F9', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f10', label: 'F10', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f11', label: 'F11', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      { id: 'f12', label: 'F12', category: KeyCategory.FUNCTION, customColor: F_STRIPED },
      GAP(),
      { id: 'PrtSc', label: 'Stamp', category: KeyCategory.ACTION, width: 'w-12' },
      { id: 'Scroll', label: 'BlocS', category: KeyCategory.ACTION, width: 'w-12' },
      { id: 'Pause', label: 'Pausa', category: KeyCategory.ACTION, width: 'w-12' },
    ]
  },
  {
    keys: [
      { id: 'tilde', label: '\\', shiftLabel: '|', category: KeyCategory.ALPHANUMERIC },
      { id: '1', label: '1', shiftLabel: '!', category: KeyCategory.ALPHANUMERIC },
      { id: '2', label: '2', shiftLabel: '"', category: KeyCategory.ALPHANUMERIC },
      { id: '3', label: '3', shiftLabel: '£', category: KeyCategory.ALPHANUMERIC },
      { id: '4', label: '4', shiftLabel: '$', category: KeyCategory.ALPHANUMERIC },
      { id: '5', label: '5', shiftLabel: '%', category: KeyCategory.ALPHANUMERIC },
      { id: '6', label: '6', shiftLabel: '&', category: KeyCategory.ALPHANUMERIC },
      { id: '7', label: '7', shiftLabel: '/', category: KeyCategory.ALPHANUMERIC },
      { id: '8', label: '8', shiftLabel: '(', category: KeyCategory.ALPHANUMERIC },
      { id: '9', label: '9', shiftLabel: ')', category: KeyCategory.ALPHANUMERIC },
      { id: '0', label: '0', shiftLabel: '=', category: KeyCategory.ALPHANUMERIC },
      { id: 'minus', label: '\'', shiftLabel: '?', category: KeyCategory.ALPHANUMERIC },
      { id: 'equal', label: 'ì', shiftLabel: '^', category: KeyCategory.ALPHANUMERIC },
      { id: 'Backspace', label: '⟵', category: KeyCategory.ACTION, width: 'w-24', customColor: COLOR_BACKSPACE },
      GAP(),
      { id: 'Insert', label: 'Ins', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'Home', label: 'Inizio', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'PageUp', label: 'PgUp', category: KeyCategory.NAVIGATION, width: 'w-12' },
    ]
  },
  {
    keys: [
      { id: 'Tab', label: 'Tab ↹', category: KeyCategory.ACTION, width: 'w-20', customColor: 'bg-yellow-400 text-black border-yellow-600' },
      { id: 'q', label: 'Q', category: KeyCategory.ALPHANUMERIC },
      { id: 'w', label: 'W', category: KeyCategory.ALPHANUMERIC },
      { id: 'e', label: 'E', category: KeyCategory.ALPHANUMERIC },
      { id: 'r', label: 'R', category: KeyCategory.ALPHANUMERIC },
      { id: 't', label: 'T', category: KeyCategory.ALPHANUMERIC },
      { id: 'y', label: 'Y', category: KeyCategory.ALPHANUMERIC },
      { id: 'u', label: 'U', category: KeyCategory.ALPHANUMERIC },
      { id: 'i', label: 'I', category: KeyCategory.ALPHANUMERIC },
      { id: 'o', label: 'O', category: KeyCategory.ALPHANUMERIC },
      { id: 'p', label: 'P', category: KeyCategory.ALPHANUMERIC },
      { id: 'bracketL', label: 'è', shiftLabel: 'é', altGrLabel: '[', category: KeyCategory.ALPHANUMERIC },
      { id: 'bracketR', label: '+', shiftLabel: '*', altGrLabel: ']', category: KeyCategory.ALPHANUMERIC },
      GAP('w-14'), // Removed Enter-Upper duplicate, replaced with gap for alignment
      GAP(),
      { id: 'Delete', label: 'Canc', category: KeyCategory.ACTION, width: 'w-12' },
      { id: 'End', label: 'Fine', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'PageDown', label: 'PgDn', category: KeyCategory.NAVIGATION, width: 'w-12' },
    ]
  },
  {
    keys: [
      { id: 'Caps Lock', label: 'Bloc Maiusc', category: KeyCategory.MODIFIER, width: 'w-24', customColor: 'bg-purple-600 text-white border-purple-800' },
      { id: 'a', label: 'A', category: KeyCategory.ALPHANUMERIC },
      { id: 's', label: 'S', category: KeyCategory.ALPHANUMERIC },
      { id: 'd', label: 'D', category: KeyCategory.ALPHANUMERIC },
      { id: 'f', label: 'F', category: KeyCategory.ALPHANUMERIC },
      { id: 'g', label: 'G', category: KeyCategory.ALPHANUMERIC },
      { id: 'h', label: 'H', category: KeyCategory.ALPHANUMERIC },
      { id: 'j', label: 'J', category: KeyCategory.ALPHANUMERIC },
      { id: 'k', label: 'K', category: KeyCategory.ALPHANUMERIC },
      { id: 'l', label: 'L', category: KeyCategory.ALPHANUMERIC },
      { id: 'semicolon', label: 'ò', shiftLabel: 'ç', altGrLabel: '@', category: KeyCategory.ALPHANUMERIC },
      { id: 'quote', label: 'à', shiftLabel: '°', altGrLabel: '#', category: KeyCategory.ALPHANUMERIC },
      { id: 'ù', label: 'ù', shiftLabel: '§', category: KeyCategory.ALPHANUMERIC },
      { id: 'Enter', label: 'Invio', category: KeyCategory.ACTION, width: 'w-14', customColor: COLOR_ENTER },
      GAP('w-[48px]'),
      GAP('w-12'),
      { id: 'ArrowUp', label: '▲', category: KeyCategory.NAVIGATION, width: 'w-12' },
      GAP('w-12'),
    ]
  },
  {
    keys: [
      { id: 'Shift', label: '⇧ Shift', category: KeyCategory.MODIFIER, width: 'w-28', customColor: 'bg-green-500 text-white border-green-700' },
      { id: 'less', label: '<', shiftLabel: '>', category: KeyCategory.ALPHANUMERIC },
      { id: 'z', label: 'Z', category: KeyCategory.ALPHANUMERIC },
      { id: 'x', label: 'X', category: KeyCategory.ALPHANUMERIC },
      { id: 'c', label: 'C', category: KeyCategory.ALPHANUMERIC },
      { id: 'v', label: 'V', category: KeyCategory.ALPHANUMERIC },
      { id: 'b', label: 'B', category: KeyCategory.ALPHANUMERIC },
      { id: 'n', label: 'N', category: KeyCategory.ALPHANUMERIC },
      { id: 'm', label: 'M', category: KeyCategory.ALPHANUMERIC },
      { id: 'comma', label: ',', shiftLabel: ';', category: KeyCategory.ALPHANUMERIC },
      { id: 'period', label: '.', shiftLabel: ':', category: KeyCategory.ALPHANUMERIC },
      { id: 'slash', label: '-', shiftLabel: '_', category: KeyCategory.ALPHANUMERIC },
      { id: 'Shift-Right', label: '⇧ Shift', category: KeyCategory.MODIFIER, width: 'w-32', customColor: 'bg-green-500 text-white border-green-700' },
      GAP(),
      { id: 'ArrowLeft', label: '◀', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'ArrowDown', label: '▼', category: KeyCategory.NAVIGATION, width: 'w-12' },
      { id: 'ArrowRight', label: '▶', category: KeyCategory.NAVIGATION, width: 'w-12' },
    ]
  },
  {
    keys: [
      { id: 'Ctrl', label: 'Ctrl', category: KeyCategory.MODIFIER, width: 'w-16', customColor: 'bg-blue-600 text-white border-blue-800' },
      { id: 'Win', label: 'Win', category: KeyCategory.MODIFIER, width: 'w-16', customColor: 'bg-white text-black border-gray-400' },
      { id: 'Alt', label: 'Alt', category: KeyCategory.MODIFIER, width: 'w-16', customColor: 'bg-red-600 text-white border-red-800' },
      { id: 'Space', label: '', category: KeyCategory.SPACE, width: 'w-80 flex-grow' },
      { id: 'AltGr', label: 'AltGr', category: KeyCategory.MODIFIER, width: 'w-16', customColor: 'bg-orange-500 text-white border-orange-700' },
      { id: 'Fn', label: 'Fn', category: KeyCategory.MODIFIER, width: 'w-16' },
      { id: 'Ctrl-Right', label: 'Ctrl', category: KeyCategory.MODIFIER, width: 'w-16', customColor: 'bg-blue-600 text-white border-blue-800' },
      GAP('w-[158px]'),
    ]
  }
];
