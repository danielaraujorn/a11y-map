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
import { usePlacesRequest } from '../../../api';

export const PointsPresentation = () => {
  const [{ data, loading }] = usePlacesRequest();

  const places = data?.data?.places || [];

  console.log(places);

  return (
    <Container>
      <BackButtonAppBar titleMessage="places" />
      {loading && <LinearProgress color="secondary" />}
      <MaxWidthContainer>
        <Box my={2}>
          <Card
            onClick={() => console.log('entrando no ponto')}
            style={{ cursor: 'pointer' }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Pendente
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Visual
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  500m
                </Typography>
              </Box>
              <Typography variant="h5" component="div">
                beaaaa
              </Typography>
              <Typography variant="body2">Descrição do rolé</Typography>
            </CardContent>
          </Card>
        </Box>
      </MaxWidthContainer>
    </Container>
  );
};
