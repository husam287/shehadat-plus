import React from 'react';
import {
  Image, ScrollView, StyleSheet, View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import ClickableRow from 'components/General/ClickableRow';
import ScreenWrapper from 'components/General/ScreenWrapper';
import MyPhoto from 'assets/images/profile-image.jpeg';
import Metrics from 'constants/Metrics';
import CustomText from 'components/General/CustomText';
import globalStyle from 'constants/Styles';
import GeneralDbService from 'services/GeneralDbService';
import { useNavigation } from '@react-navigation/native';

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
    expoClientId: '546000886518-di658hgds3k96q603iqiuuev67h4rocn.apps.googleusercontent.com',
    androidClientId: '546000886518-aa9cleto3u0q15fm4d4vuj975tkt2862.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appfolder',
    ],
  });

  const navigation = useNavigation();

  const onTakeBackup = async () => {
    // GeneralDbService.removeDb();
    const result = await promptAsync();
    if (result.type === 'success') {
      GeneralDbService.uploadDbToGoogleDrive(result.authentication.accessToken);
    }
  };

  const onLoadBackup = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      GeneralDbService.getDbFromGoogleDrive(result.authentication.accessToken);
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
            onPress={onTakeBackup}
          />

          <ClickableRow
            text="Load a backup"
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
