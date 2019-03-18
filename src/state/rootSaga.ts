import { all } from 'redux-saga/effects';

import canSaga from './modules/cans/operations';

export default function*() {
  yield all([
    canSaga()
  ]);
}
