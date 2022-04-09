import { useContext } from 'react';

import { GeolocationContext } from '../../contexts/GeolocationContext';

export const useGeolocation = () => useContext(GeolocationContext);
