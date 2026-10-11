# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [0.1.0] - 2026-10-10

### Added

- `FloatingTabBar`: barra de tabs flotante para `@react-navigation/bottom-tabs` v7, extraída de Insumia.
- Colores configurables por la prop `colors`, con `defaultColors` exportado.
- Props `labelFontFamily` y `animationDuration`.
- Soporte de `tabBarLabel`, `tabBarAccessibilityLabel`, `tabBarButtonTestID` y `tabBarAllowFontScaling`.
- Evento `tabLongPress`.
- Soporte de `tabBarRepeatedPressBehavior` (`scrollToTop` / `popToTop`) en el `tabPress`, como la barra de bottom-tabs 7.20.
- `SwipeableTabScreen`: cambio de tab por swipe horizontal sobre el contenido, vía `screenLayout`. Prop `isSwipeEnabled`, desactivada por default. La pantalla sigue al dedo durante el gesto, con resistencia en los bordes y regreso animado si el swipe no alcanza. Requiere `react-native-gesture-handler` (peer, `>=2.0.0`) y `@react-navigation/native` (peer, `>=7.0.0`).
- App de ejemplo con Expo SDK 57 en `example/`.
