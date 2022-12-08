import React from 'react';
import colors from '../constants/colors';
import globals from '../constants/globals';
import t from '../i18n/i18n';
import {StyleSheet, View, Text} from 'react-native';

/**
 * Offline notice status bar component.
 */
const OfflineNotice = () => (
  <View style={styles.offlineNoticeContainerStyle}>
    <Text style={styles.offlineNoticeTextStyle}>
      {t.NO_INTERNET_CONNECTION}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  offlineNoticeContainerStyle: {
    backgroundColor: colors.wineRed,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: globals.deviceWidth,
  },
  offlineNoticeTextStyle: {
    color: colors.white,
  },
});

export default OfflineNotice;
