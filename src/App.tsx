import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import configureStore from './state/store';
import registerScreens from './navigation/screenRegistry';
import { setDefaultOptions, toCatalogue } from './navigation/navigations';
import SplashScreen from 'react-native-splash-screen';

const store = configureStore({});
registerScreens(store);

type Props = {};
export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.startApp();
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  startApp = () => {
    // navigation and store config
    Navigation.events().registerAppLaunchedListener(() => {
      setDefaultOptions();
      toCatalogue();
    });
  };
}
