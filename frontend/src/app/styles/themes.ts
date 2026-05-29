// Design tokens for the showcase themes. One set of shared inner pages reads
// these to restyle itself per theme (colors, fonts, radius, casing).

export interface Theme {
  slug: string;
  label: string;
  // surfaces
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  // brand
  primary: string;
  primaryText: string;
  accent: string;
  accentText: string;
  // type
  displayFont: string; // css var, e.g. 'var(--font-anton)'
  bodyFont: string;
  scriptFont?: string;
  // style
  radius: string;
  upper: boolean; // uppercase display headings
  letterSpacing: string;
}

export const themes: Record<string, Theme> = {
  varsity: {
    slug: 'varsity',
    label: 'Varsity Americana',
    bg: '#F4F1E8',
    surface: '#FFFFFF',
    surfaceAlt: '#ECE7D8',
    text: '#101A3A',
    textMuted: '#6A7184',
    border: '#1B2A6B',
    primary: '#1B2A6B',
    primaryText: '#FFFFFF',
    accent: '#E0231C',
    accentText: '#FFFFFF',
    displayFont: 'var(--font-anton)',
    bodyFont: 'var(--font-inter)',
    radius: '1rem',
    upper: true,
    letterSpacing: '0.01em',
  },
  streetwear: {
    slug: 'streetwear',
    label: 'Bold Streetwear',
    bg: '#0A0A0A',
    surface: '#161616',
    surfaceAlt: '#101010',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.55)',
    border: 'rgba(255,255,255,0.12)',
    primary: '#E0231C',
    primaryText: '#FFFFFF',
    accent: '#E0231C',
    accentText: '#FFFFFF',
    displayFont: 'var(--font-archivo-black)',
    bodyFont: 'var(--font-inter)',
    radius: '0.5rem',
    upper: true,
    letterSpacing: '-0.01em',
  },
  minimal: {
    slug: 'minimal',
    label: 'Clean Premium Minimal',
    bg: '#FBFAF8',
    surface: '#FFFFFF',
    surfaceAlt: '#F1EEE7',
    text: '#1A1A1A',
    textMuted: '#8A857C',
    border: '#E4E1DA',
    primary: '#1A1A1A',
    primaryText: '#FFFFFF',
    accent: '#1B2A6B',
    accentText: '#FFFFFF',
    displayFont: 'var(--font-fraunces)',
    bodyFont: 'var(--font-inter)',
    radius: '0.125rem',
    upper: false,
    letterSpacing: '0',
  },
  vintage: {
    slug: 'vintage',
    label: 'Vintage Heritage',
    bg: '#EFE7D6',
    surface: '#FFFFFF',
    surfaceAlt: '#E7DCC6',
    text: '#4A3F31',
    textMuted: '#8A7B66',
    border: '#6B5844',
    primary: '#34425A',
    primaryText: '#EFE7D6',
    accent: '#B0432F',
    accentText: '#FFFFFF',
    displayFont: 'var(--font-dm-serif)',
    bodyFont: 'var(--font-inter)',
    scriptFont: 'var(--font-caveat)',
    radius: '0.125rem',
    upper: false,
    letterSpacing: '0',
  },
};

export const themeSlugs = Object.keys(themes);
