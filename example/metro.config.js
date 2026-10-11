const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const libraryRoot = path.resolve(__dirname, '..');
const libraryPackage = require('../package.json');

const escapePath = (value) => value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

const config = getDefaultConfig(__dirname);

config.watchFolders = [libraryRoot];

// La librería se resuelve desde su código fuente (`../src`), no desde `lib/`, para ver los
// cambios con Fast Refresh sin correr `bob build`.
// `tsconfigPaths` está apagado en app.json: los `paths` del tsconfig existen solo para que
// TypeScript lea los tipos de los peers desde este example; el alias `@/` se resuelve aquí.
// El `node_modules` de la raíz se bloquea para que react, react-native y los peers se
// resuelvan una sola vez, desde el `node_modules` de este example.
config.resolver.blockList = [
    new RegExp(`^${escapePath(path.join(libraryRoot, 'node_modules'))}\\/.*$`),
];
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules')];

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
    const resolve = defaultResolveRequest ?? context.resolveRequest;

    if (moduleName === libraryPackage.name) {
        return { type: 'sourceFile', filePath: path.join(libraryRoot, 'src', 'index.ts') };
    }

    if (moduleName.startsWith('@/')) {
        return resolve(context, path.join(__dirname, 'src', moduleName.slice(2)), platform);
    }

    return resolve(context, moduleName, platform);
};

module.exports = config;
