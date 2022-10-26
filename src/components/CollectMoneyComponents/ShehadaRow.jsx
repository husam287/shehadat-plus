import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import COLORS from 'constants/Colors';
import CustomText from 'components/General/CustomText';
import { useNavigation } from '@react-navigation/native';
import globalStyle from 'constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginEnd: 10,
    paddingVertical: 5,
  },
  greenTextStyle: {
    color: COLORS.green,
    fontSize: 14,
  },
  mainContainer: {
    borderBottomColor: `${COLORS.secondary}44`,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textStyle: {
    color: COLORS.dark,
    fontSize: 14,
  },
});

export default function ShehadaRow({
  shehadaMoney,
  owner,
  profit,
  shehadaId,
}) {
  const navigation = useNavigation();

  const goToShehada = () => {
    navigation.navigate('shehadaDetails', { shehadaId });
  };

  return (
    <TouchableOpacity onPress={goToShehada}>
      <View style={[globalStyle.row, styles.mainContainer]}>
        <View style={styles.container}>
          <CustomText style={styles.textStyle}>{shehadaMoney}</CustomText>
          <CustomText style={styles.textStyle}>{owner}</CustomText>
          <CustomText style={styles.greenTextStyle}>{`+${profit}`}</CustomText>
        </View>

        <Ionicons name="chevron-forward-outline" size={24} color={COLORS.secondary} />
      </View>
    </TouchableOpacity>
  );
}
