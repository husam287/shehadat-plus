import {
  FlatList, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from 'components/General/ScreenWrapper';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import OwnerCard from 'components/OwnersComponents/OwnerCard';
import OwnerService from 'services/OwnerService';
import HandleErrors from 'hooks/handleErrors';
import ButtonComponent from 'components/General/ButtonComponent';
import OwnerNewEditModal from 'components/OwnersComponents/OwnerNewEditModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  addNewOwnerText: {
    color: COLORS.green,
    padding: 20,
    textDecorationLine: 'underline',
  },
  centering: {
    alignItems: 'center',
  },
  marginTop20: {
    marginTop: 20,
  },
  welcomeDetailsText: {
    color: COLORS.secondary,
    fontSize: 16,
    textAlign: 'center',
  },
  welcomeTitle: {
    color: COLORS.primary,
    fontSize: 21,
    ...globalStyle.font700,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [owners, setOwners] = useState(null);
  const getOwners = () => {
    OwnerService.getAll()
      .then((res) => {
        setOwners(res);
      })
      .catch((err) => HandleErrors(err));
  };

  useEffect(() => {
    getOwners();
  }, []);

  const [isNewControlModalVisible, setIsNewControlModalVisible] = useState(false);
  const showOwnersControlModal = () => {
    setIsNewControlModalVisible(true);
  };

  const continueToMainScreen = () => {
    AsyncStorage.setItem('hasFinishSetup', JSON.stringify(true));
    navigation.dispatch(
      StackActions.replace('HomeStack'),
    );
  };

  return (
    <ScreenWrapper spaceBetween>
      <View>
        <CustomText style={styles.welcomeTitle}>
          Welcome To Shehadat Plus
        </CustomText>
        <CustomText style={styles.welcomeDetailsText}>
          First, You must add at least one owner.
        </CustomText>

        <View style={styles.marginTop20}>
          <FlatList
            data={owners}
            keyExtractor={(item) => item?.id}
            renderItem={({ item, index }) => (
              <OwnerCard
                name={item?.name}
                color={item?.color}
                index={index + 1}
                hideButtons
              />
            )}
          />
        </View>

        <View style={styles.centering}>
          <TouchableOpacity onPress={showOwnersControlModal}>
            <CustomText style={styles.addNewOwnerText}>
              + Add New Owner
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ButtonComponent
          title="Continue"
          disabled={!owners?.length}
          backgroundColor={COLORS.primary}
          onPress={continueToMainScreen}
        />
      </View>

      <OwnerNewEditModal
        isModalVisible={isNewControlModalVisible}
        setIsModalVisible={setIsNewControlModalVisible}
        onSubmitListner={() => getOwners()}
      />
    </ScreenWrapper>
  );
}
