import { dimens } from '../../styles';
import { resolveSwipeDragOffset, resolveSwipeNeighbors, resolveSwipeTargetIndex } from './tabSwipe';

const baseInput = {
    previousIndex: 0,
    nextIndex: 2,
    translationX: 0,
    velocityX: 0,
    isRTL: false,
};

const firstTab = { previousIndex: null, nextIndex: 1 };
const lastTab = { previousIndex: 1, nextIndex: null };
const onlyTab = { previousIndex: null, nextIndex: null };

describe('resolveSwipeNeighbors', () => {
    const routeKeys = ['home', 'detail', 'events', 'settings'];

    it.each([
        ['middle tab without hidden tabs', 2, [], { previousIndex: 1, nextIndex: 3 }],
        ['first tab', 0, [], { previousIndex: null, nextIndex: 1 }],
        ['last tab', 3, [], { previousIndex: 2, nextIndex: null }],
        ['skips a hidden tab forward', 0, ['detail'], { previousIndex: null, nextIndex: 2 }],
        ['skips a hidden tab backward', 2, ['detail'], { previousIndex: 0, nextIndex: 3 }],
        [
            'no visible neighbor past hidden tabs',
            3,
            ['detail', 'events', 'home'],
            { previousIndex: null, nextIndex: null },
        ],
        ['works from a hidden tab', 1, ['detail'], { previousIndex: 0, nextIndex: 2 }],
    ])('%s', (_, currentIndex, hiddenRouteKeys, expected) => {
        const neighbors = resolveSwipeNeighbors({ routeKeys, currentIndex, hiddenRouteKeys });

        expect(neighbors).toEqual(expected);
    });
});

describe('resolveSwipeTargetIndex', () => {
    it.each([
        ['swipe left past the threshold goes to the next tab', { translationX: -80 }, 2],
        ['swipe right past the threshold goes to the previous tab', { translationX: 80 }, 0],
        [
            'short but fast swipe left goes to the next tab',
            { translationX: -30, velocityX: -900 },
            2,
        ],
        [
            'short but fast swipe right goes to the previous tab',
            { translationX: 30, velocityX: 900 },
            0,
        ],
        ['short and slow swipe stays', { translationX: -30, velocityX: -200 }, null],
        [
            'fast fling against the drag direction stays',
            { translationX: -30, velocityX: 900 },
            null,
        ],
        ['no horizontal movement stays', { translationX: 0, velocityX: -900 }, null],
        ['swipe left on the last tab stays', { ...lastTab, translationX: -80 }, null],
        ['swipe right on the first tab stays', { ...firstTab, translationX: 80 }, null],
        ['swipe left in RTL goes to the previous tab', { translationX: -80, isRTL: true }, 0],
        ['swipe right in RTL goes to the next tab', { translationX: 80, isRTL: true }, 2],
        ['single tab never moves', { ...onlyTab, translationX: -80 }, null],
        ['jumps over a hidden tab', { previousIndex: 0, nextIndex: 3, translationX: -80 }, 3],
    ])('%s', (_, overrides, expected) => {
        const targetIndex = resolveSwipeTargetIndex({ ...baseInput, ...overrides });

        expect(targetIndex).toBe(expected);
    });
});

describe('resolveSwipeDragOffset', () => {
    it.each([
        [
            'follows the finger toward the next tab',
            { translationX: -100 },
            -100 * dimens.swipeDragFactor,
        ],
        [
            'follows the finger toward the previous tab',
            { translationX: 100 },
            100 * dimens.swipeDragFactor,
        ],
        [
            'resists past the last tab',
            { ...lastTab, translationX: -100 },
            -100 * dimens.swipeEdgeResistance,
        ],
        [
            'resists past the first tab',
            { ...firstTab, translationX: 100 },
            100 * dimens.swipeEdgeResistance,
        ],
        [
            'resists on the first tab in RTL when dragging left',
            { ...firstTab, translationX: -100, isRTL: true },
            -100 * dimens.swipeEdgeResistance,
        ],
        ['stays put without movement', { translationX: 0 }, 0],
    ])('%s', (_, overrides, expected) => {
        const offset = resolveSwipeDragOffset({ ...baseInput, ...overrides });

        expect(offset).toBeCloseTo(expected);
    });
});
