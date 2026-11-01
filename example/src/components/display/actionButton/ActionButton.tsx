import { Pressable, StyleSheet, Text } from 'react-native';

import { usePalette } from '@/context/palette';

import { dimens } from '@/styles';

export type ActionButtonProps = {
    label: string;
    onPress: () => void;
};

const ActionButton = ({ label, onPress }: ActionButtonProps): React.JSX.Element => {
    const { palette } = usePalette();

    return (
        <Pressable
            accessibilityRole="button"
            style={{ ...styles.button, backgroundColor: palette.accent }}
            onPress={onPress}
        >
            <Text style={{ ...styles.label, color: palette.onAccent }}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: dimens.minTouchTarget,
        paddingHorizontal: dimens.spacingLg,
        borderRadius: dimens.radiusMd,
    },
    label: {
        fontSize: dimens.bodyFontSize,
        fontWeight: '600',
    },
});

export default ActionButton;
