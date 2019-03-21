import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StateType } from 'typesafe-actions';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export type RootState = StateType<any>;

export default function configureStore(initialState = {}): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
