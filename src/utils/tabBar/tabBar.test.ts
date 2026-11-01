import { defaultColors } from '../../styles';
import {
    isNodeEmpty,
    isStyleHidden,
    mergeColors,
    resolveBadgeText,
    resolveRepeatedPressBehavior,
    resolveTabLabel,
    shouldHideTabBar,
    shouldNavigateOnPress,
    shouldShowLabel,
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

describe('isStyleHidden', () => {
    it.each([
        ['undefined style', undefined, false],
        ['display none', { display: 'none' as const }, true],
        ['display flex', { display: 'flex' as const }, false],
        ['display none inside an array', [{ height: 10 }, { display: 'none' as const }], true],
        [
            'later display overrides none',
            [{ display: 'none' as const }, { display: 'flex' as const }],
            false,
        ],
    ])('%s', (_, style, expected) => {
        expect(isStyleHidden(style)).toBe(expected);
    });
});

describe('isNodeEmpty', () => {
    it.each([
        ['null', null, true],
        ['undefined', undefined, true],
        ['false', false, true],
        ['empty string', '', false],
        ['zero', 0, false],
        ['text', 'Inicio', false],
    ])('%s', (_, node, expected) => {
        expect(isNodeEmpty(node)).toBe(expected);
    });
});

describe('shouldShowLabel', () => {
    it.each([
        [{}, true],
        [{ tabBarShowLabel: true }, true],
        [{ tabBarShowLabel: false }, false],
        [{ tabBarLabelVisibilityMode: 'labeled' as const }, true],
        [{ tabBarLabelVisibilityMode: 'auto' as const }, true],
        [{ tabBarLabelVisibilityMode: 'unlabeled' as const }, false],
    ])('%o returns %s', (options, expected) => {
        expect(shouldShowLabel(options)).toBe(expected);
    });
});

describe('shouldHideTabBar', () => {
    it.each([
        ['visible by default', {}, false, false],
        [
            'hidden by tabBarStyle display none',
            { tabBarStyle: { display: 'none' as const } },
            false,
            true,
        ],
        ['keyboard open without hide option', {}, true, false],
        ['keyboard open with hide option', { tabBarHideOnKeyboard: true }, true, true],
        ['keyboard closed with hide option', { tabBarHideOnKeyboard: true }, false, false],
    ])('%s', (_, options, isKeyboardShown, expected) => {
        expect(shouldHideTabBar(options, isKeyboardShown)).toBe(expected);
    });
});

describe('resolveBadgeText', () => {
    it.each([
        [undefined, null],
        [3, '3'],
        [0, '0'],
        ['99+', '99+'],
        ['', ''],
    ])('%p returns %p', (badge, expected) => {
        expect(resolveBadgeText(badge)).toBe(expected);
    });
});
