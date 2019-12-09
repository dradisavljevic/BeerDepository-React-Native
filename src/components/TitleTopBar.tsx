import React from 'react';
// @ts-ignore
import styled from 'styled-components';

import BackIcon from './BackIcon';

import colors from '../constants/colors';
import globals from '../constants/globals';
import { ICON_MARGIN, ICON_PADDING, TITLE_FONT_SIZE } from '../constants/dimensions';

/**
 * A simple topbar with title and navigation button.
 */
const TitleTopBar = ({ title, onBack }) => (
  <TitleContainer>
    <BackIcon onPress={onBack} />
    <Title>{title}</Title>
  </TitleContainer>
);

const TitleContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15;
  padding-horizontal: ${ICON_PADDING};
  background-color: ${colors.black};
  width: ${globals.deviceWidth};
  height: 60;
`;

const Title = styled.Text`
  flex: 1;
  color: ${colors.white};
  justify-content: center;
  font-size: ${TITLE_FONT_SIZE};
  margin-horizontal: ${ICON_MARGIN};
`;

export default TitleTopBar;
