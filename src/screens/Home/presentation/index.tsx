import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Fab, LinearProgress } from '@mui/material';
import { Map as MapType, icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { MessageDescriptor } from 'react-intl';
import { Dispatch, SetStateAction, useMemo } from 'react';

import { Container } from '../../../components/Container';
import { FilterActions } from '../FilterActions';
import { FloatingView } from '../../../components/FloatingView';
import { Map } from '../../../components/Map';
import { Header } from '../../../components/Header';
import {
  BarrierLevelEnum,
  PlaceModelType,
  RoleEnum,
  StatusEnum,
} from '../../../types/Models';
import { PlacesFilterType } from '../../../api/places';
import { SearchInput, CandidateType } from '../SearchInput';

import RedMaker from '../../../icons/redMarker.svg';
import YellowMaker from '../../../icons/yellowMarker.svg';
import GreenMaker from '../../../icons/greenMarker.svg';
import BlueMaker from '../../../icons/blueMarker.svg';

const IconRed = icon({
  iconUrl: RedMaker,

  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -30],
});

const IconYellow = icon({
  iconUrl: YellowMaker,

  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -30],
});

const IconGreen = icon({
  iconUrl: GreenMaker,

  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -30],
});

const IconBlue = icon({
  iconUrl: BlueMaker,

  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -30],
});

const icons = {
  [BarrierLevelEnum.BAD]: IconRed,
  [BarrierLevelEnum.DIFFICULT]: IconYellow,
  [BarrierLevelEnum.GOOD]: IconGreen,
};

const getIcon = ({
  barrier_level,
  status,
}: {
  barrier_level: BarrierLevelEnum;
  status: StatusEnum;
}) => {
  console.log(barrier_level, status);
  if (status === StatusEnum.VALIDATED) return icons[barrier_level] || IconRed;
  return IconBlue;
};

type HomePresentationPropType = {
  loading: boolean;
  onAddButtonClick: () => void;
  goToPlace: (id: string) => void;
  places: PlaceModelType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
  filter: PlacesFilterType;
  setFilter: Dispatch<SetStateAction<PlacesFilterType>>;
  role?: RoleEnum;
  onSearch: (value: CandidateType | null | string | undefined) => void;
  whenCreated: (map: MapType) => void;
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
  onSearch,
  whenCreated,
}: HomePresentationPropType) => {
  const editButtonTitle = formatMessage({ id: 'edit' });

  const markers = useMemo(
    () =>
      places.map(({ id, latitude, longitude, barrier_level, status }) => (
        <Marker
          icon={getIcon({ barrier_level, status })}
          key={id}
          position={[latitude, longitude]}
        >
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

  return (
    <Container>
      <Box sx={{ position: 'relative' }}>
        <Header
          titleMessage="a11y"
          leftActions={<SearchInput onChange={onSearch} />}
          rightActions={
            role &&
            role !== RoleEnum.NORMAL && (
              <FilterActions filter={filter} setFilter={setFilter} />
            )
          }
        />
        {loading && (
          <Box sx={{ position: 'absolute', width: '100%', zIndex: 401 }}>
            <LinearProgress color="secondary" />
          </Box>
        )}
      </Box>
      <Map whenCreated={whenCreated}>
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
