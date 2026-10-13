import { usePalette } from '@/context/palette';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@acertijosapps/react-native-bottom-tab-bar';

const ThemedTabBar = (props: BottomTabBarProps): React.JSX.Element => {
    const { palette } = usePalette();

    return (
        <BottomTabBar
            {...props}
            colors={palette}
        />
    );
};

export default ThemedTabBar;
