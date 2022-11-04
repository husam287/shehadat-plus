import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import * as YUP from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactNativeModal from 'react-native-modal';
import { useForm } from 'react-hook-form';

import ButtonComponent from 'components/General/ButtonComponent';
import COLORS from 'constants/Colors';
import ControllableInput from 'components/General/Inputs/ControllableInput';
import OwnerService from 'services/OwnerService';
import HandleErrors from 'hooks/handleErrors';

const styles = StyleSheet.create({
  marginTop: { marginTop: 30 },
  modalContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 30,
    padding: 30,
  },
});

export default function OwnerNewEditModal({
  isModalVisible,
  setIsModalVisible,
  onSubmitListner = () => {},
  editMode,
  setEditMode,
  selectedOwner,
}) {
  const schema = YUP.object().shape({
    name: YUP.string().required(),
    color: YUP.string().required(),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isModalVisible) return;
    if (editMode) {
      reset({
        name: selectedOwner?.name,
        color: selectedOwner?.color,
      });
    } else {
      reset({ name: '', color: '' });
    }
  }, [isModalVisible, editMode, selectedOwner, reset]);

  const onDismissModal = () => {
    setIsModalVisible(false);
    setEditMode(false);
  };

  const onSubmit = (values) => {
    const request = editMode
      ? OwnerService.editOne({
        id: selectedOwner?.id,
        name: values?.name,
        color: values?.color,
      })
      : OwnerService.insertOne({
        name: values?.name,
        color: values?.color,
      });

    request
      .then(() => {
        onSubmitListner(true);
        onDismissModal();
      })
      .catch((err) => HandleErrors(err));
  };

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={onDismissModal}
    >
      <View style={styles.modalContainer}>
        <ControllableInput
          label="Owner Name"
          name="name"
          control={control}
          placeholderText="ex: Hossam"
        />

        <ControllableInput
          label="Color"
          name="color"
          control={control}
          placeholderText="ex: #000000"
        />

        <ButtonComponent
          buttonCustomStyle={styles.marginTop}
          title="Confirm"
          backgroundColor={COLORS.primary}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ReactNativeModal>
  );
}
