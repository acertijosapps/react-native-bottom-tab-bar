import { ScreenContainer } from '@/components/frame/screenContainer';

import type { PaletteName } from '@/context/palette';
import { PALETTE_NAMES, palettes, usePalette } from '@/context/palette';
import { useSwipe } from '@/context/swipe';

import PaletteOption from './PaletteOption';
import SwipeToggle from './SwipeToggle';

const PALETTE_LABELS: Record<PaletteName, string> = {
    terracotta: 'Terracota',
    sage: 'Salvia',
    night: 'Noche',
};

const SettingsScreen = (): React.JSX.Element => {
    const { paletteName, setPaletteName } = usePalette();
    const { isSwipeEnabled, setIsSwipeEnabled } = useSwipe();

    return (
        <ScreenContainer
            title="Ajustes"
            subtitle="La barra recibe la paleta por la prop colors; cámbiala y mira cómo se actualiza."
        >
            <SwipeToggle
                isEnabled={isSwipeEnabled}
                onValueChange={setIsSwipeEnabled}
            />
            {PALETTE_NAMES.map((name) => (
                <PaletteOption
                    key={name}
                    label={PALETTE_LABELS[name]}
                    swatch={palettes[name]}
                    isSelected={name === paletteName}
                    onPress={() => setPaletteName(name)}
                />
            ))}
        </ScreenContainer>
    );
};

export default SettingsScreen;
