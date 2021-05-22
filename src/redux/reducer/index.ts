import { combineReducers } from "redux";

import question from "./question";
import tag from "./tag";

const rootReducer = combineReducers({
  tag,
  question,
});

export default rootReducer;
