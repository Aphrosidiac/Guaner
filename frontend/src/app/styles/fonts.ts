import { Anton, Bebas_Neue, Archivo_Black, Fraunces, DM_Serif_Display, Caveat, Oswald } from 'next/font/google';

export const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
export const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo-black' });
export const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
export const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif' });
export const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
export const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

// Combined className to expose all showcase font variables on a wrapper.
export const showcaseFontVars = [
  anton.variable,
  bebas.variable,
  archivoBlack.variable,
  fraunces.variable,
  dmSerif.variable,
  caveat.variable,
  oswald.variable,
].join(' ');
