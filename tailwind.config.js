/**
 * Digital Pillars — design tokens.
 * Near-black canvas, a single ice-blue accent, one restrained warm signal colour
 * (borrowed from the render's interior lighting) used only for live/positive data.
 */
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#06070A', // page canvas
          raised: '#0A0C11', // cards / panels
          line: '#1A1E26', // hairlines
        },
        accent: {
          DEFAULT: '#57D8FF',
          soft: '#8FE7FF',
          deep: '#0E7FA8',
        },
        signal: '#E9A85C', // warm data accent, used sparingly
        chalk: '#F4F6F8',
        muted: '#8B929D',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        headline: '-0.035em',
        eyebrow: '0.28em',
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
}
