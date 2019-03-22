import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
// @ts-ignore
import styled from 'styled-components';
import colors from '../constants/colors';

type Props = {
  size?: number | 'small' | 'large' | undefined;
};

const Spinner: FC<Props> = ({ size = 'large' }) => {
  return (
    <SpinnerContainer>
      <ActivityIndicator size={size} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
`;

export default Spinner;
