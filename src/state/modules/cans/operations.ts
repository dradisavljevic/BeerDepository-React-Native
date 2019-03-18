import { GetCansRequest } from './types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { all, takeLatest, CallEffect } from 'redux-saga/effects';
import { call, put } from 'redux-saga-test-plan/matchers';
import { beerCanApi } from '../../../api/beerCanApi';
import { getErrorMessage, setAccessToken } from '../../../api/network';

function* geAllCans({ payload }: { payload: GetCansRequest }) {
  setAccessToken(payload.clientID);
  const apiCall = call(beerCanApi.getAll, payload.albumID);
  const { ok, ...response } = yield call(callApi, apiCall);
  if (ok) {
    yield put(actions.geAllCans.success(response.data));
  } else {
    yield put(actions.geAllCans.failure(getErrorMessage(response)));
  }
}

export function* callApi(apiCall: CallEffect) {
  const response = yield apiCall;
  if (response.status !== 401) {
    return response;
  }
  // re-try again
  return yield apiCall;
}

export default function*() {
  // @ts-ignore
  yield all([takeLatest(getType(actions.geAllCans.request), geAllCans)]);
}
