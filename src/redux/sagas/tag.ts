import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import APIs from "../../apis";
import { fetchTagFail, fetchTagStart, fetchTagSuccess } from "../reducer/tag";

const DEBOUNCE_TIME = 1000;

function* fetchTags(action: ReturnType<typeof fetchTagStart>) {
  yield delay(DEBOUNCE_TIME);

  const tags: SagaReturnType<typeof APIs.getTags> = yield call(
    APIs.getTags,
    action.payload ?? {}
  );

  if ("error_id" in tags) {
    yield put(fetchTagFail(tags));
  } else {
    yield put(fetchTagSuccess(tags));
  }
}

function* watchGetTags() {
  yield takeLatest(fetchTagStart, fetchTags);
}

export default function* tagSaga() {
  yield all([watchGetTags()]);
}
