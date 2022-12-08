import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {styles as externalStyles} from './IconStyles';
import IconView from './IconView';
import If from '../utils/conditional';
import SearchBar from './SearchBar';

import {MATERIAL_ICON_SIZE, TITLE_FONT_SIZE} from '../constants/dimensions';
import t from '../i18n/i18n';
import colors from '../constants/colors';

/**
 * TopBar component wrapped around a searchbar.
 */
const TopBarWithSearchBar = ({searchAction, clearSearch}) => {
  const [search, setSearch] = useState(''); // search term
  const [searchBar, setSearchBar] = useState(false); // should se archbar be shown
  const [title, setTitle] = useState(t.TITLE); // current title. Default if no previous search has been done.
  return (
    <View style={styles.topBarWrapperStyle}>
      <If
        condition={!searchBar}
        then={
          <View style={styles.titleWrapperStyle}>
            <If
              condition={title !== t.TITLE}
              then={
                <IconView
                  style={externalStyles.clearFilterIcon}
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
            <Text style={styles.titleStyle}>{title}</Text>
            <IconView
              style={externalStyles.searchIcon}
              name={'search'}
              size={MATERIAL_ICON_SIZE}
              color={colors.baliHai}
              onPress={() => {
                setSearchBar(true);
              }}
            />
          </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  topBarWrapperStyle: {
    height: 60,
  },
  titleWrapperStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  titleStyle: {
    flex: 1,
    color: colors.white,
    justifyContent: 'center',
    fontSize: TITLE_FONT_SIZE,
  },
});

export default TopBarWithSearchBar;
