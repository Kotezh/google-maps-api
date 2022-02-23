export interface IPosition {
  lat: number;
  lng: number;
}

export interface INewItem {
  id: number;
  address: string;
  position: IPosition;
}
