import { Container } from '../../../components/Container';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { BackButtonAppBar } from '../../../components/BackButtonAppBar';
import {
  Box,
  Card,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { paths } from '../../../Navigation/paths';
import { useGeolocation } from '../../../hooks/useGeolocation';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { usePlacesRequest } from '../../../api';

export const PlacesPresentation = () => {
  const navigate = useNavigate();

  const [{ data, loading }] = usePlacesRequest();

  const places = data?.data?.places || [];

  const { getDistance } = useGeolocation();

  const { formatMessage } = useIntl();

  return (
    <Container>
      <BackButtonAppBar titleMessage="places" />
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
};
