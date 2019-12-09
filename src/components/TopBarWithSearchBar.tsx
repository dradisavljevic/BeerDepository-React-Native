import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';

import { styles } from './IconStyles';
import IconView from './IconView';
import If from '../utils/conditional';
import SearchBar from './SearchBar';

import { MATERIAL_ICON_SIZE, TITLE_FONT_SIZE, ICON_MARGIN } from '../constants/dimensions';
import t from '../i18n/i18n';
import colors from '../constants/colors';

/**
 * TopBar component wrapped around a searchbar.
 */
const TopBarWithSearchBar = ({ searchAction, clearSearch }) => {
  const [search, setSearch] = useState(''); // search term
  const [searchBar, setSearchBar] = useState(false); // should searchbar be shown
  const [title, setTitle] = useState(t.TITLE); // current title. Default if no previous search has been done.
  return (
    <TopBarWrapper>
      <If
        condition={!searchBar}
        then={
          <TitleWrapper>
            <If
              condition={title !== t.TITLE}
              then={
                <IconView
                  style={styles.clearFilterIcon}
                  name={'clear'}
                  size={MATERIAL_ICON_SIZE}
                  color={colors.baliHai}
                  onPress={() => {
                    setSearch('');
                    setTitle(t.TITLE);
                    clearSearch();
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
                setSearchBar(true);
              }}
            />
          </TitleWrapper>
        }
        else={
          <SearchBar
            placeholder={t.SEARCH_CATALOGUE}
            onChangeText={setSearch}
            value={search}
            autoFocus={true}
            onClear={() => {
              setSearchBar(false);
            }}
            onBack={() => {
              setSearchBar(false);
            }}
            onEndEditing={() => {
              if (search.length !== 0) {
                setTitle(search);
                searchAction(search);
              }
              setSearchBar(false);
            }}
            onFocus={() => {
              setSearch('');
            }}
            renderClear={search !== ''}
          />
        }
      />
    </TopBarWrapper>
  );
};

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

export default TopBarWithSearchBar;
