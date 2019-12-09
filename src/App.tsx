import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CatalogueScreen from './screens/CatalogueScreen';
import DetailsScreen from './screens/DetailsScreen';
import ImageScreen from './screens/ImageScreen';
import NoInternetConnectionScreen from './screens/NoInternetConnectionScreen';

import { setNavigator } from './utils/navigationRef';
import colors from './constants/colors';

const switchNavigator = createSwitchNavigator({
  internetFlow: createStackNavigator({
    Catalogue: {
      screen: CatalogueScreen,
      navigationOptions: {
        header: null
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        header: null
      }
    },
    Images: {
      screen: ImageScreen,
      navigationOptions: {
        header: null
      }
    }
  }),
  noInternetFlow: createStackNavigator({
    NoInternet: {
      screen: NoInternetConnectionScreen,
      navigationOptions: {
        header: null
      }
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <App
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  );
};
