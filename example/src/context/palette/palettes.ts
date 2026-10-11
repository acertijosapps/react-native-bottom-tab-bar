import type { BottomTabBarColors } from 'react-native-bottom-tab-bar';

export type Palette = BottomTabBarColors & {
    text: string;
    statusBarStyle: 'light' | 'dark';
};

export const PALETTE_NAMES = ['terracotta', 'sage', 'night'] as const;

export type PaletteName = (typeof PALETTE_NAMES)[number];

export const palettes: Record<PaletteName, Palette> = {
    terracotta: {
        background: '#F4F1EA',
        surface: '#FFFFFF',
        border: '#E1E5E2',
        accent: '#B05636',
        onAccent: '#FFF3E5',
        textMuted: '#5E6E68',
        shadow: '#000000',
        text: '#40534D',
        statusBarStyle: 'dark',
    },
    sage: {
        background: '#F1F3EC',
        surface: '#FFFFFF',
        border: '#DEE3D6',
        accent: '#4F7A57',
        onAccent: '#F2F6EC',
        textMuted: '#57705C',
        shadow: '#000000',
        text: '#3A5A40',
        statusBarStyle: 'dark',
    },
    night: {
        background: '#282A3B',
        surface: '#333549',
        border: '#474A63',
        accent: '#A9ACE0',
        onAccent: '#1F2130',
        textMuted: '#B4B4C0',
        shadow: '#000000',
        text: '#EFEEF7',
        statusBarStyle: 'light',
    },
};
