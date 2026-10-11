import { useCallback, useEffect, useMemo } from 'react';
import { I18nManager } from 'react-native';

import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { dimens } from '../../styles';
import { resolveSwipeDragOffset, resolveSwipeTargetIndex } from '../../utils/tabSwipe';

export type TabSwipeGesture = {
    gesture: ReturnType<typeof Gesture.Pan>;
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
};

export const useTabSwipeGesture = (
    navigation: NavigationProp<ParamListBase>,
    isEnabled: boolean,
): TabSwipeGesture => {
    const offsetX = useSharedValue(0);
    const currentIndex = useSharedValue(0);
    const routeCount = useSharedValue(0);

    const isRTL = I18nManager.isRTL;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }],
    }));

    useEffect(() => {
        const syncState = () => {
            const state = navigation.getState();

            currentIndex.value = state.index;
            routeCount.value = state.routes.length;
            offsetX.value = 0;
        };

        syncState();

        return navigation.addListener('focus', syncState);
    }, [navigation, currentIndex, routeCount, offsetX]);

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
                        currentIndex: currentIndex.value,
                        routeCount: routeCount.value,
                        translationX: event.translationX,
                        isRTL,
                    });
                })
                .onEnd((event) => {
                    'worklet';
                    const targetIndex = resolveSwipeTargetIndex({
                        currentIndex: currentIndex.value,
                        routeCount: routeCount.value,
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
        [isEnabled, isRTL, offsetX, currentIndex, routeCount, navigateToIndex],
    );

    return { gesture, animatedStyle };
};
