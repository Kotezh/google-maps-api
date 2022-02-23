import * as types from "../actions/action-types";
import { centerReducer } from "./center-reducer";

it("Должен изменить координаты центра", () => {
  const centerBefore = {
    lat: 55.7533818,
    lng: 37.6218572,
  };
  const action = {
    type: types.MOVE_CENTER,
    lat: 70.6265347,
    lng: -40.6591707,
  };
  const centerAfter = {
    lat: 70.6265347,
    lng: -40.6591707,
  };
  expect(centerReducer(centerBefore, action)).toEqual(centerAfter);
});
