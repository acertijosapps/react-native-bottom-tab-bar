import { dimens } from '../../styles';
import { resolveSwipeDragOffset, resolveSwipeTargetIndex } from './tabSwipe';

const baseInput = {
    currentIndex: 1,
    routeCount: 3,
    translationX: 0,
    velocityX: 0,
    isRTL: false,
};

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
        ['swipe left on the last tab stays', { currentIndex: 2, translationX: -80 }, null],
        ['swipe right on the first tab stays', { currentIndex: 0, translationX: 80 }, null],
        ['swipe left in RTL goes to the previous tab', { translationX: -80, isRTL: true }, 0],
        ['swipe right in RTL goes to the next tab', { translationX: 80, isRTL: true }, 2],
        ['single tab never moves', { currentIndex: 0, routeCount: 1, translationX: -80 }, null],
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
            { currentIndex: 2, translationX: -100 },
            -100 * dimens.swipeEdgeResistance,
        ],
        [
            'resists past the first tab',
            { currentIndex: 0, translationX: 100 },
            100 * dimens.swipeEdgeResistance,
        ],
        [
            'resists on the first tab in RTL when dragging left',
            { currentIndex: 0, translationX: -100, isRTL: true },
            -100 * dimens.swipeEdgeResistance,
        ],
        ['stays put without movement', { translationX: 0 }, 0],
    ])('%s', (_, overrides, expected) => {
        const offset = resolveSwipeDragOffset({ ...baseInput, ...overrides });

        expect(offset).toBeCloseTo(expected);
    });
});
