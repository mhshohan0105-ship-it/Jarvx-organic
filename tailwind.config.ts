import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                leaf: {
                    950: '#06201A',
                    900: '#0B2E24',
                    800: '#114034',
                    700: '#1A5C47',
                    600: '#25785C',
                    500: '#3C9A74',
                    100: '#DDF3E6',
                    50:  '#F0FAF4'
                },
                gold: {
                    700: '#A85F00',
                    600: '#D98200',
                    500: '#F5A524',
                    400: '#FFC857',
                    300: '#FFE3A3',
                    100: '#FFF4DB',
                    50:  '#FFFAEF'
                },
                lime: {
                    400: '#D4F76B',
                    500: '#C5F04A',
                    600: '#A6D62A'
                },
                cream: '#F7F4EC'
            },
            fontFamily: {
                display: ['"Anek Bangla"', '"Hind Siliguri"', 'sans-serif'],
                bangla: ['"Hind Siliguri"', 'sans-serif'],
                brand: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.75rem',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                'spin-slow': 'spin 24s linear infinite',
                'spin-rev': 'spin-rev 30s linear infinite',
                marquee: 'marquee 30s linear infinite',
                'marquee-rev': 'marquee-rev 34s linear infinite',
                blob: 'blob 14s ease-in-out infinite',
                shine: 'shine 3s ease-in-out infinite',
                'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.2,.6,.4,1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-16px) rotate(2deg)' },
                },
                'spin-rev': { to: { transform: 'rotate(-360deg)' } },
                marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
                'marquee-rev': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
                blob: {
                    '0%, 100%': { transform: 'translate(0,0) scale(1)', borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
                    '33%': { transform: 'translate(30px,-40px) scale(1.08)', borderRadius: '70% 30% 46% 54% / 30% 39% 61% 70%' },
                    '66%': { transform: 'translate(-25px,25px) scale(.95)', borderRadius: '30% 70% 40% 60% / 60% 30% 70% 40%' },
                },
                shine: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(.8)', opacity: '.8' },
                    '100%': { transform: 'scale(1.8)', opacity: '0' },
                },
            }
        }
    }
};

export default config;
