import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const useIsKeyboardShown = (): boolean => {
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);

    useEffect(() => {
        const isIOS = Platform.OS === 'ios';
        const showSubscription = Keyboard.addListener(
            isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setIsKeyboardShown(true),
        );
        const hideSubscription = Keyboard.addListener(
            isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setIsKeyboardShown(false),
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return isKeyboardShown;
};
