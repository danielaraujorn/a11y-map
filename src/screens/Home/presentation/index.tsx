import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Fab, TextField, AppBar, Toolbar } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import { FloatingView } from "../../../components/FloatingView";
import { Search } from "../../../components/Search";

export const HomePresentation = () => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <TextField label="Pesquisar" variant="standard" />
          </Search>
        </Toolbar>
      </AppBar>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <FloatingView>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </FloatingView>
    </div>
  );
};
