import {
  Image, StyleSheet, View,
} from 'react-native';
import React from 'react';
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
  return (
    <ScreenWrapper>
      <View style={[styles.cardContainer, shadowStyle()]}>
        <Image
          source={FloosImage}
          style={styles.imageStyle}
        />

        <View style={styles.innerContainer}>
          <CustomText style={styles.secondaryText}>
            {`Type: ${'1 Month'}`}
          </CustomText>
          <CustomText style={styles.title}>
            {`Total: ${currencyFormat('600000')}`}
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
                  {moment(new Date('2022-03-24')).format('DD/MM/yyyy')}
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
                  {moment(new Date('2022-03-24')).format('DD/MM/yyyy')}
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
                  {`${'18'} %`}
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
                    {`${'22'}/ ${'1'} month`}
                  </CustomText>
                  <CustomText style={[styles.infoText, styles.darkColorText]}>
                    {`${'66'}/ ${'3'} month`}
                  </CustomText>
                </View>
                )}
            />

            {/* DAYS LEFT BEFORE EXPIRE */}
            <InfoRow
              icon={(
                <AntDesign name="calendar" size={24} color={COLORS.green} />
              )}
              infoBlock={(
                <CustomText style={[styles.infoText, styles.greenColorText]}>
                  {`${'22'} Days Left`}
                </CustomText>
                )}
            />
          </View>
        </View>
      </View>

    </ScreenWrapper>
  );
}
