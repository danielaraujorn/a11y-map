import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Fab, LinearProgress } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';

import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Map } from '../../../components/Map';
import { NavBar } from '../../../components/NavBar';
import { PlaceModelType } from '../../../types/Models';
import { MessageDescriptor } from 'react-intl';

type HomePresentationPropType = {
  loading: boolean;
  onAddButtonClick: () => void;
  goToPlace: (id: string) => void;
  places: PlaceModelType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
};

export const HomePresentation = ({
  loading,
  onAddButtonClick,
  places,
  formatMessage,
  goToPlace,
}: HomePresentationPropType) => {
  const markers = useMemo(
    () =>
      places.map(({ id, latitude, longitude }) => (
        <Marker key={id} position={[latitude, longitude]}>
          <Popup>
            <Box>
              {/* <Typography>
                <Box component="span">{description}</Box>
              </Typography> */}
              <Button onClick={() => goToPlace(id)} variant="contained">
                {formatMessage({ id: 'place.edit' })}
              </Button>
            </Box>
          </Popup>
        </Marker>
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
      </Map>
      <FloatingView>
        <Fab color="primary" aria-label="add" onClick={onAddButtonClick}>
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
