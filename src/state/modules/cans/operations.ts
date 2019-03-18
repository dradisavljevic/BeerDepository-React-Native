import {GetCansRequest} from "./types";
import * as actions from './actions';
import {getType} from "typesafe-actions";
import { all, takeLatest } from 'redux-saga/effects';


function* geAllCans({ payload }: { payload: GetCansRequest }) {
  // TODO implement saga
  yield null;
}

export default function*() {
  yield all([takeLatest(getType(actions.geAllCans.request), geAllCans)]);
}
