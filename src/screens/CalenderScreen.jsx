import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import ScreenWrapper from 'components/General/ScreenWrapper';
import COLORS from 'constants/Colors';
import useShadow from 'hooks/useShadow';
import CustomCalender, { SelectedDateStyle } from 'components/General/CustomCalender';

const styles = StyleSheet.create({
  calenderCard: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    padding: 5,
  },
});

export default function CalenderScreen() {
  const shadowStyle = useShadow();
  const [selectedDates, setselectedDates] = useState({});
  const [currentMonthDate, setCurrentMonthDate] = useState(moment().format('yyyy-MM-DD'));
  const minDate = moment(new Date('2022-08-12')).format('yyyy-MM-DD');

  const markDateHandler = (day) => {
    setselectedDates((prevState) => {
      const newState = { ...prevState };
      newState[day] = SelectedDateStyle;
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
        <CustomCalender
          minDate={minDate}
          current={moment(new Date('2025-10-07')).format('yyyy-MM-DD')}
          onDayPress={onDayPressHandler}
          onMonthChange={(month) => {
            setCurrentMonthDate(`${month?.dateString}`);
          }}
          disableArrowLeft={isLeftArrowDisabled}
          markedDates={selectedDates}
        />
      </View>
    </ScreenWrapper>
  );
}
