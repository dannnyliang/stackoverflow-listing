import { createAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

const name = "counter";
const initialState: CounterState = { count: 0 };

const counterSlice = createSlice({
  name,
  initialState,
  reducers: {
    increment: ({ count }) => ({ count: count + 1 }),
    decrement: ({ count }) => ({ count: count > 0 ? count - 1 : count }),
    incrementIfOdd: ({ count }) => ({
      count: count % 2 !== 0 ? count + 1 : count,
    }),
  },
});

/** ----- Action ----- */
export const { increment, decrement, incrementIfOdd } = counterSlice.actions;
export const incrementAsync = createAction(`${name}/incrementAsync`);

/** ----- Reducer ----- */
export default counterSlice.reducer;
