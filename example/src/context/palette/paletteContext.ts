import { createContext } from 'react';

import type { Palette, PaletteName } from './palettes';
import { palettes } from './palettes';

export type PaletteContextState = {
    palette: Palette;
    paletteName: PaletteName;
    setPaletteName: (name: PaletteName) => void;
};

export const PaletteContext = createContext<PaletteContextState>({
    palette: palettes.terracotta,
    paletteName: 'terracotta',
    setPaletteName: () => {},
});
