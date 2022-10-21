import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

import ScreenWrapper from 'components/General/ScreenWrapper';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import Icon from 'components/General/Icon';
import useShadow from 'hooks/useShadow';

const styles = StyleSheet.create({
  calenderCard: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    padding: 5,
  },
});

const selectedDateStyle = {
  selected: true,
  marked: true,
};

const calendertheme = {
  todayTextColor: COLORS.primary,
  dayTextColor: COLORS.secondary,
  arrowColor: COLORS.primary,
  monthTextColor: COLORS.primary,
  textMonthFontFamily: globalStyle.font600.fontFamily,
  textDayHeaderFontFamily: globalStyle.font600.fontFamily,
  selectedDayBackgroundColor: COLORS.dark,
  selectedDayTextColor: COLORS.light,
  selectedDotColor: COLORS.light,
};

export default function CalenderScreen() {
  const shadowStyle = useShadow();
  const [selectedDates, setselectedDates] = useState({});
  const [currentMonthDate, setCurrentMonthDate] = useState(moment().format('yyyy-MM-DD'));
  const minDate = moment(new Date('2022-08-12')).format('yyyy-MM-DD');

  const markDateHandler = (day) => {
    setselectedDates((prevState) => {
      const newState = { ...prevState };
      newState[day] = selectedDateStyle;
      return newState;
    });
  };

  const onDayPressHandler = (unformatedDay) => {
    const day = unformatedDay.dateString;
    markDateHandler(day);
  };

  const isLeftArrowDisabled = moment(currentMonthDate).isSameOrBefore(moment(minDate));

  return (
    <ScreenWrapper>
      <View style={[styles.calenderCard, shadowStyle()]}>
        <Calendar
          minDate={minDate}
          current={moment(new Date('2025-10-07')).format('yyyy-MM-DD')}
          theme={calendertheme}
          onDayPress={onDayPressHandler}
          markingType="custom"
          hideExtraDays
          enableSwipeMonths
          disableAllTouchEventsForDisabledDays
          onMonthChange={(month) => {
            setCurrentMonthDate(`${month?.dateString}`);
          }}
          disableArrowLeft={isLeftArrowDisabled}
          markedDates={selectedDates}
          renderArrow={(direction) => (direction === 'left' ? (
            <Icon
              name="right-arrow"
              size={16}
              color={COLORS.primary}
              style={{
                transform: [{ scaleX: -1 }],
              }}
            />
          ) : (
            <Icon
              name="right-arrow"
              size={16}
              color={COLORS.primary}
            />
          ))}
        />
      </View>
    </ScreenWrapper>
  );
}
