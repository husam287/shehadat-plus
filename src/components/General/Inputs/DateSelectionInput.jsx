import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import globalStyle from 'constants/Styles';
import ReactNativeModal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

import COLORS from 'constants/Colors';
import { Calendar } from 'react-native-calendars';
import PureInput from './PureInput';
import Icon from '../Icon';
import ButtonComponent from '../ButtonComponent';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 30,
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

export default function DateSelectionInput(
  {
    onChange,
    onBlur,
    value,
    label,
    error,
    placeholderText,
    containerStyle,
    style,
    customInputStyle,
    minDate,
  },
) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onShowModal = () => {
    setIsModalVisible(true);
  };

  const onDismissModal = () => {
    setIsModalVisible(false);
  };

  const onSelectDate = (unformatedDay) => {
    const day = unformatedDay.dateString;
    const selectedObject = {};
    selectedObject[day] = selectedDateStyle;
    setSelectedDay(selectedObject);
  };

  const confirmSelectionDay = () => {
    onChange(Object.keys(selectedDay)?.[0]);
    onDismissModal();
  };

  const ModalMarkup = (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={onDismissModal}
    >
      <View style={styles.modalContainer}>
        <Calendar
          minDate={minDate}
          theme={calendertheme}
          onDayPress={onSelectDate}
          markingType="custom"
          hideExtraDays
          markedDates={selectedDay}
          enableSwipeMonths
          disableAllTouchEventsForDisabledDays
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

        <ButtonComponent
          title="Confirm"
          backgroundColor={COLORS.primary}
          onPress={confirmSelectionDay}
        />
      </View>
    </ReactNativeModal>
  );

  return (
    <View>
      <TouchableOpacity onPress={onShowModal}>
        <PureInput
          editable={false}
          label={label}
          customColor={COLORS.primary}
          placeholderText={placeholderText}
          onBlur={onBlur}
          error={error}
          value={value}
          style={style}
          containerStyle={containerStyle}
          customInputStyle={customInputStyle}
          suffix={<MaterialIcons name="date-range" size={24} color={COLORS.primary} />}
        />
      </TouchableOpacity>

      {ModalMarkup}
    </View>
  );
}
