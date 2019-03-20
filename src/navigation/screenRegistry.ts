import { RootState } from '../state/store';
import { Navigation } from 'react-native-navigation';
import App from '../App';
import Catalogue from '../views/Catalogue';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { topBarWithSearchBar } from './utils';

export const CATALOGUE = 'navigation.CATALOGUE';

export default function registerScreens(store: Store<RootState>) {
  Navigation.registerComponentWithRedux(CATALOGUE, () => App, Provider, store);

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: CATALOGUE,
                options: {
                  topBar: topBarWithSearchBar('BeerDepository')
                }
              }
            }
          ],
          options: {
            topBar: topBarWithSearchBar('BeerDepository')
          }
        }
      }
    });
  });
}
