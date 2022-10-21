import { StyleSheet, View } from 'react-native';
import React from 'react';
import COLORS from 'constants/Colors';
import CustomText from './CustomText';

const styles = StyleSheet.create({
  badgeContainer: {
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: COLORS.light,
    fontSize: 12,
  },
});

export default function Badge({ text, bgColor, containerStyle }) {
  const backgroundColorStyle = { backgroundColor: bgColor };

  return (
    <View style={[styles.badgeContainer, backgroundColorStyle, containerStyle]}>
      <CustomText style={styles.textStyle}>
        {text}
      </CustomText>
    </View>
  );
}
