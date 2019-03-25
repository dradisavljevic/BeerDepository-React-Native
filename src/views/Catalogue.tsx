import { FlatList, NetInfo, Text, View } from 'react-native';
import { Component } from 'react';
import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import GestureRecognizer from 'react-native-swipe-gestures';

import { CanState, imageData } from '../state/modules/cans/types';
import { CatalogueItem, NavigationButton, Spinner, TopBarWithSearchBar } from '../components';
import { toDetailsScreen, toNoConnectionScreen } from '../navigation/navigations';
import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../state/modules/cans/actions';
import { If } from '../utils/helpers';

import colors from '../constants/colors';
import t from '../i18n/i18n';

type OwnProps = {
  displayedData: imageData[];
};

type PropsFromState = CanState;

type PropsFromDispatch = {
  extractCanDetails: typeof actions.extractCanDetails;
};

type State = {
  page: number;
  content: imageData[];
  pageNumber: number;
  componentId: string;
};

type Props = OwnProps & PropsFromState & PropsFromDispatch;
class Catalogue extends Component<Props, State> {
  state = {
    page: 0,
    content: this.props.displayedData,
    pageNumber: this.props.displayedData.length === 0 ? 0 : Math.floor((this.props.displayedData.length - 1) / 10),
    componentId: ''
  };
  private flatListRef: FlatList<imageData> | null | undefined;
  private mounted: boolean = false;
  componentDidMount() {
    this.mounted = true;
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.mounted = false;
  }

  handleConnectivityChange = (isConnected: boolean) => {
    if (!isConnected && this.props.data.length === 0) {
      toNoConnectionScreen();
    }
  };

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.displayedData != this.props.displayedData && this.mounted) {
      let size = 0;
      if (nextProps.displayedData.length !== 0) {
        size = nextProps.displayedData.length - 1;
      }
      this.setState({ content: nextProps.displayedData, pageNumber: Math.floor(size / 10), page: 0 });
    }
  }

  onSwipeRight() {
    if (this.state.page !== 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  onSwipeLeft() {
    if (this.state.page !== this.state.pageNumber) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  constructor(props: Props) {
    super(props);

    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (this.mounted) {
        this.setState({ componentId: componentId });
      }
    });
  }

  render() {
    const { content, page } = this.state;
    const swipeConfig = {
      velocityThreshold: 0.7,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        onSwipeLeft={() => this.onSwipeLeft()}
        onSwipeRight={() => this.onSwipeRight()}
        config={swipeConfig}
        style={{
          flex: 1,
          backgroundColor: colors.black,
          justifyContent: 'flex-start'
        }}
      >
        <TopBarWithSearchBar />
        <If
          condition={!this.props.loading}
          then={
            <FlatList
              data={content.slice(page * 10, page * 10 + 10)}
              style={{ backgroundColor: colors.white }}
              ListEmptyComponent={
                <If
                  condition={content.length === 0}
                  then={
                    <EmptyListNotice adjustsFontSizeToFit numberOfLines={1}>
                      {t.EMPTY_LIST_NOTICE}
                    </EmptyListNotice>
                  }
                />
              }
              ref={ref => {
                this.flatListRef = ref;
              }}
              renderItem={({ item }) => (
                <CatalogueItem
                  link={item.link}
                  description={item.description}
                  title={item.title}
                  onPress={() => {
                    this.props.extractCanDetails(item);
                    toDetailsScreen(this.state.componentId, item.title);
                  }}
                />
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          }
          else={<Spinner />}
        />
        <ButtonFooter>
          <NavigationButton
            disabled={this.state.page === 0}
            onPress={() => {
              this.setState({ page: this.state.page - 1 });
              this.flatListRef!.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            {t.PREV_BUTTON.toUpperCase()}
          </NavigationButton>
          <NavigationButton
            disabled={this.state.page === this.state.pageNumber}
            onPress={() => {
              this.setState({ page: this.state.page + 1 });
              this.flatListRef!.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            {t.NEXT_BUTTON.toUpperCase()}
          </NavigationButton>
        </ButtonFooter>
      </GestureRecognizer>
    );
  }
}

const ButtonFooter = styled.View`
  width: 100%;
  height: 70;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const EmptyListNotice = styled.Text`
  color: ${colors.darkCharcoal};
  text-align: center;
  font-size: 19;
  padding-horizontal: 15;
  padding-vertical: 15;
`;

const mapStateToProps = (state: RootState) => getCanState(state);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      extractCanDetails: actions.extractCanDetails
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalogue);
