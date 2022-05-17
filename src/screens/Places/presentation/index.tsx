import {
  Box,
  Card,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { LatLngLiteral } from 'leaflet';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { PlaceModelType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';

type PlacesPresentationPropType = {
  loading: boolean;
  navigate: (path: string) => void;
  getDistance: (endLocation: LatLngLiteral) => string;
  places: PlaceModelType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
};

export const PlacesPresentation = ({
  loading,
  navigate,
  formatMessage,
  getDistance,
  places,
}: PlacesPresentationPropType) => (
  <Container>
    <Header titleMessage="places" backButtonPath={paths.home} />
    {loading && <LinearProgress color="secondary" />}
    {!loading && (
      <MaxWidthContainer>
        <Box my={2}>
          {places.map(
            ({ description, id, latitude: lat, longitude: lng, status }) => (
              <Box my={2} key={id}>
                <Card
                  onClick={() => navigate(paths.place(id))}
                  style={{ cursor: 'pointer' }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {formatMessage({ id: `status.${status}` })}
                      </Typography>
                      {/* <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Visual
                      </Typography> */}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {getDistance({
                          lat,
                          lng,
                        })}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{description}</Typography>
                  </CardContent>
                </Card>
              </Box>
            )
          )}
        </Box>
      </MaxWidthContainer>
    )}
  </Container>
);
