import type { ReactNode } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { dimens } from '../../../styles';
import type { ResolvedBottomTabBarColors } from '../../../utils/interfaces';

export type BottomTabBarIconProps = {
    icon: ReactNode;
    badge: string | null;
    badgeStyle?: TextStyle;
    colors: ResolvedBottomTabBarColors;
};

const BottomTabBarIcon = ({
    icon,
    badge,
    badgeStyle,
    colors,
}: BottomTabBarIconProps): React.JSX.Element => (
    <View>
        {icon}
        {badge === null ? null : (
            <Text
                allowFontScaling={false}
                numberOfLines={dimens.labelMaxLines}
                style={{
                    ...styles.badge,
                    backgroundColor: colors.badge,
                    color: colors.onBadge,
                    ...badgeStyle,
                }}
            >
                {badge}
            </Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: dimens.badgeOffsetTop,
        end: dimens.badgeOffsetEnd,
        minWidth: dimens.badgeSize,
        height: dimens.badgeSize,
        borderRadius: dimens.badgeSize / 2,
        paddingHorizontal: dimens.badgePaddingHorizontal,
        overflow: 'hidden',
        fontSize: dimens.badgeFontSize,
        fontWeight: dimens.badgeFontWeight,
        lineHeight: dimens.badgeSize,
        textAlign: 'center',
        fontVariant: ['tabular-nums'],
    },
});

export default BottomTabBarIcon;
