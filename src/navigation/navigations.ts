import { Navigation } from 'react-native-navigation';
import { topBarWithSearchBar } from './utils';
import { CATALOGUE } from './screenRegistry';

export const toCatalogue = () => {
  return Navigation.setRoot({
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
};
