import { NavigationActions } from 'react-navigation';

let navigator;

/**
 * navigation reference file.
 */
export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
