import * as types from "../actions/action-types";
import { markerReducer } from "./marker-reducer";

it("Должен создать новый маркер и вернуть новый массив", () => {
  const defaultMarkers = { markers: [] };
  const newMarker = {
    id: Math.floor(Math.random() * 1000000),
    address: "Default",
    position: {
      lat: 55.7533818,
      lng: 37.6218572,
    },
  };
  const action = {
    type: types.CREATE_MARKER,
    id: newMarker.id,
    address: newMarker.address,
    position: newMarker.position,
  };

  const markersAfter = { markers: [newMarker] };
  expect(markerReducer(defaultMarkers, action)).toEqual(markersAfter);
});

it("Должен удалить маркер и вернуть новый массив", () => {
  const markerListBefore = {
    markers: [
      {
        id: 1,
        address: "first",
        position: {
          lat: 55.7533818,
          lng: 37.6218572,
        },
      },
      {
        id: 2,
        address: "second",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
    ],
  };
  const action = {
    type: types.DELETE_MARKER,
    id: 1,
  };
  const markerListAfter = {
    markers: [
      {
        id: 2,
        address: "second",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
    ],
  };
  expect(markerReducer(markerListBefore, action)).toEqual(markerListAfter);
});

it("Должен переместить 1 элемент списка на новое место и вернуть новый массив", () => {
  const itemsBefore = {
    markers: [
      {
        id: 1,
        address: "first",
        position: {
          lat: 55.7533818,
          lng: 37.6218572,
        },
      },
      {
        id: 2,
        address: "second",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
    ],
  };
  const action = {
    type: types.DRAG_AND_DROP,
    fromIndex: 0,
    toIndex: 1,
  };

  const itemsAfter = {
    markers: [
      {
        id: 2,
        address: "second",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
      {
        id: 1,
        address: "first",
        position: {
          lat: 55.7533818,
          lng: 37.6218572,
        },
      },
    ],
  };
  expect(markerReducer(itemsBefore, action)).toEqual(itemsAfter);
});

it("Должен изменить адрес и координаты для 1 маркера и обновить массив", () => {
  const markerBefore = {
    markers: [
      {
        id: 1,
        address: "Default",
        position: {
          lat: 55.7533818,
          lng: 37.6218572,
        },
      },
    ],
  };
  const action = {
    type: types.CHANGE_POSITION,
    id: 1,
    address: "New Address",
    position: {
      lat: 70.6265347,
      lng: -40.6591707,
    },
  };

  const markerAfter = {
    markers: [
      {
        id: 1,
        address: "New Address",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
    ],
  };
  expect(markerReducer(markerBefore, action)).toEqual(markerAfter);
});

it("Должен удалить все маркеры", () => {
  const markerListBefore = {
    markers: [
      {
        id: 1,
        address: "first",
        position: {
          lat: 55.7533818,
          lng: 37.6218572,
        },
      },
      {
        id: 2,
        address: "second",
        position: {
          lat: 70.6265347,
          lng: -40.6591707,
        },
      },
    ],
  };
  const action = {
    type: types.CLEAR_ALL_MARKERS,
  };
  const markerListAfter = { markers: [] };
  expect(markerReducer(markerListBefore, action)).toEqual(markerListAfter);
});
