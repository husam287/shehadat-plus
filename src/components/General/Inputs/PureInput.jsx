import React, { useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  I18nManager,
} from 'react-native';

import globalStyle from 'constants/Styles';
import useShadow from 'hooks/useShadow';
import COLORS from 'constants/Colors';
import CustomText from '../CustomText';

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },
  errorText: {
    ...globalStyle.font400,
    color: COLORS.danger,
    fontSize: 12,
  },
  hintText: {
    color: COLORS.secondary,
    fontSize: 14,
    ...globalStyle.font400,
  },
  input: {
    color: COLORS.primary,
    flex: 1,
    fontSize: 14,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    textAlignVertical: 'center',
    width: '100%',
    ...globalStyle.font400,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 15,
  },
  labelText: {
    color: COLORS.dark,
    ...globalStyle.font500,
  },
  mainContainer: {
    marginHorizontal: 5,
    marginTop: 23,
  },
  showPasswordIcon: {
    elevation: 20,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
  },
  spaceAround: { marginHorizontal: 5 },
});

export default function PureInput({
  error,
  editable = true,
  customContainerStyle,
  prefix,
  suffix,
  value,
  onChange,
  onBlur = () => {},
  placeholderText,
  inputType,
  placeholderTextColor = COLORS.grey,
  keyboard = 'default',
  autoCompleteType,
  maxLength,
  customColor,
  textArea,
  customInputStyle,
  style,
  hintText,
  label,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const hasErrors = Boolean(error);
  const shadowStyle = useShadow();

  const ErrorSectionMarkup = (
    <View>
      {hasErrors && <CustomText style={styles.errorText}>{error}</CustomText>}
      {hintText && !hasErrors && (
        <View style={globalStyle.row}>
          <FontAwesome
            name="exclamation"
            size={14}
            color={COLORS.secondary}
            style={styles.spaceAround}
          />
          <CustomText style={styles.hintText}>{hintText}</CustomText>
        </View>
      )}
    </View>
  );

  const PasswordIconMarkup = inputType === 'password' && (
    <View style={styles.showPasswordIcon}>
      <TouchableOpacity
        onPress={() => {
          setShowPassword(false);
        }}
      >
        {showPassword && (
          <Ionicons name="md-eye-outline" size={24} color={COLORS.primary} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowPassword(true);
        }}
      >
        {!showPassword && (
          <Ionicons
            name="md-eye-off-outline"
            size={24}
            color={COLORS.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const pointerEventValue = editable === false && Platform.OS === 'ios' ? 'none' : 'auto';

  const inputContainerStyles = [
    styles.inputContainer,
    { ...customContainerStyle },
    shadowStyle(40, 0.25),
    hasErrors && styles.errorBorder,
  ];

  const inputStyles = [
    styles.input,
    customInputStyle && { ...customInputStyle },
    !editable && { color: customColor || COLORS.secondary }, // override color when disabled
  ];

  const placeholderTextColorValue = placeholderTextColor || COLORS.grey;

  return (
    <View style={[styles.mainContainer, style]}>
      {label ? <CustomText style={styles.labelText}>{label}</CustomText> : null}
      <View pointerEvents={pointerEventValue} style={inputContainerStyles}>
        {prefix || null}

        <TextInput
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholderText}
          value={value}
          textContentType={inputType}
          secureTextEntry={inputType === 'password' && !showPassword}
          placeholderTextColor={placeholderTextColorValue}
          keyboardType={keyboard}
          autoCompleteType={autoCompleteType}
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={maxLength}
          editable={editable}
          multiline={Boolean(textArea)}
          numberOfLines={textArea ? 5 : 1}
          style={inputStyles}
        />

        {/* ONLY FOR SELECTION INPUT */}
        {suffix || null}

        {/* SHOW PASSWORD */}
        {PasswordIconMarkup}
      </View>

      {ErrorSectionMarkup}
    </View>
  );
}
