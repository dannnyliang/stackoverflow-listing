import { SagaReturnType, all, call, put, takeEvery } from "redux-saga/effects";

import APIs from "../../apis";
import { fetchTagFail, fetchTagStart, fetchTagSuccess } from "../reducer/tag";

function* fetchTags() {
  const tags: SagaReturnType<typeof APIs.getTags> = yield call(
    APIs.getTags,
    {}
  );

  if ("error_id" in tags) {
    yield put(fetchTagFail(tags));
  } else {
    yield put(fetchTagSuccess(tags));
  }
}

function* watchGetTags() {
  yield takeEvery(fetchTagStart, fetchTags);
}

export default function* tagSaga() {
  yield all([watchGetTags()]);
}
