import { ActionButton } from '@/components/display/actionButton';
import { InfoCard } from '@/components/display/infoCard';
import { ScreenContainer } from '@/components/frame/screenContainer';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { AppTabsParamList } from '@/navigation/routes';
import { ROUTES } from '@/navigation/routes';

export type HomeScreenProps = BottomTabScreenProps<AppTabsParamList, typeof ROUTES.HOME_TAB>;

const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => (
    <ScreenContainer
        title="BottomTabBar"
        subtitle="Barra de tabs flotante para React Navigation, sobre Reanimated."
    >
        <InfoCard
            title="Tab activa"
            description="El icono entra en una píldora con el color de acento y una animación ZoomIn."
        />
        <InfoCard
            title="Tabs inactivas"
            description="Muestran icono y etiqueta, con una animación FadeIn al soltar el foco."
        />
        <InfoCard
            title="Safe-area"
            description="La barra respeta los insets inferior y laterales del dispositivo."
        />
        <InfoCard
            title="Badge"
            description="Toca la tab Eventos: su badge cuenta los toques con tabBarBadge."
        />
        <InfoCard
            title="Colores por prop"
            description="Cambia la paleta en la tab Ajustes: la barra se actualiza en vivo."
        />
        <InfoCard
            title="Swipe entre tabs"
            description="Actívalo en Ajustes y desliza la pantalla a izquierda o derecha para cambiar de tab."
        />
        <ActionButton
            label="Abrir la tab oculta"
            onPress={() => navigation.navigate(ROUTES.DETAIL_TAB)}
        />
    </ScreenContainer>
);

export default HomeScreen;
