import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Map as MapType } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import { useGeolocation } from '../../hooks/useGeolocation';

const MapEvents = ({
  whenCreated,
}: {
  whenCreated?: (map: MapType) => void;
}) => {
  const map = useMap();
  useEffect(() => whenCreated?.(map), [whenCreated, map]);
  return null;
};

export const Map = ({
  children,
  whenCreated,
  center,
  ...props
}: {
  whenCreated?: (map: MapType) => void;
  children?: JSX.Element;
  zoomControl?: boolean;
  center?: LatLngExpression;
}) => {
  const { location } = useGeolocation();
  const theme = useTheme();
  const scrollWheelZoom = useMediaQuery(theme.breakpoints.up('sm'));

  const { lat, lng } = location;
  const latLngExpression: LatLngExpression = [lat, lng];

  return (
    <MapContainer
      center={center || latLngExpression}
      zoom={18}
      scrollWheelZoom={scrollWheelZoom}
      maxZoom={18}
      style={{ height: '100%', width: '100%' }}
      {...props}
    >
      <MapEvents whenCreated={whenCreated} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};
