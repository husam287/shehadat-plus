import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from 'components/General/ScreenWrapper';
import { useRoute } from '@react-navigation/native';
import InterestService from 'services/InterestService';
import HandleErrors from 'hooks/handleErrors';
import Badge from 'components/General/Badge';
import COLORS from 'constants/Colors';
import ShehadaRow from 'components/CollectMoneyComponents/ShehadaRow';

const styles = StyleSheet.create({
  badgeContainer: {
    marginVertical: 10,
  },
});

export default function CollectInterestsScreen() {
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

  return (
    <ScreenWrapper>

      <ScrollView>
        {interests?.map((item) => (
          <View key={item?.id}>
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

        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
