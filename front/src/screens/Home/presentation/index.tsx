import { Marker, Popup } from "react-leaflet";
import { Fab, TextField, AppBar, Toolbar } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FloatingView } from "../../../components/FloatingView";
import { Search } from "../../../components/Search";
import { Container } from "../../../components/Container";
import { Map } from "../../../components/Map";

export const HomePresentation = () => (
  <Container>
    <AppBar position="static">
      <Toolbar>
        <Search>
          <TextField label="Pesquisar" variant="standard" />
        </Search>
      </Toolbar>
    </AppBar>
    <Map>
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
    <FloatingView>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </FloatingView>
  </Container>
);
