import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
// @ts-ignore
import styled from 'styled-components';

import colors from '../constants/colors';
import t from '../i18n/i18n';

const { width } = Dimensions.get('window');

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
  width: ${width};
`;

const OfflineNoticeText = styled.Text`
  color: ${colors.white};
`;

export default OfflineNotice;
