import React, { PureComponent } from 'react';
// @ts-ignore
import styled from 'styled-components';

import colors from '../constants/colors';
import t from '../i18n/i18n';
import globals from '../constants/globals';

class OfflineNotice extends PureComponent {
  render() {
    return (
      <OfflineNoticeContainer>
        <OfflineNoticeText>{t.NO_INTERNET_CONNECTION}</OfflineNoticeText>
      </OfflineNoticeContainer>
    );
  }
}

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
