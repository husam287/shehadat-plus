import {
  FlatList, StyleSheet, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from 'components/General/ScreenWrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import InterestService from 'services/InterestService';
import HandleErrors from 'hooks/handleErrors';
import Badge from 'components/General/Badge';
import COLORS from 'constants/Colors';
import ShehadaRow from 'components/CollectMoneyComponents/ShehadaRow';
import ButtonComponent from 'components/General/ButtonComponent';
import globalStyle from 'constants/Styles';
import showSuccessMsg from 'hooks/showSuccessMsg';
import CustomText from 'components/General/CustomText';
import currencyFormat from 'utils/currencyFormat';

const styles = StyleSheet.create({
  badgeContainer: {
    marginVertical: 10,
  },
  btnsContainer: {
    ...globalStyle.row,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  semiFullSpace: {
    width: '48%',
  },
  totalText: {
    color: COLORS.dark,
    fontSize: 18,
    textAlign: 'center',
    ...globalStyle.font600,
  },
});

export default function CollectInterestsScreen() {
  const navigation = useNavigation();

  const interestDate = useRoute()?.params?.interestDate;
  const [interests, setInterests] = useState(null);

  useEffect(() => {
    InterestService.getAllGroupedByDate(interestDate)
      .then((res) => {
        const formatedResult = res?.map((item) => ({
          ...item,
          moneyAmounts: item.moneyAmounts.split(','),
          shehadaIds: item.shehadaIds.split(','),
          shehadatMoneyList: item.shehadatMoneyList.split(','),
          owners: item.owners.split(','),
        }));

        setInterests(formatedResult);
      })
      .catch((err) => HandleErrors(err));
  }, [interestDate]);

  const onCollectAllPreviousDays = () => {
    InterestService.deleteAllBeforeOrAt(interestDate)
      .then(() => {
        showSuccessMsg(`All profits before ${interestDate} have been collected!`);
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  const onCollectThisDayOnly = () => {
    InterestService.deleteByDate(interestDate)
      .then(() => {
        showSuccessMsg(`${interestDate} day has been collected!`);
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  const totalInterestMoney = interests?.reduce(
    (partialSum, a) => +partialSum + a.moneySummation,
    0,
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={interests}
        keyExtractor={(item) => (item?.id)}
        renderItem={({ item }) => (
          <View>
            <View style={styles.badgeContainer}>
              <Badge bgColor={COLORS.dark} text={item?.interestDate} />
            </View>

            {item?.shehadaIds?.map((shehadaId, index) => (
              <ShehadaRow
                key={shehadaId}
                shehadaId={shehadaId}
                profit={item?.moneyAmounts[index]}
                shehadaMoney={item?.shehadatMoneyList[index]}
                owner={item?.owners[index]}
              />
            ))}
          </View>
        )}
      />

      <View>
        <CustomText style={styles.totalText}>
          {`Total: ${currencyFormat(totalInterestMoney)}`}
        </CustomText>
        <View style={styles.btnsContainer}>
          <View style={styles.semiFullSpace}>
            <ButtonComponent
              title="Collect All Previous"
              backgroundColor={COLORS.primary}
              onPress={onCollectAllPreviousDays}
            />
          </View>
          <View style={styles.semiFullSpace}>
            <ButtonComponent
              backgroundColor="transparent"
              color={COLORS.primary}
              borderColor={COLORS.primary}
              title="Collect Day"
              onPress={onCollectThisDayOnly}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
