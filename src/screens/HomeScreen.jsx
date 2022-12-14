import React, { useCallback, useState } from 'react';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';

import Metrics from 'constants/Metrics';
import globalStyle from 'constants/Styles';
import TotalAmountBlock from 'components/HomeComponents/TotalAmountBlock';
import ScreenWrapper from 'components/General/ScreenWrapper';
import ShehadaCard from 'components/HomeComponents/ShehadaCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';
import ShehadaAddButton from 'components/HomeComponents/ShehadaAddButton';
import OwnersTapbar from 'components/HomeComponents/OwnersTapbar';
import OwnerService from 'services/OwnerService';

const styles = StyleSheet.create({
  justifyBetween: {
    justifyContent: 'space-between',
  },
  screenPadding: {
    flex: 1,
    padding: Metrics.screenWidth * 0.056,
  },
  spaceBottom20: {
    marginBottom: 20,
  },
  spaceTop20: {
    marginTop: 20,
  },
  zeroPadding: {
    padding: 0,
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();
  const [owners, setOwners] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [shehadat, setShehadat] = useState(null);
  const [totalMoney, setTotalMoney] = useState(null);

  const onClickOnShehadaHandler = (id) => {
    navigation.navigate('shehadaDetails', { shehadaId: id });
  };

  const getAllShehadat = (ownerId) => {
    ShehadatService.getAll(ownerId)
      .then((res) => {
        setShehadat(res);
      })
      .catch((err) => HandleErrors(err));
  };

  const getTotalMoney = (ownerId) => {
    ShehadatService.getTotalMoneyAmount(ownerId)
      .then((res) => {
        setTotalMoney(res?.summationOfMoney);
      })
      .catch((err) => HandleErrors(err));
  };

  const gerOwners = () => {
    const allOwnerTag = { name: 'All', id: null };
    OwnerService.getAll()
      .then((res) => {
        setOwners([allOwnerTag, ...res]);
      })
      .catch((err) => HandleErrors(err));
  };

  useFocusEffect(
    useCallback(() => {
      gerOwners();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getTotalMoney(selectedTab);
      getAllShehadat(selectedTab);
    }, [selectedTab]),
  );

  return (
    <ScreenWrapper customStyle={styles.zeroPadding}>
      <OwnersTapbar
        data={owners}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <ScrollView style={styles.screenPadding}>
        <View style={[globalStyle.row, styles.justifyBetween]}>
          <TotalAmountBlock total={totalMoney} />
          <ShehadaAddButton />
        </View>

        <View style={[styles.spaceTop20, styles.spaceBottom20]}>
          {shehadat?.map((item) => (
            <ShehadaCard
              key={item?.id}
              totalMoney={item?.totalMoney}
              endDate={item?.endDate}
              interestPeriod={item?.type}
              interestRatio={item?.interest}
              colorTheme={item?.color}
              onClick={() => onClickOnShehadaHandler(item?.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
