
export enum KeyCategory {
  FUNCTION = 'function',
  ALPHANUMERIC = 'alphanumeric',
  NAVIGATION = 'navigation',
  ACTION = 'action',
  MODIFIER = 'modifier',
  SPACE = 'space'
}

export interface KeyInfo {
  id: string;
  label: string;
  shiftLabel?: string;
  altGrLabel?: string;
  category: KeyCategory;
  width?: string;
  spacer?: boolean;
  customColor?: string;
}

export interface KeyboardRow {
  keys: KeyInfo[];
}

export interface KeyDescription {
  title: string;
  text: string;
}
