import {
  ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';
import showSuccessMsg from 'hooks/showSuccessMsg';
import OwnerService from 'services/OwnerService';
import InterestService from 'services/InterestService';
import CustomText from 'components/General/CustomText';
import globalStyle from 'constants/Styles';

const styles = StyleSheet.create({
  actionText: {
    marginTop: 10,
    paddingTop: 0,
    padding: 10,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    ...globalStyle.font600,
  },
  actionTextContainer: {
    ...globalStyle.row,
    justifyContent: 'space-around',
  },
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
    type: YUP.string().required(),
    owner: YUP.string().required(),
    startDate: YUP.string().required(),
    endDate: YUP.string().required().test(
      'date valid',
      'End date must be after start date',
      (value) => moment(YUP.ref('startDate')).isBefore(value),
    ),
  });
  const navigation = useNavigation();

  const shehadaDetails = useRoute()?.params?.shehadaDetails;
  const isEditMode = Boolean(shehadaDetails?.id);

  const {
    control, handleSubmit, setValue, getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEditMode
      ? {
        money: `${shehadaDetails?.totalMoney}`,
        profit: `${shehadaDetails?.interest}`,
        endDate: shehadaDetails?.endDate,
        startDate: shehadaDetails?.startDate,
        type: shehadaDetails?.type,
        owner: shehadaDetails?.ownerId,
      }
      : undefined,
  });

  const onAddTheInterests = (res) => {
    const startDate = moment(res.startDate);
    const endDate = moment(res.endDate);

    const interestYearMonths = Number(res.type) === 1 ? 12 : 4;
    const interestAmountOfMoney = (res.money * (res.interest / 100)) / interestYearMonths;

    const cloneOfStartDate = startDate.clone().set('date', endDate.date()).add(Number(res.type), 'months');

    const arrayOfInterests = [];

    while (cloneOfStartDate.isSameOrBefore(endDate)) {
      arrayOfInterests.push({
        shehadaId: res?.id,
        interestDate: cloneOfStartDate.format('yyyy-MM-DD'),
        moneyAmount: Number(interestAmountOfMoney?.toFixed(2)),
      });
      cloneOfStartDate.add(Number(res.type), 'months');
    }

    return InterestService.insertMany(arrayOfInterests);
  };

  const onAddShehadaHandler = (values) => {
    ShehadatService.insertInto({
      money: +values.money,
      interest: +values.profit,
      endDate: values?.endDate,
      startDate: values?.startDate,
      type: values?.type,
      ownerId: values?.owner,
    })
      .then((res) => onAddTheInterests(res))
      .then(() => {
        showSuccessMsg('New Shehada has been added successfully!');
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  const onEditShehada = (values) => {
    ShehadatService.editOne({
      id: shehadaDetails?.id,
      money: +values.money,
      interest: +values.profit,
      endDate: values?.endDate,
      startDate: values?.startDate,
      type: values?.type,
      ownerId: values?.owner,
    })
      .then(() => {
        showSuccessMsg('Edited successfully!');
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  const [owners, setOwners] = useState(null);
  useEffect(() => {
    OwnerService.getAll()
      .then((res) => {
        setOwners(res?.map((item) => ({ ...item, label: item?.name, value: item?.id })));
      })
      .catch((err) => HandleErrors(err));
  }, []);

  const addEndDateYears = (numberOfYears) => {
    const startDateValue = getValues('startDate');
    if (!startDateValue) return;

    const endDateValue = moment(startDateValue).clone().add(1, 'days').add(numberOfYears, 'years');
    setValue('endDate', endDateValue.format('yyyy-MM-DD'));
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
                data={owners}
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

          <View style={styles.actionTextContainer}>
            <TouchableOpacity onPress={() => addEndDateYears(1)}>
              <CustomText style={styles.actionText}>+1 year</CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addEndDateYears(3)}>
              <CustomText style={styles.actionText}>+3 years</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ButtonComponent
        buttonCustomStyle={styles.spacing}
        title={isEditMode ? 'Edit' : 'Add'}
        backgroundColor={COLORS.green}
        onPress={isEditMode ? handleSubmit(onEditShehada) : handleSubmit(onAddShehadaHandler)}
      />
    </ScreenWrapper>
  );
}
