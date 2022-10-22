import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import * as YUP from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ScreenWrapper from 'components/General/ScreenWrapper';
import COLORS from 'constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import ButtonComponent from 'components/General/ButtonComponent';
import ControllableInput from 'components/General/Inputs/ControllableInput';
import NormalSelectionModal from 'components/General/Inputs/NormalSelectionModal';

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
    money: YUP.string().required(),
    profit: YUP.string().required(),
    type: YUP.object().required(),
    owner: YUP.string().required(),
    startDate: YUP.string().required(),
    endDate: YUP.string().required(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onAddShehadaHandler = (values) => {
    console.log(values);
  };

  return (
    <ScreenWrapper spaceBetween>
      <ScrollView>
        <View style={styles.spaceBottom}>
          <ControllableInput
            style={styles.marginTop0}
            label="Money"
            name="money"
            control={control}
            placeholderText="Ex: 10000"
          />

          <ControllableInput
            style={styles.marginTop0}
            label="Profit in %"
            name="profit"
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
                data={[{ label: 'hi', value: 'ko' }, { label: 'ko', value: 'j' }]}
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
                data={[{ label: 'hi', value: 'ko' }, { label: 'ko', value: 'j' }]}
                placeholderText="Owner"
              />
            )}
          />

          <ControllableInput
            style={styles.marginTop0}
            label="Start Date"
            name="startDate"
            control={control}
            placeholderText="Start date"
          />

          <ControllableInput
            style={styles.marginTop0}
            label="End Date"
            name="endDate"
            control={control}
            placeholderText="End date"
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
