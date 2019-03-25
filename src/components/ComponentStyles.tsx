import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { MATERIAL_ICON_SIZE, TITLE_FONT_SIZE } from '../constants/dimensions';

export const styles = StyleSheet.create({
  topBarBackground: {
    backgroundColor: colors.black
  },
  searchBarContainer: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center'
  },
  styledInput: {
    backgroundColor: colors.black,
    color: colors.white,
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: TITLE_FONT_SIZE
  },
  inputContainer: {
    backgroundColor: colors.black,
    marginLeft: -14,
    marginTop: -1
  },
  searchIcon: {
    width: MATERIAL_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    width: MATERIAL_ICON_SIZE
  },
  clearFilterIcon: {
    width: MATERIAL_ICON_SIZE,
    marginRight: 10
  }
});
