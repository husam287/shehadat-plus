import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import * as YUP from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ScreenWrapper from 'components/General/ScreenWrapper';
import COLORS from 'constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import ButtonComponent from 'components/General/ButtonComponent';
import ControllableInput from 'components/General/Inputs/ControllableInput';
import NormalSelectionModal from 'components/General/Inputs/NormalSelectionModal';
import DateSelectionInput from 'components/General/Inputs/DateSelectionInput';
import { useNavigation } from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';
import showSuccessMsg from 'hooks/showSuccessMsg';

const styles = StyleSheet.create({
  marginTop0: {
    marginTop: 5,
  },
  spaceBottom: {
    marginBottom: 10,
  },
  spacing: {
    marginTop: 10,
  },
});

export default function AddShehadaScreen() {
  const schema = YUP.object().shape({
    money: YUP.number().required().moreThan(0),
    profit: YUP.number().required().moreThan(0),
    type: YUP.object().required(),
    owner: YUP.object().required(),
    startDate: YUP.string().required(),
    endDate: YUP.string().required().test(
      'date valid',
      'End date must be after start date',
      (value) => moment(YUP.ref('startDate')).isBefore(value),
    ),
  });

  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onAddShehadaHandler = (values) => {
    ShehadatService.insertInto({
      money: values?.money,
      interest: values?.profit,
      endDate: values?.endDate,
      startDate: values?.startDate,
      type: values?.type?.value,
    })
      .then(() => {
        showSuccessMsg('New Shehada has been added successfully!');
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  return (
    <ScreenWrapper spaceBetween>
      <ScrollView>
        <View style={styles.spaceBottom}>
          <ControllableInput
            style={styles.marginTop0}
            label="Money"
            name="money"
            keyboard="number-pad"
            control={control}
            placeholderText="Ex: 10000"
          />

          <ControllableInput
            style={styles.marginTop0}
            label="Profit in %"
            name="profit"
            keyboard="number-pad"
            control={control}
            placeholderText="Ex: 18"
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <NormalSelectionModal
                style={styles.marginTop0}
                label="Type"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
                data={[{ label: '1 Month', value: 1 }, { label: '3 Months', value: 3 }]}
                placeholderText="Type"
              />
            )}
          />

          <Controller
            control={control}
            name="owner"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <NormalSelectionModal
                style={styles.marginTop0}
                label="Owner"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
                data={[{ label: 'Me', value: 1 }, { label: 'Children', value: 2 }, { label: 'Sherif', value: 3 }, { label: 'Teta', value: 4 }]}
                placeholderText="Owner"
              />
            )}
          />

          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <DateSelectionInput
                style={styles.marginTop0}
                label="Start Date"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
                placeholderText="Start date"
              />
            )}
          />

          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <DateSelectionInput
                style={styles.marginTop0}
                label="End Date"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
                placeholderText="End date"
              />
            )}
          />
        </View>
      </ScrollView>

      <ButtonComponent
        buttonCustomStyle={styles.spacing}
        title="Add"
        backgroundColor={COLORS.green}
        onPress={handleSubmit(onAddShehadaHandler)}
      />
    </ScreenWrapper>
  );
}
