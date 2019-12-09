import React from 'react';
// @ts-ignore
import styled from 'styled-components';

import colors from '../constants/colors';
import globals from '../constants/globals';
import t from '../i18n/i18n';

/**
 * Offline notice status bar component.
 */
const OfflineNotice = () => (
  <OfflineNoticeContainer>
    <OfflineNoticeText>{t.NO_INTERNET_CONNECTION}</OfflineNoticeText>
  </OfflineNoticeContainer>
);

const OfflineNoticeContainer = styled.View`
  background-color: ${colors.wineRed};
  height: 30;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${globals.deviceWidth};
`;

const OfflineNoticeText = styled.Text`
  color: ${colors.white};
`;

export default OfflineNotice;
