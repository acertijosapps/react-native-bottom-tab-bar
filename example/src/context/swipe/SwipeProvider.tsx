import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { SwipeContext } from './swipeContext';

export type SwipeProviderProps = {
    children: ReactNode;
};

const SwipeProvider = ({ children }: SwipeProviderProps): React.JSX.Element => {
    const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);

    const value = useMemo(() => ({ isSwipeEnabled, setIsSwipeEnabled }), [isSwipeEnabled]);

    return <SwipeContext.Provider value={value}>{children}</SwipeContext.Provider>;
};

export default SwipeProvider;
