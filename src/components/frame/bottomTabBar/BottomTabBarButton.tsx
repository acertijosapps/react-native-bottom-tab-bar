import { Pressable } from 'react-native';

import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const BottomTabBarButton = ({
    children,
    style,
    accessibilityRole,
    accessibilityState,
    accessibilityLabel,
    accessibilityValue,
    testID,
    onPress,
    onLongPress,
}: BottomTabBarButtonProps): React.JSX.Element => (
    <Pressable
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={accessibilityValue}
        testID={testID}
        style={style}
        onPress={onPress}
        onLongPress={onLongPress}
    >
        {children}
    </Pressable>
);

export default BottomTabBarButton;
