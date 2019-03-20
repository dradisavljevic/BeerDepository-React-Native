import { FlatList } from 'react-native';
import { Component } from 'react';
import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { imageData } from '../state/modules/cans/types';
import colors from '../constants/colors';
import t from '../i18n/i18n';
import { CatalogueItem, NavigationButton, TopBarWithSearchBar } from '../components';

type Props = {
  data: imageData[];
};

type State = {
  page: number;
  content: imageData[];
  pageNumber: number;
};

class Catalogue extends Component<Props, State> {
  state = {
    page: 0,
    content: this.props.data,
    pageNumber: Math.floor(this.props.data.length / 10)
  };
  private flatListRef: FlatList<imageData> | null | undefined;

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.data != this.props.data) {
      this.setState({ content: nextProps.data, pageNumber: Math.floor(nextProps.data.length / 10) });
    }
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
          renderItem={({ item }) => <CatalogueItem link={item.link} description={item.description} title={item.title} />}
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

export default Catalogue;
