// @ts-ignore
import styled from 'styled-components';
import React, { FC } from 'react';

import colors from '../constants/colors';

type Props = {
  onPress: () => void;
  children: string;
  disabled: boolean;
};

const NavigationButton: FC<Props> = ({ onPress, children, disabled }) => (
  <Container onPress={() => onPress()} disabled={disabled}>
    <ButtonText>{children.toUpperCase()}</ButtonText>
  </Container>
);

const Container = styled.TouchableOpacity`
  padding-vertical: 10;
  text-align: center;
  background-color: ${colors.gainsboro};
  width: 40%;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  elevation: 1;
  margin-horizontal: 10;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.3 : 1)};
`;

const ButtonText = styled.Text`
  font-size: 14;
  color: ${colors.black};
  font-weight: 600;
  font-style: normal;
`;

export default NavigationButton;
