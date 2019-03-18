/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './state/modules/cans/actions';
import { RootState } from './state/store';
import { getCanState } from './state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { CanState } from './state/modules/cans/types';
import NavigationButton from './components/NavigationButton';
import t from './i18n/i18n';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type PropsFromState = CanState;

type PropsFromDispatch = {
  getAllCans: typeof actions.geAllCans.request;
};

type Props = PropsFromDispatch & PropsFromState;
class App extends Component<Props> {
  componentDidMount() {
    const request = {
      clientID: 'SHHH',
      albumID: 'SHH'
    };
    this.props.getAllCans(request);
  }
  render() {
    const { catalogue } = this.props;
    console.log(catalogue);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.bottomView}>
          <NavigationButton onPress={() => {}}>{t.PREV_BUTTON.toUpperCase()}</NavigationButton>
          <NavigationButton onPress={() => {}}>{t.NEXT_BUTTON.toUpperCase()}</NavigationButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  bottomView: {
    width: '100%',
    height: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row'
  }
});

const mapStateToProps = (state: RootState) => getCanState(state);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllCans: actions.geAllCans.request
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
