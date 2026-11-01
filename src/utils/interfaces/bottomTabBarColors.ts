export type BottomTabBarColors = {
    background: string;
    surface: string;
    border: string;
    accent: string;
    onAccent: string;
    textMuted: string;
    shadow: string;
    badge?: string;
    onBadge?: string;
};

export type ResolvedBottomTabBarColors = Required<BottomTabBarColors>;
