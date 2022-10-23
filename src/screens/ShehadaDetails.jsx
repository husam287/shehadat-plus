import {
  Image, StyleSheet, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign,
} from '@expo/vector-icons';
import FloosImage from 'assets/images/floos.jpg';
import ScreenWrapper from 'components/General/ScreenWrapper';
import useShadow from 'hooks/useShadow';
import CustomText from 'components/General/CustomText';
import COLORS from 'constants/Colors';
import globalStyle from 'constants/Styles';
import currencyFormat from 'utils/currencyFormat';
import { useRoute } from '@react-navigation/native';
import ShehadatService from 'services/ShehadatService';
import HandleErrors from 'hooks/handleErrors';
import getTodayDate from 'utils/getTodayDate';

const styles = StyleSheet.create({
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
  justifyAround: {
    justifyContent: 'space-around',
  },
  secondaryText: {
    color: COLORS.secondary,
    fontSize: 12,
    ...globalStyle.font600,
  },
  spaceStart: {
    marginStart: 15,
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
      <View style={[styles.spaceStart, globalStyle.fullSize]}>
        {infoBlock}
      </View>
    </View>
  );
}

export default function ShehadaDetails() {
  const shadowStyle = useShadow();

  const shehadaId = useRoute()?.params?.shehadaId;
  const [shehadaDetails, setShehadaDetails] = useState(null);
  useEffect(() => {
    if (!shehadaId) return;

    ShehadatService.getOne(shehadaId)
      .then((res) => {
        setShehadaDetails(res);
      })
      .catch((err) => HandleErrors(err));
  }, [shehadaId]);

  const interestInPercentage = shehadaDetails && (shehadaDetails.interest / 100);

  const interestMoneyPerMonth = shehadaDetails
  && ((shehadaDetails.totalMoney * interestInPercentage) / 12);

  const interestMoneyPerQuarterYear = shehadaDetails
  && ((shehadaDetails.totalMoney * interestInPercentage) / 4);

  const numberOfDaysLeft = moment(shehadaDetails?.endDate).diff(moment(getTodayDate()), 'days');

  const warningCase = numberOfDaysLeft <= 30 ? COLORS.warning : COLORS.green;
  const shehadaColorCode = numberOfDaysLeft <= 0 ? COLORS.danger : warningCase;
  const daysLeftColorStyle = { color: shehadaColorCode };

  return (
    <ScreenWrapper>
      <View style={[styles.cardContainer, shadowStyle()]}>
        <Image
          source={FloosImage}
          style={styles.imageStyle}
        />

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
                <FontAwesome5 name="user-tie" size={21} color={COLORS.dark} />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, styles.darkColorText]}>
                  ME
                </CustomText>
                )}
            />

            {/* INTEREST MONEY */}
            <InfoRow
              icon={(
                <MaterialCommunityIcons name="hand-coin-outline" size={24} color={COLORS.dark} />
              )}
              infoBlock={(
                <View style={[globalStyle.row, styles.justifyAround]}>
                  <CustomText style={[styles.infoText, styles.darkColorText]}>
                    {`${currencyFormat(interestMoneyPerMonth)}/ ${'1'} month`}
                  </CustomText>
                  <CustomText style={[styles.infoText, styles.darkColorText]}>
                    {`${currencyFormat(interestMoneyPerQuarterYear)}/ ${'3'} month`}
                  </CustomText>
                </View>
                )}
            />

            {/* DAYS LEFT BEFORE EXPIRE */}
            <InfoRow
              icon={(
                <AntDesign name="calendar" size={24} color={shehadaColorCode} />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, daysLeftColorStyle]}>
                  {`${numberOfDaysLeft} Days Left`}
                </CustomText>
                )}
            />
          </View>
        </View>
      </View>

    </ScreenWrapper>
  );
}
