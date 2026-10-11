import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { usePalette } from '@/context/palette';

import type { Theme } from '@react-navigation/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

export type ThemedNavigationContainerProps = {
    children: ReactNode;
};

const ThemedNavigationContainer = ({
    children,
}: ThemedNavigationContainerProps): React.JSX.Element => {
    const { palette } = usePalette();

    const theme = useMemo<Theme>(
        () => ({
            ...DefaultTheme,
            dark: palette.statusBarStyle === 'light',
            colors: {
                ...DefaultTheme.colors,
                primary: palette.accent,
                background: palette.background,
                card: palette.surface,
                text: palette.text,
                border: palette.border,
            },
        }),
        [palette],
    );

    return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
};

export default ThemedNavigationContainer;
