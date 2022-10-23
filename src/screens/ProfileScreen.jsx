import React from 'react';
import {
  Image, ScrollView, StyleSheet, View,
} from 'react-native';

import ClickableRow from 'components/General/ClickableRow';
import ScreenWrapper from 'components/General/ScreenWrapper';
import MyPhoto from 'assets/images/profile-image.jpeg';
import Metrics from 'constants/Metrics';
import CustomText from 'components/General/CustomText';
import globalStyle from 'constants/Styles';
import GeneralDbService from 'services/GeneralDbService';

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
function ProfileScreen() {
  const onTakeBackup = () => {
  // nothing yet
  };

  const onLoadBackup = () => {
  // nothing yet
    GeneralDbService.removeDb();
  };

  const onEditOwners = () => {
    // nothing yet
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
