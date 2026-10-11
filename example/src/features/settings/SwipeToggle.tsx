import { StyleSheet, Switch, Text, View } from 'react-native';

import { usePalette } from '@/context/palette';

import { dimens } from '@/styles';

export type SwipeToggleProps = {
    isEnabled: boolean;
    onValueChange: (isEnabled: boolean) => void;
};

const SwipeToggle = ({ isEnabled, onValueChange }: SwipeToggleProps): React.JSX.Element => {
    const { palette } = usePalette();

    return (
        <View
            style={{
                ...styles.row,
                backgroundColor: palette.surface,
                borderColor: palette.border,
            }}
        >
            <View style={styles.texts}>
                <Text style={{ ...styles.title, color: palette.text }}>Swipe entre tabs</Text>
                <Text style={{ ...styles.description, color: palette.textMuted }}>
                    Prop isSwipeEnabled de SwipeableTabScreen (desactivada por default).
                </Text>
            </View>
            <Switch
                accessibilityLabel="Swipe entre tabs"
                value={isEnabled}
                trackColor={{ true: palette.accent, false: palette.border }}
                onValueChange={onValueChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: dimens.spacingMd,
        minHeight: dimens.minTouchTarget,
        padding: dimens.spacingMd,
        borderRadius: dimens.radiusMd,
        borderWidth: dimens.borderWidth,
    },
    texts: {
        flex: 1,
        gap: dimens.spacingXs,
    },
    title: {
        fontSize: dimens.bodyFontSize,
        fontWeight: '600',
    },
    description: {
        fontSize: dimens.captionFontSize,
    },
});

export default SwipeToggle;
