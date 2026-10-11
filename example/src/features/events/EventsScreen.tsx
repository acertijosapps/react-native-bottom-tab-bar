import { useEffect, useState } from 'react';

import { InfoCard } from '@/components/display/infoCard';
import { ScreenContainer } from '@/components/frame/screenContainer';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { AppTabsParamList, ROUTES } from '@/navigation';

export type EventsScreenProps = BottomTabScreenProps<AppTabsParamList, typeof ROUTES.EVENTS_TAB>;

const EventsScreen = ({ navigation }: EventsScreenProps): React.JSX.Element => {
    const [pressCount, setPressCount] = useState(0);
    const [longPressCount, setLongPressCount] = useState(0);

    useEffect(() => {
        const unsubscribePress = navigation.addListener('tabPress', () => {
            setPressCount((count) => count + 1);
        });
        const unsubscribeLongPress = navigation.addListener('tabLongPress', () => {
            setLongPressCount((count) => count + 1);
        });

        return () => {
            unsubscribePress();
            unsubscribeLongPress();
        };
    }, [navigation]);

    return (
        <ScreenContainer
            title="Eventos"
            subtitle="Toca o mantén presionada la tab Eventos: la barra emite los mismos eventos que la de React Navigation."
        >
            <InfoCard
                title={`tabPress: ${pressCount}`}
                description="Se emite en cada toque y se puede cancelar con event.preventDefault()."
            />
            <InfoCard
                title={`tabLongPress: ${longPressCount}`}
                description="Se emite al mantener presionada la tab."
            />
        </ScreenContainer>
    );
};

export default EventsScreen;
