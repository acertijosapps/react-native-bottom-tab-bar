export const ROUTES = {
    HOME_TAB: 'HomeTab',
    DETAIL_TAB: 'DetailTab',
    EVENTS_TAB: 'EventsTab',
    SETTINGS_TAB: 'SettingsTab',
} as const;

export type AppTabsParamList = {
    [ROUTES.HOME_TAB]: undefined;
    [ROUTES.DETAIL_TAB]: undefined;
    [ROUTES.EVENTS_TAB]: undefined;
    [ROUTES.SETTINGS_TAB]: undefined;
};
