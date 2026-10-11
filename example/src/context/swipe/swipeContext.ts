import { createContext } from 'react';

export type SwipeContextState = {
    isSwipeEnabled: boolean;
    setIsSwipeEnabled: (isEnabled: boolean) => void;
};

export const SwipeContext = createContext<SwipeContextState>({
    isSwipeEnabled: false,
    setIsSwipeEnabled: () => {},
});
