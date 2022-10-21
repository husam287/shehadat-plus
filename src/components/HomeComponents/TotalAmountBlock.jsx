import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import currencyFormat from 'utils/currencyFormat';

const styles = StyleSheet.create({
  greenText: {
    color: COLORS.green,
    ...globalStyle.font600,
  },
});

export default function TotalAmountBlock({ total = 0 }) {
  return (
    <View>
      <CustomText style={styles.greenText}>
        Total:
      </CustomText>
      <CustomText style={styles.greenText}>
        {currencyFormat(total)}
      </CustomText>
    </View>
  );
}
