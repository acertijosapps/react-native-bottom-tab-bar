import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { usePalette } from '@/context/palette';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { dimens } from '@/styles';

export type ScreenContainerProps = {
    title: string;
    subtitle: string;
    children?: ReactNode;
};

const ScreenContainer = ({
    title,
    subtitle,
    children,
}: ScreenContainerProps): React.JSX.Element => {
    const insets = useSafeAreaInsets();
    const { palette } = usePalette();

    return (
        <View style={{ ...styles.container, backgroundColor: palette.background }}>
            <ScrollView
                contentContainerStyle={{
                    ...styles.content,
                    paddingTop: insets.top + dimens.spacingXl,
                }}
            >
                <Text style={{ ...styles.title, color: palette.text }}>{title}</Text>
                <Text style={{ ...styles.subtitle, color: palette.textMuted }}>{subtitle}</Text>
                {children}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        gap: dimens.spacingMd,
        paddingHorizontal: dimens.spacingXl,
        paddingBottom: dimens.spacingXl,
    },
    title: {
        fontSize: dimens.titleFontSize,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: dimens.bodyFontSize,
    },
});

export default ScreenContainer;
