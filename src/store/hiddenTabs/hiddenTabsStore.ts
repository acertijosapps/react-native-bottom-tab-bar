type HiddenTabsListener = () => void;

const hiddenRouteKeysByNavigator = new Map<string, string[]>();

const listeners = new Set<HiddenTabsListener>();

const notifyListeners = (): void => {
    listeners.forEach((listener) => listener());
};

export const getHiddenRouteKeys = (navigatorKey: string): string[] =>
    hiddenRouteKeysByNavigator.get(navigatorKey) ?? [];

export const setHiddenRouteKeys = (navigatorKey: string, routeKeys: string[]): void => {
    const currentKeys = getHiddenRouteKeys(navigatorKey);
    const isSame =
        currentKeys.length === routeKeys.length &&
        currentKeys.every((routeKey, index) => routeKey === routeKeys[index]);

    if (isSame) {
        return;
    }

    hiddenRouteKeysByNavigator.set(navigatorKey, routeKeys);
    notifyListeners();
};

export const clearHiddenRouteKeys = (navigatorKey: string): void => {
    if (hiddenRouteKeysByNavigator.delete(navigatorKey)) {
        notifyListeners();
    }
};

export const subscribeHiddenRouteKeys = (listener: HiddenTabsListener): (() => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};
