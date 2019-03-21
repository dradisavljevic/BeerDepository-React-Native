import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import configureStore from './state/store';
import registerScreens from './navigation/screenRegistry';
import { setDefaultOptions, toCatalogue } from './navigation/navigations';

const store = configureStore({});
registerScreens(store);

type Props = {};
export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.startApp();
  }

  startApp = () => {
    // navigation and store config
    Navigation.events().registerAppLaunchedListener(() => {
      setDefaultOptions();
      toCatalogue();
    });
  };
}
