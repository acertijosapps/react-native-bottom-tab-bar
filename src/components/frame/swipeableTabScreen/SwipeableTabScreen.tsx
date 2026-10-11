import type { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useTabSwipeGesture } from '../../../hooks/useTabSwipeGesture';

export type SwipeableTabScreenProps = {
    children: ReactElement;
    navigation: NavigationProp<ParamListBase>;
    isSwipeEnabled?: boolean;
};

const SwipeableTabScreen = ({
    children,
    navigation,
    isSwipeEnabled = false,
}: SwipeableTabScreenProps): React.JSX.Element => {
    const { gesture, animatedStyle } = useTabSwipeGesture(navigation, isSwipeEnabled);

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                collapsable={false}
                style={[styles.container, animatedStyle]}
            >
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SwipeableTabScreen;
