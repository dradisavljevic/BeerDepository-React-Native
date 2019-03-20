import { Reducer } from 'redux';
import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { CanState, imageData } from './types';
import { filterCans } from '../../../utils/helpers';

export type CanActions = ActionType<typeof actions>;

const initialState: CanState = {
  can: {} as imageData,
  loading: false,
  data: [],
  catalogue: [],
  error: ''
};

const reducer: Reducer<CanState, CanActions> = (state = initialState, action): CanState => {
  switch (action.type) {
    case getType(actions.geAllCans.request): {
      return { ...state, loading: true, error: '' };
    }
    case getType(actions.geAllCans.success): {
      // @ts-ignore
      const { payload } = action;

      return {
        ...state,
        loading: false,
        error: '',
        // @ts-ignore
        catalogue: payload.data,
        // @ts-ignore
        data: payload.data
      };
    }
    case getType(actions.geAllCans.failure): {
      // @ts-ignore
      return { ...state, loading: false, error: action.payload as string };
    }
    case getType(actions.searchCans): {
      // @ts-ignore
      const { payload } = action;
      return {
        ...state,
        catalogue: filterCans(payload as string, state.data)
      };
    }
    case getType(actions.removeSearchCans): {
      return {
        ...state,
        catalogue: state.data
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
