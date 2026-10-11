import { EventsScreen } from '@/features/events';
import { HomeScreen } from '@/features/home';
import { SettingsScreen } from '@/features/settings';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { SwipeableTabScreenProps } from 'react-native-bottom-tab-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import type { AppTabsParamList } from './routes';
import { ROUTES } from './routes';
import SwipeScreenLayout from './SwipeScreenLayout';
import ThemedTabBar from './ThemedTabBar';

const Tabs = createBottomTabNavigator<AppTabsParamList>();

type TabIconProps = {
    color: string;
    size: number;
};

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

const tabIcon = (name: MaterialIconName) => {
    const TabIcon = ({ color, size }: TabIconProps): React.JSX.Element => (
        <MaterialIcons
            name={name}
            color={color}
            size={size}
        />
    );

    return TabIcon;
};

const HomeIcon = tabIcon('home');
const EventsIcon = tabIcon('touch-app');
const SettingsIcon = tabIcon('tune');

const renderTabBar = (props: BottomTabBarProps): React.JSX.Element => <ThemedTabBar {...props} />;

const renderScreenLayout = (props: SwipeableTabScreenProps): React.JSX.Element => (
    <SwipeScreenLayout {...props} />
);

const AppTabs = (): React.JSX.Element => (
    <Tabs.Navigator
        tabBar={renderTabBar}
        screenLayout={renderScreenLayout}
        screenOptions={{ headerShown: false, animation: 'shift' }}
    >
        <Tabs.Screen
            name={ROUTES.HOME_TAB}
            component={HomeScreen}
            options={{ title: 'Inicio', tabBarIcon: HomeIcon }}
        />
        <Tabs.Screen
            name={ROUTES.EVENTS_TAB}
            component={EventsScreen}
            options={{
                title: 'Eventos',
                tabBarIcon: EventsIcon,
                tabBarAccessibilityLabel: 'Eventos de la barra',
            }}
        />
        <Tabs.Screen
            name={ROUTES.SETTINGS_TAB}
            component={SettingsScreen}
            options={{ title: 'Ajustes', tabBarIcon: SettingsIcon }}
        />
    </Tabs.Navigator>
);

export default AppTabs;
