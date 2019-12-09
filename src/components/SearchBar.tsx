import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { GestureResponderEvent, ScrollView } from 'react-native';

import BackIcon from './BackIcon';
import IconView from './IconView';
import If from '../utils/conditional';
import { styles } from './IconStyles';

import { ICON_MARGIN, ICON_PADDING, MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';
import colors from '../constants/colors';
import globals from '../constants/globals';

/**
 * Functional component representing search bar.
 */
const SearchBar = ({ placeholder, onChangeText, value, autoFocus, onBack, onClear, onEndEditing, onFocus, renderClear }) => (
  <SearchBarContainer>
    <BackIcon onPress={onBack} />
    <InputContainer>
      <ScrollView>
        <SearchBarInput
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
        />
      </ScrollView>
    </InputContainer>
    <If
      condition={renderClear}
      then={
        <IconView
          style={styles.clearFilterIcon}
          name={'clear'}
          size={MATERIAL_ICON_SIZE}
          color={colors.baliHai}
          onPress={onClear}
        />
      }
    />
  </SearchBarContainer>
);

const InputContainer = styled.View`
  background-color: ${colors.black};
  width: ${globals.deviceWidth - (MATERIAL_ICON_SIZE * 2 + 2 * ICON_PADDING + 2 * ICON_MARGIN)};
  margin-horizontal: ${ICON_MARGIN};
  height: ${MATERIAL_ICON_SIZE + 5};
`;

const SearchBarInput = styled.TextInput`
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: ${TITLE_FONT_SIZE};
  padding-top: 0;
  text-align: left;
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15;
  padding-horizontal: ${ICON_PADDING};
  margin-bottom: 5;
  background-color: ${colors.black};
  width: ${globals.deviceWidth};
`;

export default SearchBar;
