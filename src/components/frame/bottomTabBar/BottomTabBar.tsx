import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { BottomTabBarProps as NavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { dimens } from '../../../styles';
import type { BottomTabBarColors } from '../../../utils/interfaces';
import {
    mergeColors,
    resolveRepeatedPressBehavior,
    resolveTabLabel,
    shouldNavigateOnPress,
} from '../../../utils/tabBar';
import BottomTabBarItem from './BottomTabBarItem';

export type BottomTabBarProps = NavigationBottomTabBarProps & {
    colors?: Partial<BottomTabBarColors>;
    labelFontFamily?: string;
    animationDuration?: number;
};

const BottomTabBar = ({
    state,
    descriptors,
    navigation,
    colors,
    labelFontFamily,
    animationDuration = dimens.selectAnimationMs,
}: BottomTabBarProps): React.JSX.Element => {
    const insets = useSafeAreaInsets();

    const palette = useMemo(() => mergeColors(colors), [colors]);

    return (
        <View
            style={{
                ...styles.container,
                paddingBottom: insets.bottom,
                backgroundColor: palette.background,
            }}
        >
            <View
                accessibilityRole="tablist"
                style={{
                    ...styles.bar,
                    borderColor: palette.border,
                    backgroundColor: palette.surface,
                    shadowColor: palette.shadow,
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const color = isFocused ? palette.onAccent : palette.textMuted;
                    const icon = options.tabBarIcon?.({
                        focused: isFocused,
                        color,
                        size: dimens.iconSize,
                    });

                    const handlePress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                            data: { behavior: resolveRepeatedPressBehavior(isFocused, options) },
                        });

                        if (shouldNavigateOnPress(isFocused, event.defaultPrevented)) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const handleLongPress = () => {
                        navigation.emit({ type: 'tabLongPress', target: route.key });
                    };

                    return (
                        <BottomTabBarItem
                            key={route.key}
                            label={resolveTabLabel(options, route.name)}
                            icon={icon}
                            colors={palette}
                            isFocused={isFocused}
                            animationDuration={animationDuration}
                            labelFontFamily={labelFontFamily}
                            allowFontScaling={options.tabBarAllowFontScaling}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={handlePress}
                            onLongPress={handleLongPress}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: dimens.barWidth,
        padding: dimens.barPadding,
        borderRadius: dimens.barRadius,
        borderWidth: dimens.barBorderWidth,
        shadowOpacity: dimens.shadowOpacity,
        shadowRadius: dimens.shadowRadius,
        shadowOffset: { width: dimens.shadowOffsetWidth, height: dimens.shadowOffsetHeight },
        elevation: dimens.elevation,
    },
});

export default BottomTabBar;
