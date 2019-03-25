import React, { FC } from 'react';
// @ts-ignore
import styled from 'styled-components';
import colors from '../constants/colors';
import { ICON_MARGIN, ICON_PADDING, MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';
import { IconView } from './index';
import { styles } from './ComponentStyles';
import { Dimensions, GestureResponderEvent } from 'react-native';
import { render } from 'enzyme';
import { If } from '../utils/helpers';

const { width } = Dimensions.get('window');

type Props = {
  placeholder: string;
  onChangeText?: (e: string) => void;
  value: string;
  autoFocus: boolean;
  onBack: ((event: GestureResponderEvent) => void) | undefined;
  onClear: ((event: GestureResponderEvent) => void) | undefined;
  onEndEditing: () => void;
  onFocus: () => void;
  renderClear: boolean;
};

const SearchBar: FC<Props> = ({
  placeholder,
  onChangeText,
  value,
  autoFocus,
  onBack,
  onClear,
  onEndEditing,
  onFocus,
  renderClear
}) => {
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
          autoComplete={'off'}
          autoCapitalize={'none'}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          placeholderTextColor={colors.baliHai}
          onFocus={onFocus}
          maxLength={300}
          keyboardAppearance={'default'}
        />
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
};

const InputContainer = styled.View`
  background-color: ${colors.black};
  width: ${width - (MATERIAL_ICON_SIZE * 2 + 2 * ICON_PADDING + 2 * ICON_MARGIN)};
  margin-horizontal: ${ICON_MARGIN};
  height: ${MATERIAL_ICON_SIZE};
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
