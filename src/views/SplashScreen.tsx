import React, { Component } from 'react';
import Beer128 from '../assets/icons/Beer128.png';
// @ts-ignore
import styled from 'styled-components';
import colors from '../constants/colors';

class SplashScreen extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <Container>
        <LogoImage source={Beer128} />
      </Container>
    );
  }
}

const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 128;
  height: 128;
`;

export default SplashScreen;
