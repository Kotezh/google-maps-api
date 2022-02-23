import { FC, useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import { changePosition, createMarker } from "../../services/actions/index";
import { deleteMarker } from "../../services/actions/index";
import { INewItem } from "../../services/interfaces/interface-item";
import { RootState } from "../../services/types/types";

const containerStyle = {
  width: "100%",
  height: "460px",
};

const MapContainer: FC = () => {
  Geocode.setLanguage("ru");
  const [selectedMarker, setSelectedMarker] = useState<INewItem | null>();
  const mapRef = useRef(undefined);
  const { markers } = useSelector((store: RootState) => store.markers);
  const center = useSelector((store: RootState) => store.center);

  const dispatch = useDispatch();

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const onMapClick = useCallback(
    (location) => {
      const lat = location.latLng.lat();
      const lng = location.latLng.lng();
      console.log(lat, lng);
      Geocode.fromLatLng(lat, lng)
        .then((response) => {
          const id = response.results[0].place_id;
          const address = response.results[0].formatted_address;
          dispatch(createMarker(id, address, { lat, lng }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [dispatch]
  );

  const handleDeleteMarker = (id: number) => {
    dispatch(deleteMarker(id));
  };

  const handleDragMarker = (
    id: number,
    location: google.maps.MapMouseEvent
  ) => {
    if (location.latLng) {
      const lat = location.latLng.lat().toString();
      const lng = location.latLng.lng().toString();
      Geocode.fromLatLng(lat, lng)
        .then((response) => {
          const address = response.results[0].formatted_address;
          dispatch(
            changePosition(id, address, {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const polyline = markers?.map((marker: INewItem) => marker.position);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {markers?.map((marker: INewItem) => {
          return (
            <Marker
              key={marker.id}
              position={marker.position}
              draggable={true}
              onClick={() => setSelectedMarker(marker)}
              onRightClick={() => handleDeleteMarker(marker.id)}
              onDragEnd={(location: google.maps.MapMouseEvent) =>
                handleDragMarker(marker.id, location)
              }
            />
          );
        })}
        {selectedMarker ? (
          <InfoWindow
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
            position={selectedMarker.position}
            onPositionChanged={() => selectedMarker.position}
          >
            <div>
              <h3>{selectedMarker.address}</h3>
            </div>
          </InfoWindow>
        ) : null}
        <Polyline
          options={
            {
              strokeColor: "#0088cc",
              fillColor: "#0088cc",
              fillOpacity: "1",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            } as google.maps.PolylineOptions
          }
          path={polyline}
        />
      </GoogleMap>
    </div>
  );
};

export { MapContainer };
