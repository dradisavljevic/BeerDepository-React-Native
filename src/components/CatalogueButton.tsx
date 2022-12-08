import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import colors from '../constants/colors';

/**
 * Functional component used to navigate catalogue pages.
 */
const CatalogueButton = ({onPress, children, disabled}) => (
  <TouchableOpacity
    style={styles(disabled).containerStyle}
    onPress={() => onPress()}
    disabled={disabled}>
    <Text style={styles().buttonTextStyle}>{children.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = (disabled?: boolean) =>
  StyleSheet.create({
    containerStyle: {
      paddingVertical: 10,
      textAlign: 'center',
      backgroundColor: colors.gainsboro,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOpacity: 0.8,
      shadowOffset: {width: 0, height: 2},
      elevation: 1,
      marginHorizontal: 5,
      marginVertical: 15,
      width: '45%',
      opacity: disabled! ? 0.3 : 1,
    },
    buttonTextStyle: {
      fontSize: 14,
      color: colors.black,
      fontWeight: '600',
      fontStyle: 'normal',
    },
  });

export default CatalogueButton;
