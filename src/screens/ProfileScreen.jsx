import React, { useState } from 'react';
import {
  Image, ScrollView, StyleSheet, View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';

import ClickableRow from 'components/General/ClickableRow';
import ScreenWrapper from 'components/General/ScreenWrapper';
import MyPhoto from 'assets/images/profile-image.jpeg';
import Metrics from 'constants/Metrics';
import CustomText from 'components/General/CustomText';
import globalStyle from 'constants/Styles';
import GoogleDriveService from 'services/GoogleDriveService';
import IMPORTANT_VARS from 'constants/ImportantVars';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 1.5,
    width: Metrics.screenWidth / 1.5,
  },
  jobTitle: {
    marginTop: -12,
    ...globalStyle.font600,
  },
  name: {
    fontSize: 24,
    ...globalStyle.font600,
  },
});

WebBrowser.maybeCompleteAuthSession();

function ProfileScreen() {
  const [, , promptAsync] = Google.useAuthRequest({
    expoClientId: IMPORTANT_VARS.GOOGLE_EXPO_CLIENT_ID,
    androidClientId: IMPORTANT_VARS.GOOGLE_ANDROID_CLIENT_ID,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appfolder',
    ],
  });

  const navigation = useNavigation();

  const [isTakingBackupLoading, setIsTakingBackupLoading] = useState(false);
  const onTakeBackup = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      setIsTakingBackupLoading(true);
      GoogleDriveService.uploadDbToGoogleDrive(result.authentication.accessToken)
        .finally(() => { setIsTakingBackupLoading(false); });
    }
  };

  const [isLoadBackupLoading, setIsLoadBackupLoading] = useState(false);
  const onLoadBackup = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      setIsLoadBackupLoading(true);
      GoogleDriveService.getDbFromGoogleDrive(result.authentication.accessToken)
        .finally(() => { setIsLoadBackupLoading(false); });
    }
  };

  const onEditOwners = () => {
    navigation.navigate('editOwners');
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.centering}>
          <Image style={styles.imageStyle} source={MyPhoto} />
          <CustomText style={styles.name}>Hossam Sherif</CustomText>
          <CustomText style={styles.jobTitle}>Frontend Developer</CustomText>
        </View>

        <View>
          <ClickableRow
            text="Take a backup"
            isLoading={isTakingBackupLoading}
            onPress={onTakeBackup}
          />

          <ClickableRow
            text="Load a backup"
            isLoading={isLoadBackupLoading}
            onPress={onLoadBackup}
          />

          <ClickableRow
            text="Edit Owners"
            onPress={onEditOwners}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

export default ProfileScreen;
