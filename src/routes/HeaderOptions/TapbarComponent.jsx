import { View } from 'react-native';
import React from 'react';

import globalStyle from 'constants/Styles';
import CustomText from 'components/General/CustomText';
import Icon from 'components/General/Icon';
import COLORS from 'constants/Colors';

function TapbarComponent({
  isFocused, title, tabWidth, iconName, iconComponent,
}) {
  const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: tabWidth,
  };

  const textStyle = {
    color: isFocused ? COLORS.primary : COLORS.grey,
    fontSize: 12,
    marginTop: 6,
  };

  return (
    <View style={containerStyle}>
      {iconComponent || (
      <Icon
        name={iconName}
        size={24}
        color={isFocused ? COLORS.primary : COLORS.grey}
      />
      )}
      {title ? <CustomText style={[textStyle, globalStyle.font500]}>{title}</CustomText> : null}
    </View>
  );
}

export default TapbarComponent;
