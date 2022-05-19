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

import { BottomPagination } from '../../../components/BottomPagination';
import { Container } from '../../../components/Container';
import { FloatingView } from '../../../components/FloatingView';
import { Header } from '../../../components/Header';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { PageProps } from '../../../hooks/usePagination';
import { DeficiencyType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';

type DeficienciesPresentationPropType = {
  onAddButtonClick: () => void;
  name?: string;
  setName: (value: string) => void;
  loading?: boolean;
  navigate: (path: string) => void;
  deficiencies: DeficiencyType[];
  formatMessage: (descriptor: MessageDescriptor) => string;
  pageProps: PageProps;
};

export const DeficienciesPresentation = ({
  pageProps,
  onAddButtonClick,
  loading,
  formatMessage,
  deficiencies,
  name,
  setName,
  navigate,
}: DeficienciesPresentationPropType) => (
  <Container>
    <Header titleMessage="deficiencies" backButtonPath={paths.home} />
    {loading && <LinearProgress color="secondary" />}
    <MaxWidthContainer>
      <Box my={2}>
        <TextField
          fullWidth
          label={formatMessage({ id: 'name' })}
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        {deficiencies.map(({ description, id, name }) => (
          <Box my={2} key={id}>
            <Paper
              sx={{ p: 2 }}
              onClick={() => navigate(paths.deficiency(id))}
              style={{ cursor: 'pointer' }}
            >
              <Typography fontWeight={600} variant="body1">
                {name}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Paper>
          </Box>
        ))}
        <BottomPagination {...pageProps} />
      </Box>
    </MaxWidthContainer>
    <FloatingView>
      <Fab
        aria-label={formatMessage({ id: 'deficiency.add' })}
        color="primary"
        onClick={onAddButtonClick}
      >
        <AddIcon />
      </Fab>
    </FloatingView>
  </Container>
);
