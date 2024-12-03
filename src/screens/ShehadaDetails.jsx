import { Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from '@expo/vector-icons';
import FloosImage from 'assets/images/floos.jpg';
import ScreenWrapper from 'components/General/ScreenWrapper';
import useShadow from 'hooks/useShadow';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import currencyFormat from 'utils/currencyFormat';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';
import getTodayDate from 'utils/getTodayDate';
import ButtonComponent from 'components/General/ButtonComponent';
import AlertModal from 'components/General/Popups/AlertModal';
import showSuccessMsg from 'hooks/showSuccessMsg';

const styles = StyleSheet.create({
  buttonPosition: {
    justifyContent: 'flex-end',
    position: 'absolute',
    right: -5,
    top: 10,
    width: '100%',
  },
  buttonsContainer: {
    backgroundColor: COLORS.light,
    borderBottomStartRadius: 30,
    borderTopStartRadius: 30,
    ...globalStyle.row,
    paddingStart: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 10,
    overflow: 'hidden',
  },
  dangerColorText: {
    color: COLORS.danger,
  },
  darkColorText: {
    color: COLORS.dark,
  },
  greenColorText: {
    color: COLORS.green,
  },
  imageStyle: {
    height: 200,
    width: '100%',
  },
  infoBox: {
    borderBottomColor: `${COLORS.secondary}55`,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 5,
  },
  infoText: {
    fontSize: 14,
    ...globalStyle.font600,
  },
  innerContainer: {
    padding: 10,
  },
  secondaryText: {
    color: COLORS.secondary,
    fontSize: 12,
    ...globalStyle.font600,
  },
  spaceStart: {
    marginStart: 15,
  },
  spaceTop20: {
    marginTop: 20,
  },
  title: {
    color: COLORS.dark,
    fontSize: 18,
    ...globalStyle.font700,
  },
});

function InfoRow({ icon, infoBlock }) {
  return (
    <View style={[globalStyle.row, styles.infoBox]}>
      {icon}
      <View style={[styles.spaceStart, globalStyle.fullSize]}>{infoBlock}</View>
    </View>
  );
}

export default function ShehadaDetails() {
  const navigation = useNavigation();
  const shadowStyle = useShadow();

  const shehadaId = useRoute()?.params?.shehadaId;
  const [shehadaDetails, setShehadaDetails] = useState(null);
  useFocusEffect(
    useCallback(() => {
      if (!shehadaId) return;

      ShehadatService.getOne(shehadaId)
        .then((res) => {
          setShehadaDetails(res);
        })
        .catch((err) => HandleErrors(err));
    }, [shehadaId]),
  );

  const interestInPercentage = shehadaDetails && shehadaDetails.interest / 100;

  const interestMoney = shehadaDetails
    && shehadaDetails.totalMoney
      * interestInPercentage
      * (shehadaDetails.type / 12);

  const numberOfDaysLeft = moment(shehadaDetails?.endDate).diff(
    moment(getTodayDate()),
    'days',
  );

  const warningCase = numberOfDaysLeft <= 30 ? COLORS.warning : COLORS.green;
  const shehadaColorCode = numberOfDaysLeft <= 0 ? COLORS.danger : warningCase;
  const daysLeftColorStyle = { color: shehadaColorCode };

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const onDeleteButtonClicked = () => {
    setIsAlertVisible(true);
  };

  const onConfirmDelete = () => {
    ShehadatService.deleteOne(shehadaId)
      .then(() => {
        showSuccessMsg('Deleted successfully!');
        navigation.goBack();
      })
      .catch((err) => HandleErrors(err));
  };

  const renewShehadaHandler = () => {
    navigation.navigate('addShehada', { shehadaDetails });
  };

  const ownerTextColorStyle = { color: shehadaDetails?.color };

  return (
    <ScreenWrapper spaceBetween>
      <View style={[styles.cardContainer, shadowStyle()]}>
        <View>
          <Image source={FloosImage} style={styles.imageStyle} />

          <View style={[globalStyle.row, styles.buttonPosition]}>
            <View style={styles.buttonsContainer}>
              <ButtonComponent
                IconCompoent={
                  <AntDesign name="delete" size={20} color={COLORS.danger} />
                }
                backgroundColor={COLORS.light}
                onPress={onDeleteButtonClicked}
              />
            </View>
          </View>
        </View>

        <View style={styles.innerContainer}>
          <CustomText style={styles.secondaryText}>
            {`Type: ${shehadaDetails?.type} Month`}
          </CustomText>
          <CustomText style={styles.title}>
            {`Total: ${currencyFormat(shehadaDetails?.totalMoney)}`}
          </CustomText>

          <View>
            {/* START DATE */}
            <InfoRow
              icon={(
                <FontAwesome
                  name="battery-full"
                  size={16}
                  color={COLORS.green}
                />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, styles.greenColorText]}>
                  {moment(shehadaDetails?.startDate).format('DD/MM/yyyy')}
                </CustomText>
              )}
            />

            {/* END DATE */}
            <InfoRow
              icon={(
                <FontAwesome
                  name="battery-empty"
                  size={16}
                  color={COLORS.danger}
                />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, styles.dangerColorText]}>
                  {moment(shehadaDetails?.endDate).format('DD/MM/yyyy')}
                </CustomText>
              )}
            />

            {/* INTEREST RATE */}
            <InfoRow
              icon={(
                <MaterialCommunityIcons
                  name="sack-percent"
                  size={22}
                  color={COLORS.dark}
                />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, styles.darkColorText]}>
                  {`${shehadaDetails?.interest} %`}
                </CustomText>
              )}
            />

            {/* OWNER */}
            <InfoRow
              icon={(
                <FontAwesome5
                  name="user-tie"
                  size={21}
                  color={shehadaDetails?.color}
                />
              )}
              infoBlock={(
                <CustomText
                  style={[
                    styles.infoText,
                    styles.darkColorText,
                    ownerTextColorStyle,
                  ]}
                >
                  {shehadaDetails?.name}
                </CustomText>
              )}
            />

            {/* INTEREST MONEY */}
            <InfoRow
              icon={(
                <MaterialCommunityIcons
                  name="hand-coin-outline"
                  size={24}
                  color={COLORS.dark}
                />
              )}
              infoBlock={(
                <View style={globalStyle.row}>
                  <CustomText style={[styles.infoText, styles.darkColorText]}>
                    {`${currencyFormat(interestMoney)}/ ${
                      shehadaDetails?.type
                    } month`}
                  </CustomText>
                </View>
              )}
            />

            {/* DAYS LEFT BEFORE EXPIRE */}
            <InfoRow
              icon={
                <AntDesign name="calendar" size={24} color={shehadaColorCode} />
              }
              infoBlock={(
                <CustomText style={[styles.infoText, daysLeftColorStyle]}>
                  {`${numberOfDaysLeft} Days Left`}
                </CustomText>
              )}
            />
          </View>
        </View>
      </View>

      <View style={styles.spaceTop20}>
        <ButtonComponent
          title="Renew this shehada"
          onPress={renewShehadaHandler}
          backgroundColor={COLORS.green}
        />
      </View>

      <AlertModal
        isModalVisible={isAlertVisible}
        setIsModalVisible={setIsAlertVisible}
        onConfirmation={onConfirmDelete}
        warningMessage="Are you sure you want to delete this shehada?!"
      />
    </ScreenWrapper>
  );
}
