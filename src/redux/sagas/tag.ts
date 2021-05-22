import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import APIs from "../../apis";
import { fetchQuestionStart } from "../reducer/question";
import {
  fetchTagFail,
  fetchTagStart,
  fetchTagSuccess,
  selectTag,
} from "../reducer/tag";

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
  yield takeLatest(selectTag, function* (action) {
    yield put(fetchQuestionStart({ tagged: action.payload, pageSize: 20 }));
  });
}

export default function* tagSaga() {
  yield all([watchGetTags()]);
}
