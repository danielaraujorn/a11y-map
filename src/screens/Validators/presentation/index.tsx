import {
  Box,
  Card,
  Typography,
  CardContent,
  LinearProgress,
  TextField,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { LatLngLiteral } from 'leaflet';
import { MessageDescriptor } from 'react-intl';

import { BackButtonAppBar } from '../../../components/BackButtonAppBar';
import { Container } from '../../../components/Container';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { UserType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';
import { Delete } from '@mui/icons-material';

type ValidatorsPresentationPropType = {
  email?: string;
  setEmail: (value: string) => void;
  loading: boolean;
  navigate: (path: string) => void;
  users: UserType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
  onDelete: (id: string) => void;
};

export const ValidatorsPresentation = ({
  loading,
  navigate,
  formatMessage,
  users,
  email,
  setEmail,
  onDelete,
}: ValidatorsPresentationPropType) => (
  <Container>
    <BackButtonAppBar titleMessage="user.validators" />
    {loading && <LinearProgress color="secondary" />}
    <MaxWidthContainer>
      <Box my={2}>
        <TextField
          fullWidth
          label={formatMessage({ id: 'user.searchEmail' })}
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        {users.map(({ email, id }) => (
          <Box my={2} key={id}>
            <Paper sx={{ p: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">{email}</Typography>
                <IconButton onClick={() => onDelete(id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </MaxWidthContainer>
  </Container>
);
