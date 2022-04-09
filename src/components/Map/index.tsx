import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Map as MapType } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';

import { useGeolocation } from '../../hooks/useGeolocation';

export const Map = ({
  onMove,
  whenCreated,
  children,
  center,
  ...props
}: {
  onMove?: (map: MapType) => void;
  whenCreated?: (map: MapType) => void;
  children?: JSX.Element;
  zoomControl?: boolean;
  center?: LatLngExpression;
}) => {
  const { location } = useGeolocation();
  const [mapMoved, setMapMoved] = useState(false);
  const theme = useTheme();
  const scrollWheelZoom = useMediaQuery(theme.breakpoints.up('sm'));

  const [map, setMap] = useState<MapType>();

  const whenMapIsCreated = useCallback(
    map => {
      setMap(map);
      whenCreated?.(map);
    },
    [setMap, whenCreated]
  );

  const onMapMove = useCallback(
    ({ target }) => {
      onMove?.(target);
      setMapMoved(true);
    },
    [onMove, setMapMoved]
  );

  useEffect(() => {
    map?.on?.('move', onMapMove);
    return () => {
      map?.off?.('move', onMapMove);
    };
  }, [map, onMapMove]);

  useEffect(() => {
    if (!mapMoved) {
      const { lat, lng } = location;
      const latLngExpression: LatLngExpression = [lat, lng];
      map?.panTo(latLngExpression);
    }
  }, [mapMoved, location]);

  const { lat, lng } = location;
  const latLngExpression: LatLngExpression = [lat, lng];

  return (
    <MapContainer
      center={center || latLngExpression}
      zoom={20}
      scrollWheelZoom={scrollWheelZoom}
      // maxZoom={20}
      whenCreated={whenMapIsCreated}
      style={{ height: '100%', width: '100%' }}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};
