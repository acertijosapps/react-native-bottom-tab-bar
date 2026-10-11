import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { PaletteContext } from './paletteContext';
import type { PaletteName } from './palettes';
import { palettes } from './palettes';

export type PaletteProviderProps = {
    children: ReactNode;
};

const PaletteProvider = ({ children }: PaletteProviderProps): React.JSX.Element => {
    const [paletteName, setPaletteName] = useState<PaletteName>('terracotta');

    const value = useMemo(
        () => ({ palette: palettes[paletteName], paletteName, setPaletteName }),
        [paletteName],
    );

    return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
};

export default PaletteProvider;
