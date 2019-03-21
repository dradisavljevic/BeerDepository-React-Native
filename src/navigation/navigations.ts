import { Navigation } from 'react-native-navigation';

import { detailsTopBar, emptyTopBar } from './utils';
import { CATALOGUE, DETAILS, IMAGE } from './screenRegistry';
import colors from '../constants/colors';
import globals from '../constants/globals';

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

export const setDefaultOptions = () => {
  const animations = globals.isIos
    ? {}
    : {
        push: {
          content: {
            x: {
              from: 1000,
              to: 0,
              duration: 300
            }
          }
        },
        pop: {
          content: {
            x: {
              from: 0,
              to: 1000,
              duration: 300
            }
          }
        },
        setRoot: {
          enabled: 'true'
        }
      };
  Navigation.setDefaultOptions({
    // @ts-ignore
    animations,
    topBar: {
      visible: true,
      animate: false
    },
    layout: {
      backgroundColor: colors.white,
      orientation: ['portrait']
    }
  });
};
