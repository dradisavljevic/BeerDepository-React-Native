import React, { FC } from 'react';
// @ts-ignore
import styled from 'styled-components';
import colors from '../constants/colors';
import sadBeer from '../assets/images/SadBeer512.png';
import t from '../i18n/i18n';

type Props = {};

const NoInternetConnectionScreen: FC<Props> = ({}) => {
  return (
    <MessageContainer>
      <MessageHeader adjustsFontSizeToFit numberOfLines={1}>
        {t.NO_INTERNET_CONNECTION}
      </MessageHeader>
      <CenteredImage source={sadBeer} />
      <MessageInstructions>{t.PLEASE_CONNECT}</MessageInstructions>
    </MessageContainer>
  );
};

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding-horizontal: 10;
`;

const CenteredImage = styled.Image`
  height: 256;
  width: 256;
`;

const MessageHeader = styled.Text`
  font-size: 32;
  text-align: center;
  margin-vertical: 10;
`;
const MessageInstructions = styled.Text`
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 5;
  font-size: 21;
`;

export default NoInternetConnectionScreen;
