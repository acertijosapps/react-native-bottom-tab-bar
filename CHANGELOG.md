# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.1.0] - 2026-11-01

### Added

- `tabBarBadge` y `tabBarBadgeStyle`: badge sobre el icono, también anunciado por el lector de pantalla. Claves opcionales `badge` y `onBadge` en `BottomTabBarColors`.
- `tabBarHideOnKeyboard`: oculta la barra mientras el teclado está abierto.
- `tabBarShowLabel: false` y `tabBarLabelVisibilityMode: 'unlabeled'`: ocultan las etiquetas.
- `tabBarButton`: botón propio por tab, como en la barra de bottom-tabs.

### Fixed

- `tabBarStyle: { display: 'none' }` ya oculta la barra en la pantalla enfocada.
- Las tabs ocultas (`tabBarItemStyle: { display: 'none' }` o `tabBarButton` que devuelve `null`) ya no se dibujan, y el swipe de `SwipeableTabScreen` se las salta.
- Las etiquetas largas o con texto de accesibilidad grande se cortan en una línea y crecen hasta 1.5×, sin descuadrar la barra.
- La barra respeta los insets laterales (notch en horizontal).

### Changed

- `peerDependencies`: `@react-navigation/bottom-tabs` y `@react-navigation/native` pasan de `>=7.0.0` a `^7.0.0`.
- El repositorio se movió a GitHub: [acertijosapps/react-native-bottom-tab-bar](https://github.com/acertijosapps/react-native-bottom-tab-bar). `repository`, `bugs` y las imágenes del README apuntan ahí.

## [1.0.0] - 2026-10-11

### Added

- `BottomTabBar`: barra de tabs flotante para `@react-navigation/bottom-tabs` v7, extraída de Insumia.
- Colores configurables por la prop `colors`, con `defaultColors` exportado.
- Props `labelFontFamily` y `animationDuration`.
- Soporte de `tabBarLabel`, `tabBarAccessibilityLabel`, `tabBarButtonTestID` y `tabBarAllowFontScaling`.
- Evento `tabLongPress`.
- Soporte de `tabBarRepeatedPressBehavior` (`scrollToTop` / `popToTop`) en el `tabPress`, como la barra de bottom-tabs 7.20.
- `SwipeableTabScreen`: cambio de tab por swipe horizontal sobre el contenido, vía `screenLayout`. Prop `isSwipeEnabled`, desactivada por default. La pantalla sigue al dedo durante el gesto, con resistencia en los bordes y regreso animado si el swipe no alcanza. Requiere `react-native-gesture-handler` (peer, `>=2.0.0`) y `@react-navigation/native` (peer, `>=7.0.0`).
- App de ejemplo con Expo SDK 57 en `example/`.
- Capturas del componente (paleta clara y oscura) en el README.
