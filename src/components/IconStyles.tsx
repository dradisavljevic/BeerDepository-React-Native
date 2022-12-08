import {StyleSheet} from 'react-native';
import {MATERIAL_ICON_SIZE} from '../constants/dimensions';

/**
 * Stylesheet used for icon components.
 */
export const styles = StyleSheet.create({
  searchIcon: {
    width: MATERIAL_ICON_SIZE,
    paddingTop: 5,
  },
  backIcon: {
    width: MATERIAL_ICON_SIZE,
  },
  clearFilterIcon: {
    width: MATERIAL_ICON_SIZE,
    marginRight: 10,
  },
});
