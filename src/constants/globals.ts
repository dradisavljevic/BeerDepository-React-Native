import { Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  deviceWidth,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isLargeDevice: deviceWidth > 360,
  isSmallDevice: deviceWidth <= 320
};

export const useReactotron = __DEV__;
