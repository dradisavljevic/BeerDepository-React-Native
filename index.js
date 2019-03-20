/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from 'react-native-navigation';
import configureStore from "./src/state/store";
import registerScreens from "./src/navigation/screenRegistry";
import {toCatalogue} from "./src/navigation/navigations";

const store = configureStore({});
registerScreens(store);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      animate: false,
    },
    layout: {
      backgroundColor: '#FFFFFF',
      orientation: ['portrait'],
    },
  });
  toCatalogue();
});
