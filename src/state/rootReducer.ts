import { Reducer, combineReducers } from 'redux';
import {RootState} from './store';
import {CanActions} from "./modules/cans/reducers";

const reducers = combineReducers({});

type RootAction = CanActions;

const rootReducer: Reducer<RootState, RootAction> = (state, action) => {
  switch (action.type) {
    default: {
      return reducers(state, action);
    }
  }
};
export default rootReducer;
