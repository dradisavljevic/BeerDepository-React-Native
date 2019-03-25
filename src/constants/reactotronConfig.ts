import Reactotron from 'reactotron-react-native';
// @ts-ignore
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
// @ts-ignore
import apisaucePlugin from 'reactotron-apisauce';
import { useReactotron } from './globals';

if (useReactotron) {
  Reactotron.configure({
    // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
    name: 'Beer Depository' // would you like to see your app's name?,
  })
    .useReactNative()
    .use(reduxPlugin())
    // @ts-ignore
    .use(sagaPlugin())
    .use(apisaucePlugin({}))
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // @ts-ignore
  console.tron = Reactotron;
}
