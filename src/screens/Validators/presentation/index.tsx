import {
  Box,
  Card,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { LatLngLiteral } from 'leaflet';
import { MessageDescriptor } from 'react-intl';

import { BackButtonAppBar } from '../../../components/BackButtonAppBar';
import { Container } from '../../../components/Container';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { UserType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';

type ValidatorsPresentationPropType = {
  loading: boolean;
  navigate: (path: string) => void;
  getDistance: (endLocation: LatLngLiteral) => string;
  users: UserType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
};

export const ValidatorsPresentation = ({
  loading,
  navigate,
  formatMessage,
  getDistance,
  users,
}: ValidatorsPresentationPropType) => (
  <Container>
    <BackButtonAppBar titleMessage="user.validators" />
    {loading && <LinearProgress color="secondary" />}
    {!loading && (
      <MaxWidthContainer>
        <Box my={2}>
          {users.map(({ email, id }) => (
            <Box my={2} key={id}>
              <Card
                // onClick={() => navigate(paths.place(id))}
                style={{ cursor: 'pointer' }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      status
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
                      distancia
                    </Typography>
                  </Box>
                  <Typography variant="body2">{email}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </MaxWidthContainer>
    )}
  </Container>
);
