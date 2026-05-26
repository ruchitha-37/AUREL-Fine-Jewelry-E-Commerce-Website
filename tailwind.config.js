/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Backgrounds ──────────────────────── */
        cream:      '#FAF6F8',   /* soft warm ivory */
        champagne:  '#F0E8ED',   /* rose-ivory */
        ivory:      '#FDF9FB',
        blush:      '#EDE0E5',   /* muted mauve-blush */

        /* ── Mauves / Soft purples ────────────── */
        'rose-pink':  '#B07898',  /* mauve mid */
        'soft-pink':  '#D0A8B8',  /* soft mauve */

        /* ── Reds / Wines ────────────────────── */
        'gold-light': '#C08898',
        gold:         '#8B2E4A',  /* deep wine (was gold) */
        'gold-dark':  '#5C1A30',
        'warm-gold':  '#A84060',  /* cranberry */
        bronze:       '#703A50',

        /* ── Darks ───────────────────────────── */
        charcoal:     '#1A0E14',
        onyx:         '#0E0810',
        slate:        '#2E1A22',
        muted:        '#7A5868',

        /* ── Primary Accents ─────────────────── */
        'rose-gold':  '#C0607A',  /* medium rose — CTAs */
        'deep-rose':  '#3D0E20',  /* deep burgundy dark */

        /* ── Neutrals ────────────────────────── */
        'silver-metal': '#D0B8C4',
        'yellow-gold':  '#A84060',
        burgundy:       '#1A0810',  /* darkest wine-black */
        plum:           '#6A1A38',  /* rich plum */
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        marquee:   'marquee 30s linear infinite',
        shimmer:   'shimmer 3s ease-in-out infinite',
        float:     'float 4s ease-in-out infinite',
        fadeInUp:  'fadeInUp 0.8s ease-out forwards',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        sparkle:   'sparkle 2s ease-in-out infinite',
        tiltIn:    'tiltIn 0.6s ease-out forwards',
      },
      keyframes: {
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:     { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeInUp:  { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,46,74,0.25)' },
          '50%':      { boxShadow: '0 0 45px rgba(139,46,74,0.55)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%':      { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        tiltIn: {
          from: { opacity: '0', transform: 'perspective(800px) rotateY(15deg) scale(0.95)' },
          to:   { opacity: '1', transform: 'perspective(800px) rotateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
