import {Can, imageData} from '../constants/types';

export type StackParamList = {
  Catalogue: undefined;
  Details: {_catalogue: imageData[]; _index: number};
  Image: {_can: Can};
  NoInternet: undefined;
};
