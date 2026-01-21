/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 主色 - 温暖橘金 (品牌色)
                primary: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                },
                // 强调色 - 深邃墨蓝
                accent: {
                    50: '#F0F9FF',
                    100: '#E0F2FE',
                    200: '#BAE6FD',
                    300: '#7DD3FC',
                    400: '#38BDF8',
                    500: '#0EA5E9',
                    600: '#0284C7',
                    700: '#0369A1',
                    800: '#075985',
                    900: '#0C4A6E',
                },
                warning: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                },
                success: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                },
                danger: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',
                    600: '#DC2626',
                },
                gray: {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
                serif: ['Noto Serif SC', 'STSong', 'SimSun', 'serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-warm': 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)',
                'gradient-sunset': 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FBBF24 100%)',
                'gradient-ocean': 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 50%, #38BDF8 100%)',
                'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(251,146,60,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14,165,233,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(249,115,22,0.1) 0px, transparent 50%)',
                'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            },
            boxShadow: {
                'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 20px 40px -10px rgba(249, 115, 22, 0.2), 0 8px 16px -8px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 30px rgba(249, 115, 22, 0.3)',
                'glow-sm': '0 0 15px rgba(249, 115, 22, 0.2)',
                'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.6)',
                'nav': '0 -4px 30px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.4s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
