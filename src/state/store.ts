import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StateType } from 'typesafe-actions';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import globals from '../constants/globals';

export type RootState = StateType<any>;

export default function configureStore(initialState = {}): Store<RootState> {
  // @ts-ignore
  const sagaMonitor = globals.useReactotron ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  // @ts-ignore
  const createAppropriateStore = globals.useReactotron ? console.tron.createStore : createStore;
  const store = createAppropriateStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
