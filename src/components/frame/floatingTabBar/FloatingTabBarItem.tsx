import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { dimens } from '../../../styles';
import type { FloatingTabBarColors } from '../../../utils/interfaces';

export type FloatingTabBarItemProps = {
    label: string;
    icon: ReactNode;
    colors: FloatingTabBarColors;
    isFocused: boolean;
    animationDuration: number;
    labelFontFamily?: string;
    allowFontScaling?: boolean;
    accessibilityLabel?: string;
    testID?: string;
    onPress: () => void;
    onLongPress: () => void;
};

const FloatingTabBarItem = ({
    label,
    icon,
    colors,
    isFocused,
    animationDuration,
    labelFontFamily,
    allowFontScaling,
    accessibilityLabel,
    testID,
    onPress,
    onLongPress,
}: FloatingTabBarItemProps): React.JSX.Element => {
    const labelFont = labelFontFamily
        ? { fontFamily: labelFontFamily }
        : { fontWeight: dimens.labelFontWeight };

    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={accessibilityLabel ?? label}
            testID={testID}
            style={styles.item}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {isFocused ? (
                <Animated.View
                    key="active"
                    entering={ZoomIn.duration(animationDuration)}
                    style={{ ...styles.itemActive, backgroundColor: colors.accent }}
                >
                    {icon}
                </Animated.View>
            ) : (
                <Animated.View
                    key="inactive"
                    entering={FadeIn.duration(animationDuration)}
                    style={styles.itemInactive}
                >
                    {icon}
                    <Text
                        allowFontScaling={allowFontScaling}
                        style={{ ...styles.label, ...labelFont, color: colors.textMuted }}
                    >
                        {label}
                    </Text>
                </Animated.View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dimens.itemPaddingVertical,
    },
    itemActive: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: dimens.itemActiveRadius,
        paddingHorizontal: dimens.itemActivePaddingHorizontal,
        paddingVertical: dimens.itemActivePaddingVertical,
    },
    itemInactive: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: dimens.iconLabelGap,
    },
    label: {
        fontSize: dimens.labelFontSize,
    },
});

export default FloatingTabBarItem;
