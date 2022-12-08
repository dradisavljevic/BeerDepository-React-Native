import React from 'react';

import IconView from './IconView';
import {styles} from './IconStyles';

import colors from '../constants/colors';
import {MATERIAL_ICON_SIZE} from '../constants/dimensions';

/**
 * Back arrow Icon, used for navigation between screens.
 */
const BackIcon = ({onPress}) => (
  <IconView
    style={styles.backIcon}
    name={'arrow-back'}
    size={MATERIAL_ICON_SIZE}
    color={colors.baliHai}
    onPress={onPress}
  />
);

export default BackIcon;
