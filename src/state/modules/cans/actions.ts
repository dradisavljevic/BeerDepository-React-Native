import {
  GetCansRequest,
  GetCansActionTypes,
  GetSpecificCanRequest,
  GetSpecificCanActionTypes,
  imageArray,
  imageData,
  SearchCansActionType,
  RemoveSearchCansActionType,
  ExtractCanDetailsActionType
} from './types';
import { createAction, createAsyncAction } from 'typesafe-actions';

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

export const searchCans = createAction(SearchCansActionType, resolve => {
  return (filter: string) => resolve(filter);
});

export const removeSearchCans = createAction(RemoveSearchCansActionType, resolve => {
  return () => resolve();
});

export const extractCanDetails = createAction(ExtractCanDetailsActionType, resolve => {
  return (canData: imageData) => resolve(canData);
});
