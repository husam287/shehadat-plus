import React, { useEffect, useState } from 'react';
import {
  FlatList, ScrollView, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Metrics from 'constants/Metrics';
import globalStyle from 'constants/Styles';
import COLORS from 'constants/Colors';
import TotalAmountBlock from 'components/HomeComponents/TotalAmountBlock';
import ScreenWrapper from 'components/General/ScreenWrapper';
import ButtonComponent from 'components/General/ButtonComponent';
import ShehadaCard from 'components/HomeComponents/ShehadaCard';
import CustomText from 'components/General/CustomText';
import { useNavigation } from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';

const styles = StyleSheet.create({
  justifyBetween: {
    justifyContent: 'space-between',
  },
  labelStyle: {
    color: COLORS.secondary,
    fontSize: 14,
    textTransform: 'capitalize',
    ...globalStyle.font500,
    textAlign: 'center',
  },
  screenPadding: {
    padding: Metrics.screenWidth * 0.056,
  },
  spaceTop20: {
    marginTop: 20,
  },
  tabStyle: {
    height: 30,
    paddingHorizontal: 20,
    width: Metrics.screenWidth / 3.5,
  },
  zeroPadding: {
    padding: 0,
  },
});

function AddShehadaButton() {
  const navigation = useNavigation();
  return (
    <ButtonComponent
      IconCompoent={<AntDesign name="plus" size={21} color={COLORS.light} />}
      backgroundColor={COLORS.green}
      onPress={() => navigation.navigate('addShehada')}
    />
  );
}

function Tab({ title, isSelected, onClick = () => {} }) {
  const colorStyle = { color: isSelected ? COLORS.primary : COLORS.secondary };
  const activeBorder = {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: isSelected ? 1 : 0,
  };

  return (
    <TouchableOpacity onPress={onClick} style={[styles.tabStyle, activeBorder]}>
      <CustomText style={[styles.labelStyle, colorStyle]}>{title}</CustomText>
    </TouchableOpacity>
  );
}

function TabBar({ data, selectedTab, setSelectedTab }) {
  return (
    <View style={styles.spaceTop20}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Tab
            title={item}
            isSelected={item === selectedTab}
            onClick={() => setSelectedTab(item)}
          />
        )}
      />
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');

  const onClickOnShehadaHandler = (id) => {
    navigation.navigate('shehadaDetails', { shehadaId: id });
  };

  useEffect(() => {
    ShehadatService.createTable()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => HandleErrors(err));
  }, []);

  const onTest = () => {
    ShehadatService.getAll()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => HandleErrors(err));
  };

  const onTest2 = () => {
    ShehadatService.insertInto({
      money: 100000,
      type: 1,
      interest: 18,
      startDate: '2022-10-22',
      endDate: '2022-11-30',
    })
      .then(() => {
        console.log('Success Added!');
      })
      .catch((err) => HandleErrors(err));
  };

  return (
    <ScreenWrapper customStyle={styles.zeroPadding}>
      <TabBar
        data={['All', 'Me', 'Sherif', 'Children']}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <ScrollView style={styles.screenPadding}>
        <View style={[globalStyle.row, styles.justifyBetween]}>
          <TotalAmountBlock total={300000} />
          <AddShehadaButton />
        </View>

        <ButtonComponent
          title="Test"
          onPress={onTest}
        />

        <ButtonComponent
          title="Test2"
          onPress={onTest2}
        />
        <View style={styles.spaceTop20}>
          <ShehadaCard
            totalMoney={200000}
            endDate="2023-10-28"
            interestPeriod={1}
            interestRatio={18}
            onClick={() => onClickOnShehadaHandler('2')}
          />
          <ShehadaCard
            totalMoney={200000}
            endDate="2023-10-28"
            interestPeriod={1}
            interestRatio={18}
            onClick={() => onClickOnShehadaHandler('2')}
          />
          <ShehadaCard
            totalMoney={200000}
            endDate="2023-10-28"
            interestPeriod={1}
            interestRatio={18}
            onClick={() => onClickOnShehadaHandler('2')}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
