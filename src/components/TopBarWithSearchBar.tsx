import React, { Component } from 'react';
import { If } from '../utils/helpers';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// @ts-ignore
import styled from 'styled-components';

import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import * as actions from '../state/modules/cans/actions';
import { CanState } from '../state/modules/cans/types';

import { MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';
import t from '../i18n/i18n';
import colors from '../constants/colors';
import { IconView, SearchBar } from './index';
import { styles } from './ComponentStyles';

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
      <TopBarWrapper>
        <If
          condition={!searchBar}
          then={
            <TitleWrapper>
              <If
                condition={this.state.title != t.TITLE}
                then={
                  <IconView
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
              <IconView
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
            <SearchBar
              placeholder={t.SEARCH_CATALOGUE}
              onChangeText={this.updateSearch}
              value={search}
              autoFocus={true}
              onClear={() => {
                this.setState({ searchBar: false });
              }}
              onBack={() => {
                this.setState({ searchBar: true });
              }}
              onEndEditing={() => {
                if (search.length != 0) {
                  this.setState({ title: search });
                  this.props.searchCans(this.state.search);
                }
                this.setState({ searchBar: false });
              }}
            />
          }
        />
      </TopBarWrapper>
    );
  }
}

const TopBarWrapper = styled.View`
  height: 60;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 15;
  padding-horizontal: 15;
  margin-bottom: 5;
`;

const Title = styled.Text`
  flex: 1;
  color: ${colors.white};
  justify-content: center;
  font-size: ${TITLE_FONT_SIZE};
`;

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
