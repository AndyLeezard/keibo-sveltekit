import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import plugin from 'tailwindcss/plugin';

const config = {
  // Opt for dark mode to be handled via the class method
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0px 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0px 2px 4px var(--tw-shadow-color)',
        lg: '0px 8px 16px var(--tw-shadow-color)',
        thin: '0px 1px 1px var(--tw-shadow-color)',
        below: '0px 2px 1px var(--tw-shadow-color)',
        thick: '0px 2px 2px var(--tw-shadow-color)',
        around:
          '0px 1px 1px var(--tw-shadow-color), 0px -1px 1px var(--tw-shadow-color), 1px 0px 1px var(--tw-shadow-color), -1px 0px 1px var(--tw-shadow-color)'
      },
      keyframes: {
        wiggle: {
          '0': { transform: 'translate(0, 0) rotate(0deg)' },
          '20%': { transform: 'translate(-2px, 0) rotate(-2deg)' },
          '30%': { transform: 'translate(3px, 0) rotate(3deg)' },
          '50%': { transform: 'translate(-2px, 0) rotate(-2deg)' },
          '60%': { transform: 'translate(1px, 0) rotate(1deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0)' }
        }
      },
      animation: {
        wiggle: 'wiggle 1.75s cubic-bezier(.36,.07,.19,.97) infinite'
      }
    }
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        preset: [
          {
            name: 'skeleton',
            enhancements: true
          }
        ]
      }
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      );
    })
  ]
} satisfies Config;

export default config;
