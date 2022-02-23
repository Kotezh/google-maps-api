import { MOVE_CENTER } from "../actions/action-types";
import { TMarkerActions } from "../actions/index";

export type TCenterState = {
  lat: number;
  lng: number
};

const defaultCenter = {
  lat: 55.7533818,
  lng: 37.6218572,
};

const initialStateCenter:TCenterState = {
  ...defaultCenter,
};

export const centerReducer = (state = initialStateCenter, action: TMarkerActions): TCenterState => {
  switch (action.type) {
    case MOVE_CENTER:
      return {
        lat: action.lat,
        lng: action.lng,
      };

    default:
      return state;
  }
};
