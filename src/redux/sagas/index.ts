import { isEmpty, mergeDeepRight } from "ramda";
import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeLatest,
} from "redux-saga/effects";

import APIs from "../../apis";
import { GetQuestionsParm, emptyQuestionData } from "../../apis/questions";
import { emptyTagData } from "../../apis/tags";
import { fetchQuestionFail, fetchQuestionSuccess } from "../reducer/question";
import {
  fetchTagAndQuestionStart,
  fetchTagFail,
  fetchTagSuccess,
} from "../reducer/tag";
import questionSaga from "./question";
import tagSaga from "./tag";

export function helloSaga() {
  console.log("Hello Sagas!");
}

function* fetchTagAndQuestion(
  action: ReturnType<typeof fetchTagAndQuestionStart>
) {
  yield delay(1000);

  const tags: SagaReturnType<typeof APIs.getTags> = yield call(
    APIs.getTags,
    action.payload?.tag ?? {}
  );

  if ("error_id" in tags) {
    yield put(fetchTagFail(tags));
    return;
  }
  if (isEmpty(tags.items)) {
    yield all([
      put(fetchTagSuccess(emptyTagData)),
      put(fetchQuestionSuccess(emptyQuestionData)),
    ]);
    return;
  }

  const firstTagName = tags.items[0].name;

  const getQuestionsParm = mergeDeepRight<GetQuestionsParm, GetQuestionsParm>(
    action.payload?.question ?? {},
    { tagged: firstTagName, pageSize: 20 }
  );
  const questions: SagaReturnType<typeof APIs.getQuestions> = yield call(
    APIs.getQuestions,
    getQuestionsParm
  );

  if ("error_id" in questions) {
    yield put(fetchQuestionFail(questions));
    return;
  }

  yield all([put(fetchTagSuccess(tags)), put(fetchQuestionSuccess(questions))]);
}

function* watchBatchFetch() {
  yield takeLatest(fetchTagAndQuestionStart, fetchTagAndQuestion);
}

export default function* rootSaga() {
  yield all([helloSaga(), tagSaga(), questionSaga(), watchBatchFetch()]);
}
