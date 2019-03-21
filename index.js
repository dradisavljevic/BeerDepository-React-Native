/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from 'react-native-navigation';
import configureStore from "./src/state/store";
import registerScreens from "./src/navigation/screenRegistry";
import {toCatalogue} from "./src/navigation/navigations";
import colors from "./src/constants/colors";

const store = configureStore({});
registerScreens(store);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      animate: false,
    },
    layout: {
      backgroundColor: colors.white,
      orientation: ['portrait'],
    },
  });
  toCatalogue();
});
