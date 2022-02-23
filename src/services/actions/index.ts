import {
  CREATE_MARKER,
  DELETE_MARKER,
  MOVE_CENTER,
  DRAG_AND_DROP,
  CHANGE_POSITION,
  CLEAR_ALL_MARKERS,
} from "./action-types";

import { IPosition } from "../../interfaces/interface-item";

export interface ICreateMarkerAction {
  readonly type: typeof CREATE_MARKER;
  readonly id: number;
  readonly address: string;
  readonly position: IPosition;
}

export interface IDeleteMarkerAction {
  readonly type: typeof DELETE_MARKER;
  readonly id: number;
}

export interface IMoveToCenterAction {
  readonly type: typeof MOVE_CENTER;
  readonly lat: number;
  readonly lng: number;
}

export interface IDragNDropAction {
  readonly type: typeof DRAG_AND_DROP;
  readonly fromIndex: number;
  readonly toIndex: number;
}

export interface IChangePositionMarkerAction {
  readonly type: typeof CHANGE_POSITION;
  readonly id: number;
  readonly address: string;
  readonly position: IPosition;
}

export interface IClearAllMarkers {
  readonly type: typeof CLEAR_ALL_MARKERS;
}
export const createMarker = (
  id: number,
  address: string,
  position: IPosition
): ICreateMarkerAction => ({
  type: CREATE_MARKER,
  id,
  address,
  position,
});

export const deleteMarker = (id: number): IDeleteMarkerAction => ({
  type: DELETE_MARKER,
  id,
});

export const moveToCenter = (
  lat: number,
  lng: number
): IMoveToCenterAction => ({
  type: MOVE_CENTER,
  lat,
  lng,
});

export const dragAndDrop = (fromIndex: number, toIndex: number) => ({
  type: DRAG_AND_DROP,
  fromIndex,
  toIndex,
});

export const changePosition = (
  id: number,
  address: string,
  position: IPosition
) => ({
  type: CHANGE_POSITION,
  id,
  address,
  position,
});

export const clearAllMarkers = () => ({
  type: CLEAR_ALL_MARKERS,
});

export type TMarkerActions =
  | ICreateMarkerAction
  | IDeleteMarkerAction
  | IMoveToCenterAction
  | IDragNDropAction
  | IChangePositionMarkerAction
  | IClearAllMarkers;
