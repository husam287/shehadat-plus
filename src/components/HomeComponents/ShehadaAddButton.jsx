import { AntDesign } from '@expo/vector-icons';
import React from 'react';

import ButtonComponent from 'components/General/ButtonComponent';
import COLORS from 'constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ShehadaAddButton() {
  const navigation = useNavigation();

  return (
    <ButtonComponent
      IconCompoent={<AntDesign name="plus" size={21} color={COLORS.light} />}
      backgroundColor={COLORS.green}
      onPress={() => navigation.navigate('addShehada')}
    />
  );
}
