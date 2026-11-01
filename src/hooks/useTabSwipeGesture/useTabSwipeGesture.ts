import { useCallback, useEffect, useMemo } from 'react';
import { I18nManager } from 'react-native';

import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { getHiddenRouteKeys, subscribeHiddenRouteKeys } from '../../store/hiddenTabs';
import { dimens } from '../../styles';
import {
    resolveSwipeDragOffset,
    resolveSwipeNeighbors,
    resolveSwipeTargetIndex,
} from '../../utils/tabSwipe';

export type TabSwipeGesture = {
    gesture: ReturnType<typeof Gesture.Pan>;
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
};

export const useTabSwipeGesture = (
    navigation: NavigationProp<ParamListBase>,
    isEnabled: boolean,
): TabSwipeGesture => {
    const offsetX = useSharedValue(0);
    const previousIndex = useSharedValue<number | null>(null);
    const nextIndex = useSharedValue<number | null>(null);

    const isRTL = I18nManager.isRTL;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }],
    }));

    useEffect(() => {
        const syncNeighbors = () => {
            const state = navigation.getState();
            const neighbors = resolveSwipeNeighbors({
                routeKeys: state.routes.map((route) => route.key),
                currentIndex: state.index,
                hiddenRouteKeys: getHiddenRouteKeys(state.key),
            });

            previousIndex.value = neighbors.previousIndex;
            nextIndex.value = neighbors.nextIndex;
        };

        const handleFocus = () => {
            offsetX.value = 0;
            syncNeighbors();
        };

        syncNeighbors();

        const unsubscribeHiddenTabs = subscribeHiddenRouteKeys(syncNeighbors);
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);

        return () => {
            unsubscribeHiddenTabs();
            unsubscribeFocus();
        };
    }, [navigation, previousIndex, nextIndex, offsetX]);

    useEffect(() => {
        if (!isEnabled) {
            offsetX.value = 0;
        }
    }, [isEnabled, offsetX]);

    const navigateToIndex = useCallback(
        (index: number) => {
            const targetRoute = navigation.getState().routes[index];

            if (targetRoute) {
                navigation.navigate(targetRoute.name, targetRoute.params);
            }
        },
        [navigation],
    );

    const gesture = useMemo(
        () =>
            Gesture.Pan()
                .enabled(isEnabled)
                .activeOffsetX([-dimens.swipeActivationOffset, dimens.swipeActivationOffset])
                .failOffsetY([-dimens.swipeFailOffset, dimens.swipeFailOffset])
                .onUpdate((event) => {
                    'worklet';
                    offsetX.value = resolveSwipeDragOffset({
                        previousIndex: previousIndex.value,
                        nextIndex: nextIndex.value,
                        translationX: event.translationX,
                        isRTL,
                    });
                })
                .onEnd((event) => {
                    'worklet';
                    const targetIndex = resolveSwipeTargetIndex({
                        previousIndex: previousIndex.value,
                        nextIndex: nextIndex.value,
                        translationX: event.translationX,
                        velocityX: event.velocityX,
                        isRTL,
                    });

                    if (targetIndex === null) {
                        offsetX.value = withTiming(0, { duration: dimens.swipeResetMs });

                        return;
                    }

                    runOnJS(navigateToIndex)(targetIndex);
                })
                .onFinalize((_, isSuccess) => {
                    'worklet';
                    if (!isSuccess && offsetX.value !== 0) {
                        offsetX.value = withTiming(0, { duration: dimens.swipeResetMs });
                    }
                }),
        [isEnabled, isRTL, offsetX, previousIndex, nextIndex, navigateToIndex],
    );

    return { gesture, animatedStyle };
};
