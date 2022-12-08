import React from 'react';
// eslint-disable-next-line prettier/prettier
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import BackIcon from './BackIcon';
import IconView from './IconView';
import If from '../utils/conditional';
import {styles as externalStyles} from './IconStyles';

import {
  ICON_MARGIN,
  ICON_PADDING,
  MATERIAL_ICON_SIZE,
  TITLE_FONT_SIZE,
} from '../constants/dimensions';
import colors from '../constants/colors';
import globals from '../constants/globals';

/**
 * Functional component representing search bar.
 */
const SearchBar = ({
  placeholder,
  onChangeText,
  value,
  autoFocus,
  onBack,
  onClear,
  onEndEditing,
  onFocus,
  renderClear,
}) => (
  <View style={styles.searchBarContainerStyle}>
    <BackIcon onPress={onBack} />
    <View style={styles.inputContainerStyle}>
      <ScrollView>
        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
          autoComplete={'off'}
          autoCapitalize={'none'}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          placeholderTextColor={colors.baliHai}
          onFocus={onFocus}
          keyboardAppearance={'default'}
          underlineColorAndroid={'transparent'}
          textAlignVertical={'top'}
          style={styles.searchBarInputStyle}
        />
      </ScrollView>
    </View>
    <If
      condition={renderClear}
      then={
        <IconView
          style={externalStyles.clearFilterIcon}
          name={'clear'}
          size={MATERIAL_ICON_SIZE}
          color={colors.baliHai}
          onPress={onClear}
        />
      }
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: colors.black,
    width:
      globals.deviceWidth -
      (MATERIAL_ICON_SIZE * 2 + 2 * ICON_PADDING + 2 * ICON_MARGIN),
    marginHorizontal: ICON_MARGIN,
    height: MATERIAL_ICON_SIZE + 5,
  },
  searchBarInputStyle: {
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: TITLE_FONT_SIZE,
    paddingTop: 0,
    textAlign: 'left',
  },
  searchBarContainerStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: ICON_PADDING,
    marginBottom: 5,
    backgroundColor: colors.black,
    width: globals.deviceWidth,
  },
});

export default SearchBar;
