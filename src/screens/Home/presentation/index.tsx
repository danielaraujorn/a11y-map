import { Marker, Popup } from 'react-leaflet';
import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { FloatingView } from '../../../components/FloatingView';
import { Container } from '../../../components/Container';
import { Map } from '../../../components/Map';
import { useNavigate } from 'react-router';
import { paths } from '../../../Navigation/paths';
import { useCallback } from 'react';
import { NavBar } from '../../../components/NavBar';

export const HomePresentation = () => {
  const navigate = useNavigate();
  const onAddButtonClick = useCallback(() => {
    navigate(paths.newPoint);
  }, [navigate]);
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
        <Fab color='primary' aria-label='add' onClick={onAddButtonClick}>
          <AddIcon />
        </Fab>
      </FloatingView>
    </Container>
  );
};
