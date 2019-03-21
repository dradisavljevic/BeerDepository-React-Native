import { FlatList } from 'react-native';
import { Component } from 'react';
import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { CanState, imageData } from '../state/modules/cans/types';
import colors from '../constants/colors';
import t from '../i18n/i18n';
import { CatalogueItem, NavigationButton, TopBarWithSearchBar } from '../components';
import { toDetailsPage } from '../navigation/navigations';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../state/modules/cans/actions';

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
    pageNumber: Math.floor(this.props.displayedData.length / 10),
    componentId: ''
  };
  private flatListRef: FlatList<imageData> | null | undefined;

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.displayedData != this.props.displayedData) {
      this.setState({ content: nextProps.displayedData, pageNumber: Math.floor(nextProps.displayedData.length / 10) });
    }
  }

  constructor(props: Props) {
    super(props);

    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      this.setState({ componentId: componentId });
    });
  }

  render() {
    const { content, page } = this.state;
    return (
      <CatalogueWrapper>
        <TopBarWithSearchBar />
        <FlatList
          data={content.slice(page * 10, page * 10 + 10)}
          style={{ backgroundColor: colors.white }}
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
                toDetailsPage(this.state.componentId, item.title);
              }}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
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
      </CatalogueWrapper>
    );
  }
}

const CatalogueWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${colors.black};
`;

const MessageHeader = styled.Text`
  font-size: 23;
  text-align: center;
`;
const MessageInstructions = styled.Text`
  text-align: center;
  color: ${colors.gray20};
  margin-bottom: 5;
`;

const ErrorMessage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.red};
  flex-direction: column;
`;

const ButtonFooter = styled.View`
  width: 100%;
  height: 90;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
