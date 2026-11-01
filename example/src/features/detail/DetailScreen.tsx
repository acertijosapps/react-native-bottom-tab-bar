import { ActionButton } from '@/components/display/actionButton';
import { InfoCard } from '@/components/display/infoCard';
import { ScreenContainer } from '@/components/frame/screenContainer';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { AppTabsParamList } from '@/navigation/routes';
import { ROUTES } from '@/navigation/routes';

export type DetailScreenProps = BottomTabScreenProps<AppTabsParamList, typeof ROUTES.DETAIL_TAB>;

const DetailScreen = ({ navigation }: DetailScreenProps): React.JSX.Element => (
    <ScreenContainer
        title="Detalle"
        subtitle="Esta pantalla es una tab oculta y además esconde la barra."
    >
        <InfoCard
            title="tabBarItemStyle: { display: 'none' }"
            description="La tab no aparece en la barra y el swipe se la salta: de Inicio pasa directo a Eventos."
        />
        <InfoCard
            title="tabBarStyle: { display: 'none' }"
            description="La barra se oculta mientras esta pantalla tiene el foco."
        />
        <ActionButton
            label="Volver a Inicio"
            onPress={() => navigation.navigate(ROUTES.HOME_TAB)}
        />
    </ScreenContainer>
);

export default DetailScreen;
