import React from 'react';
import HeaderComponent from './HeaderComponent';

export default function RouterOption({
  navigation, title, tabBarIcon, isModal,
}) {
  return {
    title,
    header: () => (
      <HeaderComponent
        title={title}
        navigation={navigation}
        hasBackArrow={navigation?.canGoBack && !tabBarIcon}
        isModal={isModal}
      />
    ),
    tabBarIcon,
    headerShown: Boolean(title),
  };
}
