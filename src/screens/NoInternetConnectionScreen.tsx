import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import sadBeer from '../assets/images/SadBeer512.png';
import colors from '../constants/colors';
import t from '../i18n/i18n';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../utils/navigationTypes';

/**
 * Screen component for a no internet connection notice.
 */
const NoInternetConnectionScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'NoInternet'>) => {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      handleConnectivityChange(state.isConnected!);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Connection listener function.
   */
  const handleConnectivityChange = (isConnected: boolean) => {
    if (isConnected) {
      // NetInfo.isConnected.removeEventListener(
      //   'connectionChange',
      //   handleConnectivityChange,
      // );
      navigation.navigate('Catalogue');
    }
  };

  return (
    <View style={styles.messageContainerStyle}>
      <Text
        style={styles.messageHeaderStyle}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {t.NO_INTERNET_CONNECTION}
      </Text>
      <Image style={styles.centeredImageStyle} source={sadBeer} />
      <Text style={styles.messageInstructionsStyle}>{t.PLEASE_CONNECT}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  centeredImageStyle: {
    height: 256,
    width: 256,
  },
  messageHeaderStyle: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 10,
  },
  messageInstructionsStyle: {
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 5,
    fontSize: 21,
  },
});

export default NoInternetConnectionScreen;
