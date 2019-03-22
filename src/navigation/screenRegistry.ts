import { RootState } from '../state/store';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import CanDetails from '../views/CanDetails';
import CanImage from '../views/CanImage';
import CatalogueWrapper from '../views/CatalogueWrapper';
import NoInternetConnectionScreen from '../views/NoInternetConnectionScreen';

export const CATALOGUE = 'navigation.CATALOGUE';
export const DETAILS = 'navigation.DETAILS';
export const IMAGE = 'navigation.IMAGE';
export const NO_CONNECTION = 'navigation.NO_CONNECTION';

export default function registerScreens(store: Store<RootState>) {
  Navigation.registerComponentWithRedux(CATALOGUE, () => CatalogueWrapper, Provider, store);
  Navigation.registerComponentWithRedux(DETAILS, () => CanDetails, Provider, store);
  Navigation.registerComponentWithRedux(IMAGE, () => CanImage, Provider, store);
  Navigation.registerComponentWithRedux(NO_CONNECTION, () => NoInternetConnectionScreen, Provider, store);
}
