import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import CatalogueScreen from './screens/CatalogueScreen';
import DetailsScreen from './screens/DetailsScreen';
import ImageScreen from './screens/ImageScreen';
import NoInternetConnectionScreen from './screens/NoInternetConnectionScreen';
import {StackParamList} from './utils/navigationTypes';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Catalogue"
            options={{headerShown: false}}
            component={CatalogueScreen}
          />
          <Stack.Screen
            name="Details"
            options={{headerShown: false}}
            component={DetailsScreen}
          />
          <Stack.Screen
            name="Image"
            options={{headerShown: false}}
            component={ImageScreen}
          />
          <Stack.Screen
            name="NoInternet"
            options={{headerShown: false}}
            component={NoInternetConnectionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
