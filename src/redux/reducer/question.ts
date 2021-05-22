import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  GetQuestionsData,
  GetQuestionsError,
  GetQuestionsParm,
} from "../../apis/questions";
import { FETCH_STATUS } from "./constant";
import { fetchTagAndQuestionStart } from "./tag";

interface QuestionState {
  status: FETCH_STATUS;
  data: GetQuestionsData | null;
  error: GetQuestionsError | null;
}

const name = "question";
const initialState: QuestionState = {
  status: FETCH_STATUS.PENDING,
  data: null,
  error: null,
};

const questionSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchQuestionStart: {
      reducer: (state) => {
        state.status = FETCH_STATUS.LOADING;
      },
      prepare: (parm?: GetQuestionsParm) => ({ payload: parm }),
    },
    fetchQuestionFail: {
      reducer: (state, action: PayloadAction<GetQuestionsError>) => {
        state.status = FETCH_STATUS.PENDING;
        state.error = action.payload;
      },
      prepare: (error: GetQuestionsError) => ({ payload: error }),
    },
    fetchQuestionSuccess: {
      reducer: (state, action: PayloadAction<GetQuestionsData>) => {
        state.status = FETCH_STATUS.PENDING;
        state.data = action.payload;
        state.error = null;
      },
      prepare: (data: GetQuestionsData) => ({ payload: data }),
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchTagAndQuestionStart, (state) => {
      state.status = FETCH_STATUS.LOADING;
    }),
});

/** ----- Action ----- */
export const { fetchQuestionStart, fetchQuestionFail, fetchQuestionSuccess } =
  questionSlice.actions;

/** ----- Reducer ----- */
export default questionSlice.reducer;
