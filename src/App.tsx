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
// @ts-ignore
import styled from 'styled-components';
import colors from './constants/colors';
import { ALBUM_ID, CLIENT_ID } from './constants/authorization';
import Catalogue from './views/Catalogue';
import SplashScreen from './views/SplashScreen';

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
      clientID: CLIENT_ID,
      albumID: ALBUM_ID
    };
    this.props.getAllCans(request);
  }
  render() {
    let { catalogue } = this.props;
    catalogue = catalogue.sort(function(a, b) {
      return a.title > b.title ? 1 : -1;
    });
    console.log(catalogue);
    return <Catalogue data={catalogue} />;
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
  }
});

const ButtonFooter = styled.View`
  width: 100%;
  height: 90;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  flex-direction: row;
`;

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
