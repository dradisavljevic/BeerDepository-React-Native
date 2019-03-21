import { ApiResponse } from 'apisauce';
import { imageArray } from '../state/modules/cans/types';
import { network } from './network';

export interface BeerCanApi {
  getFromAlbum: (albumId: number) => Promise<ApiResponse<imageArray>>;
}

const getFromAlbum = (albumId: number) => network.get<imageArray>(`/${albumId}/images`);

export const beerCanApi: BeerCanApi = {
  getFromAlbum
};
