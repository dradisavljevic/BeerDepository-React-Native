import { Navigation } from 'react-native-navigation';
import { emptyTopBar } from './utils';
import { CATALOGUE } from './screenRegistry';

export const toCatalogue = () => {
  return Navigation.setRoot({
    root: {
      // @ts-ignore
      stack: {
        children: [
          {
            component: {
              name: CATALOGUE,
              options: {
                topBar: emptyTopBar()
              }
            }
          }
        ]
      }
    }
  });
};
