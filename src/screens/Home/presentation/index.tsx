import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Fab, LinearProgress } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { MessageDescriptor } from 'react-intl';
import { Dispatch, SetStateAction, useMemo } from 'react';

import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Map } from '../../../components/Map';
import { Header } from '../../../components/Header';
import { PlaceModelType, RoleEnum } from '../../../types/Models';
import { FilterActions } from '../FilterActions';
import { PlacesFilterType } from '../../../api/places';

type HomePresentationPropType = {
  loading: boolean;
  onAddButtonClick: () => void;
  goToPlace: (id: string) => void;
  places: PlaceModelType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
  filter: PlacesFilterType;
  setFilter: Dispatch<SetStateAction<PlacesFilterType>>;
  role?: RoleEnum;
};

export const HomePresentation = ({
  loading,
  onAddButtonClick,
  places,
  formatMessage,
  goToPlace,
  filter,
  setFilter,
  role,
}: HomePresentationPropType) => {
  const editButtonTitle = formatMessage({ id: 'edit' });

  const markers = useMemo(
    () =>
      places.map(({ id, latitude, longitude }) => (
        <Marker key={id} position={[latitude, longitude]}>
          <Popup>
            <Box>
              {/* <Typography>
                <Box component="span">{description}</Box>
              </Typography> */}
              <Button
                aria-label={editButtonTitle}
                onClick={() => goToPlace(id)}
                variant="contained"
              >
                {editButtonTitle}
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
      <Header
        titleMessage="a11y"
        rightActions={
          role &&
          role !== RoleEnum.NORMAL && (
            <FilterActions filter={filter} setFilter={setFilter} />
          )
        }
      />
      <Map>
        <>{markers}</>
      </Map>
      <FloatingView>
        <Fab
          aria-label={formatMessage({ id: 'place.add' })}
          color="primary"
          onClick={onAddButtonClick}
        >
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
