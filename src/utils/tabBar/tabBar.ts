import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { defaultColors } from '../../styles';
import type { FloatingTabBarColors } from '../interfaces';

type TabLabelOptions = Pick<BottomTabNavigationOptions, 'title' | 'tabBarLabel'>;

type RepeatedPressOptions = Pick<BottomTabNavigationOptions, 'tabBarRepeatedPressBehavior'>;

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

export const mergeColors = (overrides?: Partial<FloatingTabBarColors>): FloatingTabBarColors => ({
    ...defaultColors,
    ...overrides,
});
