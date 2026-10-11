import { InfoCard } from '@/components/display/infoCard';
import { ScreenContainer } from '@/components/frame/screenContainer';

const HomeScreen = (): React.JSX.Element => (
    <ScreenContainer
        title="FloatingTabBar"
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
            description="La barra respeta el inset inferior del dispositivo."
        />
        <InfoCard
            title="Colores por prop"
            description="Cambia la paleta en la tab Ajustes: la barra se actualiza en vivo."
        />
        <InfoCard
            title="Swipe entre tabs"
            description="Actívalo en Ajustes y desliza la pantalla a izquierda o derecha para cambiar de tab."
        />
    </ScreenContainer>
);

export default HomeScreen;
