import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from 'constants/Colors';
import globalStyle from 'constants/Styles';
import CustomText from './CustomText';

const styles = StyleSheet.create({
  centering: {
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.secondary,
    fontSize: 14,
    marginStart: 5,
  },
});

export default function EmptyComponent({ text }) {
  return (
    <View style={[globalStyle.row, styles.centering]}>
      <AntDesign name="inbox" size={18} color={Colors.secondary} />
      <CustomText style={styles.textStyle}>{text}</CustomText>
    </View>
  );
}
