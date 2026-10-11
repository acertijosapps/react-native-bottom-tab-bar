import { StyleSheet, Text, View } from 'react-native';

import { usePalette } from '@/context/palette';

import { dimens } from '@/styles';

export type InfoCardProps = {
    title: string;
    description: string;
};

const InfoCard = ({ title, description }: InfoCardProps): React.JSX.Element => {
    const { palette } = usePalette();

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: palette.surface,
                borderColor: palette.border,
            }}
        >
            <Text style={{ ...styles.title, color: palette.text }}>{title}</Text>
            <Text style={{ ...styles.description, color: palette.textMuted }}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        gap: dimens.spacingXs,
        padding: dimens.spacingLg,
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
});

export default InfoCard;
