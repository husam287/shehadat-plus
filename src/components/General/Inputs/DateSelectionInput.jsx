import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

import COLORS from 'constants/Colors';
import Metrics from 'constants/Metrics';
import PureInput from './PureInput';
import ButtonComponent from '../ButtonComponent';
import CustomCalender, { SelectedDateStyle } from '../CustomCalender';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 30,
    height: Metrics.screenHeight / 1.55,
    justifyContent: 'space-between',
    padding: 30,
  },
});

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
    selectedObject[day] = SelectedDateStyle;
    setSelectedDay(selectedObject);
  };

  const confirmSelectionDay = () => {
    onChange(Object.keys(selectedDay)?.[0]);
    onDismissModal();
  };

  useEffect(() => {
    if (!isModalVisible) return;
    if (!value) return;

    onSelectDate({ dateString: value });
  }, [isModalVisible, value]);

  const ModalMarkup = (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={onDismissModal}
    >
      <View style={styles.modalContainer}>
        <CustomCalender
          minDate={minDate}
          current={value}
          onDayPress={onSelectDate}
          markedDates={selectedDay}
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
