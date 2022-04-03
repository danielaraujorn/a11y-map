import { Add as AddIcon } from '@mui/icons-material';
import { Fab, LinearProgress } from '@mui/material';
import { Marker } from 'react-leaflet';
import { useMemo } from 'react';

import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Map } from '../../../components/Map';
import { NavBar } from '../../../components/NavBar';
import { PlaceModelType } from '../../../types/Models';

type HomePresentationPropType = {
  loading: boolean;
  onAddButtonClick: () => void;
  places: PlaceModelType[];
};

export const HomePresentation = ({
  loading,
  onAddButtonClick,
  places,
}: HomePresentationPropType) => {
  const markers = useMemo(
    () =>
      places.map(({ id, latitude, longitude }) => (
        <Marker key={id} position={[latitude, longitude]} />
      )),
    [places]
  );

  if (loading)
    return (
      <Container>
        <LinearProgress />
      </Container>
    );

  return (
    <Container>
      <NavBar />
      <Map>
        <>{markers}</>
        {/* <Marker key={id} position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
      </Map>
      <FloatingView>
        <Fab color="primary" aria-label="add" onClick={onAddButtonClick}>
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
