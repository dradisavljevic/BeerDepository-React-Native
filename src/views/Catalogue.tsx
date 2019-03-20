import { FlatList, View } from 'react-native';
import { Component } from 'react';
import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { imageData } from '../state/modules/cans/types';
import colors from '../constants/colors';
import NavigationButton from '../components/NavigationButton';
import t from '../i18n/i18n';
import FastImage from 'react-native-fast-image';
import { SearchBar } from 'react-native-elements';

type Props = {
  data: imageData[];
};

type State = {
  page: number;
  content: imageData[];
  pageNumber: number;
  search: string;
};

class Catalogue extends Component<Props, State> {
  state = {
    page: 0,
    content: this.props.data,
    pageNumber: Math.floor(this.props.data.length / 10),
    search: ''
  };
  private flatListRef: FlatList<imageData> | null | undefined;

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.data != this.props.data) {
      this.setState({ content: nextProps.data, pageNumber: Math.floor(nextProps.data.length / 10) });
    }
  }

  updateSearch = (search: string) => {
    this.setState({ search });
  };

  render() {
    const { content, page, search } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <SearchBar
          placeholder="Search catalogue..."
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={{ backgroundColor: colors.black }}
          inputStyle={{ backgroundColor: colors.black }}
          inputContainerStyle={{ backgroundColor: colors.black }}
          leftIconContainerStyle={{ backgroundColor: colors.black }}
          rightIconContainerStyle={{ backgroundColor: colors.black }}
        />
        <FlatList
          data={content.slice(page * 10, page * 10 + 10)}
          ref={ref => {
            this.flatListRef = ref;
          }}
          renderItem={({ item }) => (
            <ItemWrapper>
              <FastImage
                source={{ uri: item.link, priority: FastImage.priority.normal }}
                style={{ width: 60, height: 100 }}
              />
              <TextWrapper>
                <Title adjustsFontSizeToFit numberOfLines={1}>
                  {item.title}
                </Title>
                <Description>{item.description}</Description>
              </TextWrapper>
            </ItemWrapper>
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
      </View>
    );
  }
}

const Title = styled.Text`
  text-align: center;
  color: ${colors.gray20};
  margin-bottom: 5;
  font-size: 23;
  font-weight: 600;
  text-decoration-line: underline;
`;

const Description = styled.Text`
  text-align: left;
  color: ${colors.slateGray};
  font-size: 12;
`;

const TextWrapper = styled.View`
  align-items: flex-start;
  padding-left: 20;
  flex-wrap: wrap;
  flex: 1;
`;

const ItemWrapper = styled.TouchableOpacity`
  background-color: ${colors.white};
  flex-direction: row;
  padding-vertical: 10;
  padding-horizontal: 10;
  border-top-width: 1;
  border-top-color: ${colors.slateGray};
  position: relative;
`;

const MessageHeader = styled.Text`
  font-size: 23;
  text-align: center;
`;
const MessageInstructions = styled.Text`
  text-align: center;
  color: ${colors.gray20};
  marginbottom: 5;
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
