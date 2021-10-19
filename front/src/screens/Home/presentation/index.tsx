import { Marker, Popup } from "react-leaflet";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FloatingView } from "../../../components/FloatingView";
import { Container } from "../../../components/Container";
import { Map } from "../../../components/Map";
import { useHistory } from "react-router";
import { paths } from "../../../Navigation/paths";
import { useCallback } from "react";
import { NavBar } from "../../../components/NavBar";

export const HomePresentation = () => {
  const history = useHistory();
  const onAddButtonClick = useCallback(() => {
    history.push(paths.newPoint);
  }, [history]);
  return (
    <Container>
      <NavBar />
      <Map>
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      <FloatingView>
        <Fab color="primary" aria-label="add" onClick={onAddButtonClick}>
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
