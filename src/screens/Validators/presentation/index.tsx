import { Add as AddIcon } from '@mui/icons-material';
import {
  Box,
  Typography,
  LinearProgress,
  TextField,
  Paper,
  Fab,
} from '@mui/material';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Header } from '../../../components/Header';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { UserType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';

type ValidatorsPresentationPropType = {
  onAddButtonClick: () => void;
  email?: string;
  setEmail: (value: string) => void;
  loading?: boolean;
  navigate: (path: string) => void;
  users: UserType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
};

export const ValidatorsPresentation = ({
  onAddButtonClick,
  loading,
  formatMessage,
  users,
  email,
  setEmail,
  navigate,
}: ValidatorsPresentationPropType) => (
  <Container>
    <Header titleMessage="user.validators" backButtonPath={paths.home} />
    {loading && <LinearProgress color="secondary" />}
    <MaxWidthContainer>
      <Box my={2}>
        <TextField
          fullWidth
          label={formatMessage({ id: 'user.searchEmail' })}
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        {users.map(({ email, id, role }) => (
          <Box my={2} key={id}>
            <Paper
              sx={{ p: 2 }}
              onClick={() => navigate(paths.validator(id))}
              style={{ cursor: 'pointer' }}
            >
              <Typography fontWeight={600} variant="body1">
                {email}
              </Typography>
              <Typography variant="body2">
                {formatMessage({
                  id: `user.role.${role}`,
                  defaultMessage: role,
                })}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </MaxWidthContainer>
    <FloatingView>
      <Fab
        aria-label={formatMessage({ id: 'user.validators.add' })}
        color="primary"
        onClick={onAddButtonClick}
      >
        <AddIcon />
      </Fab>
    </FloatingView>
  </Container>
);
