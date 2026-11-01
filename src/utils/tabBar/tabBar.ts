import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { defaultColors } from '../../styles';
import type { BottomTabBarColors, ResolvedBottomTabBarColors } from '../interfaces';

type TabLabelOptions = Pick<BottomTabNavigationOptions, 'title' | 'tabBarLabel'>;

type RepeatedPressOptions = Pick<BottomTabNavigationOptions, 'tabBarRepeatedPressBehavior'>;

type LabelVisibilityOptions = Pick<
    BottomTabNavigationOptions,
    'tabBarShowLabel' | 'tabBarLabelVisibilityMode'
>;

type TabBarVisibilityOptions = Pick<
    BottomTabNavigationOptions,
    'tabBarStyle' | 'tabBarHideOnKeyboard'
>;

export type RepeatedPressBehavior = {
    scrollToTop: boolean;
    popToTop: boolean;
};

export const resolveTabLabel = (options: TabLabelOptions, routeName: string): string => {
    if (typeof options.tabBarLabel === 'string') {
        return options.tabBarLabel;
    }

    if (typeof options.title === 'string') {
        return options.title;
    }

    return routeName;
};

export const shouldNavigateOnPress = (isFocused: boolean, isDefaultPrevented: boolean): boolean =>
    !isFocused && !isDefaultPrevented;

export const resolveRepeatedPressBehavior = (
    isFocused: boolean,
    options: RepeatedPressOptions,
): RepeatedPressBehavior => ({
    scrollToTop: isFocused && options.tabBarRepeatedPressBehavior?.scrollToTop !== false,
    popToTop: isFocused && options.tabBarRepeatedPressBehavior?.popToTop !== false,
});

export const mergeColors = (
    overrides?: Partial<BottomTabBarColors>,
): ResolvedBottomTabBarColors => ({
    ...defaultColors,
    ...overrides,
});

export const isStyleHidden = (style: StyleProp<ViewStyle>): boolean =>
    StyleSheet.flatten(style)?.display === 'none';

export const isNodeEmpty = (node: ReactNode): boolean =>
    node === null || node === undefined || typeof node === 'boolean';

export const shouldShowLabel = (options: LabelVisibilityOptions): boolean =>
    options.tabBarShowLabel !== false && options.tabBarLabelVisibilityMode !== 'unlabeled';

export const shouldHideTabBar = (
    options: TabBarVisibilityOptions,
    isKeyboardShown: boolean,
): boolean =>
    isStyleHidden(options.tabBarStyle as StyleProp<ViewStyle>) ||
    (options.tabBarHideOnKeyboard === true && isKeyboardShown);

export const resolveBadgeText = (badge?: number | string): string | null =>
    badge === undefined ? null : String(badge);
