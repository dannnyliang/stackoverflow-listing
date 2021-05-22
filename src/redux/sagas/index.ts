import { all } from "redux-saga/effects";

import { watchIncrementAsync } from "./counter";

export function helloSaga() {
  console.log("Hello Sagas!");
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
