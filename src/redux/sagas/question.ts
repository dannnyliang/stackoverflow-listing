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
  fetchMoreQuestionStart,
  fetchMoreQuestionSuccess,
  fetchQuestionFail,
  fetchQuestionStart,
  fetchQuestionSuccess,
} from "../reducer/question";

const DEBOUNCE_TIME = 1000;

function* fetchQuestions(
  action:
    | ReturnType<typeof fetchQuestionStart>
    | ReturnType<typeof fetchMoreQuestionStart>
) {
  yield delay(DEBOUNCE_TIME);

  const questions: SagaReturnType<typeof APIs.getQuestions> = yield call(
    APIs.getQuestions,
    action.payload ?? {}
  );

  if ("error_id" in questions) {
    yield put(fetchQuestionFail(questions));
  } else {
    const actionType = action.type;
    if (actionType === fetchQuestionStart().type) {
      yield put(fetchQuestionSuccess(questions));
    }
    if (actionType === fetchMoreQuestionStart().type) {
      yield put(fetchMoreQuestionSuccess(questions));
    }
  }
}

function* watchGetQuestions() {
  yield takeLatest(
    [fetchQuestionStart, fetchMoreQuestionStart],
    fetchQuestions
  );
}

export default function* questionSaga() {
  yield all([watchGetQuestions()]);
}
