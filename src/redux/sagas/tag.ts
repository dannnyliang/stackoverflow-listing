import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import APIs from "../../apis";
import { QUESTION_PAGE_SIZE } from "../../constant";
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

function* fetchQuestionWhenSelectTag(action: ReturnType<typeof selectTag>) {
  yield put(
    fetchQuestionStart({ tagged: action.payload, pageSize: QUESTION_PAGE_SIZE })
  );
}

function* watchGetTags() {
  yield takeLatest(fetchTagStart, fetchTags);
  yield takeLatest(selectTag, fetchQuestionWhenSelectTag);
}

export default function* tagSaga() {
  yield all([watchGetTags()]);
}
