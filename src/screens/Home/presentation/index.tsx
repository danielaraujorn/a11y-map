import { Add as AddIcon } from '@mui/icons-material';
import { Fab, LinearProgress } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';

import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Map } from '../../../components/Map';
import { NavBar } from '../../../components/NavBar';

type HomePresentationPropType = {
  loading: boolean;
  onAddButtonClick: () => void;
};

export const HomePresentation = ({
  loading,
  onAddButtonClick,
}: HomePresentationPropType) => {
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
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      <FloatingView>
        <Fab color="primary" aria-label="add" onClick={onAddButtonClick}>
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
