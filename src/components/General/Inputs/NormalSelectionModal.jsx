import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';

import CustomText from 'components/General/CustomText';
import LoadingComponent from 'components/General/LoadingComponent';
import globalStyle from 'constants/Styles';
import Metrics from 'constants/Metrics';
import COLORS from 'constants/Colors';
import PureInput from './PureInput';

const styles = StyleSheet.create({
  countryText: {
    color: COLORS.primary,
    fontSize: 18,
    ...globalStyle.font400,
    marginStart: 10,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 30,
  },
  spacing: {
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

function NormalSelectionModal({
  data,
  onChange,
  onBlur,
  value,
  label,
  error,
  placeholderText,
  containerStyle,
  style,
  customInputStyle,
  isLoading,
  disabled,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onShowModal = () => {
    setIsModalVisible(true);
  };
  const onDismissModal = () => {
    setIsModalVisible(false);
  };

  const onSelectItem = (selectedItem) => {
    onChange(selectedItem?.value);
    onDismissModal();
  };

  const ModalMarkup = (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={onDismissModal}
    >
      <View style={styles.modalContainer}>
        <FlatList
          style={{ height: Metrics.screenHeight / 3 }}
          keyExtractor={(_) => _?.value}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectItem(item)}
              style={[
                globalStyle.row,
                styles.spacing,
              ]}
            >
              <CustomText style={styles.countryText}>
                {item.label}
              </CustomText>
            </TouchableOpacity>
          )}
        />
      </View>
    </ReactNativeModal>
  );

  const inputCustomColor = !disabled ? COLORS.primary : COLORS.grey;
  return (
    <View>
      <TouchableOpacity disabled={isLoading || disabled} onPress={onShowModal}>
        <PureInput
          editable={false}
          label={label}
          customColor={inputCustomColor}
          placeholderText={placeholderText}
          onBlur={onBlur}
          error={error}
          value={data?.find((item) => item?.value === value)?.label}
          style={style}
          containerStyle={containerStyle}
          customInputStyle={customInputStyle}
          suffix={
            !isLoading
              ? (
                <Entypo
                  name="chevron-down"
                  size={18}
                  color={inputCustomColor}
                />
              )
              : <LoadingComponent />
        }
        />
      </TouchableOpacity>

      {ModalMarkup}
    </View>
  );
}

export default NormalSelectionModal;
