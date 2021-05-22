import { SagaReturnType, all, call, put, takeEvery } from "redux-saga/effects";

import APIs from "../../apis";
import {
  fetchQuestionFail,
  fetchQuestionStart,
  fetchQuestionSuccess,
} from "../reducer/question";

function* fetchQuestions(action: ReturnType<typeof fetchQuestionStart>) {
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
  yield takeEvery(fetchQuestionStart, fetchQuestions);
}

export default function* questionSaga() {
  yield all([watchGetQuestions()]);
}
