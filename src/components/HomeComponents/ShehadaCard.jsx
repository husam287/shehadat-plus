import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import CustomText from 'components/General/CustomText';
import moment from 'moment';
import Badge from 'components/General/Badge';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import currencyFormat from 'utils/currencyFormat';
import getTodayDate from 'utils/getTodayDate';

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
    for (let index = 1; index <= 12; index += Number(interestPeriod)) {
      periods.push(`${endDateDay}/${index}`);
    }
    return periods;
  }

  const interestCollectDates = getPeriods(endDate);
  const textColor = { color: COLORS.primary, fontSize: 16 };
  const formatedTotalMoney = currencyFormat(totalMoney);

  const numberOfDaysLeft = moment(endDate).diff(moment(getTodayDate()), 'days');

  const warningCase = numberOfDaysLeft <= 7 ? COLORS.warning : COLORS.light;
  const shehadaColorCode = numberOfDaysLeft <= 0 ? COLORS.danger : warningCase;
  const daysLeftColorStyle = { backgroundColor: shehadaColorCode };

  return (
    <TouchableOpacity onPress={onClick} style={[styles.shehadatBorder, daysLeftColorStyle]}>
      <View style={globalStyle.fullSize}>
        <View style={[globalStyle.row, styles.spaceBetween]}>
          <CustomText style={[textColor, globalStyle.font500]}>
            {`${interestPeriod} Month`}
          </CustomText>
          <CustomText style={[textColor, globalStyle.font700]}>
            {`${formatedTotalMoney}`}
          </CustomText>
          <CustomText style={[textColor, globalStyle.font500]}>
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
