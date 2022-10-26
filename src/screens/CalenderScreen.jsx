import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import ScreenWrapper from 'components/General/ScreenWrapper';
import COLORS from 'constants/Colors';
import useShadow from 'hooks/useShadow';
import CustomCalender, { SelectedDateStyle } from 'components/General/CustomCalender';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import InterestService from 'services/InterestService';
import HandleErrors from 'hooks/handleErrors';

const styles = StyleSheet.create({
  calenderCard: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    padding: 5,
  },
});

export default function CalenderScreen() {
  const navigation = useNavigation();

  const shadowStyle = useShadow();
  const [selectedDates, setselectedDates] = useState({});
  const [currentMonthDate, setCurrentMonthDate] = useState(moment().format('yyyy-MM-DD'));
  const minDate = moment(new Date('2022-08-12')).format('yyyy-MM-DD');

  const [interestDates, setInterestDates] = useState(null);
  useFocusEffect(
    useCallback(() => {
      InterestService.getAllUniqueInterestDates()
        .then((res) => {
          setInterestDates(res?.map((item) => item.interestDate));
        })
        .catch((err) => HandleErrors(err));
    }, []),
  );

  const markDateHandler = (days) => {
    setselectedDates((prevState) => {
      const newState = { ...prevState };
      days?.forEach((element) => {
        newState[element] = SelectedDateStyle;
      });
      return newState;
    });
  };

  useEffect(() => {
    if (!interestDates) return;

    markDateHandler(interestDates);
  }, [interestDates]);

  const onDayPressHandler = (unformatedDay) => {
    const day = unformatedDay.dateString;
    if (!interestDates?.includes(day)) return;

    navigation.navigate('collectInterestsScreen', { interestDate: day });
  };

  const isLeftArrowDisabled = moment(currentMonthDate).isSameOrBefore(moment(minDate));

  return (
    <ScreenWrapper>
      <View style={[styles.calenderCard, shadowStyle()]}>
        <CustomCalender
          minDate={minDate}
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
