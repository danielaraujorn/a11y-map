import haversine from 'haversine';
import { LatLngLiteral } from 'leaflet';

const getLotLngLiteralToHaversine = ({
  lat: latitude,
  lng: longitude,
}: LatLngLiteral): haversine.CoordinateLongitudeLatitude => ({
  latitude,
  longitude,
});

export const getDistance = (
  start: LatLngLiteral,
  end: LatLngLiteral
): string => {
  const distanceInMeters = haversine(
    getLotLngLiteralToHaversine(start),
    getLotLngLiteralToHaversine(end),
    { unit: 'meter' }
  );
  if (distanceInMeters > 1000)
    return `${Math.round(distanceInMeters / 1000)}km`;
  return `${Math.round(distanceInMeters)}m`;
};
