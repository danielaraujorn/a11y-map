import { useState, useCallback, useEffect } from 'react';
import { Map as MapType } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMediaQuery, useTheme } from '@mui/material';

export const Map = ({
  onMove,
  whenCreated,
  children,
  ...props
}: {
  onMove?: (map: MapType) => void;
  whenCreated?: (map: MapType) => void;
  children?: JSX.Element;
  zoomControl?: boolean;
}) => {
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
    },
    [onMove]
  );

  useEffect(() => {
    map?.on?.('move', onMapMove);
    return () => {
      map?.off?.('move', onMapMove);
    };
  }, [map, onMapMove]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
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
