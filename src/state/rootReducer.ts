import { Reducer, combineReducers } from 'redux';
import { RootState } from './store';
import { CanActions } from './modules/cans/reducers';
import { can } from './index';

const reducers = combineReducers({ can });

type RootAction = CanActions;

// @ts-ignore
const rootReducer: Reducer<RootState, RootAction> = (state, action) => {
  switch (action.type) {
    default: {
      return reducers(state, action);
    }
  }
};
export default rootReducer;
