import { StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from 'components/General/ScreenWrapper';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';

const styles = StyleSheet.create({
  ss: {
    color: COLORS.dark,
  },
});

export default function AddShehadaScreen() {
  return (
    <ScreenWrapper>
      <CustomText style={styles.ss}>hiiii</CustomText>
    </ScreenWrapper>
  );
}
