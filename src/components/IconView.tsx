import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';

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
const IconView: FC<Props> = ({style, name, size, color, onPress}) => (
  <TouchableOpacity style={styles.containerStyle}>
    <Icon
      style={style}
      name={name}
      size={size}
      color={color}
      onPress={onPress}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconView;
