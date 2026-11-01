import { dimens } from '../../styles';

export type SwipeNeighbors = {
    previousIndex: number | null;
    nextIndex: number | null;
};

export type SwipeNeighborsInput = {
    routeKeys: string[];
    currentIndex: number;
    hiddenRouteKeys: string[];
};

export type SwipeGestureInput = SwipeNeighbors & {
    translationX: number;
    velocityX: number;
    isRTL: boolean;
};

export type SwipeDragInput = Omit<SwipeGestureInput, 'velocityX'>;

const findVisibleIndex = (
    { routeKeys, currentIndex, hiddenRouteKeys }: SwipeNeighborsInput,
    step: number,
): number | null => {
    for (let index = currentIndex + step; index >= 0 && index < routeKeys.length; index += step) {
        if (!hiddenRouteKeys.includes(routeKeys[index])) {
            return index;
        }
    }

    return null;
};

export const resolveSwipeNeighbors = (input: SwipeNeighborsInput): SwipeNeighbors => ({
    previousIndex: findVisibleIndex(input, -1),
    nextIndex: findVisibleIndex(input, 1),
});

const resolveNeighborIndex = ({
    previousIndex,
    nextIndex,
    translationX,
    isRTL,
}: SwipeDragInput): number | null => {
    'worklet';
    const isForward = translationX < 0 !== isRTL;

    return isForward ? nextIndex : previousIndex;
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
