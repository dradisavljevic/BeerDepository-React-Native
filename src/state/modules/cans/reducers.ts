import { Reducer } from 'redux';
import * as actions from './actions';
import {ActionType, getType} from "typesafe-actions";
import {CanState, imageData} from "./types";

export type CanActions = ActionType<typeof actions>;

const initialState: CanState = {
  can: {} as imageData,
  loading: false,
  catalogue: [],
  error: ''
};

const reducer: Reducer<CanState, CanActions> = (state = initialState, action): CanState => {
  switch (action.type) {
    case getType(actions.geAllCans.request): {
      return { ...state, loading: true, error: '' };
    }
    case getType(actions.geAllCans.success): {
      const { payload } = action;
      return {
        ...state,
        catalogue:
          {
            ...payload.images
          },
        can: {
          ...payload.images[0]
        }
      };
    }
    case getType(actions.geAllCans.failure): {
      return { ...state, loading: false, error: action.payload as string };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
