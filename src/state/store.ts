import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StateType } from 'typesafe-actions';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { useReactotron } from '../constants/globals';

export type RootState = StateType<any>;

export default function configureStore(initialState = {}): Store<RootState> {
  const sagaMonitor = useReactotron ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const createAppropriateStore = useReactotron ? console.tron.createStore : createStore;
  const store = createAppropriateStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
