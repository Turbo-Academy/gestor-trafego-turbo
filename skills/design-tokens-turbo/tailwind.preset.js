/**
 * Tailwind preset — design-tokens-emb
 * Espelha tokens.css + paletas. Plug-and-play.
 *
 * uso:
 *   import embPreset from './design-tokens-emb/tailwind.preset.js'
 *   export default { presets: [embPreset], content: [...] }
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Tokens semânticos — leem CSS vars das paletas
        bg:           'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-muted':   'var(--bg-muted)',
        'bg-glass':   'var(--bg-glass)',
        'bg-inverse': 'var(--bg-inverse)',
        fg:           'var(--fg)',
        'fg-muted':   'var(--fg-muted)',
        'fg-subtle':  'var(--fg-subtle)',
        'fg-inverse': 'var(--fg-inverse)',
        border:       'var(--border)',
        'border-strong': 'var(--border-strong)',
        ring:         'var(--ring)',
        accent:       'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-fg':  'var(--accent-fg)',
        'accent-2':   'var(--accent-2)',
        success:      'var(--success)',
        warning:      'var(--warning)',
        danger:       'var(--danger)',
        info:         'var(--info)',
        // Brand scale (50-900)
        brand: {
          50:  'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          300: 'var(--brand-300)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          800: 'var(--brand-800)',
          900: 'var(--brand-900)',
        },
      },
      fontFamily: {
        sans:    ['var(--font-sans)'],
        serif:   ['var(--font-serif)'],
        mono:    ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        xs:   ['var(--text-xs)',   { lineHeight: 'var(--leading-normal)' }],
        sm:   ['var(--text-sm)',   { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-relaxed)' }],
        lg:   ['var(--text-lg)',   { lineHeight: 'var(--leading-relaxed)' }],
        xl:   ['var(--text-xl)',   { lineHeight: 'var(--leading-snug)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-snug)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-tight)' }],
        '7xl': ['var(--text-7xl)', { lineHeight: 'var(--leading-tight)' }],
        '8xl': ['var(--text-8xl)', { lineHeight: 'var(--leading-tight)' }],
      },
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight:   'var(--tracking-tight)',
        normal:  'var(--tracking-normal)',
        wide:    'var(--tracking-wide)',
        wider:   'var(--tracking-wider)',
        widest:  'var(--tracking-widest)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        xs:   'var(--shadow-xs)',
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        xl:   'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        ring: 'var(--shadow-ring)',
        glow: 'var(--shadow-glow)',
      },
      transitionTimingFunction: {
        out:    'var(--ease-out)',
        in:     'var(--ease-in)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast:    'var(--dur-fast)',
        base:    'var(--dur-base)',
        slow:    'var(--dur-slow)',
        slower:  'var(--dur-slower)',
      },
      maxWidth: {
        prose: 'var(--container-prose)',
        'container-sm': 'var(--container-sm)',
        'container-md': 'var(--container-md)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-glow':  'var(--gradient-glow)',
      },
    },
  },
  plugins: [],
}
