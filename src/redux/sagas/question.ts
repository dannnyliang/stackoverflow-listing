import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import APIs from "../../apis";
import {
  fetchQuestionFail,
  fetchQuestionStart,
  fetchQuestionSuccess,
} from "../reducer/question";

const DEBOUNCE_TIME = 1000;

function* fetchQuestions(action: ReturnType<typeof fetchQuestionStart>) {
  yield delay(DEBOUNCE_TIME);

  const questions: SagaReturnType<typeof APIs.getQuestions> = yield call(
    APIs.getQuestions,
    action.payload ?? {}
  );

  if ("error_id" in questions) {
    yield put(fetchQuestionFail(questions));
  } else {
    yield put(fetchQuestionSuccess(questions));
  }
}

function* watchGetQuestions() {
  yield takeLatest(fetchQuestionStart, fetchQuestions);
}

export default function* questionSaga() {
  yield all([watchGetQuestions()]);
}
