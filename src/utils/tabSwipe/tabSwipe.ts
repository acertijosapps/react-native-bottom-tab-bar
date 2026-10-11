import { dimens } from '../../styles';

export type SwipeGestureInput = {
    currentIndex: number;
    routeCount: number;
    translationX: number;
    velocityX: number;
    isRTL: boolean;
};

export type SwipeDragInput = Omit<SwipeGestureInput, 'velocityX'>;

const resolveNeighborIndex = ({
    currentIndex,
    routeCount,
    translationX,
    isRTL,
}: SwipeDragInput): number | null => {
    'worklet';
    const step = translationX < 0 ? 1 : -1;
    const neighborIndex = currentIndex + (isRTL ? -step : step);

    return neighborIndex >= 0 && neighborIndex < routeCount ? neighborIndex : null;
};

export const resolveSwipeTargetIndex = (input: SwipeGestureInput): number | null => {
    'worklet';
    const { translationX, velocityX } = input;

    if (translationX === 0) {
        return null;
    }

    const isFarEnough = Math.abs(translationX) >= dimens.swipeDistanceThreshold;
    const isFastEnough =
        Math.abs(velocityX) >= dimens.swipeVelocityThreshold &&
        Math.sign(velocityX) === Math.sign(translationX);

    if (!isFarEnough && !isFastEnough) {
        return null;
    }

    return resolveNeighborIndex(input);
};

export const resolveSwipeDragOffset = (input: SwipeDragInput): number => {
    'worklet';
    if (input.translationX === 0) {
        return 0;
    }

    const hasNeighbor = resolveNeighborIndex(input) !== null;

    return input.translationX * (hasNeighbor ? dimens.swipeDragFactor : dimens.swipeEdgeResistance);
};
