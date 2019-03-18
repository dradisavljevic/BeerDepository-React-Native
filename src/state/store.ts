import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { StateType } from 'typesafe-actions';

// @ts-ignore
export type RootState = StateType<typeof rootReducer>;

export default function configureStore(initialState = {}): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
