import { Fragment, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type {
    BottomTabBarButtonProps,
    BottomTabBarProps as NavigationBottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useIsKeyboardShown } from '../../../hooks/useIsKeyboardShown';
import { clearHiddenRouteKeys, setHiddenRouteKeys } from '../../../store/hiddenTabs';
import { dimens } from '../../../styles';
import type { BottomTabBarColors } from '../../../utils/interfaces';
import {
    isNodeEmpty,
    isStyleHidden,
    mergeColors,
    resolveBadgeText,
    resolveRepeatedPressBehavior,
    resolveTabLabel,
    shouldHideTabBar,
    shouldNavigateOnPress,
    shouldShowLabel,
} from '../../../utils/tabBar';
import BottomTabBarButton from './BottomTabBarButton';
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
}: BottomTabBarProps): React.JSX.Element | null => {
    const insets = useSafeAreaInsets();
    const isKeyboardShown = useIsKeyboardShown();

    const palette = useMemo(() => mergeColors(colors), [colors]);

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const tabs = state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const color = isFocused ? palette.onAccent : palette.textMuted;
        const label = resolveTabLabel(options, route.name);
        const badge = resolveBadgeText(options.tabBarBadge);
        const icon = options.tabBarIcon?.({
            focused: isFocused,
            color,
            size: dimens.iconSize,
        });

        if (isStyleHidden(options.tabBarItemStyle)) {
            return { routeKey: route.key, button: null };
        }

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

        const buttonProps: BottomTabBarButtonProps = {
            accessibilityRole: 'tab',
            accessibilityState: { selected: isFocused },
            accessibilityLabel: options.tabBarAccessibilityLabel ?? label,
            accessibilityValue: badge === null ? undefined : { text: badge },
            testID: options.tabBarButtonTestID,
            style: styles.item,
            onPress: handlePress,
            onLongPress: handleLongPress,
            children: (
                <BottomTabBarItem
                    label={label}
                    icon={icon}
                    badge={badge}
                    badgeStyle={StyleSheet.flatten(options.tabBarBadgeStyle)}
                    colors={palette}
                    isFocused={isFocused}
                    isLabelVisible={shouldShowLabel(options)}
                    animationDuration={animationDuration}
                    labelFontFamily={labelFontFamily}
                    allowFontScaling={options.tabBarAllowFontScaling}
                />
            ),
        };

        const button = options.tabBarButton ? (
            options.tabBarButton(buttonProps)
        ) : (
            <BottomTabBarButton {...buttonProps} />
        );

        return { routeKey: route.key, button };
    });

    const hiddenRouteKeys = tabs
        .filter((tab) => isNodeEmpty(tab.button))
        .map((tab) => tab.routeKey);

    useEffect(() => {
        setHiddenRouteKeys(state.key, hiddenRouteKeys);
    }, [state.key, hiddenRouteKeys]);

    useEffect(() => () => clearHiddenRouteKeys(state.key), [state.key]);

    if (shouldHideTabBar(focusedOptions, isKeyboardShown)) {
        return null;
    }

    return (
        <View
            style={{
                ...styles.container,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
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
                {tabs.map((tab) => (
                    <Fragment key={tab.routeKey}>{tab.button}</Fragment>
                ))}
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
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: dimens.itemPaddingVertical,
    },
});

export default BottomTabBar;
