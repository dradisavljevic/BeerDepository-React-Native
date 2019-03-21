import { Reducer } from 'redux';
import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { Can, CanState, imageData } from './types';
import { clearDescription, extractDetails, filterCans } from '../../../utils/helpers';

export type CanActions = ActionType<typeof actions>;

const initialState: CanState = {
  can: {} as Can,
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
        catalogue: clearDescription(
          payload.data.sort((a: imageData, b: imageData) => {
            return a.title > b.title ? 1 : -1;
          })
        ),
        // @ts-ignore
        data: payload.data.sort((a: imageData, b: imageData) => {
          return a.title > b.title ? 1 : -1;
        })
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
        catalogue: clearDescription(filterCans(payload as string, state.data))
      };
    }
    case getType(actions.removeSearchCans): {
      return {
        ...state,
        catalogue: clearDescription(state.data)
      };
    }
    case getType(actions.extractCanDetails): {
      // @ts-ignore
      const { payload } = action;
      return {
        ...state,
        can: extractDetails(payload)
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
