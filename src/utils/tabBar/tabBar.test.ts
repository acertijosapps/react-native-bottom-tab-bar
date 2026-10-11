import { defaultColors } from '../../styles';
import {
    mergeColors,
    resolveRepeatedPressBehavior,
    resolveTabLabel,
    shouldNavigateOnPress,
} from './tabBar';

const renderNothing = (): null => null;

describe('resolveTabLabel', () => {
    it.each([
        [{ tabBarLabel: 'Insumos', title: 'Inventario' }, 'SuppliesTab', 'Insumos'],
        [{ title: 'Recetas' }, 'RecipesTab', 'Recetas'],
        [{}, 'HomeTab', 'HomeTab'],
        [{ tabBarLabel: renderNothing, title: 'Inicio' }, 'HomeTab', 'Inicio'],
        [{ tabBarLabel: renderNothing }, 'HomeTab', 'HomeTab'],
        [{ tabBarLabel: '', title: 'Inicio' }, 'HomeTab', ''],
    ])('resolves %o on route %s to %s', (options, routeName, expected) => {
        const label = resolveTabLabel(options, routeName);

        expect(label).toBe(expected);
    });
});

describe('shouldNavigateOnPress', () => {
    it.each([
        [false, false, true],
        [true, false, false],
        [false, true, false],
        [true, true, false],
    ])(
        'isFocused=%s isDefaultPrevented=%s returns %s',
        (isFocused, isDefaultPrevented, expected) => {
            const result = shouldNavigateOnPress(isFocused, isDefaultPrevented);

            expect(result).toBe(expected);
        },
    );
});

describe('resolveRepeatedPressBehavior', () => {
    it.each([
        [false, {}, { scrollToTop: false, popToTop: false }],
        [true, {}, { scrollToTop: true, popToTop: true }],
        [
            true,
            { tabBarRepeatedPressBehavior: { scrollToTop: false } },
            { scrollToTop: false, popToTop: true },
        ],
        [
            true,
            { tabBarRepeatedPressBehavior: { popToTop: false } },
            { scrollToTop: true, popToTop: false },
        ],
        [
            false,
            { tabBarRepeatedPressBehavior: { scrollToTop: true, popToTop: true } },
            { scrollToTop: false, popToTop: false },
        ],
    ])('isFocused=%s with %o returns %o', (isFocused, options, expected) => {
        const behavior = resolveRepeatedPressBehavior(isFocused, options);

        expect(behavior).toEqual(expected);
    });
});

describe('mergeColors', () => {
    it('returns the default palette when there are no overrides', () => {
        const colors = mergeColors();

        expect(colors).toEqual(defaultColors);
    });

    it('overrides only the provided keys', () => {
        const colors = mergeColors({ accent: '#4F7A57', onAccent: '#F2F6EC' });

        expect(colors).toEqual({ ...defaultColors, accent: '#4F7A57', onAccent: '#F2F6EC' });
    });

    it('does not mutate the default palette', () => {
        const snapshot = { ...defaultColors };

        mergeColors({ surface: '#35423D' });

        expect(defaultColors).toEqual(snapshot);
    });
});
