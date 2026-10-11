import { useContext } from 'react';

import type { SwipeContextState } from './swipeContext';
import { SwipeContext } from './swipeContext';

export const useSwipe = (): SwipeContextState => useContext(SwipeContext);
