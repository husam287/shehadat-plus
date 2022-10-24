import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';

import globalStyle from 'constants/Styles';
import COLORS from 'constants/Colors';
import CustomText from '../CustomText';
import ButtonComponent from '../ButtonComponent';

const styles = StyleSheet.create({
  buttonsContainer: {
    ...globalStyle.row,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  centering: {
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 30,
  },
  semiHalfWidth: { width: '48%' },
  warningTextStyle: {
    color: COLORS.danger,
    fontSize: 18,
    ...globalStyle.font400,
    lineHeight: 25,
    marginStart: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default function AlertModal({
  isModalVisible,
  setIsModalVisible,
  onConfirmation = () => {},
  warningMessage,
}) {
  const onDismissModal = () => {
    setIsModalVisible(false);
  };

  const onComfirmationClickHandler = () => {
    onConfirmation();
    onDismissModal();
  };

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={onDismissModal}
    >
      <View style={styles.modalContainer}>
        <View style={[globalStyle.row, styles.centering]}>
          <AntDesign name="warning" size={32} color={COLORS.danger} />
        </View>

        <CustomText style={styles.warningTextStyle}>
          {warningMessage}
        </CustomText>

        <View style={styles.buttonsContainer}>
          <View style={styles.semiHalfWidth}>
            <ButtonComponent
              title="Cancel"
              backgroundColor={COLORS.secondary}
              onPress={onDismissModal}
            />
          </View>
          <View style={styles.semiHalfWidth}>
            <ButtonComponent
              title="Confirm"
              backgroundColor={COLORS.danger}
              onPress={onComfirmationClickHandler}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
}
