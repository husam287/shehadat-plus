import React from 'react';
import { Calendar } from 'react-native-calendars';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import Icon from './Icon';

export const SelectedDateStyle = {
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

export default function CustomCalender(
  {
    minDate,
    current,
    onDayPress,
    onMonthChange,
    disableArrowLeft,
    markedDates,
  },
) {
  return (
    <Calendar
      minDate={minDate}
      current={current}
      theme={calendertheme}
      onDayPress={onDayPress}
      disableArrowLeft={disableArrowLeft}
      markedDates={markedDates}
      markingType="custom"
      hideExtraDays
      enableSwipeMonths
      disableAllTouchEventsForDisabledDays
      onMonthChange={onMonthChange}
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
  );
}
