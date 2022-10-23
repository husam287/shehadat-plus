import { StyleSheet, View } from 'react-native';
import React from 'react';
import globalStyle from 'constants/Styles';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import CustomText from 'components/General/CustomText';
import ButtonComponent from 'components/General/ButtonComponent';
import COLORS from 'constants/Colors';
import useShadow from 'hooks/useShadow';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    margin: 3,
    marginBottom: 15,
    overflow: 'hidden',
    padding: 10,
  },
  justifyAround: { justifyContent: 'space-around' },
  nameStyle: {
    fontSize: 16,
    marginStart: 10,
    ...globalStyle.font600,
  },
});

export default function OwnerCard({
  index,
  name,
  color,
  onEditButtonClicked = () => {},
  onDeleteButtonClicked = () => {},
}) {
  const textColor = { color };
  const shadowStyle = useShadow();

  return (
    <View style={[styles.cardContainer, shadowStyle()]}>
      <View style={globalStyle.row}>
        <FontAwesome name="user-circle-o" size={32} color={color} />

        <CustomText style={[styles.nameStyle, textColor]}>
          {`${index}- ${name}`}
        </CustomText>
      </View>

      <View style={[globalStyle.row, styles.justifyAround]}>
        <ButtonComponent
          IconCompoent={<FontAwesome name="edit" size={24} color={COLORS.dark} />}
          backgroundColor={COLORS.warning}
          onPress={onEditButtonClicked}
        />
        <ButtonComponent
          IconCompoent={<AntDesign name="deleteuser" size={24} color={COLORS.light} />}
          backgroundColor={COLORS.danger}
          onPress={onDeleteButtonClicked}
        />
      </View>
    </View>
  );
}
