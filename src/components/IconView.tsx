import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureResponderEvent, StyleProp, TextStyle } from 'react-native';
import React, { FC } from 'react';
// @ts-ignore
import styled from 'styled-components';

type Props = {
  style: StyleProp<TextStyle>;
  name: string;
  size: number;
  color: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

/**
 * Functional component material icon wrapper.
 */
const IconView: FC<Props> = ({ style, name, size, color, onPress }) => (
  <Container>
    <Icon style={style} name={name} size={size} color={color} onPress={onPress} />
  </Container>
);

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export default IconView;
