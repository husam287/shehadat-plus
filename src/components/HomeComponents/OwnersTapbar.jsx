import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import Metrics from 'constants/Metrics';

const styles = StyleSheet.create({
  labelStyle: {
    color: COLORS.secondary,
    fontSize: 14,
    textTransform: 'capitalize',
    ...globalStyle.font500,
    textAlign: 'center',
  },
  spaceTop20: {
    marginTop: 20,
  },
  tabStyle: {
    height: 30,
    paddingHorizontal: 20,
    width: Metrics.screenWidth / 3.5,
  },
});

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

export default function OwnersTapbar({ data, selectedTab, setSelectedTab }) {
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
