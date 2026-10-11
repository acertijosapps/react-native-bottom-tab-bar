import { useContext } from 'react';

import type { PaletteContextState } from './paletteContext';
import { PaletteContext } from './paletteContext';

export const usePalette = (): PaletteContextState => useContext(PaletteContext);
