import { LatLngLiteral } from 'leaflet';
import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getDistance } from '../utils/getDistance';

const getLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject();
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });

const initialLocation = {
  lat: -5.8374736,
  lng: -35.2026306,
};

export const GeolocationContext = createContext<{
  location: LatLngLiteral;
  getDistance: (endLocation: LatLngLiteral) => string;
}>({
  location: initialLocation,
  getDistance: endLocation => getDistance(initialLocation, endLocation),
});

export const GeolocationProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [location, setLocation] = useState<LatLngLiteral>(initialLocation);
  const updateLocation = useCallback(
    async (position: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setLocation(prev =>
        prev.lat !== lat && prev.lng !== lng ? { lat, lng } : prev
      );
    },
    [setLocation]
  );
  const get = useCallback(async () => {
    try {
      const newLocation = await getLocation();
      updateLocation(newLocation);
    } catch {
      console.error('Unable to retrieve your location');
    }
  }, []);
  useEffect(() => {
    get();
    const id = navigator.geolocation.watchPosition(
      updateLocation,
      console.error,
      {
        enableHighAccuracy: true,
        maximumAge: 10 * 60 * 1000,
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [updateLocation]);

  return (
    <GeolocationContext.Provider
      value={{
        location,
        getDistance: endLocation => getDistance(location, endLocation),
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};
