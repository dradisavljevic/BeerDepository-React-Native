import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

type Props = {
  size?: number | 'small' | 'large' | undefined;
};

/**
 * Functional component representing loading spinner.
 */
const Spinner: FC<Props> = ({size = 'large'}) => (
  <View style={styles.spinnerContainerStyle}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  spinnerContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default Spinner;
