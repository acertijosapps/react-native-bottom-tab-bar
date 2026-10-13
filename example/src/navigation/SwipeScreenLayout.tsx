import { useSwipe } from '@/context/swipe';

import type { SwipeableTabScreenProps } from '@acertijosapps/react-native-bottom-tab-bar';
import { SwipeableTabScreen } from '@acertijosapps/react-native-bottom-tab-bar';

const SwipeScreenLayout = ({
    children,
    navigation,
}: SwipeableTabScreenProps): React.JSX.Element => {
    const { isSwipeEnabled } = useSwipe();

    return (
        <SwipeableTabScreen
            navigation={navigation}
            isSwipeEnabled={isSwipeEnabled}
        >
            {children}
        </SwipeableTabScreen>
    );
};

export default SwipeScreenLayout;
