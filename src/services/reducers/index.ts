import { combineReducers } from "redux";
import { centerReducer } from "./center-reducer";
import { markerReducer } from "./marker-reducer";

export const rootReducer = combineReducers({
  markers: markerReducer,
  center: centerReducer,
});
