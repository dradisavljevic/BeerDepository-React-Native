import React, { FC } from 'react';
// @ts-ignore
import styled from 'styled-components';
import colors from '../constants/colors';
import { ICON_PADDING, MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';
import { IconView } from './index';
import { styles } from './ComponentStyles';
import { Dimensions, GestureResponderEvent } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  placeholder: string;
  onChangeText?: (e: string) => void;
  value: string;
  autoFocus: boolean;
  onBack: ((event: GestureResponderEvent) => void) | undefined;
  onClear: ((event: GestureResponderEvent) => void) | undefined;
};

const SearchBar: FC<Props> = ({ placeholder, onChangeText, value, autoFocus, onBack, onClear }) => {
  return (
    <SearchBarContainer>
      <IconView
        style={styles.backIcon}
        name={'arrow-back'}
        size={MATERIAL_ICON_SIZE}
        color={colors.baliHai}
        onPress={onBack}
      />
      <InputContainer>
        <SearchBarInput
          placeholder={placeholder}
          autoCorrect={false}
          autoCapitalize={'none'}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
        />
      </InputContainer>
      <IconView
        style={styles.clearFilterIcon}
        name={'clear'}
        size={MATERIAL_ICON_SIZE}
        color={colors.baliHai}
        onPress={onClear}
      />
    </SearchBarContainer>
  );
};

const InputContainer = styled.View`
  background-color: ${colors.black};
  width: ${width - (MATERIAL_ICON_SIZE * 2 + 2 * ICON_PADDING)};
  margin-horizontal: 10;
`;

const SearchBarInput = styled.TextInput`
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: ${TITLE_FONT_SIZE};
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15;
  padding-horizontal: ${ICON_PADDING};
  margin-bottom: 5;
  background-color: ${colors.white};
  width: ${width};
`;

export default SearchBar;
