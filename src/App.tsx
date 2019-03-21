import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './state/modules/cans/actions';
import { RootState } from './state/store';
import { getCanState } from './state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { CanState } from './state/modules/cans/types';
import { ALBUM_ID, CLIENT_ID } from './constants/authorization';
import Catalogue from './views/Catalogue';

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
    if (this.props.data.length === 0) {
      this.props.getAllCans(request);
    }
  }

  render() {
    let { catalogue } = this.props;
    return <Catalogue displayedData={catalogue} />;
  }
}

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
