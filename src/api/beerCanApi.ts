import {ApiResponse} from 'apisauce';
import {imageArray} from '../state/modules/cans/types';
import {network} from './network';

export interface BeerCanApi {
  getAll: (albumId: number) => Promise<ApiResponse<imageArray>>;
}

const getAll = (albumId: number) => network.get<imageArray>(`/${albumId}/images`);

export const beerCanApi: BeerCanApi = {
  getAll
};
