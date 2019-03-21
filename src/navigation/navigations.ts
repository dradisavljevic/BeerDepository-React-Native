import { Navigation } from 'react-native-navigation';
import { detailsTopBar, emptyTopBar } from './utils';
import { CATALOGUE, DETAILS, IMAGE } from './screenRegistry';

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

export const toDetailsPage = (componentId: string, title: string) =>
  Navigation.push(componentId, {
    // @ts-ignore
    component: {
      name: DETAILS,
      options: {
        topBar: detailsTopBar(title)
      }
    }
  });

export const toImagePage = (componentId: string, albumImages: object[], title: string) =>
  Navigation.push(componentId, {
    // @ts-ignore
    component: {
      name: IMAGE,
      options: {
        topBar: detailsTopBar(title)
      },
      passProps: {
        albumImages: albumImages
      }
    }
  });
