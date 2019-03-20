import React, { Component } from 'react';
import { If } from '../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors';
import { SearchBar } from 'react-native-elements';
// @ts-ignore
import styled from 'styled-components';
import { MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';
import t from '../i18n/i18n';
import { connect } from 'react-redux';
import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../state/modules/cans/actions';
import { CanState } from '../state/modules/cans/types';
import { StyleSheet } from 'react-native';

type PropsFromState = CanState;

type PropsFromDispatch = {
  searchCans: typeof actions.searchCans;
  removeSearchCans: typeof actions.removeSearchCans;
};

type Props = PropsFromDispatch & PropsFromState;
type State = {
  search: string;
  searchBar: boolean;
  title: string;
};
class TopBarWithSearchBar extends Component<Props, State> {
  state = {
    search: '',
    searchBar: false,
    title: t.TITLE
  };
  updateSearch = (search: string) => {
    this.setState({ search });
  };
  render() {
    const { search, searchBar, title } = this.state;
    return (
      <If
        condition={!searchBar}
        then={
          <TitleWrapper>
            <If
              condition={this.state.title != t.TITLE}
              then={
                <Icon
                  style={styles.clearFilterIcon}
                  name={'clear'}
                  size={MATERIAL_ICON_SIZE}
                  color={colors.baliHai}
                  onPress={() => {
                    this.setState({ search: '', title: t.TITLE });
                    this.props.removeSearchCans();
                  }}
                />
              }
            />
            <Title>{title}</Title>
            <Icon
              style={styles.searchIcon}
              name={'search'}
              size={MATERIAL_ICON_SIZE}
              color={colors.baliHai}
              onPress={() => {
                this.setState({ searchBar: true });
              }}
            />
          </TitleWrapper>
        }
        else={
          <SearchBarWrapper>
            <SearchBar
              placeholder={t.SEARCH_CATALOGUE}
              onChangeText={this.updateSearch}
              value={search}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoFocus={true}
              containerStyle={styles.topBarBackground}
              inputStyle={styles.styledInput}
              inputContainerStyle={styles.topBarBackground}
              leftIconContainerStyle={styles.topBarBackground}
              rightIconContainerStyle={styles.topBarBackground}
              searchIcon={false}
              onFocus={() => {
                this.setState({ search: '' });
              }}
              onClear={() => {
                this.setState({ searchBar: false });
              }}
              onEndEditing={() => {
                if (search.length != 0) {
                  this.setState({ title: search });
                  this.props.searchCans(this.state.search);
                }
                this.setState({ searchBar: false });
              }}
            />
          </SearchBarWrapper>
        }
      />
    );
  }
}

const TitleWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 15;
  padding-horizontal: 15;
`;

const Title = styled.Text`
  flex: 1;
  color: ${colors.white};
  justify-content: center;
  font-size: ${TITLE_FONT_SIZE};
`;

const SearchBarWrapper = styled.View`
  padding-vertical: 2;
  padding-horizontal: 2;
`;

const styles = StyleSheet.create({
  topBarBackground: {
    backgroundColor: colors.black
  },
  styledInput: {
    backgroundColor: colors.black,
    color: colors.white
  },
  searchIcon: {
    width: MATERIAL_ICON_SIZE
  },
  clearFilterIcon: {
    width: MATERIAL_ICON_SIZE,
    marginRight: 10,
    marginTop: 3
  }
});

const mapStateToProps = (state: RootState) => getCanState(state);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchCans: actions.searchCans,
      removeSearchCans: actions.removeSearchCans
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithSearchBar);
