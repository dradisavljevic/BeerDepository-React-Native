import colors from '../constants/colors';
import { TITLE_FONT_SIZE } from '../constants/dimensions';

export const topBarWithSearchBar = (title: string = '') => ({
  title: {
    text: title,
    fontSize: TITLE_FONT_SIZE,
    color: colors.white
  },
  background: {
    color: colors.black
  },
  searchBar: true,
  searchBarHiddenWhenScrolling: true,
  searchBarPlaceholder: 'Search beer catalogue...',
  hideNavBarOnFocusSearchBar: true,
  noBorder: true,
  elevation: 0,
  barStyle: 'black',
  visible: true
});

export const emptyTopBar = () => ({
  background: {
    color: colors.black
  },
  noBorder: true,
  elevation: 0,
  barStyle: 'black',
  visible: true,
  height: 5
});

export const detailsTopBar = (title: string) => ({
  title: {
    text: title,
    fontSize: TITLE_FONT_SIZE,
    color: colors.white
  },
  background: {
    color: colors.black
  },
  noBorder: true,
  elevation: 0,
  barStyle: 'black',
  visible: true,
  backButton: {
    color: colors.white
  }
});
