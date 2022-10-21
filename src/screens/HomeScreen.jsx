import React, { useState } from 'react';
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
  return (
    <ButtonComponent
      IconCompoent={<AntDesign name="plus" size={24} color={COLORS.light} />}
      backgroundColor={COLORS.green}
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
    <View>
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
