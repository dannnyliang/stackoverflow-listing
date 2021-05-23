import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "ramda";

import { GetQuestionsParm } from "../../apis/questions";
import { GetTagsData, GetTagsError, GetTagsParm } from "../../apis/tags";
import { FETCH_STATUS } from "../../constant";

interface TagState {
  selected?: string;
  status: FETCH_STATUS;
  data: GetTagsData | null;
  error: GetTagsError | null;
}

const name = "tag";
const initialState: TagState = {
  status: FETCH_STATUS.PENDING,
  data: null,
  error: null,
};

const tagSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectTag: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    fetchTagStart: {
      reducer: (state) => {
        state.status = FETCH_STATUS.LOADING;
      },
      prepare: (parm?: GetTagsParm) => ({ payload: parm }),
    },
    fetchTagFail: {
      reducer: (state, action: PayloadAction<GetTagsError>) => {
        state.status = FETCH_STATUS.PENDING;
        state.error = action.payload;
      },
      prepare: (error: GetTagsError) => ({ payload: error }),
    },
    fetchTagSuccess: {
      reducer: (state, action: PayloadAction<GetTagsData>) => {
        const firstTagName = isEmpty(action.payload.items)
          ? undefined
          : action.payload.items[0].name;
        state.selected = firstTagName;
        state.status = FETCH_STATUS.PENDING;
        state.data = action.payload;
        state.error = null;
      },
      prepare: (data: GetTagsData) => ({ payload: data }),
    },
    fetchTagAndQuestionStart: {
      reducer: (state) => {
        state.status = FETCH_STATUS.LOADING;
      },
      prepare: (payload?: {
        tag?: GetTagsParm;
        question?: GetQuestionsParm;
      }) => ({ payload }),
    },
  },
});

/** ----- Action ----- */
export const {
  selectTag,
  fetchTagStart,
  fetchTagFail,
  fetchTagSuccess,
  fetchTagAndQuestionStart,
} = tagSlice.actions;

/** ----- Reducer ----- */
export default tagSlice.reducer;
