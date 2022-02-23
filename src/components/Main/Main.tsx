import { useCallback, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import { API_KEY } from "../../utils/constants";
import Geocode from "react-geocode";
import { Row, Col, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { MarkerList } from "../MarkerList/MarkerList";
import { Search } from "../Search/Search";
import { MapContainer } from "../MapContainer/MapContainer";
import { clearAllMarkers } from "../../services/actions";
import "./Main.css";
import { RootState } from "../../services/types/types";

const libraries: ("places")[] = ["places"];

const Main: FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY || '',
    libraries,
  });

  Geocode.setApiKey(API_KEY||'');
  const dispatch = useDispatch();
  const { markers } = useSelector((store: RootState) => store.markers);
  const clearMarkers = useCallback(() => {
    dispatch(clearAllMarkers());
  }, [dispatch]);

  return (
    <main className='main'>
      {isLoaded ? (
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify='center'>
          <Col span={8}>
            <Search />
            <MarkerList />
            {markers?.length ? (
              <Button icon={<CloseOutlined />} onClick={clearMarkers}>
                Удалить все маркеры
              </Button>
            ) : null}
          </Col>
          <Col span={16} className='map'>
            <MapContainer />
          </Col>
        </Row>
      ) : (
        <h2 className='main__loading-text'>Loading...</h2>
      )}
    </main>
  );
}

export { Main };
