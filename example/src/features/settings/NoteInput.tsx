import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { usePalette } from '@/context/palette';

import { dimens } from '@/styles';

const NoteInput = (): React.JSX.Element => {
    const { palette } = usePalette();
    const [note, setNote] = useState('');

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: palette.surface,
                borderColor: palette.border,
            }}
        >
            <Text style={{ ...styles.title, color: palette.text }}>Ocultar con el teclado</Text>
            <Text style={{ ...styles.description, color: palette.textMuted }}>
                Esta tab usa tabBarHideOnKeyboard: escribe algo y la barra se oculta.
            </Text>
            <TextInput
                accessibilityLabel="Nota"
                placeholder="Escribe una nota"
                placeholderTextColor={palette.textMuted}
                value={note}
                style={{ ...styles.input, color: palette.text, borderColor: palette.border }}
                onChangeText={setNote}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        gap: dimens.spacingXs,
        padding: dimens.spacingMd,
        borderRadius: dimens.radiusMd,
        borderWidth: dimens.borderWidth,
    },
    title: {
        fontSize: dimens.bodyFontSize,
        fontWeight: '600',
    },
    description: {
        fontSize: dimens.captionFontSize,
    },
    input: {
        minHeight: dimens.minTouchTarget,
        paddingHorizontal: dimens.spacingSm,
        borderRadius: dimens.radiusMd,
        borderWidth: dimens.borderWidth,
        fontSize: dimens.bodyFontSize,
    },
});

export default NoteInput;
