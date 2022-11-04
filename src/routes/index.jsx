import React, { useCallback, useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { login, setHasFinishSetup } from 'reducers/authReducer';
import useCheckNewUpdates from 'hooks/useCheckNewUpdate';
import COLORS from 'constants/Colors';
import NotificationListnerContainer from 'components/General/NotificationListnerContainer';
import GeneralDbService from 'services/GeneralDbService';
import HandleErrors from 'hooks/handleErrors';
import SnackbarComponent from 'components/General/SnackbarComponent';
import MainStack from './Stacks/MainStack';

function Route() {
  const isSignedIn = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useCheckNewUpdates();

  const initiallizeLang = async () => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  };

  const initAllTablesHandler = () => {
    GeneralDbService.initAllTables()
      .then(() => { })
      .catch((err) => HandleErrors(err));
  };

  const initOnBoardingFLow = useCallback(async () => {
    const hasFinishSetup = JSON.parse(await AsyncStorage.getItem('hasFinishSetup'));
    dispatch(setHasFinishSetup(hasFinishSetup));
  }, [dispatch]);

  // Non user login
  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('token');
      dispatch(login(userToken));
      initOnBoardingFLow();
      initiallizeLang();
      initAllTablesHandler();
    };

    bootstrapAsync();
  }, [dispatch, initOnBoardingFLow]);

  // User login
  useEffect(() => {
    if (isSignedIn) {
      // nothing here
    }
  }, [isSignedIn]);

  const navTheme = DefaultTheme;
  navTheme.colors.background = COLORS.light;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <NotificationListnerContainer>
          <MainStack />

          <SnackbarComponent />
        </NotificationListnerContainer>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Route;
