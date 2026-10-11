import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Palette } from '@/context/palette';
import { usePalette } from '@/context/palette';

import { colors, dimens } from '@/styles';

export type PaletteOptionProps = {
    label: string;
    swatch: Palette;
    isSelected: boolean;
    onPress: () => void;
};

const PaletteOption = ({
    label,
    swatch,
    isSelected,
    onPress,
}: PaletteOptionProps): React.JSX.Element => {
    const { palette } = usePalette();

    return (
        <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            style={{
                ...styles.option,
                backgroundColor: palette.surface,
                borderColor: isSelected ? palette.accent : palette.border,
            }}
            onPress={onPress}
        >
            <View style={styles.swatches}>
                <View style={{ ...styles.swatch, backgroundColor: swatch.background }} />
                <View style={{ ...styles.swatch, backgroundColor: swatch.surface }} />
                <View style={{ ...styles.swatch, backgroundColor: swatch.accent }} />
            </View>
            <Text style={{ ...styles.label, color: palette.text }}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: dimens.spacingMd,
        minHeight: dimens.minTouchTarget,
        padding: dimens.spacingMd,
        borderRadius: dimens.radiusMd,
        borderWidth: dimens.borderWidth * 2,
    },
    swatches: {
        flexDirection: 'row',
        gap: dimens.spacingXs,
    },
    swatch: {
        width: dimens.swatchSize,
        height: dimens.swatchSize,
        borderRadius: dimens.swatchSize / 2,
        borderWidth: dimens.borderWidth,
        borderColor: colors.swatchOutline,
    },
    label: {
        fontSize: dimens.bodyFontSize,
        fontWeight: '600',
    },
});

export default PaletteOption;
