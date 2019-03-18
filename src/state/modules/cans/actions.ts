import {
  GetCansRequest,
  GetCansActionTypes,
  GetSpecificCanRequest,
  GetSpecificCanActionTypes,
  imageArray,
  imageData
} from './types';
import { createAsyncAction } from 'typesafe-actions';

export const geAllCans = createAsyncAction(
  GetCansActionTypes.GET_CANS,
  GetCansActionTypes.GET_CANS_SUCCESS,
  GetCansActionTypes.GET_CANS_FAILURE
)<GetCansRequest, imageArray, string>();

export const getSpecificCan = createAsyncAction(
  GetSpecificCanActionTypes.GET_SPECIFIC_CAN,
  GetSpecificCanActionTypes.GET_SPECIFIC_CAN_SUCCESS,
  GetSpecificCanActionTypes.GET_SPECIFIC_CAN_FAILURE
)<GetSpecificCanRequest, imageData, string>();
