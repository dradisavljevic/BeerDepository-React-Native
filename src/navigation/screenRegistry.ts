import { RootState } from '../state/store';
import { Navigation } from 'react-native-navigation';
import App from '../App';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import CanDetails from '../views/CanDetails';

export const CATALOGUE = 'navigation.CATALOGUE';
export const DETAILS = 'navigation.DETAILS';

export default function registerScreens(store: Store<RootState>) {
  Navigation.registerComponentWithRedux(CATALOGUE, () => App, Provider, store);
  Navigation.registerComponentWithRedux(DETAILS, () => CanDetails, Provider, store);
}
