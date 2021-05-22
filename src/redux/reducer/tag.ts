import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GetTagsData, GetTagsError, GetTagsParm } from "../../apis/tags";
import { FETCH_STATUS } from "./constant";

interface TagState {
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
        state.status = FETCH_STATUS.PENDING;
        state.data = action.payload;
        state.error = null;
      },
      prepare: (data: GetTagsData) => ({ payload: data }),
    },
  },
});

/** ----- Action ----- */
export const { fetchTagStart, fetchTagFail, fetchTagSuccess } =
  tagSlice.actions;

/** ----- Reducer ----- */
export default tagSlice.reducer;
