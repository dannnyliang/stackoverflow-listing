import { all } from "redux-saga/effects";

import tagSaga from "./tag";

export function helloSaga() {
  console.log("Hello Sagas!");
}

export default function* rootSaga() {
  yield all([helloSaga(), tagSaga()]);
}
