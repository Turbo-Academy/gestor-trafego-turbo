import type { Config } from 'tailwindcss'
// Tokens copiados pelo setup da skill lovable-style-turbo.
// Fonte: ~/.claude/skills/design-tokens-turbo/tailwind.preset.js
import turboPreset from './tokens/tailwind.preset.js'

export default {
  presets: [turboPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
} satisfies Config
