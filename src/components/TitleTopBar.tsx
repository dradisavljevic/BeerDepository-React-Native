import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackIcon from './BackIcon';

import colors from '../constants/colors';
import globals from '../constants/globals';
import {
  ICON_MARGIN,
  ICON_PADDING,
  TITLE_FONT_SIZE,
} from '../constants/dimensions';

/**
 * A simple topbar with title and navigation button.
 */
const TitleTopBar = ({title, onBack}) => (
  <View style={styles.titleContainerStyle}>
    <BackIcon onPress={onBack} />
    <Text style={styles.titleStyle} adjustsFontSizeToFit numberOfLines={1}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  titleContainerStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: ICON_PADDING,
    backgroundColor: colors.black,
    width: globals.deviceWidth,
    height: 60,
  },
  titleStyle: {
    flex: 1,
    color: colors.white,
    justifyContent: 'center',
    fontSize: TITLE_FONT_SIZE,
    marginHorizontal: ICON_MARGIN,
  },
});

export default TitleTopBar;
