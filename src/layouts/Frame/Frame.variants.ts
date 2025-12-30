import { cva } from 'class-variance-authority';

export const ASPECT_RATIOS = {
  square: '1:1',
  video: '16:9',
  classic: '4:3',
  portrait: '9:16',
  ultrawide: '21:9',
  golden: '1.618:1',
} as const;

export type AspectRatioPreset = keyof typeof ASPECT_RATIOS;

export const frameVariants = cva('relative overflow-hidden', {
  variants: {
    fit: {
      cover: '[&>*]:object-cover',
      contain: '[&>*]:object-contain',
      fill: '[&>*]:object-fill',
      none: '[&>*]:object-none',
    },
  },
  defaultVariants: {
    fit: 'cover',
  },
});
