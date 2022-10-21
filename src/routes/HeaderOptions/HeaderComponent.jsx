import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons } from '@expo/vector-icons';

import CustomText from 'components/General/CustomText';
import globalStyle from 'constants/Styles';
import COLORS from 'constants/Colors';
import useShadow from 'hooks/useShadow';

const styles = StyleSheet.create({
  headerStyle: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: getStatusBarHeight(),
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 22,
    ...globalStyle.font500,
  },
  spacing: { padding: 5 },
});

function HeaderComponent({ navigation, title, hasBackArrow }) {
  const shadowStyle = useShadow();
  return (
    <View style={[styles.headerStyle, shadowStyle()]}>
      {hasBackArrow && navigation?.canGoBack() && (
      <TouchableOpacity
        style={styles.spacing}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-chevron-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      )}

      <View>
        <CustomText style={styles.headerTitle}>{title}</CustomText>
      </View>
    </View>
  );
}

export default HeaderComponent;
