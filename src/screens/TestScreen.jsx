import { Text, View } from 'react-native';
import React from 'react';
import Icon from 'components/General/Icon';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import ScreenWrapper from 'components/General/ScreenWrapper';

function TestScreen() {
  return (
    <ScreenWrapper>
      <View style={globalStyle.row}>
        <Text>hiiii</Text>
        <Icon name="user" size={14} color={COLORS.dangerTextColor} />
      </View>
    </ScreenWrapper>
  );
}

export default TestScreen;
