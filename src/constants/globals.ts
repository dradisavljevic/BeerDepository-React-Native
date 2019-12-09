import { Platform, Dimensions } from 'react-native';
import { SwiperTypes } from '../components/Swiper';

/**
 * Global configuration file.
 */
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const swipeConfig = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
  swiperType: SwiperTypes.HORIZONTAL
};

export default {
  deviceWidth,
  deviceHeight,
  swipeConfig,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isLargeDevice: deviceWidth > 360,
  isSmallDevice: deviceWidth <= 320
};
