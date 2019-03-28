import { Platform, Dimensions } from 'react-native';
import { SwiperTypes } from '../components/Swiper';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const swipeConfig = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
  swiperType: SwiperTypes.HORIZONTAL
};

const useReactotron = __DEV__;

export default {
  deviceWidth,
  deviceHeight,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isLargeDevice: deviceWidth > 360,
  isSmallDevice: deviceWidth <= 320,
  swipeConfig,
  useReactotron
};
