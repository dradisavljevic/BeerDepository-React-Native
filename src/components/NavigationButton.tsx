// @ts-ignore
import styled from 'styled-components';
import React, { FC } from 'react';
import colors from '../constants/colors';

type Props = {
  onPress: () => void;
  children: string;
};

const NavigationButton: FC<Props> = ({ onPress, children }) => (
  <Container onPress={() => onPress()}>
    <ButtonText>{children.toUpperCase()}</ButtonText>
  </Container>
);

const Container = styled.TouchableOpacity`
  padding-top: 10;
  padding-bottom: 10;
  text-align: center;
  background-color: ${colors.gainsboro};
  width: 40%;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.black};
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
  margin-bottom: 10;
  margin-horizontal: 10;
`;

const ButtonText = styled.Text`
  font-size: 14;
  color: ${colors.black};
  font-weight: 600;
  font-style: normal;
`;

export default NavigationButton;
