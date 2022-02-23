import * as actions from "../actions";
import * as types from "../actions/action-types";

it("Создает экшн для создания нового маркера", () => {
  const id = Math.floor(Math.random() * 1000000);
  const address = "Default";
  const position = {
    lat: 55.7533818,
    lng: 37.6218572,
  };
  const expected = {
    type: types.CREATE_MARKER,
    id,
    address,
    position,
  };
  expect(actions.createMarker(id, address, position)).toEqual(expected);
});

it("Создает экшн для удаления маркера", () => {
  const id = Math.floor(Math.random() * 1000000);
  const expected = {
    type: types.DELETE_MARKER,
    id,
  };
  expect(actions.deleteMarker(id)).toEqual(expected);
});

it("Создает экшн для перемещения карты к центру для нового маркера", () => {
  const lat = 55.7533818;
  const lng = 37.6218572;

  const expected = {
    type: types.MOVE_CENTER,
    lat,
    lng,
  };
  expect(actions.moveToCenter(lat, lng)).toEqual(expected);
});

it("Создает экшн для перемещения маркеров в списке", () => {
  const fromIndex = 0;
  const toIndex = 1;

  const expected = {
    type: types.DRAG_AND_DROP,
    fromIndex,
    toIndex,
  };
  expect(actions.dragAndDrop(fromIndex, toIndex)).toEqual(expected);
});

it("Создает экшн для перемещения маркеров на карте", () => {
  const id = Math.floor(Math.random() * 1000000);
  const address = "Default";
  const position = {
    lat: 55.7533818,
    lng: 37.6218572,
  };

  const expected = {
    type: types.CHANGE_POSITION,
    id,
    address,
    position,
  };
  expect(actions.changePosition(id, address, position)).toEqual(expected);
});

it("Создает экшн для удаления всех маркеров", () => {
  const expected = {
    type: types.CLEAR_ALL_MARKERS,
  };
  expect(actions.clearAllMarkers()).toEqual(expected);
});
