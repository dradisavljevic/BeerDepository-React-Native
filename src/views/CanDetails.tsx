import React, { Component } from 'react';
import { NetInfo, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// @ts-ignore
import styled from 'styled-components';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import GestureRecognizer from 'react-native-swipe-gestures';

import { CanState } from '../state/modules/cans/types';
import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import * as actions from '../state/modules/cans/actions';
import { toImageScreen, toNoConnectionScreen } from '../navigation/navigations';
import { CLIENT_ID } from '../constants/authorization';

import colors from '../constants/colors';
import { detailsTopBar } from '../navigation/utils';
import { Spinner } from '../components';
import { If } from '../utils/helpers';
import OfflineNotice from '../components/OfflineNotice';
import globals from '../constants/globals';

type PropsFromState = CanState;

type PropsFromDispatch = {
  getAlbumImages: typeof actions.getAlbumImages.request;
  extractCanDetails: typeof actions.extractCanDetails;
};

type Props = PropsFromState & PropsFromDispatch;
class CanDetails extends Component<Props> {
  state = {
    componentId: '',
    clicked: false,
    isConnected: NetInfo.isConnected.fetch()
  };

  onSwipeRight() {
    const index = this.props.data.findIndex(x => x.id === this.props.can.id);
    console.log(index);
    if (index !== 0) {
      const newCan = this.props.data[index - 1];
      this.props.extractCanDetails(newCan);
      Navigation.mergeOptions(this.state.componentId, {
        // @ts-ignore
        topBar: detailsTopBar(newCan.title)
      });
    }
  }

  onSwipeLeft() {
    const index = this.props.data.findIndex(x => x.id === this.props.can.id);
    console.log(index);
    console.log(this.props.data.length);
    if (index !== this.props.data.length - 1) {
      const newCan = this.props.data[index + 1];
      this.props.extractCanDetails(newCan);
      Navigation.mergeOptions(this.state.componentId, {
        // @ts-ignore
        topBar: detailsTopBar(newCan.title)
      });
    }
  }

  private mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (this.mounted) {
        this.setState({ componentId: componentId });
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.mounted = false;
  }

  handleConnectivityChange = (isConnected: boolean) => {
    this.setState({ isConnected: isConnected });
  };

  render() {
    const { can } = this.props;

    const swipeConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <If
        condition={this.props.loading}
        then={<Spinner />}
        else={
          <GestureRecognizer
            onSwipeLeft={() => this.onSwipeLeft()}
            onSwipeRight={() => this.onSwipeRight()}
            config={swipeConfig}
            style={{
              flex: 1,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <If condition={this.state.clicked && !this.state.isConnected && globals.isAndroid} then={<OfflineNotice />} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ clicked: true });
                if (can.album != '') {
                  const request = {
                    clientID: CLIENT_ID,
                    albumID: can.album,
                    componentID: this.state.componentId,
                    title: can.title
                  };
                  this.props.getAlbumImages(request);
                } else {
                  toImageScreen(this.state.componentId, [{ url: can.link }], can.title);
                }
              }}
            >
              <FastImage
                source={{ uri: can.link, priority: FastImage.priority.normal }}
                style={{ width: 220, height: 300, marginTop: 20 }}
              />
            </TouchableOpacity>

            <BrandText>{can.brand}</BrandText>
            <InfoText>{can.info}</InfoText>
            <Delimiter />
            <KeyValueTextPair>
              <BoldAttributeName>Country of Origin: </BoldAttributeName>
              <AttributeValue>{can.origin}</AttributeValue>
            </KeyValueTextPair>
            <KeyValueTextPair>
              <BoldAttributeName>Bought in: </BoldAttributeName>
              <AttributeValue>{can.bought}</AttributeValue>
            </KeyValueTextPair>
            <KeyValueTextPair>
              <BoldAttributeName>Can Color: </BoldAttributeName>
              <AttributeValue>{can.color}</AttributeValue>
            </KeyValueTextPair>
            <KeyValueTextPair>
              <BoldAttributeName>Size: </BoldAttributeName>
              <AttributeValue>{can.quantity}</AttributeValue>
            </KeyValueTextPair>
            <KeyValueTextPair>
              <BoldAttributeName>Ownership: </BoldAttributeName>
              <AttributeValue>{can.ownership}</AttributeValue>
            </KeyValueTextPair>
          </GestureRecognizer>
        }
      />
    );
  }
}

const BoldAttributeName = styled.Text`
  font-weight: bold;
  color: ${colors.darkCharcoal};
  font-size: 16;
`;

const AttributeValue = styled.Text`
  font-size: 16;
  color: ${colors.darkCharcoal};
`;

const Delimiter = styled.View`
  border-bottom-color: ${colors.black};
  border-bottom-width: 1;
  width: 70%;
  margin-vertical: 10;
`;

const KeyValueTextPair = styled.View`
  flex-direction: row;
`;

const BrandText = styled.Text`
  font-size: 32;
  color: ${colors.darkCharcoal};
  margin-vertical: 10;
`;

const InfoText = styled.Text`
  font-size: 22;
  color: ${colors.darkCharcoal};
  text-align: center;
`;

const mapStateToProps = (state: RootState) => getCanState(state);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAlbumImages: actions.getAlbumImages.request,
      extractCanDetails: actions.extractCanDetails
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanDetails);
