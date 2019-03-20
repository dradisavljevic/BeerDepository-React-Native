import colors from '../constants/colors';

export const topBarWithSearchBar = (title: string = '') => ({
  title: {
    text: title,
    fontSize: 26,
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
