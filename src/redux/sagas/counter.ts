import { delay, put, takeEvery } from "redux-saga/effects";

import { increment, incrementAsync } from "../reducer/counter";

export function* watchIncrementAsync() {
  yield takeEvery(incrementAsync().type, function* () {
    yield delay(1000);
    yield put(increment());
  });
}
