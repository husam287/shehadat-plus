import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import CustomText from 'components/General/CustomText';
import moment from 'moment';
import Badge from 'components/General/Badge';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import currencyFormat from 'utils/currencyFormat';

const styles = StyleSheet.create({
  badgeContainer: {
    marginBottom: 5,
    marginEnd: 5,
  },
  flexWrapCenter: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shehadatBorder: {
    alignItems: 'center',
    borderBottomColor: `${COLORS.secondary}44`,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});

export default function ShehadaCard({
  interestPeriod,
  totalMoney,
  interestRatio,
  endDate,
  colorTheme = COLORS.primary,
  onClick = () => {},
}) {
  function getPeriods() {
    const periods = [];
    const endDateDay = moment(endDate).date();
    for (let index = 1; index <= 12; index += 1) {
      periods.push(`${endDateDay}/${index}`);
    }
    return periods;
  }

  const interestCollectDates = getPeriods(endDate);
  const textColor = { color: colorTheme };
  const formatedTotalMoney = currencyFormat(totalMoney);

  return (
    <TouchableOpacity onPress={onClick} style={styles.shehadatBorder}>
      <View style={globalStyle.fullSize}>
        <View style={[globalStyle.row, styles.spaceBetween]}>
          <CustomText style={textColor}>
            {`${interestPeriod} Month`}
          </CustomText>
          <CustomText style={[textColor, globalStyle.font700]}>
            {`${formatedTotalMoney}`}
          </CustomText>
          <CustomText style={textColor}>
            {`${interestRatio}%`}
          </CustomText>
        </View>
        <View style={[globalStyle.row, styles.flexWrapCenter]}>
          {interestCollectDates?.map((item) => (
            <Badge
              key={item}
              containerStyle={styles.badgeContainer}
              bgColor={colorTheme}
              text={item}
            />
          ))}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
    </TouchableOpacity>
  );
}
