import { GetCansRequest, GetImagesRequest } from './types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { all, takeLatest, CallEffect } from 'redux-saga/effects';
import { call, put } from 'redux-saga-test-plan/matchers';
import { beerCanApi } from '../../../api/beerCanApi';
import { getErrorMessage, setAccessToken } from '../../../api/network';
import { toImageScreen, toNoConnectionScreen } from '../../../navigation/navigations';
import { extractImages } from '../../../utils/helpers';
import { NetInfo } from 'react-native';

function* geAllCans({ payload }: { payload: GetCansRequest }) {
  setAccessToken(payload.clientID);
  const apiCall = call(beerCanApi.getFromAlbum, payload.albumID);
  const { ok, ...response } = yield call(callApi, apiCall);
  if (ok) {
    yield put(actions.getAllCans.success(response.data));
  } else {
    yield put(actions.getAllCans.failure(getErrorMessage(response)));
  }
}

function* getCansFromAlbum({ payload }: { payload: GetImagesRequest }) {
  setAccessToken(payload.clientID);
  const apiCall = call(beerCanApi.getFromAlbum, payload.albumID);
  const { ok, ...response } = yield call(callApi, apiCall);
  if (ok) {
    yield put(actions.getAlbumImages.success(response.data));
    toImageScreen(payload.componentID, extractImages(response.data.data), payload.title);
  } else {
    yield put(actions.getAlbumImages.failure(getErrorMessage(response)));
    if (response.problem === 'TIMEOUT_ERROR') {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
          toNoConnectionScreen();
        }
      });
    }
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
  yield all([takeLatest(getType(actions.getAllCans.request), geAllCans)]);
  // @ts-ignore
  yield all([takeLatest(getType(actions.getAlbumImages.request), getCansFromAlbum)]);
}
