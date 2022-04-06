import { LatLngLiteral } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';

const getLocation = (): Promise<LatLngLiteral> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject();
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude: lat, longitude: lng } = position.coords;
          resolve({ lat, lng });
        },
        () => {
          reject();
        }
      );
    }
  });

export const useGeolocation = () => {
  const [location, setLocation] = useState<LatLngLiteral>({
    lat: -5.8374736,
    lng: -35.2026306,
  });
  const get = useCallback(async () => {
    try {
      const newLocation = await getLocation();
      setLocation(newLocation);
    } catch {
      console.error('Unable to retrieve your location');
    }
  }, []);
  useEffect(() => {
    get();
  });
  return location;
};
