import { RootState } from '../state/store';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import CanDetails from '../views/CanDetails';
import CanImage from '../views/CanImage';
import CatalogueWrapper from '../views/CatalogueWrapper';

export const CATALOGUE = 'navigation.CATALOGUE';
export const DETAILS = 'navigation.DETAILS';
export const IMAGE = 'navigation.IMAGE';

export default function registerScreens(store: Store<RootState>) {
  Navigation.registerComponentWithRedux(CATALOGUE, () => CatalogueWrapper, Provider, store);
  Navigation.registerComponentWithRedux(DETAILS, () => CanDetails, Provider, store);
  Navigation.registerComponentWithRedux(IMAGE, () => CanImage, Provider, store);
}
