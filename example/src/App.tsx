import { StyleSheet } from 'react-native';

import { PaletteProvider, usePalette } from '@/context/palette';
import { SwipeProvider } from '@/context/swipe';

import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppTabs, ThemedNavigationContainer } from '@/navigation';

const ThemedStatusBar = (): React.JSX.Element => {
    const { palette } = usePalette();

    return <StatusBar style={palette.statusBarStyle} />;
};

const App = (): React.JSX.Element => (
    <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
            <PaletteProvider>
                <SwipeProvider>
                    <ThemedNavigationContainer>
                        <AppTabs />
                    </ThemedNavigationContainer>
                    <ThemedStatusBar />
                </SwipeProvider>
            </PaletteProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
);

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default App;
