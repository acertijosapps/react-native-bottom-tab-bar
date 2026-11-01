import type { ReactNode } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { dimens } from '../../../styles';
import type { ResolvedBottomTabBarColors } from '../../../utils/interfaces';
import BottomTabBarIcon from './BottomTabBarIcon';

export type BottomTabBarItemProps = {
    label: string;
    icon: ReactNode;
    badge: string | null;
    badgeStyle?: TextStyle;
    colors: ResolvedBottomTabBarColors;
    isFocused: boolean;
    isLabelVisible: boolean;
    animationDuration: number;
    labelFontFamily?: string;
    allowFontScaling?: boolean;
};

const BottomTabBarItem = ({
    label,
    icon,
    badge,
    badgeStyle,
    colors,
    isFocused,
    isLabelVisible,
    animationDuration,
    labelFontFamily,
    allowFontScaling,
}: BottomTabBarItemProps): React.JSX.Element => {
    const labelFont = labelFontFamily
        ? { fontFamily: labelFontFamily }
        : { fontWeight: dimens.labelFontWeight };

    const tabIcon = (
        <BottomTabBarIcon
            icon={icon}
            badge={badge}
            badgeStyle={badgeStyle}
            colors={colors}
        />
    );

    if (isFocused) {
        return (
            <Animated.View
                key="active"
                entering={ZoomIn.duration(animationDuration)}
                style={{ ...styles.itemActive, backgroundColor: colors.accent }}
            >
                {tabIcon}
            </Animated.View>
        );
    }

    return (
        <Animated.View
            key="inactive"
            entering={FadeIn.duration(animationDuration)}
            style={styles.itemInactive}
        >
            {tabIcon}
            {isLabelVisible ? (
                <Text
                    allowFontScaling={allowFontScaling}
                    maxFontSizeMultiplier={dimens.labelMaxFontScale}
                    numberOfLines={dimens.labelMaxLines}
                    style={{ ...styles.label, ...labelFont, color: colors.textMuted }}
                >
                    {label}
                </Text>
            ) : null}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemActive: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: dimens.itemActiveRadius,
        paddingHorizontal: dimens.itemActivePaddingHorizontal,
        paddingVertical: dimens.itemActivePaddingVertical,
    },
    itemInactive: {
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dimens.iconLabelGap,
    },
    label: {
        fontSize: dimens.labelFontSize,
    },
});

export default BottomTabBarItem;
